import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle } from "lucide-react";

export const NewsletterCTASection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Here you would typically send the email to your backend
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#7F00FF]/20 via-transparent to-[#E100FF]/20" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#7F00FF]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#E100FF]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="glass-card p-12 md:p-16 border border-white/20 hover:shadow-purple-glow transition-all duration-500">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-8 bg-gradient-primary rounded-full flex items-center justify-center"
            >
              <Mail className="w-10 h-10 text-white" />
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-5xl font-bold text-white mb-6"
            >
              Stay in the <span className="bg-gradient-primary bg-clip-text text-transparent">Loop</span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Get exclusive updates about new mentorship opportunities, success stories, 
              and expert insights delivered straight to your inbox.
            </motion.p>

            {/* Email form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              onSubmit={handleSubmit}
              className="max-w-md mx-auto"
            >
              {!isSubmitted ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-accent focus:ring-2 focus:ring-accent/50 text-lg"
                      required
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="h-14 px-8 bg-gradient-primary text-white hover:scale-105 hover:shadow-purple-glow transition-all duration-300 text-lg font-semibold"
                  >
                    Get Updates
                  </Button>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center justify-center gap-3 text-green-400 text-lg"
                >
                  <CheckCircle className="w-6 h-6" />
                  <span>Thanks! You're subscribed to our updates.</span>
                </motion.div>
              )}
            </motion.form>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 text-white/60 text-sm"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Weekly insights</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>No spam, ever</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Unsubscribe anytime</span>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute top-6 right-6 w-3 h-3 bg-accent rounded-full opacity-60 animate-pulse" />
            <div className="absolute bottom-6 left-6 w-2 h-2 bg-white/40 rounded-full opacity-60 animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};