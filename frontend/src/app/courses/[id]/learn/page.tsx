"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  useCourseContent, 
  useCourseProgress, 
  useUpdateLessonProgress,
  Module,
  Lesson 
} from "@/hooks/useLessons";
import { Header } from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  CheckCircle2, 
  Circle, 
  PlayCircle, 
  ChevronRight, 
  ChevronDown, 
  Info,
  ArrowLeft,
  Settings,
  MoreVertical,
  SkipForward,
  SkipBack
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CoursePlayerPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: content, isLoading: contentLoading } = useCourseContent(id as string);
  const { data: progress, isLoading: progressLoading } = useCourseProgress(id as string);
  const { mutate: updateProgress } = useUpdateLessonProgress();

  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  // Set initial active lesson
  useEffect(() => {
    if (content && content.length > 0 && !activeLesson) {
      // Find first incomplete lesson or just first lesson
      let found = false;
      for (const m of content) {
        for (const l of m.lessons) {
          const isDone = progress?.some(p => p.lesson_id === l.id && p.completed);
          if (!isDone && !found) {
            setActiveLesson(l);
            setExpandedModules(prev => ({ ...prev, [m.id]: true }));
            found = true;
          }
        }
      }
      if (!found) {
        setActiveLesson(content[0].lessons[0]);
        setExpandedModules(prev => ({ ...prev, [content[0].id]: true }));
      }
    }
  }, [content, progress, activeLesson]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const isCompleted = (lessonId: string) => {
    return progress?.some(p => p.lesson_id === lessonId && p.completed);
  };

  const handleComplete = () => {
    if (activeLesson) {
      updateProgress({ lessonId: activeLesson.id, completed: true });
    }
  };

  // Convert YouTube URL to Embed URL
  const getEmbedUrl = (url?: string) => {
    if (!url) return "";
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    return url;
  };

  if (contentLoading || progressLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-white/40 text-sm animate-pulse">Initializing Course Player...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col lg:flex-row pt-16 overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Video Player Section */}
          <div className="w-full aspect-video bg-black relative group">
            {activeLesson?.video_url ? (
              <iframe 
                src={`${getEmbedUrl(activeLesson.video_url)}?autoplay=0&rel=0&modestbranding=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/20">
                <div className="text-center">
                  <PlayCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Lesson content not available</p>
                </div>
              </div>
            )}
            
            {/* Player Controls overlay - Placeholder for custom UI */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <SkipBack className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <PlayCircle className="w-6 h-6" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <SkipForward className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Lesson Details */}
          <div className="p-8 max-w-4xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Badge variant="outline" className="mb-2 text-blue-400 border-blue-400/30 bg-blue-400/5">
                  Now Playing
                </Badge>
                <h1 className="text-3xl font-bold text-white tracking-tight leading-none">
                  {activeLesson?.title || "Select a lesson"}
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  onClick={handleComplete}
                  disabled={isCompleted(activeLesson?.id || "")}
                  className={cn(
                    "rounded-full px-6 transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]",
                    isCompleted(activeLesson?.id || "") 
                    ? "bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                  )}
                >
                  {isCompleted(activeLesson?.id || "") ? (
                    <><CheckCircle2 className="w-4 h-4 mr-2" /> Completed</>
                  ) : "Mark as Finished"}
                </Button>
              </div>
            </div>

            <div className="space-y-6 text-white/70 leading-relaxed">
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-4">
                <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">Lesson Overview</h4>
                  <p className="text-sm">
                    {activeLesson?.content || "No description provided for this lesson. Please follow along with the video for the complete tutorial."}
                  </p>
                </div>
              </div>
              
              <div className="h-px bg-white/5 w-full" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Key Takeaways
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      Setting up a professional environment
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      Best practices for scalable code
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      Troubleshooting common errors
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Settings className="w-4 h-4 text-purple-400" />
                    Resources
                  </h3>
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-xs h-10 hover:bg-white/5 border border-white/10">
                      Lesson-Notes.pdf
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-xs h-10 hover:bg-white/5 border border-white/10">
                      GitHub Roadmap
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Syllabus Sidebar */}
        <div className="w-full lg:w-96 bg-[#0E0E10] border-l border-white/5 flex flex-col">
          <div className="p-6 border-b border-white/5">
            <Button 
              variant="ghost" 
              className="px-0 hover:bg-transparent text-white/40 hover:text-white mb-2"
              onClick={() => router.push('/dashboard')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h2 className="text-xl font-bold text-white tracking-tight">Course Content</h2>
            <div className="mt-4 flex items-center gap-2">
               <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                 <div 
                   className="h-full bg-blue-500 transition-all shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                   style={{ width: `${progress ? Math.round((progress.filter(p => p.completed).length / (content?.flatMap(m => m.lessons).length || 1)) * 100) : 0}%` }}
                 />
               </div>
               <span className="text-[10px] text-white/40 font-mono">
                 {progress?.filter(p => p.completed).length || 0}/{(content?.flatMap(m => m.lessons).length || 1)} Done
               </span>
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="divide-y divide-white/5">
              {content?.map((module, mIdx) => (
                <div key={module.id} className="p-0">
                  <button 
                    onClick={() => toggleModule(module.id)}
                    className="w-full p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Module {mIdx + 1}</span>
                      <span className="text-sm font-semibold text-white/80">{module.title}</span>
                    </div>
                    {expandedModules[module.id] ? <ChevronDown className="w-4 h-4 text-white/40" /> : <ChevronRight className="w-4 h-4 text-white/40" />}
                  </button>
                  
                  {expandedModules[module.id] && (
                    <div className="pb-4">
                      {module.lessons.map((lesson, lIdx) => (
                        <button 
                          key={lesson.id}
                          onClick={() => setActiveLesson(lesson)}
                          className={cn(
                            "w-full px-6 py-3 flex items-center gap-4 hover:bg-white/[0.03] transition-all group",
                            activeLesson?.id === lesson.id && "bg-blue-500/10 border-l-2 border-blue-500"
                          )}
                        >
                          <div className="relative">
                            {isCompleted(lesson.id) ? (
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            ) : (
                              <Circle className="w-5 h-5 text-white/20 group-hover:text-white/40" />
                            )}
                            {activeLesson?.id === lesson.id && (
                               <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-full animate-pulse" />
                            )}
                          </div>
                          <div className="flex-1 text-left min-w-0">
                             <p className={cn(
                               "text-xs font-medium truncate",
                               activeLesson?.id === lesson.id ? "text-blue-400" : "text-white/60"
                             )}>
                               {lIdx + 1}. {lesson.title}
                             </p>
                             <span className="text-[10px] text-white/30">{lesson.duration || "5:00"}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
