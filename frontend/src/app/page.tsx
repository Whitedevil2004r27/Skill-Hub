"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/ui/header";
import { HeroSection } from "@/components/hero-section";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { TopMentorsSection } from "@/components/sections/top-mentors";
import { LearningTracksSection } from "@/components/sections/learning-tracks";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { NewsletterCTASection } from "@/components/sections/newsletter-cta";
import { Footer } from "@/components/ui/footer";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Note: Migration to global Supabase/Auth will follow
  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return null;

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
}
