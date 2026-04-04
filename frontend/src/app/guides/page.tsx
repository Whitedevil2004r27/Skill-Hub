"use client";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { BookOpen, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GuidesPage() {
  const guides = [
    {
      title: "The Ultimate Guide to Networking on SkillHub",
      time: "15 min read",
      rating: "4.9",
      tags: ["Beginner", "Networking"],
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "How to Build a World-Class Portfolio from Scratch",
      time: "25 min read",
      rating: "5.0",
      tags: ["Career", "Design"],
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Negotiating Your Next Salary: Expert Tactics",
      time: "20 min read",
      rating: "4.8",
      tags: ["Advanced", "Finance"],
      color: "from-emerald-500/20 to-teal-500/20"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <section className="pt-24 pb-32 px-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] -z-10"></div>
           <div className="max-w-7xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-sm font-semibold mb-8 tracking-widest leading-tight">
                 <BookOpen className="w-4 h-4 mr-2" />
                 Learning Path Optimization
              </div>
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-tight">
                 Guided <br /><span className="text-emerald-400">Excellence.</span>
              </h1>
              <p className="text-xl text-white/50 max-w-3xl mx-auto leading-relaxed text-justify px-3">
                 Expert-authored, field-tested guides to help you navigate every stage of your professional career journey.
              </p>
           </div>
        </section>

        {/* Guides Grid */}
        <section className="py-16 px-6 relative">
          <div className="max-w-7xl mx-auto">
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center items-center">
                {guides.map((g, i) => (
                   <div key={i} className="group relative glass-card p-1 items-center rounded-[32px] border border-white/5 hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden p-3 shadow-xl">
                      <div className={`aspect-[16/10] rounded-[24px] bg-gradient-to-br ${g.color} mb-8 flex items-center justify-center border border-white/5 group-hover:scale-95 transition-transform duration-500`}>
                         <BookOpen className="w-16 h-16 text-white/20" />
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4 justify-center items-center">
                         {g.tags.map((t, j) => (
                           <span key={j} className="text-[10px] font-bold uppercase tracking-widest text-white/40 border border-white/10 px-2 py-0.5 rounded-md">
                             {t}
                           </span>
                         ))}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-emerald-400 transition-colors duration-300 px-6 line-clamp-2 uppercase tracking-widest leading-tight">{g.title}</h3>
                      <div className="flex items-center justify-between text-xs text-white/50 px-8 py-6 border-t border-white/5 bg-white/[0.02]">
                         <div className="flex items-center tracking-normal"><Clock className="w-4 h-4 mr-2 text-emerald-500" /> {g.time}</div>
                         <div className="flex items-center tracking-normal"><Star className="w-4 h-4 mr-2 text-yellow-500 fill-yellow-500" /> {g.rating}</div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </section>

        {/* Expert Call to Action */}
        <section className="py-32 px-6">
           <div className="max-w-5xl mx-auto glass p-12 md:p-24 rounded-[60px] text-center border-white/10 relative shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 uppercase tracking-widest leading-tight">Think you can write a better one?</h2>
              <p className="text-white/50 text-xl mb-12 max-w-xl mx-auto text-justify px-3">We're always looking for experts to share their tactical frameworks with our community.</p>
              <Button size="xl" className="bg-emerald-500 text-white hover:bg-emerald-600 px-12 py-8 text-lg font-black rounded-3xl shadow-emerald-glow">
                 Become a Contributor
              </Button>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
