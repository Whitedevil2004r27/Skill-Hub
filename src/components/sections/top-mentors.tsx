import { motion } from "framer-motion";
import { Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mentors = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Senior Software Engineer",
    company: "Google",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b367?w=150&h=150&fit=crop&crop=face",
    rating: 4.9,
    reviews: 127,
    location: "San Francisco, CA",
    skills: ["React", "TypeScript", "System Design", "Mentoring"],
    bio: "Helping developers transition into senior roles with 8+ years at top tech companies."
  },
  {
    id: 2,
    name: "Marcus Johnson",
    title: "Product Manager",
    company: "Microsoft",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 4.8,
    reviews: 89,
    location: "Seattle, WA",
    skills: ["Product Strategy", "Data Analysis", "Leadership", "Agile"],
    bio: "Product leader passionate about building successful products and teams."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "UX Design Lead",
    company: "Figma",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5.0,
    reviews: 156,
    location: "New York, NY",
    skills: ["UI/UX Design", "Design Systems", "User Research", "Prototyping"],
    bio: "Design leader with 10+ years creating user-centered experiences."
  },
  {
    id: 4,
    name: "David Kim",
    title: "AI Engineer",
    company: "OpenAI",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 4.9,
    reviews: 94,
    location: "Austin, TX",
    skills: ["Machine Learning", "Python", "Deep Learning", "AI Ethics"],
    bio: "AI researcher helping professionals transition into machine learning."
  }
];

export const TopMentorsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-transparent to-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
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
                  <div className="w-20 h-20 mx-auto rounded-full p-0.5 bg-gradient-primary">
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