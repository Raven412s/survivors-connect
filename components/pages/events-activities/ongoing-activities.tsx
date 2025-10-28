// components/pages/events-activities/ongoing-activities.tsx
import { cn } from "@/lib/utils";
import { BookOpen, Cpu, Heart, Scale } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function OngoingActivities({ className }: { className?: string }) {
  const t = useTranslations('EventsActivitiesPage.OngoingActivities');

  const activities = [
    {
      icon: Cpu,
      title: t('Activities.PeerSupport.Title'),
      description: t('Activities.PeerSupport.Description'),
      items: [
        t('Activities.PeerSupport.ConnectPlus'),
        t('Activities.PeerSupport.CapacityBuilding'),
        t('Activities.PeerSupport.Counseling')
      ],
      color: "from-green-50 to-green-100",
      border: "border-green-200"
    },
    {
      icon: Scale,
      title: t('Activities.LegalEmpowerment.Title'),
      description: t('Activities.LegalEmpowerment.Description'),
      items: [
        t('Activities.LegalEmpowerment.Interventions'),
        t('Activities.LegalEmpowerment.AssessmentTools'),
        t('Activities.LegalEmpowerment.Advocacy')
      ],
      color: "from-blue-50 to-blue-100", 
      border: "border-blue-200"
    },
    {
      icon: Heart,
      title: t('Activities.Psychosocial.Title'),
      description: t('Activities.Psychosocial.Description'),
      items: [
        t('Activities.Psychosocial.Therapy'),
        t('Activities.Psychosocial.Counseling'),
        t('Activities.Psychosocial.Reintegration')
      ],
      color: "from-purple-50 to-purple-100",
      border: "border-purple-200"
    },
    {
      icon: BookOpen,
      title: t('Activities.Knowledge.Title'),
      description: t('Activities.Knowledge.Description'),
      items: [
        t('Activities.Knowledge.Research'),
        t('Activities.Knowledge.Publications'),
        t('Activities.Knowledge.Dissemination')
      ],
      color: "from-orange-50 to-orange-100",
      border: "border-orange-200"
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

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activities.map((activity, index) => (
            <div
              key={index}
              className={`bg-linear-to-br ${activity.color} dark:from-gray-900/20 dark:to-gray-800/10 rounded-2xl p-8 border ${activity.border} dark:border-gray-700 hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/50 dark:bg-gray-800/30 rounded-xl">
                  <activity.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  {activity.title}
                </h3>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {activity.description}
              </p>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground text-sm">
                  {t('KeyComponents')}
                </h4>
                <ul className="space-y-2">
                  {activity.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-foreground rounded-full shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Connect+ Platform Highlight */}
        <div className="mt-16 bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 rounded-2xl p-8 border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-green-100 dark:bg-green-800/30 rounded-xl">
              <Cpu className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {t('ConnectPlus.Title')}
              </h3>
              <p className="text-muted-foreground">
                {t('ConnectPlus.Description')}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">47</div>
              <div className="text-xs text-muted-foreground">{t('ConnectPlus.SurvivorsOnboarded')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">14</div>
              <div className="text-xs text-muted-foreground">{t('ConnectPlus.Professionals')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">28</div>
              <div className="text-xs text-muted-foreground">{t('ConnectPlus.Testimonies')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">2</div>
              <div className="text-xs text-muted-foreground">{t('ConnectPlus.PeerGroups')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}