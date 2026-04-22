"use client";

import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:3001/api';

export interface Mentor {
  id: number;
  name: string;
  title: string;
  company: string;
  avatar: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  location: string;
  skills: string[];
  availability: string;
  bio: string;
}

export const useMentors = () => {
  return useQuery({
    queryKey: ["mentors"],
    queryFn: async (): Promise<Mentor[]> => {
      const response = await fetch(`${API_URL}/mentors`);
      if (!response.ok) {
        throw new Error("Failed to fetch mentors");
      }
      return response.json();
    },
  });
};

export const useMentor = (id: string) => {
  return useQuery({
    queryKey: ["mentor", id],
    queryFn: async (): Promise<Mentor> => {
      const response = await fetch(`${API_URL}/mentors/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch mentor details");
      }
      return response.json();
    },
    enabled: !!id,
  });
};

