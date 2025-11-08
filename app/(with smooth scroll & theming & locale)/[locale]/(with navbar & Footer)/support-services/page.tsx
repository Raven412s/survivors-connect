// app/(with smooth scroll & theming & locale)/[locale]/(with navbar & Footer)/support-services/page.tsx
import CapacityBuilding from "@/components/pages/support-services/capacity-building";
import ConnectPlatform from "@/components/pages/support-services/connect-platform";
import IntroductionSection from "@/components/pages/support-services/introduction-section";
import LegalAidAdvocacy from "@/components/pages/support-services/legal-aid-advocacy";
import PsychosocialCare from "@/components/pages/support-services/psychosocial-care";

export default async function SupportServicesPage() {
  return (
    <main className="w-full">
      <IntroductionSection/>
      <ConnectPlatform/>
      <PsychosocialCare />
      <LegalAidAdvocacy />
      <CapacityBuilding />
    </main>
  );
}