// components/pages/events-activities/workshops-webinars.tsx
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { Users, Monitor, Heart, Scale, Video, Calendar } from "lucide-react";

export default function WorkshopsWebinars({ className }: { className?: string }) {
  const t = useTranslations('EventsActivitiesPage.WorkshopsWebinars');

  const workshops = [
    {
      icon: Monitor,
      title: t('Workshops.DigitalLiteracy.Title'),
      description: t('Workshops.DigitalLiteracy.Description'),
      date: "August 2025",
      location: "Varanasi & Koderma",
      participants: "100 survivors targeted",
      status: "upcoming"
    },
    {
      icon: Heart,
      title: t('Workshops.TraumaCare.Title'),
      description: t('Workshops.TraumaCare.Description'),
      date: "September 2025", 
      location: "Online",
      participants: "Mental health professionals",
      status: "upcoming"
    },
    {
      icon: Scale,
      title: t('Workshops.SurvivorRights.Title'),
      description: t('Workshops.SurvivorRights.Description'),
      date: "October 2025",
      location: "Multiple locations",
      participants: "Survivors & families",
      status: "upcoming"
    }
  ];

  const pastEvents = [
    {
      icon: Users,
      title: t('PastEvents.TraumaFirstAid.Title'),
      description: t('PastEvents.TraumaFirstAid.Description'),
      date: "March 20, 2025",
      outcome: "14 staff trained"
    },
    {
      icon: Scale,
      title: t('PastEvents.AssessmentTools.Title'),
      description: t('PastEvents.AssessmentTools.Description'),
      date: "April 28, 2025",
      outcome: "13 workers trained"
    },
    {
      icon: Video,
      title: t('PastEvents.PMEWorkshop.Title'),
      description: t('PastEvents.PMEWorkshop.Description'),
      date: "March 5, 2025",
      outcome: "Supervision completed"
    }
  ];

  return (
    <section className={cn("w-full py-20 px-6 md:px-16 bg-background", className)}>
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
          {/* Upcoming Workshops */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              {t('UpcomingTitle')}
            </h3>
            <div className="space-y-6">
              {workshops.map((workshop, index) => (
                <div
                  key={index}
                  className="bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 rounded-2xl p-6 border border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-green-100 dark:bg-green-800/30 rounded-lg">
                      <workshop.icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h4 className="text-xl font-semibold text-foreground">
                      {workshop.title}
                    </h4>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {workshop.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span>{workshop.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3" />
                      <span>{workshop.participants}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs bg-green-100 dark:bg-green-800/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                      {workshop.status}
                    </span>
                    {/* <button className="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors">
                      {t('RegisterButton')}
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past Events */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              {t('PastEventsTitle')}
            </h3>
            <div className="space-y-6">
              {pastEvents.map((event, index) => (
                <div
                  key={index}
                  className="bg-muted/30 rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <event.icon className="w-4 h-4 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">
                      {event.title}
                    </h4>
                  </div>

                  <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{event.date}</span>
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {event.outcome}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Monthly Webinars Info */}
            <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-foreground mb-3">
                {t('MonthlyWebinars.Title')}
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                {t('MonthlyWebinars.Description')}
              </p>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{t('MonthlyWebinars.Topics.SurvivorRights')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{t('MonthlyWebinars.Topics.MentalHealth')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{t('MonthlyWebinars.Topics.LegalAid')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}