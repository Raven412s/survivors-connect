// components/pages/about/mission-vision.tsx
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { Target, Eye, Users, Shield } from "lucide-react";

export default function MissionVision({ className }: { className?: string }) {
  const t = useTranslations('AboutPage.MissionVision');

  const leadership = [
    {
      role: t('Leadership.Managing-Trustee'),
      name: "Shruti Nagvanshi"
    },
    {
      role: t('Leadership.Founder-Advisor'),
      name: "Lenin Raghuvanshi"
    },
    {
      role: t('Leadership.Board-Chair'),
      name: "Sant Vivek Das"
    }
  ];

  const trustees = [
    "Lal Bahadur Ram",
    "Prof. Shahina Rizvi", 
    "Dr. Mahendra Pratap"
  ];

  return (
    <section className={cn("w-full py-20 px-6 md:px-16 bg-background", className)}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Mission & Vision */}
          <div className="space-y-8">
            {/* Mission */}
            <div className="bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 rounded-2xl p-8 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-800/30 rounded-lg">
                  <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {t('Mission-Title')}
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t('Mission-Description')}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
                  <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {t('Vision-Title')}
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t('Vision-Description')}
              </p>
            </div>
          </div>

          {/* Leadership */}
          <div className="space-y-8">
            <div className="bg-background rounded-2xl p-8 border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Users className="w-6 h-6 text-primary" />
                {t('Leadership-Title')}
              </h2>
              
              <div className="space-y-6">
                {leadership.map((person, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Shield className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{person.name}</h3>
                      <p className="text-sm text-muted-foreground">{person.role}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Board of Trustees */}
              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="font-semibold text-foreground mb-4">
                  {t('Board-Trustees')}
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {trustees.map((trustee, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">{trustee}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Establishment Purpose */}
            <div className="bg-muted/50 rounded-2xl p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-3">
                {t('Purpose-Title')}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('Purpose-Description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}