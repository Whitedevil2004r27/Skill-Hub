import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

import { Header } from "@/components/ui/header";
import { HeroSection } from "@/components/hero-section";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { TopMentorsSection } from "@/components/sections/top-mentors";
import { LearningTracksSection } from "@/components/sections/learning-tracks";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { NewsletterCTASection } from "@/components/sections/newsletter-cta";
import { Footer } from "@/components/ui/footer";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectUser = async () => {
      if (!loading && user) {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("user_id", user.id)
          .single();

        if (error || !profile) {
          // No profile yet — new user
          navigate("/join-learner");
        } else {
          // Redirect based on role
          switch (profile.role) {
            case "learner":
              navigate("/dashboard/learner");
              break;
            case "mentor":
              navigate("/dashboard/mentor");
              break;
            case "both":
              navigate("/dashboard");
              break;
            default:
              navigate("/join-learner");
              break;
          }
        }
      }
    };

    redirectUser();
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <TopMentorsSection />
        <LearningTracksSection />
        <TestimonialsSection />
        <NewsletterCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
