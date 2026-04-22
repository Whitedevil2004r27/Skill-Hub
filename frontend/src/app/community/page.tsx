"use client";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Users, MessageSquare, Shield, Zap, Globe, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import BackgroundCanvas from "@/components/animations/BackgroundCanvas";
import Magnet from "@/components/animations/Magnet";
import { motion } from "framer-motion";

export default function CommunityPage() {
  const stats = [
    { label: "Active Members", value: "50,000+", icon: Users },
    { label: "Discussions", value: "1.2M", icon: MessageSquare },
    { label: "Countries", value: "120+", icon: Globe },
    { label: "Mentors", value: "5,000+", icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-[#030303]">
      <Header />
      <main className="pt-24 pb-16">
        {/* Page Hero */}
        <section className="relative py-32 px-6 overflow-hidden min-h-[70vh] flex items-center">
          <BackgroundCanvas />
          
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4 mr-2" />
                Global Developer Network
              </div>
              <h1 className="text-6xl md:text-8xl font-bold mb-8 text-white tracking-tighter leading-none">
                Built by the <br /> <span className="text-violet-500">Community</span>, for You.
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                Join a global network of ambitious learners and expert mentors. Share knowledge, solve problems, and grow faster together.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Magnet>
                  <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white rounded-2xl h-16 px-10 text-lg font-bold shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                    Join the Discord
                  </Button>
                </Magnet>
                <Magnet>
                  <Button size="lg" variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-2xl h-16 px-10 text-lg font-bold">
                    Browse Forums
                  </Button>
                </Magnet>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] text-center border border-white/10 hover:bg-white/10 transition-all duration-500 shadow-2xl group"
                >
                  <div className="w-16 h-16 bg-violet-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-violet-500/20 group-hover:scale-110 transition-transform">
                    <stat.icon className="w-8 h-8 text-violet-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2 tracking-tight">{stat.value}</div>
                  <div className="text-sm text-gray-500 uppercase tracking-widest font-bold">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Pillars */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-600/5 to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter">The Pillars of Our Community</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">We've built a culture focused on respect, growth, and radical collaboration.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: "Safe & Inclusive", desc: "A strictly moderated environment where everyone feels welcome to ask questions, regardless of their skill level.", color: "text-violet-400", border: "hover:border-violet-500/30" },
                { icon: Zap, title: "Expert Access", desc: "Direct lines to industry leaders at companies like Google, Meta, and OpenAI. No gatekeeping here.", color: "text-indigo-400", border: "hover:border-indigo-500/30" },
                { icon: Heart, title: "Pay it Forward", desc: "Ninety percent of our senior members started as students. Giving back is sewn into our DNA.", color: "text-fuchsia-400", border: "hover:border-fuchsia-500/30" }
              ].map((p, i) => (
                <div key={i} className={`p-10 rounded-[3rem] bg-white/5 border border-white/10 ${p.border} transition-all duration-500 group shadow-2xl`}>
                  <p.icon className={`w-12 h-12 ${p.color} mb-8 group-hover:scale-110 transition-transform`} />
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{p.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-3xl rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden border border-white/10 shadow-3xl"
          >
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none"></div>
             <h2 className="text-5xl md:text-6xl font-bold text-white mb-10 tracking-tighter">Ready to grow together?</h2>
             <Magnet>
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 h-20 px-16 text-xl font-black rounded-3xl shadow-2xl">
                Get Started for Free
              </Button>
             </Magnet>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
