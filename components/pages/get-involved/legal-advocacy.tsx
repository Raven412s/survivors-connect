// components/pages/get-involved/legal-advocacy.tsx
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { Scale, Megaphone, Users, FileText } from "lucide-react";

export default function LegalAdvocacy({ className }: { className?: string }) {
  const t = useTranslations('GetInvolvedPage.LegalAdvocacy');

  const advocacyAreas = [
    {
      icon: Megaphone,
      title: t('Areas.BreakSilence.Title'),
      description: t('Areas.BreakSilence.Description')
    },
    {
      icon: FileText,
      title: t('Areas.AmplifyCases.Title'),
      description: t('Areas.AmplifyCases.Description')
    },
    {
      icon: Users,
      title: t('Areas.YouthEngagement.Title'),
      description: t('Areas.YouthEngagement.Description')
    }
  ];

  const keyCases = [
    t('KeyCases.CustodyToCoffin'),
    t('KeyCases.LibertyDenied'),
    t('KeyCases.StationHouseOfficer')
  ];

  return (
    <section className={cn("w-full py-20 px-6 md:px-16 bg-muted/30", className)}>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Advocacy Areas */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-foreground">
              {t('AreasTitle')}
            </h3>
            <div className="space-y-6">
              {advocacyAreas.map((area, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-background rounded-2xl border border-border hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                    <area.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {area.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Cases & Impact */}
          <div className="space-y-8">
            <div className="bg-linear-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/10 rounded-2xl p-8 border border-orange-200 dark:border-orange-800">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-6 h-6 text-orange-600" />
                <h3 className="text-2xl font-bold text-foreground">
                  {t('KeyCasesTitle')}
                </h3>
              </div>
              <div className="space-y-3 mb-4">
                {keyCases.map((caseName, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-muted-foreground">{caseName}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {t('KeyCasesDescription')}
              </p>
            </div>

            {/* Youth Program Stats */}
            <div className="bg-background rounded-2xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-4">
                {t('YouthProgram.Title')}
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">500+</div>
                  <div className="text-xs text-muted-foreground">
                    {t('YouthProgram.YoungLeaders')}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">42</div>
                  <div className="text-xs text-muted-foreground">
                    {t('YouthProgram.SurvivorsCounselled')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}