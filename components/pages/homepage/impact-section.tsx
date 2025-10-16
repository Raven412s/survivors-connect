// impact-section.tsx

import { cn } from "@/lib/utils";
import React from "react";
import { Users, Heart, Award, Target } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function ImpactSection({ className }: { className?: string }) {
  const t = useTranslations('HomePage.Impact-Section');
  
  const stats = [
    { icon: Users, value: "927+", label: t('Stats.Cases-Handled') },
    { icon: Heart, value: "₹95.5M", label: t('Stats.Compensation') },
    { icon: Award, value: "42", label: t('Stats.Survivors-Counselled') },
    { icon: Target, value: "47", label: t('Stats.Beta-Testers') },
  ];

  return (
    <section className={cn("w-full py-20 px-6 md:px-16 bg-muted/50", className)}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-foreground">{t('Title')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('Description')}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-6 text-center border border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition-all duration-200">
            {t('Join-Button')}
          </button>
        </div>
      </div>
    </section>
  );
}