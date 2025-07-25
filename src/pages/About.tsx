import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Zap, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              About SkillHub
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're building the future of collaborative learning, where mentorship meets innovation 
              to unlock human potential across the globe.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  SkillHub exists to democratize access to mentorship and knowledge sharing. 
                  We believe that everyone deserves the opportunity to learn from experienced 
                  professionals and grow their skills, regardless of their background or location.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Through our platform, we connect passionate learners with dedicated mentors, 
                  creating a vibrant ecosystem where knowledge flows freely and careers flourish.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-400 rounded-lg blur-lg opacity-20"></div>
                <Card className="relative backdrop-blur-sm border-white/10">
                  <CardContent className="p-8">
                    <div className="grid grid-cols-2 gap-6 text-center">
                      <div>
                        <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                        <div className="text-sm text-muted-foreground">Active Learners</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-primary mb-2">500+</div>
                        <div className="text-sm text-muted-foreground">Expert Mentors</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-primary mb-2">50+</div>
                        <div className="text-sm text-muted-foreground">Countries</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-primary mb-2">95%</div>
                        <div className="text-sm text-muted-foreground">Success Rate</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Users,
                  title: "Community First",
                  description: "We prioritize building genuine connections and fostering a supportive learning environment."
                },
                {
                  icon: Target,
                  title: "Goal-Oriented",
                  description: "Every interaction is designed to help learners achieve their specific career objectives."
                },
                {
                  icon: Zap,
                  title: "Innovation",
                  description: "We continuously evolve our platform to provide cutting-edge learning experiences."
                },
                {
                  icon: Heart,
                  title: "Empathy",
                  description: "We understand the challenges of learning and create inclusive spaces for growth."
                }
              ].map((value, index) => (
                <Card key={index} className="backdrop-blur-sm border-white/10 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-purple-400 flex items-center justify-center">
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of learners and mentors who are already transforming their careers through SkillHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-purple-400 hover:shadow-lg hover:shadow-primary/25">
                Join as Learner
              </Button>
              <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10">
                Become a Mentor
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;