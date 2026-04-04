"use client";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Mail, MessageCircle, MapPin, Twitter, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <section className="pt-20 pb-12 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Side: Info */}
            <div>
               <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                 Let's start a <br /><span className="text-purple-500">Conversation.</span>
               </h1>
               <p className="text-xl text-white/50 mb-12 max-w-md leading-relaxed text-justify px-3">
                 Have a question about the platform? Interested in a partnership? We'd love to hear from you.
               </p>

               <div className="space-y-8 mb-16">
                  <div className="flex items-start space-x-5 group">
                     <div className="w-12 h-12 bg-white/5 rounded-[18px] border border-white/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                        <Mail className="w-5 h-5" />
                     </div>
                     <div>
                        <div className="text-white font-semibold mb-1">Email Us</div>
                        <div className="text-white/60">hello@skillhub.com</div>
                     </div>
                  </div>
                  <div className="flex items-start space-x-5 group">
                     <div className="w-12 h-12 bg-white/5 rounded-[18px] border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                        <MessageCircle className="w-5 h-5" />
                     </div>
                     <div>
                        <div className="text-white font-semibold mb-1">Live Chat</div>
                        <div className="text-white/60">Available Mon-Fri, 9am - 6pm EST</div>
                     </div>
                  </div>
                  <div className="flex items-start space-x-5 group">
                     <div className="w-12 h-12 bg-white/5 rounded-[18px] border border-white/10 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                        <MapPin className="w-5 h-5" />
                     </div>
                     <div>
                        <div className="text-white font-semibold mb-1">Visit Us</div>
                        <div className="text-white/60">123 Innovators Place, Silicon Valley, CA</div>
                     </div>
                  </div>
               </div>

               <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all">
                     <Twitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all">
                     <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all">
                     <Github className="w-4 h-4" />
                  </a>
               </div>
            </div>

            {/* Right Side: Form */}
            <div className="glass-card p-8 md:p-12 rounded-[40px] relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary"></div>
               <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-white/60 px-1">Full Name</label>
                        <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-colors" placeholder="John Doe" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-white/60 px-1">Email Address</label>
                        <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-colors" placeholder="john@example.com" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-sm font-medium text-white/60 px-1">Message</label>
                     <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-colors resize-none" placeholder="How can we help?"></textarea>
                  </div>
                  <Button className="w-full bg-gradient-primary text-white py-8 text-lg font-bold rounded-2xl shadow-purple-glow hover-glow transition-all duration-300">
                     Send Message
                  </Button>
               </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
