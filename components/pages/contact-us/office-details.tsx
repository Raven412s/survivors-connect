// components/pages/contact-us/office-details.tsx
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, User, Building } from "lucide-react";

export default function OfficeDetails({ className }: { className?: string }) {
  const t = useTranslations('ContactUsPage.OfficeDetails');

  const offices = [
    {
      type: 'head',
      icon: Building,
      title: t('Offices.Head.Title'),
      address: t('Offices.Head.Address'),
      contacts: [
        { type: 'phone', value: "+91 99355 99333", label: t('Offices.Head.Phone1') },
        { type: 'phone', value: "+91 99355 99330", label: t('Offices.Head.Phone2') }
      ],
      emails: [
        "pvchr.india@gmail.com",
        "shruti@pvchr.asia"
      ]
    }
  ];

  const representatives = [
    {
      name: "Shruti Nagvanshi",
      role: t('Representatives.ManagingTrustee')
    },
    {
      name: "Lenin Raghuvanshi", 
      role: t('Representatives.FounderAdvisor')
    }
  ];

  return (
    <section className={cn("w-full py-20 px-6 md:px-16 bg-background", className)}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl font-bold text-foreground">
            {t('Title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('Description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Office Information */}
          <div className="lg:col-span-2 space-y-8">
            {offices.map((office, index) => (
              <div
                key={index}
                className="bg-background rounded-2xl p-8 border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <office.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {office.title}
                  </h3>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4 mb-6">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {t('Address')}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {office.address}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Numbers */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      {t('PhoneNumbers')}
                    </h4>
                    <div className="space-y-2">
                      {office.contacts.map((contact, contactIndex) => (
                        <div key={contactIndex} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <div>
                            <div className="text-sm font-medium text-foreground">
                              {contact.value}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {contact.label}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Email Addresses */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      {t('EmailAddresses')}
                    </h4>
                    <div className="space-y-2">
                      {office.emails.map((email, emailIndex) => (
                        <a
                          key={emailIndex}
                          href={`mailto:${email}`}
                          className="flex items-center gap-3 group"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                            {email}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Key Representatives */}
          <div className="space-y-6">
            <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                {t('RepresentativesTitle')}
              </h3>
              <div className="space-y-4">
                {representatives.map((person, index) => (
                  <div key={index} className="p-4 bg-white/50 dark:bg-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-700">
                    <h4 className="font-semibold text-foreground mb-1">
                      {person.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {person.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-muted/50 rounded-2xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-4">
                {t('OperatingHours.Title')}
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>{t('OperatingHours.Weekdays')}</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('OperatingHours.Weekends')}</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('OperatingHours.Emergency')}</span>
                  <span className="font-medium text-green-600">24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}