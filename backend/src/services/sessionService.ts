import { supabase } from '../lib/supabase';

export interface Session {
  id: string;
  mentor_id: string;
  learner_id: string;
  course_id?: string;
  start_time: string;
  end_time: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  video_link?: string;
  meeting_id?: string;
  created_at: string;
  updated_at: string;
}

export class SessionService {
  /**
   * Get all sessions for a user (either as learner or mentor)
   */
  static async getUserSessions(userId: string) {
    const { data, error } = await supabase
      .from('sessions' as any)
      .select('*, courses(*), mentor:profiles!mentor_id(*), learner:profiles!learner_id(*)')
      .or(`mentor_id.eq."${userId}",learner_id.eq."${userId}"`)
      .order('start_time', { ascending: true });
    
    if (error) throw error;
    return data;
  }

  /**
   * Schedule a new session
   */
  static async createSession(session: Partial<Session>) {
    const { data, error } = await supabase
      .from('sessions' as any)
      .insert({
        ...session,
        status: 'scheduled',
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Update session status (e.g., confirm, complete, cancel)
   */
  static async updateStatus(sessionId: string, status: Session['status']) {
    const { data, error } = await supabase
      .from('sessions' as any)
      .update({ 
        status, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', sessionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Update session meeting link
   */
  static async updateMeetingLink(sessionId: string, meetingLink: string) {
    const { data, error } = await supabase
      .from('sessions' as any)
      .update({ 
        meeting_link: meetingLink, // Updated from video_link to meeting_link per migration
        updated_at: new Date().toISOString() 
      })
      .eq('id', sessionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Get upcoming sessions (next 7 days)
   */
  static async getUpcomingSessions(userId: string) {
    const now = new Date().toISOString();
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    const { data, error } = await supabase
      .from('sessions' as any)
      .select('*, courses(*), mentor:profiles!mentor_id(*), learner:profiles!learner_id(*)')
      .or(`mentor_id.eq."${userId}",learner_id.eq."${userId}"`)
      .gte('start_time', now)
      .lte('start_time', nextWeek.toISOString())
      .order('start_time', { ascending: true });

    if (error) throw error;
    return data;
  }
}
