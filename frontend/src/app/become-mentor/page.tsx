"use client";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { CheckCircle2, DollarSign, Clock, Users, Award, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BecomeMentorPage() {
  const perks = [
    { title: "Set Your Own Rates", description: "You decide what your expertise is worth. We handle the secure billing.", icon: DollarSign, color: "text-green-400" },
    { title: "Flexible Schedule", description: "Mentor on your own time. Set availability that fits your professional life.", icon: Clock, color: "text-blue-400" },
    { title: "Personal Branding", description: "Build a public profile that showcases your mentorship legacy and impact.", icon: Award, color: "text-purple-400" },
    { title: "Community Impact", description: "Shape the future of the industry by helping the next generation grow.", icon: Users, color: "text-pink-400" },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <section className="relative py-24 px-6 overflow-hidden">
           <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>
           <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
              <div className="text-left">
                 <div className="flex items-center space-x-2 text-purple-400 font-semibold mb-6">
                    <Rocket className="w-5 h-5 animate-bounce" />
                    <span>Join the Experts Network</span>
                 </div>
                 <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-tight">
                    Your Expertise <br /> is a <span className="text-gradient-primary font-black">Superpower.</span>
                 </h1>
                 <p className="text-xl text-white/50 mb-10 leading-relaxed max-w-xl text-justify px-3">
                    Turn your years of industry experience into a rewarding mentorship journey. Join 5,000+ top professionals who are teaching what they love.
                 </p>
                 <Link href="/register?role=mentor">
                    <Button size="xl" className="bg-gradient-primary text-white px-12 py-8 text-xl font-bold shadow-purple-glow hover-glow rounded-3xl">
                       Apply to Mentor
                    </Button>
                 </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-6 relative">
                 {perks.map((p, i) => (
                    <div key={i} className="glass-card p-8 rounded-[32px] border-white/5 hover:border-white/10 transition-colors shadow-xl">
                       <p.icon className={`w-10 h-10 ${p.color} mb-6`} />
                       <h3 className="text-xl font-bold text-white mb-3 tracking-wide leading-tight px-3">{p.title}</h3>
                       <p className="text-white/50 text-sm leading-relaxed text-justify px-3">{p.description}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Process Section */}
        <section className="py-24 px-6 bg-white/[0.02]">
           <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                 <h2 className="text-4xl font-bold text-white mb-4 tracking-tighter">How it Works</h2>
                 <p className="text-white/40">From expert to mentor in three simple steps.</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-12 relative text-center items-center">
                 <div className="group">
                    <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8 text-2xl font-black text-white group-hover:bg-purple-600/20 group-hover:border-purple-500/50 transition-all duration-500">1</div>
                    <h3 className="text-2xl font-bold text-white mb-4 tracking-wide leading-tight px-3">Submit Application</h3>
                    <p className="text-white/50 text-justify px-3">Tell us about your background and expertise areas. We review applications within 48 hours for quality.</p>
                 </div>
                 <div className="group">
                    <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8 text-2xl font-black text-white group-hover:bg-blue-600/20 group-hover:border-blue-500/50 transition-all duration-500">2</div>
                    <h3 className="text-2xl font-bold text-white mb-4 tracking-wide leading-tight px-3">Complete Profile</h3>
                    <p className="text-white/50 text-justify px-3">Set your rates, define your availability, and showcase your best work and testimonials.</p>
                 </div>
                 <div className="group">
                    <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8 text-2xl font-black text-white group-hover:bg-pink-600/20 group-hover:border-pink-500/50 transition-all duration-500">3</div>
                    <h3 className="text-2xl font-bold text-white mb-4 tracking-wide leading-tight px-3">Start Mentoring</h3>
                    <p className="text-white/50 text-justify px-3">Accept student requests, conduct 1:1 sessions, and start earning while making an impact.</p>
                 </div>
              </div>
           </div>
        </section>

        {/* Requirements Section */}
        <section className="py-32 px-6">
           <div className="max-w-4xl mx-auto glass p-12 md:p-20 rounded-[48px] border-white/10 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-10 text-center tracking-tighter">What we're looking for</h2>
              <div className="grid md:grid-cols-2 gap-8 text-center items-center">
                 <div className="flex items-start space-x-4">
                    <CheckCircle2 className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <p className="text-white/70 text-justify px-3">At least 3 years of demonstrable professional experience in your field.</p>
                 </div>
                 <div className="flex items-start space-x-4">
                    <CheckCircle2 className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <p className="text-white/70 text-justify px-3">Exceptional communication skills and a passion for teaching others.</p>
                 </div>
                 <div className="flex items-start space-x-4">
                    <CheckCircle2 className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <p className="text-white/70 text-justify px-3">A portfolio of work, github, or certifications proving your skill level.</p>
                 </div>
                 <div className="flex items-start space-x-4">
                    <CheckCircle2 className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <p className="text-white/70 text-justify px-3">Adherence to the SkillHub Mentor Code of Conduct and quality standards.</p>
                 </div>
              </div>
              <div className="mt-16 text-center">
                 <Link href="/register?role=mentor">
                    <Button size="xl" className="bg-white text-black hover:bg-white/90 px-12 py-8 rounded-full font-bold shadow-xl">
                       Apply Now
                    </Button>
                 </Link>
              </div>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
