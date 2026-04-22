"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminCourseActions } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Sparkles, Image as ImageIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function NewCoursePage() {
  const router = useRouter();
  const { createCourse } = useAdminCourseActions();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    instructor: "",
    description: "",
    image: "",
    category: "Web Development",
    level: "Beginner",
    duration: "",
    price: "$0.00"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await createCourse.mutateAsync(formData);
      toast({
        title: "Course Created",
        description: "Your new course has been successfully initialized.",
      });
      router.push(`/admin/courses/${result.id}/syllabus`);
    } catch (error: any) {
      toast({
        title: "Creation Failed",
        description: error.message || "An error occurred while creating the course.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => router.back()}
          className="text-zinc-500 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Course</h1>
          <p className="text-zinc-500 mt-1">Start by defining the core details of your educational program.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-[#0F0F12] border-white/10">
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form id="course-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Course Title</label>
                  <Input 
                    placeholder="e.g. Advanced React Architecture" 
                    className="bg-black/20 border-white/10 h-12"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Instructor Name</label>
                    <Input 
                      placeholder="e.g. Jane Doe" 
                      className="bg-black/20 border-white/10 h-12"
                      value={formData.instructor}
                      onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Price</label>
                    <Input 
                      placeholder="e.g. $49.99" 
                      className="bg-black/20 border-white/10 h-12"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Description</label>
                  <Textarea 
                    placeholder="Describe what students will learn..." 
                    className="bg-black/20 border-white/10 min-h-[150px] resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Category</label>
                    <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                      <SelectTrigger className="bg-black/20 border-white/10 h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["Web Development", "Design", "Data Science", "Mobile Development", "DevOps", "Security"].map(c => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Difficulty Level</label>
                    <Select value={formData.level} onValueChange={(v) => setFormData({...formData, level: v})}>
                      <SelectTrigger className="bg-black/20 border-white/10 h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["Beginner", "Intermediate", "Advanced"].map(l => (
                          <SelectItem key={l} value={l}>{l}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Estimated Duration</label>
                    <Input 
                      placeholder="e.g. 12 hours" 
                      className="bg-black/20 border-white/10 h-12"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="bg-[#0F0F12] border-white/10 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-sm">Course Cover Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video rounded-xl bg-zinc-900 border border-dashed border-white/10 flex flex-col items-center justify-center text-zinc-600 group hover:border-blue-500/50 transition-colors">
                {formData.image ? (
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <>
                    <ImageIcon className="w-8 h-8 mb-2" />
                    <p className="text-xs">Image Preview</p>
                  </>
                )}
              </div>
              <Input 
                placeholder="Paste image URL here..." 
                className="bg-black/20 border-white/10"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
              />
              <p className="text-[10px] text-zinc-500">Provide a URL for the course thumbnail (Recommended 16:9 ratio).</p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Button 
              form="course-form"
              disabled={loading}
              className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold shadow-lg shadow-blue-900/20"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save & Continue
                </>
              )}
            </Button>
            <Button 
              variant="ghost" 
              className="w-full h-14 text-zinc-500 hover:text-white rounded-2xl"
              onClick={() => router.back()}
            >
              Discard Draft
            </Button>
          </div>

          <div className="p-6 rounded-[2rem] bg-blue-500/5 border border-blue-500/10">
            <div className="flex items-center gap-2 text-blue-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <h4 className="text-sm font-bold">Pro Tip</h4>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Use a high-quality cover image to increase student enrollment by up to 40%. You can always update these details later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
