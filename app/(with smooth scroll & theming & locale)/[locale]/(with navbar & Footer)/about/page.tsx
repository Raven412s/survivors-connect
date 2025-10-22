// app/(with smooth scroll & theming & locale)/[locale]/(with navbar & Footer)/about/page.tsx
import OrganizationProfile from "@/components/pages/about/organization-profile";
import MissionVision from "@/components/pages/about/mission-vision";
import ActivitiesImpact from "@/components/pages/about/activities-impact";
import CurrentProjects from "@/components/pages/about/current-projects";
import NetworksAffiliations from "@/components/pages/about/networks-affiliations";

export default async function AboutPage() {
  return (
    <main className="w-full">
      <OrganizationProfile />
      <MissionVision />
      <ActivitiesImpact />
      <CurrentProjects />
      <NetworksAffiliations />
    </main>
  );
}