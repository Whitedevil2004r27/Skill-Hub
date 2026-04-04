import { supabase } from '../lib/supabase';

export class ReviewService {
  /**
   * Create a new mentor review
   */
  static async createReview(
    mentorId: string, 
    learnerId: string, 
    sessionId: string, 
    rating: number, 
    comment: string
  ) {
    const { data, error } = await supabase
      .from('mentor_reviews' as any)
      .insert({
        mentor_id: mentorId,
        learner_id: learnerId,
        session_id: sessionId,
        rating,
        comment,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Get all reviews for a mentor
   */
  static async getMentorReviews(mentorId: string) {
    const { data, error } = await supabase
      .from('mentor_reviews' as any)
      .select(`
        *,
        learner:profiles!learner_id (
          display_name,
          avatar_url
        )
      `)
      .eq('mentor_id', mentorId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  /**
   * Get mentor performance summary (average rating, total reviews)
   */
  static async getMentorPerformance(mentorId: string) {
    const { data, error } = await supabase
      .from('mentor_reviews' as any)
      .select('rating');

    if (error) throw error;

    const ratings = (data as any[]).map(r => r.rating);
    if (ratings.length === 0) return { average: 0, count: 0 };

    const average = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    return {
      average: Math.round(average * 10) / 10,
      count: ratings.length
    };
  }
}
