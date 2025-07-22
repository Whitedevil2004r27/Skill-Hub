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
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-float" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-accent/20 rounded-full animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/15 rounded-full animate-float" style={{ animationDelay: "4s" }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">AI-Powered Mentorship Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Connect. Learn.
            <span className="block bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">
              Grow Together.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of learners and mentors in our AI-integrated platform. 
            Find your perfect mentor, book sessions, and accelerate your skills with personalized guidance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/register?role=learner">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold shadow-xl">
                Find a Mentor
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/register?role=mentor">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm"
              >
                Become a Mentor
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="glass rounded-2xl p-6 text-center">
              <Users className="w-8 h-8 text-accent mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">10K+</div>
              <div className="text-white/80">Active Users</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <BookOpen className="w-8 h-8 text-accent mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-white/80">Skills Available</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <Sparkles className="w-8 h-8 text-accent mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">98%</div>
              <div className="text-white/80">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};