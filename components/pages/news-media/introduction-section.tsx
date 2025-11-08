// components/pages/news-media/introduction-section.tsx
import { cn } from "@/lib/utils";
import React from "react";
import { Newspaper, Megaphone, Users, Target } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function IntroductionSection({ className }: { className?: string }) {
  const t = useTranslations('NewsMedia.Introduction-Section');
  
  return (
    <section
      className={cn(
        "w-full py-24 px-6 md:px-8 lg:px-16 bg-linear-to-b from-background to-muted/20",
        className
      )}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Newspaper className="w-4 h-4" />
            {t('Mission-Badge')}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            {t.rich('Title', {
              highlight: (chunks) => <span className="text-primary">{chunks}</span>
            })}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('Description')}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 bg-card border border-border rounded-xl">
            <div className="text-2xl font-bold text-primary mb-2">1200+</div>
            <div className="text-sm text-muted-foreground">{t('Stats.Blog-Views')}</div>
          </div>
          <div className="text-center p-6 bg-card border border-border rounded-xl">
            <div className="text-2xl font-bold text-primary mb-2">12+</div>
            <div className="text-sm text-muted-foreground">{t('Stats.Blog-Posts')}</div>
          </div>
          <div className="text-center p-6 bg-card border border-border rounded-xl">
            <div className="text-2xl font-bold text-primary mb-2">6+</div>
            <div className="text-sm text-muted-foreground">{t('Stats.Survivor-Cases')}</div>
          </div>
          <div className="text-center p-6 bg-card border border-border rounded-xl">
            <div className="text-2xl font-bold text-primary mb-2">19</div>
            <div className="text-sm text-muted-foreground">{t('Stats.Global-Centers')}</div>
          </div>
        </div>

        {/* Project Focus */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-foreground">{t('Project-Focus.Title')}</h3>
            </div>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                {t.rich('Project-Focus.Description-1', {
                  project: (chunks) => <strong className="text-foreground">{chunks}</strong>
                })}
              </p>
              <p>
                {t('Project-Focus.Description-2')}
              </p>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-600" />
                <span>{t('Project-Focus.Tags.Legal-Assistance')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-blue-600" />
                <span>{t('Project-Focus.Tags.Psychosocial-Care')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-purple-600" />
                <span>{t('Project-Focus.Tags.Technology')}</span>
              </div>
            </div>
          </div>

          {/* Image Placeholder - Media Coverage */}
          <div className="bg-muted rounded-2xl p-8 border border-border h-80 flex items-center justify-center">
            <div className="text-center space-y-4">
              <Newspaper className="w-16 h-16 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground italic">
                {t('Image-Placeholder.Media-Coverage')}
              </p>
            </div>
            {/* Replace with actual image of media coverage, press events, or award ceremonies */}
          </div>
        </div>
      </div>
    </section>
  );
}