import { supabase } from '../lib/supabase';

export class CourseService {
  static async getAllCourses() {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      return [];
    }
  }

  static async getCourseById(id: string) {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error fetching course ${id}:`, error);
      return null;
    }
  }

  static async getCourseContent(courseId: string) {
    try {
      const { data, error } = await supabase
        .from('modules' as any)
        .select(`
          *,
          lessons (
            *
          )
        `)
        .eq('course_id', courseId)
        .order('order_index', { ascending: true })
        .order('order_index', { foreignTable: 'lessons', ascending: true });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error fetching content for course ${courseId}:`, error);
      return [];
    }
  }

  // Admin CRUD Operations
  static async createCourse(courseData: any) {
    const { data, error } = await supabase
      .from('courses')
      .insert([courseData])
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async updateCourse(id: string, updates: any) {
    const { data, error } = await supabase
      .from('courses')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async deleteCourse(id: string) {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  }

  static async upsertModule(moduleData: any) {
    const { data, error } = await supabase
      .from('modules' as any)
      .upsert(moduleData)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async upsertLesson(lessonData: any) {
    const { data, error } = await supabase
      .from('lessons' as any)
      .upsert(lessonData)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}
