"use client";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Code2, Terminal, Cpu, Blocks, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function DocsPage() {
  const [copied, setCopied] = useState(false);
  const codeSnippet = `fetch('https://api.skillhub.com/v1/mentors', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
}).then(res => res.json());`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sections = [
    { title: "Authentication", description: "Learn how to authenticate your requests using Bearer tokens.", icon: Terminal },
    { title: "Mentor Search", description: "Query our global database of experts with powerful filters.", icon: Code2 },
    { title: "Booking API", description: "Programmatically schedule sessions and manage availability.", icon: Cpu },
    { title: "Webhooks", description: "Receive real-time notifications for bookings and messages.", icon: Blocks },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <section className="pt-24 pb-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                Developer API v1.0
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">
                Build the future <br /> of <span className="text-blue-500">Learning.</span>
              </h1>
              <p className="text-xl text-white/50 mb-10 leading-relaxed">
                Integrate SkillHub's powerful mentorship matching and scheduling engine directly into your own applications.
              </p>
              <div className="flex items-center space-x-4">
                <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-colors shadow-blue-glow">
                  Get API Key
                </button>
                <button className="px-8 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  Postman Collection
                </button>
              </div>
            </div>
            <div className="flex-1 w-full max-w-2xl">
              <div className="rounded-3xl border border-white/10 bg-[#0d0d12] overflow-hidden shadow-2xl">
                 <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
                    <div className="flex items-center space-x-2">
                       <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                       <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                       <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                       <span className="ml-4 text-xs text-white/40 font-mono">GET /v1/mentors</span>
                    </div>
                    <button onClick={copyToClipboard} className="text-white/40 hover:text-white transition-colors">
                       {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                 </div>
                 <div className="p-8 font-mono text-sm leading-relaxed overflow-x-auto">
                    <pre className="text-blue-400">
                       {codeSnippet}
                    </pre>
                 </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6">
           <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sections.map((s, i) => (
                <div key={i} className="glass-card p-1 items-center rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group p-8">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600/20 transition-colors duration-300">
                    <s.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-wide leading-tight px-3">{s.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed text-justify px-3">{s.description}</p>
                </div>
              ))}
           </div>
        </section>

        <section className="py-24 px-6 border-t border-white/10">
           <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Need Help?</h2>
              <p className="text-white/50 mb-12 text-justify">Join our developer community on Slack to share your builds and get support from the SkillHub engineering team.</p>
              <button className="px-10 py-4 glass border border-white/20 text-white font-bold rounded-2xl hover:bg-white/10 transition-all">
                Join Developer Slack
              </button>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
