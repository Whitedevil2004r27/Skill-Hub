import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './useAuth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  video_url?: string;
  content?: string;
  duration?: string;
  order_index: number;
}

export interface Module {
  id: string;
  course_id: number;
  title: string;
  order_index: number;
  lessons: Lesson[];
}

export interface LessonProgress {
  lesson_id: string;
  completed: boolean;
  last_watched_second: number;
}

export function useCourseContent(courseId: string) {
  return useQuery<Module[]>({
    queryKey: ['course-content', courseId],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/courses/${courseId}/content`);
      if (!response.ok) throw new Error('Failed to fetch course content');
      return response.json();
    },
    enabled: !!courseId,
  });
}

export function useCourseProgress(courseId: string) {
  const { session } = useAuth();
  
  return useQuery<LessonProgress[]>({
    queryKey: ['course-progress', courseId, session?.user.id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/lessons/${courseId}/progress`, {
        headers: {
          'Authorization': `Bearer ${session?.access_token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch course progress');
      return response.json();
    },
    enabled: !!courseId && !!session,
  });
}

export function useUpdateLessonProgress() {
  const { session } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ lessonId, completed, lastWatched }: { lessonId: string, completed: boolean, lastWatched?: number }) => {
      const response = await fetch(`${API_URL}/lessons/${lessonId}/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ completed, lastWatched }),
      });
      if (!response.ok) throw new Error('Failed to update progress');
      return response.json();
    },
    onSuccess: (_, variables) => {
      // Invalidate both progress and enrollments to reflect changes globally
      queryClient.invalidateQueries({ queryKey: ['course-progress'] });
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
    },
  });
}
