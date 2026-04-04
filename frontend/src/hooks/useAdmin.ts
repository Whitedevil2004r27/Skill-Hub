import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export function useAdminStats() {
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      const { data } = await api.get("/admin/stats");
      return data;
    },
  });
}

export function useAdminUsers() {
  return useQuery({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      const { data } = await api.get("/admin/users");
      return data;
    },
  });
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, updates }: { userId: string; updates: any }) => {
      const { data } = await api.patch(`/admin/users/${userId}/status`, updates);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
}

export function useAdminCourses() {
  return useQuery({
    queryKey: ["admin", "courses"],
    queryFn: async () => {
      const { data } = await api.get("/courses"); 
      return data;
    },
  });
}

export function useAdminCourseActions() {
  const queryClient = useQueryClient();

  const createCourse = useMutation({
    mutationFn: async (courseData: any) => {
      const { data } = await api.post("/admin/courses", courseData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "courses"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });

  const updateCourse = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const { data } = await api.patch(`/admin/courses/${id}`, updates);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "courses"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });

  const deleteCourse = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/courses/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "courses"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });

  return { createCourse, updateCourse, deleteCourse };
}
