// components/pages/events-activities/project-overview.tsx
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { Target, MapPin, Users, Heart } from "lucide-react";

export default function ProjectOverview({ className }: { className?: string }) {
  const t = useTranslations('EventsActivitiesPage.ProjectOverview');

  const projectDetails = [
    {
      icon: Target,
      title: t('Details.Goal.Title'),
      description: t('Details.Goal.Description')
    },
    {
      icon: MapPin,
      title: t('Details.Locations.Title'),
      description: t('Details.Locations.Description')
    },
    {
      icon: Users,
      title: t('Details.Approach.Title'),
      description: t('Details.Approach.Description')
    },
    {
      icon: Heart,
      title: t('Details.Impact.Title'),
      description: t('Details.Impact.Description')
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

        {/* Project Focus Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {projectDetails.map((detail, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300 group"
            >
              <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <detail.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {detail.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {detail.description}
              </p>
            </div>
          ))}
        </div>

        {/* Project Timeline */}
        <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            {t('Timeline.Title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-2">Jan 2025</div>
              <div className="text-sm text-muted-foreground">{t('Timeline.Start')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-2">Aug 2025</div>
              <div className="text-sm text-muted-foreground">{t('Timeline.MidPoint')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-2">Dec 2025</div>
              <div className="text-sm text-muted-foreground">{t('Timeline.Completion')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}