"use client";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Calendar, User, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function BlogPage() {
  const posts = [
    {
      title: "Mastering the Art of Continuous Learning",
      excerpt: "In a rapidly evolving tech landscape, the ability to learn how to learn is your greatest asset. Here's how to build your systems.",
      author: "Sarah Jenkins",
      date: "Oct 12, 2024",
      category: "Education",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "How to Ask Better Questions of Your Mentor",
      excerpt: "The quality of your mentorship is directly tied to the quality of your curiosity. Learn the frameworks for 10x better inquiries.",
      author: "David Chen",
      date: "Oct 8, 2024",
      category: "Mentorship",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "The Future of AI in Personalized Mentorship",
      excerpt: "How we're using large language models to augment the human mentorship experience, not replace it. Trends from the SkillHub labs.",
      author: "Alex Rivera",
      date: "Sep 28, 2024",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <section className="pt-20 pb-16 px-6 text-center">
           <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-tight">
                Stories & <br /><span className="text-purple-500">Insights.</span>
              </h1>
              <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed text-justify px-3">
                Everything you need to grow your skills, your network, and your career in one place.
              </p>
           </div>
        </section>

        {/* Featured Post */}
        <section className="py-12 px-6">
           <div className="max-w-7xl mx-auto">
              <div className="relative aspect-[21/9] rounded-[48px] overflow-hidden border border-white/10 group cursor-pointer shadow-2xl">
                 <Image 
                   src={posts[0].image} 
                   alt={posts[0].title}
                   fill
                   className="object-cover group-hover:scale-105 transition-transform duration-700"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                 <div className="absolute bottom-0 left-0 p-12 md:p-16 max-w-3xl">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500 text-white text-xs font-bold uppercase tracking-widest mb-6">
                      Featured Piece
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 group-hover:text-purple-300 transition-colors uppercase tracking-widest leading-tight">
                      {posts[0].title}
                    </h2>
                    <div className="flex items-center space-x-6 text-white/50 text-sm">
                       <span className="flex items-center tracking-normal"><User className="w-4 h-4 mr-2" /> {posts[0].author}</span>
                       <span className="flex items-center tracking-normal"><Calendar className="w-4 h-4 mr-2" /> {posts[0].date}</span>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Main Grid */}
        <section className="py-24 px-6">
           <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 text-center items-center">
                 {posts.map((post, i) => (
                    <article key={i} className="group cursor-pointer">
                       <div className="relative aspect-video rounded-3xl overflow-hidden mb-8 border border-white/10 shadow-xl">
                          <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                       </div>
                       <div className="inline-block px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                          {post.category}
                       </div>
                       <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors line-clamp-2 uppercase tracking-widest leading-tight px-3">{post.title}</h3>
                       <p className="text-white/50 mb-6 line-clamp-3 leading-relaxed text-justify px-3">{post.excerpt}</p>
                       <div className="flex items-center justify-between text-xs text-white/30 pt-6 border-t border-white/5 px-3">
                          <span className="flex items-center hover:text-white transition-colors duration-300">Read Article <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></span>
                          <span>{post.date}</span>
                       </div>
                    </article>
                 ))}
              </div>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
