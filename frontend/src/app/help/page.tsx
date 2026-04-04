"use client";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Search, User, BookOpen, CreditCard, LifeBuoy, ShieldCheck, Mail } from "lucide-react";

export default function HelpCenterPage() {
  const categories = [
    { name: "Getting Started", icon: BookOpen, description: "New to SkillHub? Start here to learn the basics." },
    { name: "Account & Profile", icon: User, description: "Manage your profile, account security, and settings." },
    { name: "Billing & Subscriptions", icon: CreditCard, description: "Issues with payments, pricing, or invoices." },
    { name: "Mentorship Basics", icon: LifeBuoy, description: "How to book sessions and interact with mentors." },
    { name: "Trust & Safety", icon: ShieldCheck, description: "Learn about our community guidelines and safety." },
    { name: "Technical Support", icon: LifeBuoy, description: "Report bugs or technical issues with the platform." },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        {/* Help Center Hero */}
        <section className="pt-24 pb-32 px-6 text-center">
           <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-tight">
                How can we <br /><span className="text-purple-500">Help?</span>
              </h1>
              
              <div className="relative max-w-2xl mx-auto">
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                 <input 
                   className="w-full bg-white/5 border border-white/10 rounded-[30px] pl-14 pr-6 py-6 text-white text-lg focus:outline-none focus:border-purple-500/50 transition-all shadow-xl"
                   placeholder="Search for articles, guides..."
                 />
              </div>
           </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 px-6">
           <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center items-center">
                 {categories.map((c, i) => (
                    <div key={i} className="glass-card p-10 rounded-[40px] border-white/5 hover:border-white/20 transition-all group cursor-pointer hover:-translate-y-2 duration-300 shadow-xl">
                       <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600/20 transition-all duration-300 border border-white/10 group-hover:border-purple-500/50 mx-auto">
                          <c.icon className="w-7 h-7 text-white" />
                       </div>
                       <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors tracking-wide leading-tight px-3">{c.name}</h3>
                       <p className="text-white/50 leading-relaxed text-justify px-3">{c.description}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Contact Support */}
        <section className="py-24 px-6 text-center">
           <div className="max-w-2xl mx-auto glass p-12 rounded-[40px] border-white/10 shadow-2xl">
              <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-purple-500/30">
                 <Mail className="w-8 h-8 text-purple-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4 tracking-tighter leading-tight px-3">Still need help?</h2>
              <p className="text-white/50 mb-10 text-justify px-3">Can't find what you're looking for? Our support team is here for you 24/7.</p>
              <button className="px-12 py-5 bg-gradient-primary text-white font-bold rounded-2xl shadow-purple-glow hover-glow transition-all">
                 Contact Support
              </button>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
