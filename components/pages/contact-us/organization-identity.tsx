// components/pages/contact-us/organization-identity.tsx
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { Target, Eye, Users, Shield } from "lucide-react";

export default function OrganizationIdentity({ className }: { className?: string }) {
  const t = useTranslations('ContactUsPage.OrganizationIdentity');

  const identityPoints = [
    {
      icon: Users,
      title: t('Points.Marginalized.Title'),
      description: t('Points.Marginalized.Description')
    },
    {
      icon: Shield,
      title: t('Points.Activism.Title'),
      description: t('Points.Activism.Description')
    },
    {
      icon: Target,
      title: t('Points.Mission.Title'),
      description: t('Points.Mission.Description')
    },
    {
      icon: Eye,
      title: t('Points.Vision.Title'),
      description: t('Points.Vision.Description')
    }
  ];

  return (
    <section className={cn("w-full py-20 px-6 md:px-16 bg-linear-to-br from-background to-primary/5", className)}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <Shield className="w-4 h-4" />
            {t('Badge')}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            {t('Title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('Description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Identity Points */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {t('AboutTitle')}
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {identityPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-background rounded-2xl border border-border hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                    <point.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {point.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Support Statement */}
          <div className="space-y-6">
            <div className="bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 rounded-2xl p-8 border border-green-200 dark:border-green-800">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t('SupportStatement.Title')}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t('SupportStatement.Description')}
              </p>
              <div className="p-4 bg-green-100 dark:bg-green-800/30 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200 font-medium">
                  {t('SupportStatement.Initiative')}
                </p>
              </div>
            </div>

            {/* Key Focus Areas */}
            <div className="bg-muted/50 rounded-2xl p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-4">
                {t('FocusAreas.Title')}
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">{t('FocusAreas.Capacity')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">{t('FocusAreas.Psychosocial')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">{t('FocusAreas.Legal')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">{t('FocusAreas.Technology')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}