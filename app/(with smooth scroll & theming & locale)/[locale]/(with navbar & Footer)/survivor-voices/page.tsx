// app/(with smooth scroll & theming & locale)/[locale]/(with navbar & Footer)/survivor-voices/page.tsx
import ImpactSection from "@/components/pages/survivor-voices/impact-section";
import PhilosophySection from "@/components/pages/survivor-voices/philosophy-section";
import ReintegrationStories from "@/components/pages/survivor-voices/reintegration-stories";
import SubmitStorySection from "@/components/pages/survivor-voices/submit-story-section";
import SuccessStories from "@/components/pages/survivor-voices/success-stories";
import TestimoniesSection from "@/components/pages/survivor-voices/testimonies-section";
import { NextIntlClientProvider } from "next-intl";

export default async function SurvivorVoicesPage() {
  return (
    <main className="w-full">
      <PhilosophySection />
      <NextIntlClientProvider>
        <TestimoniesSection />
      </NextIntlClientProvider>
      <ReintegrationStories />
      <SuccessStories />
      <ImpactSection />
      <NextIntlClientProvider>
      <SubmitStorySection />
      </NextIntlClientProvider>
    </main>
  );
}