import { motion } from "framer-motion";
import { Search, Calendar, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "Find the perfect mentor or learner that matches your goals and expertise.",
    gradient: "from-[#7F00FF] to-[#BB86FC]"
  },
  {
    icon: Calendar,
    title: "Connect",
    description: "Schedule sessions and start building meaningful learning relationships.",
    gradient: "from-[#BB86FC] to-[#E100FF]"
  },
  {
    icon: Rocket,
    title: "Learn",
    description: "Accelerate your growth through personalized mentorship and guidance.",
    gradient: "from-[#E100FF] to-[#D8B4FE]"
  }
];

export const HowItWorksSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient slice */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How <span className="bg-gradient-primary bg-clip-text text-transparent">SkillHub</span> Works
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Join thousands of learners and mentors in our simple three-step process
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="glass-card p-8 text-center hover:shadow-purple-glow transition-all duration-500 border border-white/10">
                {/* Icon with gradient background */}
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${step.gradient} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-full h-full rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Step number */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-purple-glow">
                  {index + 1}
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-white/70 leading-relaxed">{step.description}</p>

                {/* Animated arrow for non-last items */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-accent"
                    >
                      →
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};