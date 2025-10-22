// app/(with smooth scroll & theming & locale)/[locale]/(with navbar & Footer)/get-involved/page.tsx
import VisionMission from "@/components/pages/get-involved/vision-mission";
import ProfessionalPartners from "@/components/pages/get-involved/professional-partners";
import LegalAdvocacy from "@/components/pages/get-involved/legal-advocacy";
import KnowledgeResearch from "@/components/pages/get-involved/knowledge-research";
import VolunteerInternship from "@/components/pages/get-involved/volunteer-internship";
import SurvivorLeadership from "@/components/pages/get-involved/survivor-leadership";
import ContactResources from "@/components/pages/get-involved/contact-resources";
import { NextIntlClientProvider } from "next-intl";

export default async function GetInvolvedPage() {
  return (
    <main className="w-full">
      <NextIntlClientProvider>
      <VisionMission />
        <ProfessionalPartners />
      <LegalAdvocacy />
      <KnowledgeResearch />
      <VolunteerInternship />
      <SurvivorLeadership />
      <ContactResources />
      </NextIntlClientProvider>
    </main>
  );
}