// app/(with smooth scroll & theming & locale)/(with navbar & Footer)/page.tsx
import HeroSection from "@/components/pages/homepage/hero-section";
import IntroductionSection from "@/components/pages/homepage/introduction-section";
import ImpactSection from "@/components/pages/homepage/impact-section";

export default async function HomePage() {
  return (
    <main className="w-full">
      <HeroSection/>
      <IntroductionSection/>
      <ImpactSection/>
    </main>
  );
}