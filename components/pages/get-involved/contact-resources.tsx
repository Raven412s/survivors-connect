// components/pages/get-involved/contact-resources.tsx
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, Globe, Users, Award } from "lucide-react";

export default function ContactResources({ className }: { className?: string }) {
  const t = useTranslations('GetInvolvedPage.ContactResources');

  const contactInfo = [
    {
      icon: MapPin,
      label: t('Contact.Address'),
      value: t('Contact.FullAddress')
    },
    {
      icon: Phone,
      label: t('Contact.Phone'),
      value: "+91-9935599333"
    },
    {
      icon: Mail,
      label: t('Contact.Email'),
      value: "pvchr.india@gmail.com"
    },
    {
      icon: Mail,
      label: t('Contact.AltEmail'),
      value: "shruti@pvchr.asia"
    }
  ];

  const websites = [
    {
      name: t('Websites.JanMitraNyas'),
      url: "https://janmitranyas.in/"
    },
    {
      name: t('Websites.PVCHR'),
      url: "https://pvchr.asia/"
    },
    {
      name: t('Websites.PVCHRBlog'),
      url: "https://pvchr.blogspot.com/"
    },
    {
      name: t('Websites.TestimonialHealing'),
      url: "https://testimonialhealing.blogspot.com/"
    },
    {
      name: t('Websites.YouTube'),
      url: "https://www.youtube.com/user/pvchrindia"
    }
  ];

  const leadership = [
    {
      role: t('Leadership.ProjectManager'),
      name: "Lenin Raghuvanshi"
    },
    {
      role: t('Leadership.ManagingTrustee'),
      name: "Shruti Nagvanshi"
    }
  ];

  return (
    <section className={cn("w-full py-20 px-6 md:px-16 bg-linear-to-br from-muted/50 to-background", className)}>
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
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-background rounded-2xl p-6 border border-border">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                {t('ContactTitle')}
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <info.icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium text-foreground text-sm">
                        {info.label}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {info.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leadership */}
            <div className="bg-muted/50 rounded-2xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-4">
                {t('LeadershipTitle')}
              </h4>
              <div className="space-y-3">
                {leadership.map((person, index) => (
                  <div key={index}>
                    <div className="font-medium text-foreground text-sm">
                      {person.role}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {person.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Websites & Resources */}
          <div className="space-y-6">
            <div className="bg-background rounded-2xl p-6 border border-border">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                {t('WebsitesTitle')}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {websites.map((website, index) => (
                  <a
                    key={index}
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                  >
                    <Globe className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                    <span className="text-sm font-medium text-foreground group-hover:text-primary">
                      {website.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Project Info & Recognition */}
          <div className="space-y-6">
            <div className="bg-linear-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
              <h3 className="text-xl font-bold text-foreground mb-4">
                {t('ProjectInfo.Title')}
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  <strong>{t('ProjectInfo.ProjectName')}:</strong><br />
                  {t('ProjectInfo.Name')}
                </p>
                <p>
                  <strong>{t('ProjectInfo.Goal')}:</strong><br />
                  {t('ProjectInfo.GoalDescription')}
                </p>
              </div>
            </div>

            {/* Recognition */}
            <div className="bg-background rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-primary" />
                <h4 className="font-semibold text-foreground">
                  {t('Recognition.Title')}
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">
                {t('Recognition.Description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}