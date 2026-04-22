import { motion } from "framer-motion";
import Link from "next/link";
import { Star, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMentors } from "@/hooks/useMentors";
import Magnet from "@/components/animations/Magnet";
import { TiltCard } from "@/components/animations/TiltCard";

export const TopMentorsSection = () => {
  const { data: mentors, isLoading } = useMentors();
  
  if (isLoading || !mentors) return null;
  return (
    <section className="py-24 relative overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-600/5 to-transparent pointer-events-none" />
      
      <div className="w-full px-6 md:px-12 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-4">
            <Sparkles className="w-3 h-3 mr-2" />
            Verified Industry Leaders
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet Our <span className="text-violet-500">Top Mentors</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Learn from industry experts who are passionate about sharing their knowledge and building the next generation of tech talent.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentors.map((mentor, index) => (
            <TiltCard
              key={mentor.id}
              className="group"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card premium-border p-8 rounded-[2.5rem] text-center hover:bg-white/10 transition-all duration-500 h-full"
              >
                <div className="relative mx-auto w-fit mb-6">
                  <div className="w-24 h-24 rounded-3xl p-1 bg-gradient-to-br from-violet-500 to-indigo-500 shadow-lg group-hover:rotate-6 transition-transform">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-full h-full rounded-[1.25rem] object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#030303] rounded-full border border-white/10 flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 tracking-tight text-gradient">{mentor.name}</h3>
                <p className="text-gray-400 text-sm mb-1">{mentor.title}</p>
                <p className="text-violet-400 text-sm font-bold mb-4 uppercase tracking-wider">{mentor.company}</p>

                <div className="flex items-center justify-center gap-2 mb-6 bg-white/5 w-fit mx-auto px-3 py-1 rounded-full border border-white/5">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <span className="text-white text-sm font-bold">{mentor.rating}</span>
                  <span className="text-gray-500 text-xs">({mentor.reviews})</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6 justify-center">
                  {mentor.skills.slice(0, 2).map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-violet-500/10 text-violet-400 border-violet-500/20 text-[10px] px-3">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <Link href={`/mentors/${mentor.id}`} className="block w-full">
                  <Button 
                    size="sm" 
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-2xl h-12 font-bold shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                  >
                    View Profile
                  </Button>
                </Link>
              </motion.div>
            </TiltCard>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Magnet>
            <Link href="/explore">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-2xl px-10 h-16"
              >
                Explore All Mentors
              </Button>
            </Link>
          </Magnet>
        </motion.div>
      </div>
    </section>
  );
};
