import { motion } from "framer-motion";
import { Code, Palette, Database, Brain, Smartphone, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const tracks = [
  {
    icon: Code,
    title: "Web Development",
    description: "Master modern web technologies and frameworks",
    skills: ["React", "Node.js", "TypeScript", "Next.js"],
    mentors: 89,
    gradient: "from-[#7F00FF] to-[#BB86FC]",
    glow: "shadow-purple-glow"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Create beautiful and user-friendly interfaces",
    skills: ["Figma", "Design Systems", "User Research", "Prototyping"],
    mentors: 67,
    gradient: "from-[#BB86FC] to-[#E100FF]",
    glow: "shadow-pink-glow"
  },
  {
    icon: Database,
    title: "Data Science",
    description: "Analyze data and build predictive models",
    skills: ["Python", "R", "Machine Learning", "SQL"],
    mentors: 54,
    gradient: "from-[#E100FF] to-[#D8B4FE]",
    glow: "shadow-purple-glow"
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Build intelligent systems and neural networks",
    skills: ["TensorFlow", "PyTorch", "Deep Learning", "NLP"],
    mentors: 42,
    gradient: "from-[#D8B4FE] to-[#7F00FF]",
    glow: "shadow-violet-glow"
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Create native and cross-platform mobile apps",
    skills: ["React Native", "Flutter", "iOS", "Android"],
    mentors: 38,
    gradient: "from-[#7F00FF] to-[#E100FF]",
    glow: "shadow-purple-glow"
  },
  {
    icon: TrendingUp,
    title: "Product Management",
    description: "Lead product strategy and development",
    skills: ["Strategy", "Analytics", "Leadership", "Agile"],
    mentors: 51,
    gradient: "from-[#BB86FC] to-[#D8B4FE]",
    glow: "shadow-pink-glow"
  }
];

export const LearningTracksSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient slice */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7F00FF]/10 via-transparent to-[#E100FF]/10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Explore <span className="bg-gradient-primary bg-clip-text text-transparent">Learning Tracks</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Choose from diverse learning paths crafted by industry experts
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tracks.map((track, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="group perspective-1000"
            >
              <div className={`glass-card p-8 hover:${track.glow} transition-all duration-500 border border-white/10 relative overflow-hidden`}>
                {/* Background glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${track.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br ${track.gradient} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-full h-full rounded-xl bg-black/50 flex items-center justify-center backdrop-blur-sm">
                    <track.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 text-center">{track.title}</h3>
                <p className="text-white/70 text-center mb-6 leading-relaxed">{track.description}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-6 justify-center">
                  {track.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs bg-white/10 text-white rounded-full border border-white/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Mentors count */}
                <div className="text-center mb-6">
                  <span className="text-accent font-medium">{track.mentors} mentors available</span>
                </div>

                {/* CTA */}
                <Button 
                  className={`w-full bg-gradient-to-r ${track.gradient} text-white hover:scale-105 transition-all duration-300 hover:shadow-lg`}
                >
                  Start Learning
                </Button>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full opacity-60 group-hover:animate-pulse" />
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-white/40 rounded-full opacity-60 group-hover:animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
          >
            View All Learning Tracks
          </Button>
        </motion.div>
      </div>
    </section>
  );
};