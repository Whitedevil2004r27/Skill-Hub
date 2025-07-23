import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, BookOpen } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Enhanced Floating Elements with Purple Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-float shadow-purple-glow" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-accent/30 rounded-full animate-float shadow-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/15 rounded-full animate-float shadow-purple-glow" style={{ animationDelay: "4s" }} />
        <div className="absolute top-1/3 right-1/5 w-20 h-20 bg-gradient-primary rounded-lg rotate-45 animate-float opacity-20" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-accent/20 rounded-full animate-float shadow-glow" style={{ animationDelay: "3s" }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Enhanced Badge with Glow */}
          <div className="inline-flex items-center px-6 py-3 rounded-full glass border border-white/30 text-white mb-8 shadow-purple-glow hover:scale-105 transition-all duration-300">
            <Sparkles className="w-5 h-5 mr-2 text-accent animate-pulse" />
            <span className="text-sm font-medium">🚀 Collaborative Learning & AI Mentorship</span>
          </div>

          {/* Enhanced Main Heading with Animation */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
            Connect. Learn.
            <span className="block bg-gradient-to-r from-accent to-white bg-clip-text text-transparent text-neon">
              Grow Together.
            </span>
          </h1>

          {/* Enhanced Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "0.3s" }}>
            Experience the future of learning with our collaborative platform. Connect with expert mentors, 
            participate in interactive sessions, and unlock your potential with AI-powered insights.
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-scale-in" style={{ animationDelay: "0.6s" }}>
            <Link to="/register?role=learner">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-10 py-5 text-lg font-semibold shadow-xl hover:scale-105 transition-all duration-300">
                🎯 Find a Mentor
                <ArrowRight className="ml-2 h-5 w-5" />
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
          </div>

          {/* Enhanced Stats with Animation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="glass rounded-2xl p-8 text-center hover-lift shadow-purple-glow animate-fade-in" style={{ animationDelay: "0.9s" }}>
              <Users className="w-10 h-10 text-accent mx-auto mb-4 animate-pulse" />
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-white/80 text-lg">Active Learners</div>
            </div>
            <div className="glass rounded-2xl p-8 text-center hover-lift shadow-purple-glow animate-fade-in" style={{ animationDelay: "1.2s" }}>
              <BookOpen className="w-10 h-10 text-accent mx-auto mb-4 animate-pulse" />
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-white/80 text-lg">Expert Mentors</div>
            </div>
            <div className="glass rounded-2xl p-8 text-center hover-lift shadow-purple-glow animate-fade-in" style={{ animationDelay: "1.5s" }}>
              <Sparkles className="w-10 h-10 text-accent mx-auto mb-4 animate-pulse" />
              <div className="text-3xl font-bold text-white mb-2">98%</div>
              <div className="text-white/80 text-lg">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};