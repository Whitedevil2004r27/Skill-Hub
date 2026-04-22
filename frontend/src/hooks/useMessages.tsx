"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";

const API_URL = 'http://localhost:3001/api';

export interface Message {
  id: string;
  created_at: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  session_id?: string;
  is_read: boolean;
  sender?: {
    display_name: string;
    avatar_url: string;
  };
  receiver?: {
    display_name: string;
    avatar_url: string;
  };
}

export const useMessages = (otherUserId?: string) => {
  const { user, session } = useAuth();
  const queryClient = useQueryClient();

  // 1. Fetch conversation history
  const { data: messages, isLoading, error } = useQuery({
    queryKey: ["messages", user?.id, otherUserId],
    queryFn: async (): Promise<Message[]> => {
      if (!user || !session || !otherUserId) return [];

      const response = await fetch(`${API_URL}/messages/conversation/${otherUserId}`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      return response.json();
    },
    enabled: !!user && !!session && !!otherUserId,
  });

  // 2. Real-time subscription
  useEffect(() => {
    if (!user || !otherUserId) return;

    const channel = supabase
      .channel(`chat:${user.id}:${otherUserId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${user.id}`, // Only listen for messages sent TO us
        },
        (payload) => {
          // If the message is from the person we are currently chatting with, invalidate or update cache
          if (payload.new.sender_id === otherUserId) {
            queryClient.invalidateQueries({ queryKey: ["messages", user.id, otherUserId] });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, otherUserId, queryClient]);

  // 3. Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!user || !session || !otherUserId) throw new Error("Not authenticated");

      const response = await fetch(`${API_URL}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          receiver_id: otherUserId,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      return response.json();
    },
    onSuccess: () => {
      // Optimistically update or just invalidate
      queryClient.invalidateQueries({ queryKey: ["messages", user?.id, otherUserId] });
    },
  });

  return {
    messages,
    isLoading,
    error,
    sendMessage: sendMessageMutation.mutate,
    isSending: sendMessageMutation.isPending,
  };
};

export const useRecentChats = () => {
  const { user, session } = useAuth();

  return useQuery({
    queryKey: ["recentChats", user?.id],
    queryFn: async (): Promise<any[]> => {
      if (!user || !session) return [];

      const response = await fetch(`${API_URL}/messages/unread`, { // We'll reuse or add a general inbox endpoint
         headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      // For now, let's just use the recent messages we've implemented in the backend if we have an endpoint for it.
      // I'll actually implement a better approach: getting all unique partners from messages.
      
      const { data, error } = await supabase
        .from('messages' as any)
        .select('*, sender:profiles!sender_id(*), receiver:profiles!receiver_id(*)')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group by unique partner
      const partners = new Map();
      data?.forEach((msg: any) => {
        const partner = msg.sender_id === user.id ? msg.receiver : msg.sender;
        if (!partners.has(partner.id)) {
          partners.set(partner.id, {
            ...partner,
            lastMessage: msg.content,
            lastDate: msg.created_at,
            unread: !msg.is_read && msg.receiver_id === user.id
          });
        }
      });

      return Array.from(partners.values());
    },
    enabled: !!user && !!session,
  });
};
