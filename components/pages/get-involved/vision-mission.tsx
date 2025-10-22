// components/pages/get-involved/vision-mission.tsx
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { Target, Eye, Users, Shield } from "lucide-react";

export default function VisionMission({ className }: { className?: string }) {
  const t = useTranslations('GetInvolvedPage.VisionMission');

  const missionPoints = [
    {
      icon: Target,
      title: t('MissionPoints.Rights.Title'),
      description: t('MissionPoints.Rights.Description')
    },
    {
      icon: Shield,
      title: t('MissionPoints.Eliminate.Title'),
      description: t('MissionPoints.Eliminate.Description')
    },
    {
      icon: Users,
      title: t('MissionPoints.Movement.Title'),
      description: t('MissionPoints.Movement.Description')
    },
    {
      icon: Eye,
      title: t('MissionPoints.Democracy.Title'),
      description: t('MissionPoints.Democracy.Description')
    }
  ];

  return (
    <section className={cn("w-full py-20 px-6 md:px-16 bg-linear-to-br from-background to-primary/5", className)}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <Target className="w-4 h-4" />
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
          {/* Vision */}
          <div className="space-y-6">
            <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-foreground">
                  {t('Vision.Title')}
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t('Vision.Description')}
              </p>
            </div>

            {/* Project Goal */}
            <div className="bg-muted/50 rounded-2xl p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {t('ProjectGoal.Title')}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('ProjectGoal.Description')}
              </p>
            </div>
          </div>

          {/* Mission Points */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t('MissionTitle')}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {missionPoints.map((point, index) => (
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
                    <p className="text-muted-foreground text-sm">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}