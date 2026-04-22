"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

const API_URL = 'http://localhost:3001/api';

export interface Session {
  id: string;
  mentor_id: string;
  learner_id: string;
  start_time: string;
  end_time: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  video_link?: string;
  meeting_link?: string;
  mentor: {
    display_name: string;
    avatar_url: string;
  };
  learner: {
    display_name: string;
    avatar_url: string;
  };
  courses?: {
    title: string;
  };
}

export const useSessions = () => {
  const { user, session } = useAuth();

  return useQuery({
    queryKey: ["sessions", user?.id],
    queryFn: async (): Promise<Session[]> => {
      if (!user || !session) return [];

      const response = await fetch(`${API_URL}/sessions/${user.id}`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch sessions");
      }
      return response.json();
    },
    enabled: !!user && !!session,
  });
};

export const useUpdateMeetingLink = () => {
  const { user, session } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ sessionId, meetingLink }: { sessionId: string, meetingLink: string }) => {
      if (!user || !session) throw new Error("Not authenticated");

      const response = await fetch(`${API_URL}/sessions/${sessionId}/link`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ meetingLink }),
      });

      if (!response.ok) {
        throw new Error("Failed to update meeting link");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions", user?.id] });
    },
  });
};

export const useUpdateSessionStatus = () => {
  const { user, session } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ sessionId, status }: { sessionId: string, status: Session['status'] }) => {
      if (!user || !session) throw new Error("Not authenticated");

      const response = await fetch(`${API_URL}/sessions/${sessionId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update session status");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions", user?.id] });
    },
  });
};
