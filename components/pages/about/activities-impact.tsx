// components/pages/about/activities-impact.tsx
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { Target, Users, Heart, Shield, BookOpen, Scale } from "lucide-react";

export default function ActivitiesImpact({ className }: { className?: string }) {
  const t = useTranslations('AboutPage.ActivitiesImpact');

  const corePrograms = [
    {
      icon: Shield,
      title: t('Programs.Torture-Survivors.Title'),
      description: t('Programs.Torture-Survivors.Description')
    },
    {
      icon: Target,
      title: t('Programs.Model-Villages.Title'),
      description: t('Programs.Model-Villages.Description')
    },
    {
      icon: Users,
      title: t('Programs.Women-Children.Title'),
      description: t('Programs.Women-Children.Description')
    },
    {
      icon: Scale,
      title: t('Programs.Advocacy.Title'),
      description: t('Programs.Advocacy.Description')
    }
  ];

  const impactStats = [
    { value: "927", label: t('Stats.Testimonial-Interventions') },
    { value: "1,954", label: t('Stats.Meta-Legal-Interventions') },
    { value: "185", label: t('Stats.Legal-Interventions') },
    { value: "9,485", label: t('Stats.Medical-Interventions') },
    { value: "₹95.5M", label: t('Stats.Compensation') },
    { value: "200+", label: t('Stats.Survivors-Supported') }
  ];

  const recentActivities = [
    {
      icon: Heart,
      title: t('Recent.Activities.Health-Workshops.Title'),
      description: t('Recent.Activities.Health-Workshops.Description')
    },
    {
      icon: Users,
      title: t('Recent.Activities.Youth-Leadership.Title'),
      description: t('Recent.Activities.Youth-Leadership.Description')
    },
    {
      icon: BookOpen,
      title: t('Recent.Activities.Food-Security.Title'),
      description: t('Recent.Activities.Food-Security.Description')
    },
    {
      icon: Shield,
      title: t('Recent.Activities.Child-Protection.Title'),
      description: t('Recent.Activities.Child-Protection.Description')
    }
  ];

  return (
    <section className={cn("w-full py-20 px-6 md:px-16 bg-muted/30", className)}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <Target className="w-4 h-4" />
            {t('Badge')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            {t('Title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('Description')}
          </p>
        </div>

        {/* Core Programs */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">
            {t('Programs-Title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {corePrograms.map((program, index) => (
              <div
                key={index}
                className="bg-background rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300 group"
              >
                <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <program.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-3">
                  {program.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {program.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">
            {t('Impact-Title')}
          </h3>
          <div className="bg-linear-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {impactStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div>
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">
            {t('Recent-Title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="bg-background rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <activity.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground">
                    {activity.title}
                  </h4>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {activity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}