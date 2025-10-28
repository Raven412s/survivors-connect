// components/pages/events-activities/key-achievements.tsx
'use client';

import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { Award, Users, Scale, BookOpen, Calendar, CheckCircle } from "lucide-react";
import { useState } from 'react';

type AchievementCategory = 'digital' | 'training' | 'legal' | 'research';

export default function KeyAchievements({ className }: { className?: string }) {
  const t = useTranslations('EventsActivitiesPage.KeyAchievements');
  const [activeCategory, setActiveCategory] = useState<AchievementCategory>('digital');

  const categories = [
    { id: 'digital' as AchievementCategory, label: t('Categories.Digital'), icon: Users },
    { id: 'training' as AchievementCategory, label: t('Categories.Training'), icon: Award },
    { id: 'legal' as AchievementCategory, label: t('Categories.Legal'), icon: Scale },
    { id: 'research' as AchievementCategory, label: t('Categories.Research'), icon: BookOpen }
  ];

  const achievements = {
    digital: [
      {
        date: "June 5–7, 2025",
        title: t('Achievements.Digital.PlatformWorkshop.Title'),
        description: t('Achievements.Digital.PlatformWorkshop.Description'),
        participants: "12 participants"
      },
      {
        date: "July 1–10, 2025", 
        title: t('Achievements.Digital.SurvivorOnboarding.Title'),
        description: t('Achievements.Digital.SurvivorOnboarding.Description'),
        participants: "47 survivors"
      },
      {
        date: "July 1–10, 2025",
        title: t('Achievements.Digital.ProfessionalNetwork.Title'),
        description: t('Achievements.Digital.ProfessionalNetwork.Description'),
        participants: "14 professionals"
      },
      {
        date: "July 10–15, 2025",
        title: t('Achievements.Digital.PilotTesting.Title'),
        description: t('Achievements.Digital.PilotTesting.Description'),
        participants: "20 survivors"
      }
    ],
    training: [
      {
        date: "March 20, 2025",
        title: t('Achievements.Training.TraumaFirstAid.Title'),
        description: t('Achievements.Training.TraumaFirstAid.Description'),
        participants: "14 staff"
      },
      {
        date: "April 28, 2025",
        title: t('Achievements.Training.AssessmentTools.Title'),
        description: t('Achievements.Training.AssessmentTools.Description'),
        participants: "13 workers"
      },
      {
        date: "June 2025",
        title: t('Achievements.Training.StructuredSessions.Title'),
        description: t('Achievements.Training.StructuredSessions.Description'),
        participants: "58 participants"
      },
      {
        date: "Jan–June 2025",
        title: t('Achievements.Training.TestimonialTherapy.Title'),
        description: t('Achievements.Training.TestimonialTherapy.Description'),
        participants: "70 sessions"
      }
    ],
    legal: [
      {
        date: "2025",
        title: t('Achievements.Legal.TotalInterventions.Title'),
        description: t('Achievements.Legal.TotalInterventions.Description'),
        participants: "85 interventions"
      },
      {
        date: "2025", 
        title: t('Achievements.Legal.Compensation.Title'),
        description: t('Achievements.Legal.Compensation.Description'),
        participants: "₹4.1 million"
      },
      {
        date: "2025",
        title: t('Achievements.Legal.CrisisResponse.Title'),
        description: t('Achievements.Legal.CrisisResponse.Description'),
        participants: "1.5 hectares protected"
      },
      {
        date: "2025",
        title: t('Achievements.Legal.PublicAdvocacy.Title'),
        description: t('Achievements.Legal.PublicAdvocacy.Description'),
        participants: "6 major cases"
      }
    ],
    research: [
      {
        date: "2022–2024",
        title: t('Achievements.Research.IRCTReport.Title'),
        description: t('Achievements.Research.IRCTReport.Description'),
        participants: "Global feature"
      },
      {
        date: "June 26, 2025",
        title: t('Achievements.Research.TortureFreeSociety.Title'),
        description: t('Achievements.Research.TortureFreeSociety.Description'),
        participants: "Blog publication"
      },
      {
        date: "July 6, 2025",
        title: t('Achievements.Research.HealthAwards.Title'),
        description: t('Achievements.Research.HealthAwards.Description'),
        participants: "Award received"
      },
      {
        date: "Ongoing",
        title: t('Achievements.Research.FieldDocumentation.Title'),
        description: t('Achievements.Research.FieldDocumentation.Description'),
        participants: "12+ blogs"
      }
    ]
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

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-200",
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-background text-foreground border border-border hover:border-primary"
                )}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements[activeCategory].map((achievement, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{achievement.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>{achievement.participants}</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-3">
                {achievement.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>

        {/* Overall Impact Stats */}
        <div className="mt-16 bg-linear-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            {t('ImpactStats.Title')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">927+</div>
              <div className="text-sm text-muted-foreground">{t('ImpactStats.TestimonialInterventions')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">₹95.5M</div>
              <div className="text-sm text-muted-foreground">{t('ImpactStats.Compensation')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">200+</div>
              <div className="text-sm text-muted-foreground">{t('ImpactStats.SurvivorsSupported')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">70</div>
              <div className="text-sm text-muted-foreground">{t('ImpactStats.TherapySessions')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}