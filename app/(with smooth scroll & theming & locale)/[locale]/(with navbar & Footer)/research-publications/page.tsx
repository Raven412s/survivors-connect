// app/(with smooth scroll & theming & locale)/[locale]/(with navbar & Footer)/research-publications/page.tsx
import ArchivesResources from "@/components/pages/research-publications/archives-resources";
import IntroductionSection from "@/components/pages/research-publications/introduction-section";
import Publications from "@/components/pages/research-publications/publications";

export default async function ResearchPublicationsPage() {
  return (
    <main className="w-full">
      <IntroductionSection />
      {/* <ResearchActivities /> */}
      <Publications />
      <ArchivesResources />
    </main>
  );
}