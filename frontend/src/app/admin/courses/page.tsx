"use client";

import { useAdminCourses, useAdminCourseActions } from "@/hooks/useAdmin";
import { 
  Plus, 
  Search, 
  BookOpen, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Layers, 
  ExternalLink,
  Clock,
  BarChart
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import Link from "next/link";

export default function CourseManagement() {
  const { data: courses, isLoading } = useAdminCourses();
  const { deleteCourse, createCourse } = useAdminCourseActions();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courses?.filter((course: any) => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course? All modules and lessons will be removed.")) return;
    
    try {
      await deleteCourse.mutateAsync(id);
      toast({ title: "Success", description: "Course deleted successfully." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete course.", variant: "destructive" });
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-64 bg-white/5 rounded-2xl border border-white/10" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Course Management</h1>
          <p className="text-zinc-500 mt-1">Create, edit, and organize your educational curriculum.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-500 px-6">
          <Plus className="w-4 h-4 mr-2" />
          Create New Course
        </Button>
      </div>

      <div className="relative w-full sm:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <Input 
          placeholder="Filter courses..." 
          className="pl-10 bg-[#0F0F12] border-white/10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses?.map((course: any) => (
          <Card key={course.id} className="bg-[#0F0F12] border-white/10 overflow-hidden group hover:border-blue-500/50 transition-all duration-300">
            <div className="aspect-video relative overflow-hidden bg-zinc-900 border-b border-white/10">
              {course.image ? (
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-zinc-800" />
                </div>
              )}
              <div className="absolute top-3 right-3 flex gap-2">
                <Badge className="bg-black/60 backdrop-blur-md border-white/10 text-xs uppercase tracking-wider">
                  {course.level}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="leading-tight text-lg group-hover:text-blue-400 transition-colors">
                  {course.title}
                </CardTitle>
              </div>
              <p className="text-sm text-zinc-500 line-clamp-2 mt-2">
                {course.description || "No description provided."}
              </p>
            </CardHeader>

            <CardContent className="pb-4">
              <div className="grid grid-cols-2 gap-4 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-blue-500" />
                  {course.duration || "Self-paced"}
                </div>
                <div className="flex items-center gap-2">
                  <BarChart className="w-3 h-3 text-emerald-500" />
                  {course.category}
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-4 border-t border-white/5 gap-2">
              <Button variant="outline" className="flex-1 border-white/10 bg-white/5 hover:bg-white/10 text-xs h-9">
                <Edit3 className="w-3 h-3 mr-2" />
                Edit Profile
              </Button>
              <Link href={`/admin/courses/${course.id}/syllabus`} className="flex-1">
                <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-xs h-9">
                  <Layers className="w-3 h-3 mr-2" />
                  Syllabus
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9 text-zinc-600 hover:text-red-500 hover:bg-red-500/10"
                onClick={() => handleDelete(course.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredCourses?.length === 0 && (
        <div className="py-24 flex flex-col items-center justify-center text-center space-y-4 rounded-3xl bg-white/[0.02] border border-dashed border-white/10">
          <BookOpen className="w-12 h-12 text-zinc-700" />
          <div>
            <h3 className="font-semibold text-xl">No courses found</h3>
            <p className="text-zinc-500">Try adjusting your filters or create a new course to get started.</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-500">
            <Plus className="w-4 h-4 mr-2" />
            Add First Course
          </Button>
        </div>
      )}
    </div>
  );
}
