"use client";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Rocket, Wallet, Heart, Zap, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CareersPage() {
  const perks = [
    { title: "Remote-First", description: "Work from anywhere in the world. We believe in results, not desks.", icon: MapPin },
    { title: "Equity Options", description: "Every employee is an owner. We grow together.", icon: Wallet },
    { title: "Health & Wellness", description: "Comprehensive health, dental, and vision for you and your family.", icon: Heart },
    { title: "Learning Budget", description: "$2,000 yearly stipend for your own mentorship and courses.", icon: Rocket },
  ];

  const jobs = [
    { title: "Senior AI Engineer", department: "Engineering", location: "Remote / SF", type: "Full-time" },
    { title: "Product Designer", department: "Design", location: "Remote / London", type: "Full-time" },
    { title: "Community Manager", department: "Operations", location: "Remote", type: "Full-time" },
    { title: "Growth Marketer", department: "Marketing", location: "Remote / NYC", type: "Full-time" },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <section className="pt-24 pb-20 px-6 text-center">
           <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
                We're Hiring
              </div>
              <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter">
                Build the <br /><span className="text-purple-500">Mentorship</span> Layer.
              </h1>
              <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
                SkillHub is on a mission to organize the world's expertise. We're looking for builders, dreamers, and teachers to help us get there.
              </p>
           </div>
        </section>

        {/* Perks Section */}
        <section className="py-24 px-6 bg-white/[0.02] border-y border-white/5">
           <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-16 text-center">Why join SkillHub?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                 {perks.map((p, i) => (
                    <div key={i} className="p-8 rounded-[32px] bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all group">
                       <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 border border-purple-500/20 group-hover:scale-110 transition-transform">
                          <p.icon className="w-6 h-6 text-purple-400" />
                       </div>
                       <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
                       <p className="text-white/50 text-sm leading-relaxed">{p.description}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Open Roles */}
        <section id="roles" className="py-32 px-6">
           <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                 <div>
                    <h2 className="text-4xl font-bold text-white mb-4">Open Positions</h2>
                    <p className="text-white/50">Don't see your role? We're always looking for great talent.</p>
                 </div>
                 <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-2xl">
                    General Application
                 </Button>
              </div>

              <div className="space-y-4">
                 {jobs.map((job, i) => (
                    <div key={i} className="group glass-card p-6 md:p-8 rounded-[32px] border border-white/5 hover:border-purple-500/30 hover:bg-white/[0.07] transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
                       <div>
                          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors uppercase tracking-widest leading-tight">{job.title}</h3>
                          <div className="flex items-center gap-4 text-white/40 text-sm">
                             <span className="flex items-center tracking-normal px-2"><Briefcase className="w-4 h-4 mr-1.5" /> {job.department}</span>
                             <span className="flex items-center tracking-normal px-2"><MapPin className="w-4 h-4 mr-1.5" /> {job.location}</span>
                          </div>
                       </div>
                       <Button size="lg" className="bg-white/5 border border-white/10 text-white rounded-2xl group-hover:bg-purple-600 group-hover:text-white transition-all">
                          Apply Now
                       </Button>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Values Callout */}
        <section className="py-24 px-6 text-center">
           <div className="max-w-3xl mx-auto glass p-12 md:p-20 rounded-[48px] border-white/10">
              <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-8 animate-pulse" />
              <h2 className="text-3xl font-bold text-white mb-6">Velocity is our focus.</h2>
              <p className="text-white/50 text-lg mb-10 text-justify">We move fast, we experiment constantly, and we're not afraid to fail. We're looking for owners who can ship high-quality work with minimal oversight.</p>
              <p className="text-purple-400 font-bold text-lg">Come help us build.</p>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
