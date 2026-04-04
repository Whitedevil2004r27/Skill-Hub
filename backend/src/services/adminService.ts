import { supabase } from '../lib/supabase';

export class AdminService {
  /**
   * Get high-level platform statistics
   */
  static async getPlatformStats() {
    try {
      const [
        { count: totalUsers },
        { count: totalMentors },
        { count: totalCourses },
        { count: totalEnrollments }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'mentor'),
        supabase.from('courses').select('*', { count: 'exact', head: true }),
        supabase.from('enrollments' as any).select('*', { count: 'exact', head: true })
      ]);

      return {
        totalUsers: totalUsers || 0,
        totalMentors: totalMentors || 0,
        totalCourses: totalCourses || 0,
        totalEnrollments: totalEnrollments || 0
      };
    } catch (error) {
      console.error('Error fetching platform stats:', error);
      throw error;
    }
  }

  /**
   * Fetch all users in the system (Admin only)
   */
  static async getAllUsers() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  /**
   * Update a user's role or admin status
   */
  static async updateUserStatus(userId: string, updates: { role?: string, is_admin?: boolean }) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
