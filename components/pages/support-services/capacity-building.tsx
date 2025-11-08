// components/pages/support-services/capacity-building.tsx
import { cn } from "@/lib/utils";
import React from "react";
import { BookOpen, Users, ToolCaseIcon, Target, FileText } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function CapacityBuilding({ className }: { className?: string }) {
  const t = useTranslations('SupportServices.Capacity-Building');
  
  return (
    <section
      className={cn(
        "w-full py-20 px-6 md:px-8 lg:px-16 bg-linear-to-b from-background to-muted/20",
        className
      )}
      id="capacity-building"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                <Target className="w-4 h-4" />
                {t('Badge')}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t('Title')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('Description')}
              </p>
            </div>

            {/* Training Components */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center shrink-0 mt-1">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('Components.Training-Workshops.Title')}</h4>
                  <p className="text-muted-foreground">{t('Components.Training-Workshops.Description')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center shrink-0 mt-1">
                  <ToolCaseIcon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('Components.Tools-Resources.Title')}</h4>
                  <p className="text-muted-foreground">{t('Components.Tools-Resources.Description')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center shrink-0 mt-1">
                  <FileText className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('Components.Needs-Assessment.Title')}</h4>
                  <p className="text-muted-foreground">{t('Components.Needs-Assessment.Description')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center shrink-0 mt-1">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('Components.Knowledge-Dissemination.Title')}</h4>
                  <p className="text-muted-foreground">{t('Components.Knowledge-Dissemination.Description')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Card */}
          <div className="space-y-6">
            <div className="bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/10 rounded-2xl p-8 border border-purple-200 dark:border-purple-800">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-purple-600" />
                {t('Benefits.Title')}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 shrink-0" />
                  <span className="text-foreground">{t('Benefits.List.Evidence-Based-Methodologies')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 shrink-0" />
                  <span className="text-foreground">{t('Benefits.List.Victim-Centric-Approach')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 shrink-0" />
                  <span className="text-foreground">{t('Benefits.List.Policy-Informed-Research')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 shrink-0" />
                  <span className="text-foreground">{t('Benefits.List.Global-Knowledge-Contribution')}</span>
                </li>
              </ul>
            </div>

            {/* Research Impact Card */}
            <div className="bg-muted/50 rounded-2xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                {t('Research-Impact.Title')}
              </h4>
              <p className="text-muted-foreground text-sm">
                {t('Research-Impact.Description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}