// components/pages/about/current-projects.tsx
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { Cpu, Users, Heart, BookOpen, Target, Zap, Shield } from "lucide-react";

export default function CurrentProjects({ className }: { className?: { className?: string } }) {
  const t = useTranslations('AboutPage.CurrentProjects');

  const projectComponents = [
    {
      icon: Cpu,
      title: t('Components.Online-Community.Title'),
      description: t('Components.Online-Community.Description')
    },
    {
      icon: Heart,
      title: t('Components.Trauma-Tools.Title'),
      description: t('Components.Trauma-Tools.Description')
    },
    {
      icon: Users,
      title: t('Components.Testimonial-Therapy.Title'),
      description: t('Components.Testimonial-Therapy.Description')
    },
    {
      icon: BookOpen,
      title: t('Components.Research.Title'),
      description: t('Components.Research.Description')
    }
  ];

  const connectPlusFeatures = [
    {
      icon: Shield,
      title: t('ConnectPlus.Features.Safe-Space.Title'),
      description: t('ConnectPlus.Features.Safe-Space.Description')
    },
    {
      icon: Users,
      title: t('ConnectPlus.Features.Peer-Support.Title'),
      description: t('ConnectPlus.Features.Peer-Support.Description')
    },
    {
      icon: BookOpen,
      title: t('ConnectPlus.Features.Resource-Hub.Title'),
      description: t('ConnectPlus.Features.Resource-Hub.Description')
    },
    {
      icon: Zap,
      title: t('ConnectPlus.Features.Technology.Title'),
      description: t('ConnectPlus.Features.Technology.Description')
    }
  ];

  return (
    <section className={cn("w-full py-20 px-6 md:px-16 bg-background", className)}>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Project Overview */}
          <div className="space-y-8">
            <div className="bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 rounded-2xl p-8 border border-green-200 dark:border-green-800">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {t('Project-Goal-Title')}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t('Project-Goal-Description')}
              </p>
            </div>

            {/* Project Components */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                {t('Components-Title')}
              </h3>
              <div className="space-y-4">
                {projectComponents.map((component, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg border border-border"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <component.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        {component.title}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {component.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Connect+ Platform */}
          <div className="space-y-8">
            <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="w-8 h-8 text-blue-600" />
                <h3 className="text-2xl font-bold text-foreground">
                  {t('ConnectPlus.Title')}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t('ConnectPlus.Description')}
              </p>
              <blockquote className="text-lg italic text-muted-foreground border-l-4 border-blue-500 pl-4">
                {t('ConnectPlus.Vision')}
              </blockquote>
            </div>

            {/* Connect+ Features */}
            <div>
              <h4 className="text-xl font-semibold text-foreground mb-6">
                {t('ConnectPlus.Features-Title')}
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {connectPlusFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-background rounded-lg p-4 border border-border hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-1 bg-primary/10 rounded">
                        <feature.icon className="w-4 h-4 text-primary" />
                      </div>
                      <h5 className="font-semibold text-foreground">
                        {feature.title}
                      </h5>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}