"use client";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Check, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "For learners just getting started with self-paced study.",
      features: [
        "Find and browse all mentors",
        "Public community access",
        "Free learning track introductory courses",
        "Standard support",
      ],
      cta: "Get Started",
      highlight: false,
      icon: Zap
    },
    {
      name: "Pro",
      price: "$29",
      description: "For serious learners who want to accelerate their growth.",
      features: [
        "3 Priority 1:1 sessions per month",
        "All course tracks unlocked",
        "Private Slack community access",
        "AI-powered mentor matching plus",
        "Priority support",
      ],
      cta: "Join Pro",
      highlight: true,
      icon: Sparkles
    },
    {
      name: "Team",
      price: "$99",
      description: "For organizations building a culture of internal learning.",
      features: [
        "Unlimited sessions for the whole team",
        "Advanced progress analytics",
        "Team-wide skill gap assessments",
        "SSO & Custom onboarding",
        "Dedicated account manager",
      ],
      cta: "Contact Sales",
      highlight: false,
      icon: ShieldCheck
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <section className="pt-20 pb-24 px-6 text-center">
           <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tighter">
             Invest in your <br /><span className="text-purple-500">Future.</span>
           </h1>
           <p className="text-xl text-white/50 max-w-2xl mx-auto mb-16 leading-relaxed text-justify px-3">
             Simple, transparent pricing for learners and companies of all sizes. No hidden fees.
           </p>

           <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-left">
              {plans.map((p, i) => (
                <div key={i} className={`relative glass-card p-10 rounded-[40px] border border-white/10 transition-all duration-500 hover:-translate-y-2 ${p.highlight ? 'ring-2 ring-purple-500 shadow-purple-glow bg-white/5' : ''}`}>
                   {p.highlight && (
                     <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-primary text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                       Most Popular
                     </div>
                   )}
                   <div className="mb-8 items-center text-center">
                      <p.icon className={`w-10 h-10 mb-6 mx-auto ${p.highlight ? 'text-purple-400' : 'text-white/60'}`} />
                      <h3 className="text-2xl font-bold text-white mb-2 tracking-wide leading-tight px-3">{p.name}</h3>
                      <div className="flex items-baseline space-x-1 justify-center">
                        <span className="text-5xl font-black text-white">{p.price}</span>
                        <span className="text-white/40 font-medium">/month</span>
                      </div>
                      <p className="text-white/50 mt-4 text-sm leading-relaxed text-justify px-3">{p.description}</p>
                   </div>
                   
                   <ul className="space-y-4 mb-10 flex-grow text-center items-center">
                      {p.features.map((f, j) => (
                        <li key={j} className="flex items-start space-x-3 text-white/70">
                           <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                           <span className="text-sm tracking-normal px-2 line-clamp-2 text-justify">{f}</span>
                        </li>
                      ))}
                   </ul>

                   <Button className={`w-full py-7 text-lg font-bold rounded-2xl transition-all duration-300 shadow-xl ${p.highlight ? 'bg-gradient-primary text-white shadow-purple-glow hover-glow' : 'bg-white/5 text-white border border-white/20 hover:bg-white/10'}`}>
                      {p.cta}
                   </Button>
                </div>
              ))}
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
