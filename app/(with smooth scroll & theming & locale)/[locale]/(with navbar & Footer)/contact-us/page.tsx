// app/(with smooth scroll & theming & locale)/[locale]/(with navbar & Footer)/contact-us/page.tsx
import OrganizationIdentity from "@/components/pages/contact-us/organization-identity";
import OfficeDetails from "@/components/pages/contact-us/office-details";
import ContactFormSection from "@/components/pages/contact-us/contact-form-section";
import EmergencyHelp from "@/components/pages/contact-us/emergency-help";
import DigitalResources from "@/components/pages/contact-us/digital-resources";
import CallToAction from "@/components/pages/contact-us/call-to-action";
import { NextIntlClientProvider } from "next-intl";

export default async function ContactUsPage() {
  return (
    <main className="w-full">
      <NextIntlClientProvider>
      <OrganizationIdentity />
      <EmergencyHelp />
      <OfficeDetails />
      <ContactFormSection />
      <DigitalResources />
      <CallToAction />
      </NextIntlClientProvider>
    </main>
  );
}