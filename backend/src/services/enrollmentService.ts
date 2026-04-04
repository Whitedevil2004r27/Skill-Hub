import { supabase } from '../lib/supabase';

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  status: 'active' | 'completed' | 'dropped';
  progress: number;
  created_at: string;
  updated_at: string;
}

export class EnrollmentService {
  static async getEnrollmentsByUserId(userId: string) {
    const { data, error } = await supabase
      .from('enrollments' as any)
      .select('*, courses(*)')
      .eq('user_id', userId);
    
    if (error) throw error;
    return data;
  }

  static async enrollUserInCourse(userId: string, courseId: string) {
    const { data, error } = await supabase
      .from('enrollments' as any)
      .upsert({
        user_id: userId,
        course_id: courseId,
        status: 'active',
        progress: 0,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id,course_id' })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateProgress(userId: string, courseId: string, progress: number) {
    const { data, error } = await supabase
      .from('enrollments' as any)
      .update({ 
        progress,
        status: progress === 100 ? 'completed' : 'active',
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
