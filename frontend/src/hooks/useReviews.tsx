import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './useAuth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface Review {
  id: string;
  mentor_id: string;
  learner_id: string;
  session_id: string;
  rating: number;
  comment: string;
  created_at: string;
  learner?: {
    display_name: string;
    avatar_url?: string;
  };
}

export interface MentorPerformance {
  average: number;
  count: number;
}

export interface ReviewResponse {
  reviews: Review[];
  performance: MentorPerformance;
}

export function useMentorReviews(mentorId: string) {
  return useQuery<ReviewResponse>({
    queryKey: ['mentor-reviews', mentorId],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/reviews/mentor/${mentorId}`);
      if (!response.ok) throw new Error('Failed to fetch mentor reviews');
      return response.json();
    },
    enabled: !!mentorId,
  });
}

export function useCreateReview() {
  const { session } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ mentorId, sessionId, rating, comment }: { mentorId: string, sessionId: string, rating: number, comment: string }) => {
      const response = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ mentorId, sessionId, rating, comment }),
      });
      if (!response.ok) throw new Error('Failed to submit review');
      return response.json();
    },
    onSuccess: (_, variables) => {
      // Invalidate the reviews for this specific mentor
      queryClient.invalidateQueries({ queryKey: ['mentor-reviews', variables.mentorId] });
      // Also potentially invalidate the mentor details if they include average rating
      queryClient.invalidateQueries({ queryKey: ['mentor', variables.mentorId] });
      queryClient.invalidateQueries({ queryKey: ['mentors'] });
    },
  });
}
