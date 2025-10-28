// app/(with smooth scroll & theming & locale)/[locale]/(with navbar & Footer)/contact-us/page.tsx
import CallToAction from "@/components/pages/contact-us/call-to-action";
import ContactFormSection from "@/components/pages/contact-us/contact-form-section";
import DigitalResources from "@/components/pages/contact-us/digital-resources";
import EmergencyHelp from "@/components/pages/contact-us/emergency-help";
import OfficeDetails from "@/components/pages/contact-us/office-details";
import OrganizationIdentity from "@/components/pages/contact-us/organization-identity";

export default async function ContactUsPage() {
  return (
    <main className="w-full">
      <OrganizationIdentity />
      <EmergencyHelp />
      <OfficeDetails />
      <ContactFormSection />
      <DigitalResources />
      <CallToAction />
    </main>
  );
}