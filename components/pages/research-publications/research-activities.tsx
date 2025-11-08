// components/pages/research-publications/research-activities.tsx
import { cn } from "@/lib/utils";
import React from "react";
import { Globe, Users, FileText, Target, Award } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function ResearchActivities({ className }: { className?: string }) {
  const t = useTranslations('ResearchPublications.Research-Activities');
  
  return (
    <section
      className={cn(
        "w-full py-20 px-6 md:px-8 lg:px-16 bg-linear-to-b from-muted/20 to-background",
        className
      )}
      id="research-activities"
    >
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
            <Target className="w-4 h-4" />
            {t('Badge')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t('Title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('Description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Global Research Card */}
          <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">{t('Global-Research.Title')}</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                <span className="text-sm text-muted-foreground">{t('Global-Research.IRCT-Participation')}</span>
              </div>
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                <span className="text-sm text-muted-foreground">{t('Global-Research.Comparative-Analysis')}</span>
              </div>
              <div className="flex items-start gap-2">
                <Target className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                <span className="text-sm text-muted-foreground">{t('Global-Research.Global-Visibility')}</span>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <h4 className="font-semibold text-foreground text-sm mb-2">{t('Global-Research.Impact.Title')}</h4>
              <p className="text-sm text-muted-foreground">{t('Global-Research.Impact.Description')}</p>
            </div>
          </div>

          {/* Qualitative Research Card */}
          <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">{t('Qualitative-Research.Title')}</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-purple-600 mt-1 shrink-0" />
                <span className="text-sm text-muted-foreground">{t('Qualitative-Research.Testimonial-Analysis')}</span>
              </div>
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 text-purple-600 mt-1 shrink-0" />
                <span className="text-sm text-muted-foreground">{t('Qualitative-Research.Participatory-Sessions')}</span>
              </div>
              <div className="flex items-start gap-2">
                <Target className="w-4 h-4 text-purple-600 mt-1 shrink-0" />
                <span className="text-sm text-muted-foreground">{t('Qualitative-Research.Field-Documentation')}</span>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
              <h4 className="font-semibold text-foreground text-sm mb-2">{t('Qualitative-Research.Research-Base.Title')}</h4>
              <p className="text-sm text-muted-foreground">{t('Qualitative-Research.Research-Base.Description')}</p>
            </div>
          </div>

          {/* Policy Influence Card */}
          <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">{t('Policy-Influence.Title')}</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-orange-600 mt-1 shrink-0" />
                <span className="text-sm text-muted-foreground">{t('Policy-Influence.Policy-Writing')}</span>
              </div>
              <div className="flex items-start gap-2">
                <Target className="w-4 h-4 text-orange-600 mt-1 shrink-0" />
                <span className="text-sm text-muted-foreground">{t('Policy-Influence.Advocacy')}</span>
              </div>
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 text-orange-600 mt-1 shrink-0" />
                <span className="text-sm text-muted-foreground">{t('Policy-Influence.Thematic-Analysis')}</span>
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
              <h4 className="font-semibold text-foreground text-sm mb-2">{t('Policy-Influence.Impact.Title')}</h4>
              <p className="text-sm text-muted-foreground">{t('Policy-Influence.Impact.Description')}</p>
            </div>
          </div>
        </div>

        {/* Image Placeholder - Research Team in Action */}
        <div className="mt-16 bg-muted rounded-2xl p-8 border border-border h-64 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Users className="w-12 h-12 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground italic">
              {t('Image-Placeholder.Research-Team')}
            </p>
          </div>
          {/* Replace with actual image of research team conducting interviews or analysis sessions */}
        </div>
      </div>
    </section>
  );
}