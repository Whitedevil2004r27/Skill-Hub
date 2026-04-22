import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, Target, Zap } from "lucide-react";
import BackgroundCanvas from "@/components/animations/BackgroundCanvas";
import SplineHero from "@/components/SplineHero";
import BlurText from "@/components/animations/BlurText";
import Magnet from "@/components/animations/Magnet";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030303]">
      <BackgroundCanvas />
      
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-8">
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
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.1)] hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 mr-2 text-violet-400 animate-pulse" />
              <span className="text-xs font-medium tracking-wider uppercase">🚀 Future of Learning</span>
            </motion.div>

            {/* Main Heading */}
            <div className="mb-6">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                Unlock Your Potential with <br />
                <span className="text-gradient">Collaborative Learning</span>
              </h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="text-lg md:text-xl text-gray-400 mb-8 max-w-xl leading-relaxed"
            >
              Join a vibrant network of <span className="text-white font-medium">10,000+ learners</span> and 
              <span className="text-white font-medium"> expert mentors</span> building the future of tech together.
            </motion.p>

            {/* Course Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="relative w-full max-w-lg mb-10 group"
            >
              <div className="absolute inset-0 bg-violet-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center bg-white/5 border border-white/10 p-2 rounded-2xl backdrop-blur-xl focus-within:border-violet-500/50 transition-all">
                <Target className="w-5 h-5 ml-4 text-violet-400" />
                <input 
                  type="text" 
                  placeholder="What do you want to learn today?" 
                  className="bg-transparent border-none text-white placeholder:text-gray-500 px-4 py-2 w-full focus:ring-0 text-sm"
                />
                <Button className="bg-violet-600 hover:bg-violet-500 rounded-xl px-6 h-10 shadow-lg shadow-violet-900/20">
                  Search
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-6 mb-12"
            >
              <Magnet>
                <Link href="/register?role=learner">
                  <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white px-10 py-6 text-lg font-semibold rounded-2xl shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-300 group">
                    🎯 Join as Learner
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </Magnet>
              
              <Magnet>
                <Link href="/register?role=mentor">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white/10 bg-white/5 text-white hover:bg-white/10 px-10 py-6 text-lg font-semibold rounded-2xl backdrop-blur-md transition-all duration-300"
                  >
                    🚀 Become a Mentor
                  </Button>
                </Link>
              </Magnet>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-wrap gap-8 text-gray-400"
            >
              <div className="flex items-center gap-2 group cursor-default">
                <Target className="w-5 h-5 text-violet-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">98% Success Rate</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <Zap className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Real-time Matching</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <Users className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Active Community</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Spline Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            className="relative flex justify-center items-center group"
          >
            <motion.div 
              animate={{ 
                y: [0, -20, 0],
                rotateZ: [0, 1, 0]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-full h-full min-h-[500px]"
            >
              <SplineHero />
            </motion.div>
            
            {/* Ambient glows around the 3D scene */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-600/30 rounded-full blur-[120px] -z-10 group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-[100px] -z-10 group-hover:scale-125 transition-transform duration-1000" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
