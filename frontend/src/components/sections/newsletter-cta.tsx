import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle, Sparkles } from "lucide-react";
import Magnet from "@/components/animations/Magnet";

export const NewsletterCTASection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-600/5 to-transparent pointer-events-none" />
      
      <div className="w-full px-6 md:px-12 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full text-center"
        >
          <div className="relative group max-w-5xl mx-auto overflow-hidden rounded-[3rem] glass-card premium-border p-12 md:p-20">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-8">
              <Sparkles className="w-3 h-3 mr-2" />
              Join the newsletter
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Stay in the <span className="text-violet-500 text-gradient">Loop</span>
            </h2>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Get exclusive updates about new mentorship opportunities, success stories, 
              and expert insights delivered straight to your inbox.
            </p>

            {/* Email form */}
            <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto">
              {!isSubmitted ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-16 px-6 bg-white/5 border-white/10 rounded-2xl text-white placeholder:text-gray-500 focus:ring-violet-500/50"
                      required
                    />
                  </div>
                  <Magnet>
                    <Button
                      type="submit"
                      size="lg"
                      className="h-16 px-8 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300"
                    >
                      Get Updates
                    </Button>
                  </Magnet>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center justify-center gap-3 text-violet-400 text-lg bg-violet-500/10 p-4 rounded-2xl border border-violet-500/20"
                >
                  <CheckCircle className="w-6 h-6" />
                  <span>Success! You're in the loop.</span>
                </motion.div>
              )}
            </form>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 mt-10 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-violet-400" />
                <span>Weekly insights</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-violet-400" />
                <span>No spam, ever</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-violet-400" />
                <span>Unsubscribe anytime</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
