import { motion } from "framer-motion";
import { Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMentors } from "@/hooks/useMentors";

export const TopMentorsSection = () => {
  const { data: mentors, isLoading } = useMentors();
  
  if (isLoading || !mentors) return null;
  return (
    <section className="py-24 bg-gradient-to-b from-transparent to-white/5">
      <div className="w-full px-6 md:px-12 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet Our <span className="bg-gradient-primary bg-clip-text text-transparent">Top Mentors</span>
          </h2>
          <p className="text-xl text-white/80 w-full ">
            Learn from industry experts who are passionate about sharing their knowledge
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentors.map((mentor, index) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <div className="glass-card p-6 text-center hover:shadow-purple-glow transition-all duration-500 border border-white/10 relative overflow-hidden">
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                
                {/* Avatar */}
                <div className="relative mb-4">
                  <div className="w-20 h-20  rounded-full p-0.5 bg-gradient-primary">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  {/* Online indicator */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-lg font-bold text-white mb-1">{mentor.name}</h3>
                <p className="text-white/70 text-sm mb-1">{mentor.title}</p>
                <p className="text-accent text-sm font-medium mb-3">{mentor.company}</p>

                {/* Rating */}
                <div className="flex items-center justify-center gap-1 mb-3">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white font-medium">{mentor.rating}</span>
                  <span className="text-white/60 text-sm">({mentor.reviews})</span>
                </div>

                {/* Location */}
                <div className="flex items-center justify-center gap-1 mb-4 text-white/60 text-sm">
                  <MapPin className="w-3 h-3" />
                  {mentor.location}
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 mb-4 justify-center">
                  {mentor.skills.slice(0, 2).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs bg-white/10 text-white border-white/20">
                      {skill}
                    </Badge>
                  ))}
                  {mentor.skills.length > 2 && (
                    <Badge variant="outline" className="text-xs border-white/30 text-white/70">
                      +{mentor.skills.length - 2}
                    </Badge>
                  )}
                </div>

                {/* Bio */}
                <p className="text-white/70 text-sm mb-4 line-clamp-2">{mentor.bio}</p>

                {/* CTA Button */}
                <Button 
                  size="sm" 
                  className="w-full bg-gradient-primary text-white hover:shadow-purple-glow hover:scale-105 transition-all duration-300"
                >
                  View Profile
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
          >
            Explore All Mentors
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
