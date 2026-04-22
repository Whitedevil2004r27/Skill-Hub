"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

const API_URL = 'http://localhost:3001/api';

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  status: 'active' | 'completed' | 'dropped';
  progress: number;
  courses: {
    id: string;
    title: string;
    instructor: string;
    image: string;
    category: string;
  };
}

export const useEnrollments = () => {
  const { user, session } = useAuth();

  return useQuery({
    queryKey: ["enrollments", user?.id],
    queryFn: async (): Promise<Enrollment[]> => {
      if (!user || !session) return [];

      const response = await fetch(`${API_URL}/enrollments/${user.id}`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch enrollments");
      }
      return response.json();
    },
    enabled: !!user && !!session,
  });
};
