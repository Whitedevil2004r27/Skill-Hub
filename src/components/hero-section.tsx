import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, BookOpen, Target, Zap } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-hero animate-gradient" />
      
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#7F00FF]/30 to-[#BB86FC]/30 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-[#E100FF]/30 to-[#D8B4FE]/30 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 30, repeat: Infinity }}
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-[#BB86FC]/20 to-[#7F00FF]/20 rounded-full blur-2xl"
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-6 py-3 rounded-full glass border border-white/30 text-white mb-8 shadow-purple-glow hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5 mr-2 text-accent animate-pulse" />
              <span className="text-sm font-medium">🚀 Collaborative Learning Platform</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
            >
              Fuel Your Skills
              <span className="block bg-gradient-to-r from-accent to-white bg-clip-text text-transparent text-neon">
                with Mentorship
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed"
            >
              Join a vibrant network of <span className="text-accent font-medium">10,000+ learners</span> and 
              <span className="text-accent font-medium"> expert mentors</span> sharing knowledge, building futures, 
              and transforming careers together.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-6 mb-12"
            >
              <Link to="/register?role=learner">
                <Button size="lg" className="bg-gradient-primary text-white hover:scale-105 hover:shadow-purple-glow px-10 py-5 text-lg font-semibold transition-all duration-300 group">
                  🎯 Join as Learner
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/register?role=mentor">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 px-10 py-5 text-lg font-semibold backdrop-blur-sm hover:scale-105 hover:shadow-purple-glow transition-all duration-300"
                >
                  🚀 Become a Mentor
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-white/80"
            >
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-400" />
                <span>98% Success Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span>Real-time Matching</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span>Active Community</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* 3D Card Stack Effect */}
            <div className="relative perspective-1000">
              {/* Main Card */}
              <motion.div
                animate={{ rotateY: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="glass-card p-8 transform hover:scale-105 transition-all duration-300 border border-white/20 shadow-purple-glow"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Live Mentorship Session</h3>
                      <p className="text-white/70 text-sm">React Masterclass</p>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-accent to-white/50 rounded-full" />
                    <div className="flex-1 h-2 bg-white/20 rounded-full">
                      <div className="h-full w-3/4 bg-gradient-primary rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-white/50 to-accent rounded-full" />
                    <div className="flex-1 h-2 bg-white/20 rounded-full">
                      <div className="h-full w-1/2 bg-gradient-primary rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">5 learners joined</span>
                  <div className="flex -space-x-2">
                    {[1,2,3,4,5].map((i) => (
                      <div key={i} className="w-6 h-6 bg-gradient-primary rounded-full border-2 border-black" />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Background Cards */}
              <motion.div
                animate={{ rotateY: [0, -3, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute -top-4 -left-4 w-full h-full glass-card border border-white/10 -z-10 opacity-60"
              />
              <motion.div
                animate={{ rotateY: [0, 7, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute -top-8 -right-4 w-full h-full glass-card border border-white/5 -z-20 opacity-30"
              />
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-8 -right-8 glass rounded-xl p-4 border border-white/20"
            >
              <BookOpen className="w-6 h-6 text-accent" />
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-6 -left-6 glass rounded-xl p-4 border border-white/20"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};