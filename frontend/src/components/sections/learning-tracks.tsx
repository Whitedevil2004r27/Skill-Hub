import { motion } from "framer-motion";
import { Code, Palette, Database, Brain, Smartphone, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BentoGrid, BentoItem } from "@/components/BentoGrid";
import Magnet from "@/components/animations/Magnet";
import { TiltCard } from "@/components/animations/TiltCard";

const tracks = [
  {
    icon: Code,
    title: "Web Development",
    description: "Master modern web technologies and frameworks like React, Node.js, and Next.js.",
    className: "md:col-span-2",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Create beautiful and user-friendly interfaces with Figma and Prototyping.",
    className: "md:col-span-1",
  },
  {
    icon: Database,
    title: "Data Science",
    description: "Analyze data and build predictive models with Python and Machine Learning.",
    className: "md:col-span-1",
  },
  {
    icon: Brain,
    title: "AI & ML",
    description: "Build intelligent systems and neural networks with TensorFlow and Deep Learning.",
    className: "md:col-span-2",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Create native and cross-platform mobile apps with React Native and Flutter.",
    className: "md:col-span-1",
  },
  {
    icon: TrendingUp,
    title: "Product MGMT",
    description: "Lead product strategy and development with Agile and Analytics.",
    className: "md:col-span-1",
  }
];

export const LearningTracksSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-t from-violet-600/5 to-transparent pointer-events-none" />
      
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
            Curated Learning Paths
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Explore <span className="text-violet-500">Learning Tracks</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Choose from diverse learning paths crafted by industry experts to accelerate your career.
          </p>
        </motion.div>

        <BentoGrid className="max-w-6xl mx-auto">
          {tracks.map((track, index) => (
            <TiltCard key={index} className={track.className}>
              <BentoItem
                title={track.title}
                description={track.description}
                icon={<track.icon className="w-6 h-6" />}
                className="h-full"
                header={
                  <div className="flex items-center gap-2 mt-2">
                    <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "60%" }}
                        className="h-full bg-violet-500/50"
                      />
                    </div>
                    <span className="text-[10px] text-gray-500">Popular</span>
                  </div>
                }
              />
            </TiltCard>
          ))}
        </BentoGrid>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Magnet>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-2xl px-8"
            >
              View All Learning Tracks
            </Button>
          </Magnet>
        </motion.div>
      </div>
    </section>
  );
};
