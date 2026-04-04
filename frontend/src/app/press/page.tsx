"use client";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Download, Newspaper, Image as ImageIcon, FileText, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PressPage() {
  const assets = [
    { name: "Brand Guidelines", type: "PDF", size: "4.2 MB", icon: FileText },
    { name: "Logo Pack (SVG/PNG)", type: "ZIP", size: "12.8 MB", icon: ImageIcon },
    { name: "Founder Headshots", type: "JPG", size: "24.5 MB", icon: ImageIcon },
    { name: "Product Screenshots", type: "ZIP", size: "45.2 MB", icon: ImageIcon },
  ];

  const news = [
    { title: "SkillHub Raises $15M Series A to Expand AI Mentorship", date: "Oct 5, 2024", source: "TechCrunch" },
    { title: "How SkillHub is Solving the Tech Talent Shortage", date: "Sep 22, 2024", source: "Forbes" },
    { title: "The 10 Most Innovative Education Startups of 2024", date: "Aug 30, 2024", source: "Fast Company" },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <section className="pt-24 pb-20 px-6">
           <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
              <div className="max-w-2xl">
                 <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter">
                    Press <span className="text-purple-500">&</span> Media.
                 </h1>
                 <p className="text-xl text-white/50 leading-relaxed max-w-xl text-justify">
                    Everything you need to tell the SkillHub story. Access our latest news, official brand assets, and company backgrounder.
                 </p>
              </div>
              <Button size="lg" className="bg-white/5 border border-white/10 text-white rounded-2xl hover:bg-white/10 px-8 py-6 mb-4">
                 <Share2 className="w-4 h-4 mr-2" />
                 Share Press Kit
              </Button>
           </div>
        </section>

        {/* Media Assets */}
        <section className="py-24 px-6 bg-white/[0.02]">
           <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-12 flex items-center tracking-normal px-2">
                 <Download className="w-6 h-6 mr-3 text-purple-400" />
                 Official Assets
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center items-center">
                 {assets.map((asset, i) => (
                    <div key={i} className="glass-card hover:bg-white/[0.07] p-8 rounded-[32px] border border-white/5 hover:border-purple-500/20 transition-all cursor-pointer group shadow-xl">
                       <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-white/10 group-hover:scale-110 transition-transform">
                          <asset.icon className="w-7 h-7 text-white/60 group-hover:text-purple-400 transition-colors" />
                       </div>
                       <h3 className="text-lg font-bold text-white mb-2">{asset.name}</h3>
                       <div className="text-xs text-white/40 mb-6 font-medium uppercase tracking-widest">{asset.type} • {asset.size}</div>
                       <button className="text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors flex items-center mx-auto hover:text-white transition-colors">
                          Download <Download className="w-4 h-4 ml-2" />
                       </button>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Recent News */}
        <section className="py-24 px-6">
           <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-12 flex items-center tracking-normal px-2">
                 <Newspaper className="w-6 h-6 mr-3 text-blue-400" />
                 In the News
              </h2>
              <div className="space-y-4">
                 {news.map((item, i) => (
                    <div key={i} className="group p-8 rounded-[32px] bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer opacity-90 hover:opacity-100 shadow-xl">
                       <div className="flex-1">
                          <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2 px-3">{item.source}</div>
                          <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-widest leading-tight px-3">{item.title}</h3>
                       </div>
                       <div className="text-white/40 text-sm whitespace-nowrap mb-4 md:mb-0">{item.date}</div>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Contact Press */}
        <section className="py-24 px-6 max-w-4xl mx-auto text-center">
           <div className="glass p-12 md:p-16 rounded-[48px] border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px]"></div>
              <h2 className="text-3xl font-bold text-white mb-4">Media Inquiries</h2>
              <p className="text-white/50 mb-10 text-justify">For interviews, data requests, or speak opportunities, please reach out to our media relations team.</p>
              <a href="mailto:press@skillhub.com" className="inline-block px-12 py-5 bg-gradient-primary text-white font-bold rounded-2xl shadow-purple-glow hover-glow transition-all">
                 Contact PR Team
              </a>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
