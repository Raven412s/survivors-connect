// app/(with smooth scroll & theming & locale)/[locale]/(with navbar & Footer)/get-involved/page.tsx
import ContactResources from "@/components/pages/get-involved/contact-resources";
import KnowledgeResearch from "@/components/pages/get-involved/knowledge-research";
import LegalAdvocacy from "@/components/pages/get-involved/legal-advocacy";
import ProfessionalPartners from "@/components/pages/get-involved/professional-partners";
import SurvivorLeadership from "@/components/pages/get-involved/survivor-leadership";
import VisionMission from "@/components/pages/get-involved/vision-mission";
import VolunteerInternship from "@/components/pages/get-involved/volunteer-internship";

export default async function GetInvolvedPage() {
  return (
    <main className="w-full">
      <VisionMission />
      <ProfessionalPartners />
      <LegalAdvocacy />
      <KnowledgeResearch />
      <VolunteerInternship />
      <SurvivorLeadership />
      <ContactResources />
    </main>
  );
}