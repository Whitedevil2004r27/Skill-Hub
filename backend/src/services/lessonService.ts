import { supabase } from '../lib/supabase';

export class LessonService {
  /**
   * Update or create lesson progress for a user
   */
  static async updateProgress(userId: string, lessonId: string, completed: boolean, lastWatched: number = 0) {
    const { data, error } = await supabase
      .from('lesson_progress' as any)
      .upsert({
        user_id: userId,
        lesson_id: lessonId,
        completed,
        last_watched_second: lastWatched,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,lesson_id'
      })
      .select()
      .single();

    if (error) throw error;
    
    // Also update the overall enrollment progress if a lesson was completed
    if (completed) {
      await this.syncEnrollmentProgress(userId, lessonId);
    }

    return data;
  }

  /**
   * Sync the overall course progress in the enrollments table
   */
  private static async syncEnrollmentProgress(userId: string, lessonId: string) {
    try {
      // 1. Find the course_id for this lesson
      const { data: lesson, error: lError } = await supabase
        .from('lessons' as any)
        .select(`
          module_id,
          modules (course_id)
        `)
        .eq('id', lessonId)
        .single();
      
      if (lError || !lesson) return;
      const courseId = (lesson as any).modules.course_id;

      // 2. Count total lessons for this course
      const { count: totalLessons, error: tError } = await (supabase as any)
        .from('lessons')
        .select('id', { count: 'exact', head: true })
        .eq('module_id.modules.course_id', courseId); // This join might be tricky in Supabase RLS/Simple, better fetch modules first

      // Simplified: Just get the modules for the course, then count their lessons
      const { data: modules } = await supabase.from('modules' as any).select('id').eq('course_id', courseId);
      const mIds = (modules || []).map((m: any) => m.id);
      
      const { count: totalCount } = await supabase
        .from('lessons' as any)
        .select('id', { count: 'exact', head: true })
        .in('module_id', mIds);

      // 3. Count completed lessons for this user/course
      const { count: completedCount } = await supabase
        .from('lesson_progress' as any)
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('completed', true)
        .in('lesson_id', mIds); // Note: this requires lesson_id to be directly filterable or checked differently

      // Refined check for completed lessons in those modules
      const { data: progressData } = await supabase
        .from('lesson_progress' as any)
        .select(`
          lesson_id,
          lessons!inner(module_id)
        `)
        .eq('user_id', userId)
        .eq('completed', true)
        .in('lessons.module_id', mIds);

      const actualCompletedCount = progressData?.length || 0;

      if (totalCount && totalCount > 0) {
        const percentage = Math.round((actualCompletedCount / totalCount) * 100);
        
        await supabase
          .from('enrollments' as any)
          .update({ progress: percentage })
          .eq('user_id', userId)
          .eq('course_id', courseId);
      }
    } catch (err) {
      console.error('Error syncing enrollment progress:', err);
    }
  }

  /**
   * Get progress for all lessons in a course for a user
   */
  static async getCourseProgress(userId: string, courseId: string) {
    const { data: modules } = await supabase.from('modules' as any).select('id').eq('course_id', courseId);
    const mIds = (modules || []).map((m: any) => m.id);

    const { data, error } = await supabase
      .from('lesson_progress' as any)
      .select(`
        *,
        lessons!inner(module_id)
      `)
      .eq('user_id', userId)
      .in('lessons.module_id', mIds);

    if (error) throw error;
    return data;
  }
}
