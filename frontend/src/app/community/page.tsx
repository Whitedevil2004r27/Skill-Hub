"use client";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Users, MessageSquare, Shield, Zap, Globe, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CommunityPage() {
  const stats = [
    { label: "Active Members", value: "50,000+", icon: Users },
    { label: "Discussions", value: "1.2M", icon: MessageSquare },
    { label: "Countries", value: "120+", icon: Globe },
    { label: "Mentors", value: "5,000+", icon: Heart },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        {/* Page Hero */}
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent">
              Built by the <br /> Community, for You.
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              Join a global network of ambitious learners and expert mentors. Share knowledge, solve problems, and grow faster together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-gradient-primary text-white shadow-purple-glow hover-glow px-8">
                Join the Discord
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8">
                Browse Forums
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="glass-card p-8 rounded-2xl text-center hover-glow transition-all duration-300">
                  <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mx-auto mb-4 border border-white/10">
                    <stat.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/50 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Pillars */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Pillars of Our Community</h2>
              <p className="text-white/50 max-w-xl mx-auto">We've built a culture focused on respect, growth, and radical collaboration.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors group">
                <Shield className="w-10 h-10 text-purple-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-white mb-4">Safe & Inclusive</h3>
                <p className="text-white/60 leading-relaxed">A strictly moderated environment where everyone feels welcome to ask questions, regardless of their skill level.</p>
              </div>
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors group">
                <Zap className="w-10 h-10 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-white mb-4">Expert Access</h3>
                <p className="text-white/60 leading-relaxed">Direct lines to industry leaders at companies like Google, Meta, and OpenAI. No gatekeeping here.</p>
              </div>
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-pink-500/30 transition-colors group">
                <Heart className="w-10 h-10 text-pink-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-white mb-4">Pay it Forward</h3>
                <p className="text-white/60 leading-relaxed">Ninety percent of our senior members started as students. Giving back is sewn into our DNA.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 max-w-5xl mx-auto">
          <div className="glass shadow-purple-glow rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px]"></div>
             <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to grow together?</h2>
             <Button size="xl" className="bg-white text-black hover:bg-white/90 px-12 text-lg font-bold rounded-full">
               Get Started for Free
             </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
