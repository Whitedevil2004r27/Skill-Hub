"use client";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { CheckCircle2, DollarSign, Clock, Users, Award, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Magnet from "@/components/animations/Magnet";

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
                 <Magnet>
                  <Link href="/register?role=mentor">
                    <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white px-12 py-8 text-xl font-bold shadow-[0_0_30px_rgba(139,92,246,0.3)] rounded-3xl h-auto">
                        Apply to Mentor
                    </Button>
                  </Link>
                 </Magnet>
              </div>
              <div className="grid sm:grid-cols-2 gap-6 relative">
                 {perks.map((p, i) => (
                    <div key={i} className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all duration-500 shadow-2xl">
                       <p.icon className={`w-10 h-10 ${p.color} mb-6`} />
                       <h3 className="text-xl font-bold text-white mb-3 tracking-wide leading-tight">{p.title}</h3>
                       <p className="text-gray-400 text-sm leading-relaxed">{p.description}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Process Section */}
        <section className="py-24 px-6 relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-600/5 to-transparent pointer-events-none" />
           <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-20">
                 <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter">How it Works</h2>
                 <p className="text-gray-400 text-lg">From expert to mentor in three simple steps.</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-12 text-center items-center">
                 {[
                   { step: "1", title: "Submit Application", desc: "Tell us about your background and expertise areas. We review applications within 48 hours.", color: "group-hover:bg-violet-600/20 group-hover:border-violet-500/50" },
                   { step: "2", title: "Complete Profile", desc: "Set your rates, define your availability, and showcase your best work and testimonials.", color: "group-hover:bg-indigo-600/20 group-hover:border-indigo-500/50" },
                   { step: "3", title: "Start Mentoring", desc: "Accept student requests, conduct 1:1 sessions, and start earning while making an impact.", color: "group-hover:bg-fuchsia-600/20 group-hover:border-fuchsia-500/50" }
                 ].map((s, i) => (
                   <div key={i} className="group p-8 rounded-[2.5rem] hover:bg-white/5 transition-all duration-500">
                      <div className={`w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8 text-2xl font-black text-white transition-all duration-500 ${s.color}`}>{s.step}</div>
                      <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">{s.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{s.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Requirements Section */}
        <section className="py-32 px-6">
           <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-3xl p-12 md:p-24 rounded-[4rem] border border-white/10 shadow-3xl text-center">
              <h2 className="text-4xl font-bold text-white mb-12 tracking-tighter">What we're looking for</h2>
              <div className="grid md:grid-cols-2 gap-10 text-left">
                 {[
                   "At least 3 years of demonstrable professional experience in your field.",
                   "Exceptional communication skills and a passion for teaching others.",
                   "A portfolio of work, github, or certifications proving your skill level.",
                   "Adherence to the SkillHub Mentor Code of Conduct and quality standards."
                 ].map((text, i) => (
                   <div key={i} className="flex items-start space-x-4 bg-white/5 p-6 rounded-3xl border border-white/5">
                      <CheckCircle2 className="w-6 h-6 text-violet-400 flex-shrink-0 mt-1" />
                      <p className="text-gray-300 font-medium">{text}</p>
                   </div>
                 ))}
              </div>
              <div className="mt-20">
                 <Magnet>
                  <Link href="/register?role=mentor">
                    <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-16 py-8 rounded-3xl font-bold text-xl h-auto shadow-2xl">
                        Apply Now
                    </Button>
                  </Link>
                 </Magnet>
              </div>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
