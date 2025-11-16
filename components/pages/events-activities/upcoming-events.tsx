// components/pages/events-activities/upcoming-events.tsx
"use client"
import { handleGotoFooter } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { ArrowRight, Calendar, Target } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function UpcomingEvents({ className }: { className?: string }) {
  const t = useTranslations('EventsActivitiesPage.UpcomingEvents');

  const majorEvents = [
    {
      date: "August 15, 2025",
      title: t('Events.PlatformLaunch.Title'),
      description: t('Events.PlatformLaunch.Description'),
      target: "100+ attendees",
      type: "launch"
    },
    {
      date: "October 2025", 
      title: t('Events.SurvivorExpansion.Title'),
      description: t('Events.SurvivorExpansion.Description'),
      target: "100 users",
      type: "onboarding"
    },
    {
      date: "December 2025",
      title: t('Events.TestimonyCollection.Title'),
      description: t('Events.TestimonyCollection.Description'),
      target: "150 testimonies",
      type: "documentation"
    }
  ];

  const eventTypes = {
    launch: "bg-purple-100 text-purple-700 dark:bg-purple-800/30 dark:text-purple-300",
    onboarding: "bg-blue-100 text-blue-700 dark:bg-blue-800/30 dark:text-blue-300", 
    documentation: "bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-300"
  };

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

        {/* Major Events */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {majorEvents.map((event, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-6 border border-border hover:shadow-xl transition-all duration-300 group"
            >
              {/* Date */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Calendar className="w-4 h-4" />
                <span>{event.date}</span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {event.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {event.description}
              </p>

              {/* Target & Type */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Target className="w-3 h-3" />
                  <span>{event.target}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${eventTypes[event.type as keyof typeof eventTypes]}`}>
                  {event.type}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Targets & Goals */}
        <div className="bg-linear-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            {t('TargetsTitle')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">150</div>
              <div className="text-sm text-muted-foreground">{t('Targets.Testimonies')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100</div>
              <div className="text-sm text-muted-foreground">{t('Targets.DigitalLiteracy')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">12</div>
              <div className="text-sm text-muted-foreground">{t('Targets.Webinars')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">200+</div>
              <div className="text-sm text-muted-foreground">{t('Targets.TotalSurvivors')}</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-background rounded-2xl p-8 border border-border inline-block">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {t('CTATitle')}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              {t('CTADescription')}
            </p>
            <button onClick={()=> handleGotoFooter()} className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 transform hover:scale-105">
              {t('StayUpdated')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}