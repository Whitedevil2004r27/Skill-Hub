import { Header } from "@/components/ui/header";
import { HeroSection } from "@/components/hero-section";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { TopMentorsSection } from "@/components/sections/top-mentors";
import { LearningTracksSection } from "@/components/sections/learning-tracks";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { NewsletterCTASection } from "@/components/sections/newsletter-cta";
import { Footer } from "@/components/ui/footer";

const Index = () => {
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
