"use client";

import { useParams, useRouter } from "next/navigation";
import { useMentor } from "@/hooks/useMentors";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Star, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Globe, 
  ShieldCheck, 
  MessageSquare, 
  Clock,
  ArrowLeft,
  Zap,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";
import Magnet from "@/components/animations/Magnet";
import BackgroundCanvas from "@/components/animations/BackgroundCanvas";

export default function MentorProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: mentor, isLoading } = useMentor(id as string);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!mentor) return null;

  return (
    <div className="min-h-screen bg-[#030303]">
      <Header />
      <BackgroundCanvas />
      
      <main className="pt-24 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            className="text-gray-400 hover:text-white mb-8 pl-0"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Explore
          </Button>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column: Profile Info */}
            <div className="lg:col-span-2 space-y-8">
              <section className="p-8 md:p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-[80px] -z-10" />
                
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-white/10">
                    <AvatarImage src={mentor.avatar} alt={mentor.name} />
                    <AvatarFallback className="text-4xl bg-violet-600/20 text-violet-400">
                      {mentor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h1 className="text-4xl font-bold text-white tracking-tight">{mentor.name}</h1>
                      <Badge className="bg-green-500/10 text-green-400 border-green-500/20 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Verified Mentor
                      </Badge>
                    </div>
                    <p className="text-xl text-violet-400 font-medium mb-4">{mentor.title} at {mentor.company}</p>
                    
                    <div className="flex flex-wrap gap-6 text-gray-400 text-sm mb-6">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-white font-bold">{mentor.rating}</span>
                        <span>({mentor.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {mentor.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        English, Spanish
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {mentor.skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="bg-white/5 text-gray-300 border-white/5">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className="p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6">About Me</h2>
                <p className="text-gray-400 leading-relaxed text-lg">
                  {mentor.bio || "I am a passionate technologist with over 10 years of experience in building scalable web applications. My goal is to help the next generation of developers master the craft of software engineering and product thinking."}
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mt-12">
                  <div>
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-blue-400" />
                      Experience
                    </h3>
                    <div className="space-y-4">
                      <div className="border-l-2 border-white/5 pl-4 py-1">
                        <p className="text-white font-medium">Senior Software Engineer</p>
                        <p className="text-sm text-gray-500">Google • 2020 - Present</p>
                      </div>
                      <div className="border-l-2 border-white/5 pl-4 py-1">
                        <p className="text-white font-medium">Full Stack Developer</p>
                        <p className="text-sm text-gray-500">Meta • 2017 - 2020</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      What I can help with
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                        System Design Interviews
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                        Frontend Architecture
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                        Career Path Planning
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column: Booking Card */}
            <div className="space-y-6">
              <div className="p-8 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-2xl sticky top-28">
                <div className="mb-8">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-bold text-white">${mentor.hourlyRate}</span>
                    <span className="text-gray-400">/hour</span>
                  </div>
                  <p className="text-sm text-gray-500">Includes preparation and session notes</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between text-sm text-gray-400 p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Next Availability
                    </div>
                    <span className="text-white font-medium">{mentor.availability}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400 p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Typical Response
                    </div>
                    <span className="text-white font-medium">~2 hours</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Magnet>
                    <Button className="w-full h-16 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(139,92,246,0.3)] group">
                      <Zap className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      Book a Session
                    </Button>
                  </Magnet>
                  <Button variant="outline" className="w-full h-16 border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-2xl font-bold flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Send Message
                  </Button>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-4">Trusted by 200+ students</p>
                  <div className="flex justify-center -space-x-3">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Avatar key={i} className="w-8 h-8 border-2 border-gray-900">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} />
                      </Avatar>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
