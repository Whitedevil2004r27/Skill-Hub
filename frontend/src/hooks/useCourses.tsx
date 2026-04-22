"use client";

import { useQuery } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface Course {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  level: string;
  price: string;
  category: string;
  image: string;
  description: string;
}

export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async (): Promise<Course[]> => {
      const response = await fetch(`${API_URL}/courses`);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      return response.json();
    },
  });
};

export const useCourse = (id: string) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: async (): Promise<Course> => {
      const response = await fetch(`${API_URL}/courses/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch course details");
      }
      return response.json();
    },
    enabled: !!id,
  });
};

