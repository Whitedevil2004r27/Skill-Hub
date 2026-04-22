"use client";

import { useParams, useRouter } from "next/navigation";
import { useCourse } from "@/hooks/useCourses";
import { useCourseContent } from "@/hooks/useLessons";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  Users, 
  Star, 
  CheckCircle2, 
  PlayCircle, 
  BookOpen, 
  Award, 
  BarChart, 
  ArrowLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import Magnet from "@/components/animations/Magnet";
import BackgroundCanvas from "@/components/animations/BackgroundCanvas";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: course, isLoading: courseLoading } = useCourse(id as string);
  const { data: content, isLoading: contentLoading } = useCourseContent(id as string);

  if (courseLoading || contentLoading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
          <p className="text-white/40 text-sm animate-pulse">Loading Course Details...</p>
        </div>
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="min-h-screen bg-[#030303]">
      <Header />
      <BackgroundCanvas />
      
      <main className="pt-24 pb-16 relative z-10">
        {/* Breadcrumbs & Back */}
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <Button 
            variant="ghost" 
            className="text-gray-400 hover:text-white pl-0"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Badge className="bg-violet-500/20 text-violet-400 border-violet-500/30">
                  {course.category}
                </Badge>
                <Badge variant="outline" className="text-gray-400 border-white/10">
                  {course.level}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-none">
                {course.title}
              </h1>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                {course.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 mb-10 text-gray-300">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold">{course.rating}</span>
                  <span className="text-gray-500 text-sm">(1.2k reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span>{course.students.toLocaleString()} Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructor}`} alt={course.instructor} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Instructor</p>
                  <p className="text-white font-medium">{course.instructor}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:scale-110 transition-transform cursor-pointer group/play">
                    <PlayCircle className="w-10 h-10 text-white group-hover/play:text-violet-400 transition-colors" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Tabs / Info */}
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* What you'll learn */}
            <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-violet-400" />
                What you'll learn
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Master the core concepts and advanced techniques",
                  "Build real-world projects for your portfolio",
                  "Understand industry-standard best practices",
                  "Leverage modern tools and workflows",
                  "Solve complex problems with architectural patterns",
                  "Collaborate with other developers in the community"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 pl-4">
                <BookOpen className="w-6 h-6 text-blue-400" />
                Course Curriculum
              </h2>
              <div className="space-y-4">
                {content?.map((module, i) => (
                  <div key={module.id} className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xs font-bold text-gray-500 group-hover:text-white transition-colors">
                          {i + 1}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{module.title}</h3>
                          <p className="text-xs text-gray-500">{module.lessons.length} lessons • 45m</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing / Enrollment Sidebar */}
          <div className="space-y-6">
            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl sticky top-28">
              <div className="mb-8">
                <div className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-widest">Lifetime Access</div>
                <div className="text-5xl font-bold text-white mb-2">{course.price}</div>
                <div className="text-xs text-gray-500 line-through">$199.00 • 80% OFF</div>
              </div>

              <div className="space-y-4 mb-8">
                <Magnet>
                  <Button 
                    className="w-full h-16 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(139,92,246,0.3)]"
                    onClick={() => router.push(`/courses/${id}/learn`)}
                  >
                    Enroll Now
                  </Button>
                </Magnet>
                <Button variant="outline" className="w-full h-16 border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-2xl font-bold">
                  Add to Wishlist
                </Button>
              </div>

              <div className="space-y-4 border-t border-white/5 pt-8">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <BarChart className="w-4 h-4 text-violet-400" />
                  Full lifetime access
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Award className="w-4 h-4 text-blue-400" />
                  Certificate of completion
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  Free project assets
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
