import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white/30 rounded-full" />
        <div className="absolute top-32 right-32 w-32 h-32 border border-white/20 rounded-lg rotate-45" />
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-white/40 rounded-full" />
        <div className="absolute bottom-32 right-20 w-24 h-24 border border-white/25 rounded-lg rotate-12" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Join 10,000+ Active Users</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to accelerate
            <span className="block">your growth?</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Start your mentorship journey today. Connect with industry experts, 
            learn new skills, and achieve your career goals faster than ever.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold shadow-xl">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/explore">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm"
              >
                Browse Mentors
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-12 text-white/80">
            <div className="flex items-center">
              <span className="text-sm">✓ No credit card required</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm">✓ Cancel anytime</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm">✓ 30-day money back guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};