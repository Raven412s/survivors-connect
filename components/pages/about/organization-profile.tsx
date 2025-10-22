// components/pages/about/organization-profile.tsx
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, Globe, Calendar, DollarSign } from "lucide-react";

export default function OrganizationProfile({ className }: { className?: string }) {
  const t = useTranslations('AboutPage.OrganizationProfile');

  const contactInfo = [
    { icon: MapPin, label: t('Address'), value: t('Full-Address') },
    { icon: Phone, label: t('Phone'), value: "+91-9935599333 / +91-9935599330" },
    { icon: Mail, label: t('Email'), value: "pvchr.india@gmail.com" },
    { icon: Mail, label: t('Email-Alt'), value: "shruti@pvchr.asia" },
  ];

  const websiteLinks = [
    { label: "Jan Mitra Nyas", href: "https://janmitranyas.in/" },
    { label: "PVCHR", href: "https://pvchr.asia/" },
    { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/People%27s_Vigilance_Committee_on_Human_Rights" },
    { label: "PVCHR Blog", href: "https://pvchr.blogspot.com/" },
    { label: "Testimonial Healing", href: "https://testimonialhealing.blogspot.com/" },
  ];

  const financialInfo = [
    { icon: DollarSign, label: t('Annual-Budget'), value: "$158,430" },
    { icon: DollarSign, label: t('Donation-Status'), value: "$71,175" },
    { icon: Calendar, label: t('Established'), value: "1999" },
  ];

  return (
    <section className={cn("w-full py-10 md:py-8  px-6 md:px-16 bg-linear-to-br from-background to-muted/30", className)}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <Globe className="w-4 h-4" />
            {t('Badge')}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            {t.rich('Title', {
              organization: (chunks) => <span className="text-primary">{chunks}</span>
            })}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('Description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-background rounded-2xl p-8 border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-primary" />
                {t('Contact-Title')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <info.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-sm">{info.label}</h3>
                      <p className="text-muted-foreground mt-1">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Website Links */}
            <div className="bg-background rounded-2xl p-8 border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t('Websites-Title')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {websiteLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                  >
                    <Globe className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                    <span className="text-sm font-medium text-foreground group-hover:text-primary">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Financial & Establishment Info */}
          <div className="space-y-6">
            <div className="bg-linear-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t('Financial-Title')}
              </h2>
              <div className="space-y-4">
                {financialInfo.map((info, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <info.icon className="w-4 h-4 text-primary" />
                      <span className="font-medium text-foreground text-sm">
                        {info.label}
                      </span>
                    </div>
                    <span className="font-bold text-foreground">
                      {info.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Geographic Context */}
            <div className="bg-muted/50 rounded-2xl p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-3">
                {t('Geographic-Title')}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('Geographic-Description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}