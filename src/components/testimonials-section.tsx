import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Developer",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b367?w=100&h=100&fit=crop&crop=face",
    content: "MentorMatch helped me transition from marketing to tech. My mentor guided me through every step of learning to code.",
    rating: 5,
    skill: "Web Development"
  },
  {
    name: "Marcus Johnson",
    role: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    content: "The AI matching system is incredible. It paired me with a mentor who understood exactly what I needed to grow in my career.",
    rating: 5,
    skill: "Product Strategy"
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    content: "Found my dream mentor in just days. The platform makes it so easy to connect and schedule sessions. Highly recommend!",
    rating: 5,
    skill: "UI/UX Design"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Loved by
            <span className="bg-gradient-accent bg-clip-text text-transparent"> thousands</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what our community of learners and mentors have to say about their experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="relative p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-primary mb-4 opacity-60" />

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* User Info */}
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>

              {/* Skill Badge */}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                  {testimonial.skill}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};