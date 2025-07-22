import { Calendar, MessageCircle, Users, Brain, Star, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description: "Our intelligent algorithm matches you with the perfect mentor based on your goals, skills, and learning style."
  },
  {
    icon: Calendar,
    title: "Easy Booking",
    description: "Schedule mentorship sessions with integrated calendar and automatic reminders for both parties."
  },
  {
    icon: MessageCircle,
    title: "Real-time Chat",
    description: "Connect with mentors instantly through our modern chat system with file sharing and code snippets."
  },
  {
    icon: Users,
    title: "Community Forums",
    description: "Join discussions, ask questions, and share knowledge in our vibrant community of learners and experts."
  },
  {
    icon: Star,
    title: "Skill Tracking",
    description: "Monitor your progress with detailed analytics and skill assessments to see how much you've grown."
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description: "All mentors are verified professionals with proven expertise in their respective fields."
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Everything you need to
            <span className="bg-gradient-primary bg-clip-text text-transparent"> succeed</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with human expertise to create 
            the ultimate learning experience for ambitious individuals.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};