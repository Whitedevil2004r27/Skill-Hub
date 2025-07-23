import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Frontend Developer",
    company: "Stripe",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face",
    content: "SkillHub connected me with an amazing mentor who helped me land my dream job at Stripe. The personalized guidance and real-world insights were invaluable.",
    rating: 5,
    track: "Web Development"
  },
  {
    id: 2,
    name: "Maria Santos",
    role: "UX Designer",
    company: "Adobe",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face",
    content: "The design mentorship program completely transformed my approach to user experience. I went from junior to senior designer in just 8 months!",
    rating: 5,
    track: "UI/UX Design"
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Data Scientist",
    company: "Netflix",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face",
    content: "Learning machine learning through SkillHub's mentorship was incredible. My mentor's hands-on approach and industry experience made all the difference.",
    rating: 5,
    track: "Data Science"
  },
  {
    id: 4,
    name: "Sophie Chen",
    role: "Product Manager",
    company: "Spotify",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b367?w=80&h=80&fit=crop&crop=face",
    content: "SkillHub helped me transition from engineering to product management. The mentorship community here is supportive and genuinely invested in your success.",
    rating: 5,
    track: "Product Management"
  },
  {
    id: 5,
    name: "Ryan Kumar",
    role: "Mobile Developer",
    company: "Uber",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    content: "The React Native mentorship track gave me the confidence to build production-level mobile apps. Now I'm leading mobile development at Uber!",
    rating: 5,
    track: "Mobile Development"
  }
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length]
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white/5 to-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Success <span className="bg-gradient-primary bg-clip-text text-transparent">Stories</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Hear from our community members who transformed their careers through mentorship
          </p>
        </motion.div>

        {/* Desktop: 3 cards */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-12">
          {visibleTestimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.id}-${currentIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>

        {/* Tablet: 2 cards */}
        <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-8 mb-12">
          {visibleTestimonials.slice(0, 2).map((testimonial, index) => (
            <motion.div
              key={`${testimonial.id}-${currentIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>

        {/* Mobile: 1 card */}
        <div className="md:hidden mb-12">
          <motion.div
            key={`${visibleTestimonials[0].id}-${currentIndex}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="group"
          >
            <TestimonialCard testimonial={visibleTestimonials[0]} />
          </motion.div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-gradient-primary shadow-purple-glow"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  return (
    <div className="glass-card p-8 hover:shadow-purple-glow transition-all duration-500 border border-white/10 relative group overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
      
      {/* Quote icon */}
      <Quote className="w-8 h-8 text-accent mb-4 opacity-60" />

      {/* Content */}
      <p className="text-white/90 leading-relaxed mb-6 text-lg">
        "{testimonial.content}"
      </p>

      {/* Rating */}
      <div className="flex items-center mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
      </div>

      {/* Profile */}
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-primary mr-4">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div>
          <div className="font-semibold text-white">{testimonial.name}</div>
          <div className="text-white/70 text-sm">{testimonial.role} at {testimonial.company}</div>
        </div>
      </div>

      {/* Track badge */}
      <div className="absolute top-4 right-4">
        <span className="px-3 py-1 text-xs bg-accent/20 text-accent rounded-full border border-accent/30">
          {testimonial.track}
        </span>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-4 right-4 w-2 h-2 bg-accent/40 rounded-full opacity-60 group-hover:animate-pulse" />
    </div>
  );
};