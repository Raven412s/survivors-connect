// components/pages/support-services/legal-aid-advocacy.tsx
import { cn } from "@/lib/utils";
import { Award, FileText, Scale, Users } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function LegalAidAdvocacy({ className }: { className?: string }) {
  const t = useTranslations('SupportServices.Legal-Aid-Advocacy');
  
  return (
    <section
      className={cn(
        "w-full py-20 px-6 md:px-8 lg:px-16 bg-linear-to-b from-muted/10 to-background",
        className
      )}
      id="legal-aid"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium">
                <Scale className="w-4 h-4" />
                {t('Badge')}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t('Title')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('Description')}
              </p>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center shrink-0 mt-1">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('Services.Direct-Legal-Support.Title')}</h4>
                  <p className="text-muted-foreground">{t('Services.Direct-Legal-Support.Description')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center shrink-0 mt-1">
                  <Scale className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('Services.Judicial-Advocacy.Title')}</h4>
                  <p className="text-muted-foreground">{t('Services.Judicial-Advocacy.Description')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center shrink-0 mt-1">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('Services.Compensation.Title')}</h4>
                  <p className="text-muted-foreground">{t('Services.Compensation.Description')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Impact & Stats */}
          <div className="space-y-6">
            <div className="bg-linear-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/10 rounded-2xl p-8 border border-orange-200 dark:border-orange-800">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Award className="w-6 h-6 text-orange-600" />
                {t('Impact.Title')}
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-orange-200 dark:border-orange-700">
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {t('Impact.Compensation-Amount')}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t('Impact.Compensation-Description')}
                  </div>
                </div>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 shrink-0" />
                  <span className="text-foreground">{t('Impact.List.Systemic-Advocacy')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 shrink-0" />
                  <span className="text-foreground">{t('Impact.List.Marginalized-Communities')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 shrink-0" />
                  <span className="text-foreground">{t('Impact.List.Rights-Awareness')}</span>
                </li>
              </ul>
            </div>

            {/* Empowerment Card */}
            <div className="bg-muted/50 rounded-2xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                {t('Empowerment.Title')}
              </h4>
              <p className="text-muted-foreground text-sm">
                {t('Empowerment.Description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}