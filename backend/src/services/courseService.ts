import { supabase } from '../lib/supabase';

const mockCourses = [
  {
    id: "c1",
    title: "Mastering React & Framer Motion",
    instructor: "Sarah Chen",
    description: "Learn to build high-performance, animated web applications with industry-standard tools.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    category: "Web Development",
    level: "Intermediate",
    duration: "12 hours",
    rating: 4.9
  },
  {
    id: "c2",
    title: "Product Strategy for Engineers",
    instructor: "Marcus Johnson",
    description: "Bridge the gap between engineering and product to build better features faster.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    category: "Product",
    level: "Beginner",
    duration: "8 hours",
    rating: 4.8
  },
  {
    id: "c3",
    title: "Advanced System Design",
    instructor: "David Kim",
    description: "Deep dive into distributed systems, scalability, and high-availability architecture.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    category: "System Design",
    level: "Advanced",
    duration: "20 hours",
    rating: 5.0
  }
];

export class CourseService {
  static async getAllCourses() {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;

      if (!data || data.length === 0) {
        return mockCourses;
      }

      return data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      return mockCourses;
    }
  }


  static async getCourseById(id: string) {
    try {
      const mock = mockCourses.find(c => c.id === id);
      if (mock) return mock;

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
