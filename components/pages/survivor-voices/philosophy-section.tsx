// components/pages/survivor-voices/philosophy-section.tsx
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { Heart, Shield, Users, Mic } from "lucide-react";

export default function PhilosophySection({ className }: { className?: string }) {
  const t = useTranslations('SurvivorVoicesPage.Philosophy');

  const philosophyPoints = [
    {
      icon: Mic,
      title: t('Points.Empowerment.Title'),
      description: t('Points.Empowerment.Description')
    },
    {
      icon: Heart,
      title: t('Points.Dignity.Title'),
      description: t('Points.Dignity.Description')
    },
    {
      icon: Users,
      title: t('Points.Solidarity.Title'),
      description: t('Points.Solidarity.Description')
    },
    {
      icon: Shield,
      title: t('Points.Advocacy.Title'),
      description: t('Points.Advocacy.Description')
    }
  ];

  return (
    <section className={cn("w-full py-20 px-6 md:px-16 bg-linear-to-br from-background to-primary/5", className)}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <Heart className="w-4 h-4" />
            {t('Badge')}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            {t('Title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('Description')}
          </p>
        </div>

        {/* Philosophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {philosophyPoints.map((point, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300 group"
            >
              <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <point.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {point.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Connect+ Platform Info */}
        <div className="mt-16 bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
              <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              {t('ConnectPlus.Title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {t('ConnectPlus.Description')}
              </p>
              <blockquote className="text-lg italic text-muted-foreground border-l-4 border-blue-500 pl-4">
                {t('ConnectPlus.Vision')}
              </blockquote>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">
                {t('ConnectPlus.Features.Title')}
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  {t('ConnectPlus.Features.SafeSpace')}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  {t('ConnectPlus.Features.ResourceHub')}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  {t('ConnectPlus.Features.Security')}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  {t('ConnectPlus.Features.Support')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}