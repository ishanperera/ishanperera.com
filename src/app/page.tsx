import { HeroSection } from "@/components/landing/HeroSection";
import { BentoGrid } from "@/components/landing/BentoGrid";
import { FeaturedWork } from "@/components/landing/FeaturedWork";
import { CTASection } from "@/components/landing/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BentoGrid />
      <FeaturedWork />
      <CTASection />
    </>
  );
}
