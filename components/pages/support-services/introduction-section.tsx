// components/pages/support-services/introduction-section.tsx
import { cn } from "@/lib/utils";
import React from "react";
import { Compass, Heart, Shield, Target, Users } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function IntroductionSection({ className }: { className?: string }) {
  const t = useTranslations('SupportServices.Introduction-Section');
  
  return (
    <section
      className={cn(
        "w-full py-24 px-6 md:px-8 lg:px-16 bg-linear-to-b from-background to-muted/20",
        className
      )}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Compass className="w-4 h-4" />
            {t('Mission-Badge')}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            {t.rich('Title', {
              highlight: (chunks) => <span className="text-primary">{chunks}</span>
            })}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('Description')}
          </p>
        </div>

        {/* Services Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t('Services.Connect-Platform.Title')}</h3>
            <p className="text-sm text-muted-foreground">{t('Services.Connect-Platform.Description')}</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t('Services.Psychosocial-Care.Title')}</h3>
            <p className="text-sm text-muted-foreground">{t('Services.Psychosocial-Care.Description')}</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t('Services.Legal-Aid.Title')}</h3>
            <p className="text-sm text-muted-foreground">{t('Services.Legal-Aid.Description')}</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t('Services.Capacity-Building.Title')}</h3>
            <p className="text-sm text-muted-foreground">{t('Services.Capacity-Building.Description')}</p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-linear-to-r from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
          <div className="flex items-start gap-4">
            <Compass className="w-8 h-8 text-primary mt-1 shrink-0" />
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{t('Mission-Statement.Title')}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('Mission-Statement.Description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}