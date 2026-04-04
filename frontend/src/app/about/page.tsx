"use client";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Scale, Target, Sparkles, UserCheck } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const values = [
    { title: "Empowerment", description: "Providing tools and connections for everyone to reach their potential.", icon: Sparkles },
    { title: "Integrity", description: "Building trust through transparent and high-quality mentorship matching.", icon: Scale },
    { title: "Innovation", description: "Using AI to break down barriers in personalized education.", icon: Target },
    { title: "Human Centric", description: "Technology serves the person, not the other way around.", icon: UserCheck },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        {/* Page Hero */}
        <div className="relative pt-20 pb-12 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
             <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-purple-400 text-sm mb-6 animate-fade-in">
               <Sparkles className="w-4 h-4" />
               <span>Our Mission</span>
             </div>
             <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter">
               Democratizing <br /> <span className="text-purple-500">Expertise.</span>
             </h1>
             <p className="text-xl text-white/60 max-w-3xl leading-relaxed">
               SkillHub was born from a simple realization: the most valuable knowledge isn't in textbooks, it's in the heads of experts. We built the platform to bridge that gap.
             </p>
          </div>
        </div>

        {/* Values Grid */}
        <section className="py-24 px-6 bg-white/[0.02]">
           <div className="max-w-7xl mx-auto">
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
               {values.map((v, i) => (
                 <div key={i} className="group text-center items-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/10 mx-auto">
                      <v.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-wide leading-tight px-3">{v.title}</h3>
                    <p className="text-white/50 leading-relaxed text-justify px-3">{v.description}</p>
                 </div>
               ))}
             </div>
           </div>
        </section>

        {/* Story Section */}
        <section className="py-32 px-6">
           <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
             <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary rounded-[40px] blur-[100px] opacity-20 -z-10"></div>
                <div className="aspect-square rounded-[40px] border border-white/10 bg-white/5 p-4 relative overflow-hidden shadow-2xl">
                   <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" alt="Team collaborating" fill className="object-cover opacity-60" />
                </div>
             </div>
             <div>
                <h2 className="text-4xl font-bold text-white mb-8 tracking-tighter leading-tight">The SkillHub Story</h2>
                <div className="space-y-6 text-white/60 text-lg leading-relaxed text-justify px-3">
                   <p>In 2023, we saw millions of students struggling with outdated curricula while industry experts remained isolated in their silos. We imagined a world where anyone could learn directly from the best minds in the business.</p>
                   <p>What started as a small community of developers has grown into a global ecosystem of creative, technical, and business leaders helping the next generation win.</p>
                   <p>Today, we use cutting-edge AI to match learners with the perfect mentors, cutting down the "time-to-expertise" by up to 70%.</p>
                </div>
             </div>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
