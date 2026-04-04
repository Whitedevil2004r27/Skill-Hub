"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { 
  Plus, 
  GripVertical, 
  Trash2, 
  ChevronLeft, 
  Video, 
  FileText, 
  Save,
  Loader2,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SyllabusBuilder() {
  const { id: courseId } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isSaving, setIsSaving] = useState(false);

  // Fetch Course + Content
  const { data: course } = useQuery({
    queryKey: ["admin", "course", courseId],
    queryFn: async () => {
      const { data } = await api.get(`/courses/${courseId}`);
      return data;
    }
  });

  const { data: syllabus, isLoading } = useQuery({
    queryKey: ["admin", "course", courseId, "syllabus"],
    queryFn: async () => {
      const { data } = await api.get(`/courses/${courseId}/content`);
      return data;
    }
  });

  // Mutations
  const addModule = useMutation({
    mutationFn: async (title: string) => {
      const order_index = (syllabus?.length || 0) + 1;
      return api.post(`/admin/courses/${courseId}/modules`, { title, order_index });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "course", courseId, "syllabus"] });
      toast({ title: "Module Added" });
    }
  });

  const addLesson = useMutation({
    mutationFn: async ({ moduleId, title, type }: { moduleId: string, title: string, type: string }) => {
      // Find modules last lesson order
      const targetModule = syllabus.find((m: any) => m.id === moduleId);
      const order_index = (targetModule?.lessons?.length || 0) + 1;
      return api.post(`/admin/modules/${moduleId}/lessons`, { 
        title, 
        type, 
        order_index,
        content_url: type === "video" ? "https://www.youtube.com/embed/dQw4w9WgXcQ" : ""
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "course", courseId, "syllabus"] });
      toast({ title: "Lesson Added" });
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => router.back()}
          className="hover:bg-white/5"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Syllabus Builder</h1>
          <p className="text-zinc-500 font-medium">Editing: {course?.title}</p>
        </div>
      </div>

      <div className="max-w-4xl space-y-6">
        {syllabus?.map((module: any, mIdx: number) => (
          <Card key={module.id} className="bg-[#0F0F12] border-white/10 overflow-hidden group">
            <CardHeader className="flex flex-row items-center justify-between bg-white/[0.02] border-b border-white/5 py-4">
              <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-zinc-600 cursor-grab" />
                <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-2 py-0">
                  M{mIdx + 1}
                </Badge>
                <CardTitle className="text-base font-semibold">{module.title}</CardTitle>
              </div>
              <div className="flex items-center gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[#16161A] border-white/10 text-zinc-300">
                    <DropdownMenuItem 
                      className="hover:bg-white/5 cursor-pointer flex gap-2"
                      onClick={() => addLesson.mutate({ moduleId: module.id, title: "New Video Lesson", type: "video" })}
                    >
                      <Video className="w-4 h-4 text-blue-400" />
                      Add Video Lesson
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="hover:bg-white/5 cursor-pointer flex gap-2"
                      onClick={() => addLesson.mutate({ moduleId: module.id, title: "New Reading", type: "article" })}
                    >
                      <FileText className="w-4 h-4 text-emerald-400" />
                      Add Article
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-600 hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {module.lessons?.map((lesson: any, lIdx: number) => (
                  <div key={lesson.id} className="flex items-center justify-between p-4 pl-12 hover:bg-white/[0.01] group/lesson">
                    <div className="flex items-center gap-3">
                      {lesson.type === 'video' ? (
                        <Video className="w-4 h-4 text-zinc-500" />
                      ) : (
                        <FileText className="w-4 h-4 text-zinc-500" />
                      )}
                      <span className="text-sm font-medium text-zinc-300">{lesson.title}</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover/lesson:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-500 hover:text-white">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {(!module.lessons || module.lessons.length === 0) && (
                  <div className="p-8 text-center text-xs text-zinc-600 italic">
                    No lessons in this module yet.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        <Button 
          variant="outline" 
          className="w-full h-16 border-dashed border-white/10 bg-white/[0.02] hover:bg-white/[0.04] text-zinc-500 group"
          onClick={() => {
            const title = prompt("Enter Module Title:");
            if (title) addModule.mutate(title);
          }}
        >
          <div className="flex flex-col items-center">
            <Plus className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs uppercase tracking-widest font-semibold text-zinc-400">Add New Module</span>
          </div>
        </Button>
      </div>

      <div className="fixed bottom-10 right-10 flex gap-4">
        <Button className="bg-emerald-600 hover:bg-emerald-500 px-8 shadow-2xl shadow-emerald-900/20 flex items-center gap-2">
          <Save className="w-4 h-4" />
          Publish Changes
        </Button>
      </div>
    </div>
  );
}
