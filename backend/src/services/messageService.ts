import { supabase } from '../lib/supabase';

export interface Message {
  id: string;
  created_at: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  session_id?: string;
  is_read: boolean;
}

export class MessageService {
  /**
   * Send a new message
   */
  static async sendMessage(message: Partial<Message>) {
    const { data, error } = await supabase
      .from('messages' as any)
      .insert({
        ...message,
        is_read: false,
        created_at: new Date().toISOString()
      })
      .select('*, sender:profiles!sender_id(*), receiver:profiles!receiver_id(*)')
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Get conversation history between two users
   */
  static async getConversation(userId1: string, userId2: string) {
    const { data, error } = await supabase
      .from('messages' as any)
      .select('*, sender:profiles!sender_id(*), receiver:profiles!receiver_id(*)')
      .or(`and(sender_id.eq.${userId1},receiver_id.eq.${userId2}),and(sender_id.eq.${userId2},receiver_id.eq.${userId1})`)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  }

  /**
   * Mark messages as read
   */
  static async markAsRead(messageIds: string[], receiverId: string) {
    const { data, error } = await supabase
      .from('messages' as any)
      .update({ is_read: true })
      .in('id', messageIds)
      .eq('receiver_id', receiverId)
      .select();

    if (error) throw error;
    return data;
  }

  /**
   * Get unread message count for a user
   */
  static async getUnreadCount(userId: string) {
    const { count, error } = await supabase
      .from('messages' as any)
      .select('*', { count: 'exact', head: true })
      .eq('receiver_id', userId)
      .eq('is_read', false);

    if (error) throw error;
    return count || 0;
  }

  /**
   * Get latest conversations (inbox view)
   * This is a bit more complex, usually requires a custom RPC or complex query
   * For now, we'll fetch recent messages and group them manually on frontend if needed,
   * or implement a basic version.
   */
  static async getRecentChats(userId: string) {
    // This query gets messages where the user is involved
    const { data, error } = await supabase
      .from('messages' as any)
      .select('*, sender:profiles!sender_id(*), receiver:profiles!receiver_id(*)')
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}
