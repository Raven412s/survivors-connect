// components/pages/research-publications/introduction-section.tsx
import { cn } from "@/lib/utils";
import React from "react";
import { BookOpen, Library, FileText, Target } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function IntroductionSection({ className }: { className?: string }) {
  const t = useTranslations('ResearchPublications.Introduction-Section');
  
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
            <BookOpen className="w-4 h-4" />
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

        {/* Visual Section with Image Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Library className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-foreground">{t('Library-Analogy.Title')}</h3>
            </div>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                {t.rich('Library-Analogy.Description-1', {
                  survivor: (chunks) => <strong className="text-foreground">{chunks}</strong>
                })}
              </p>
              <p>
                {t('Library-Analogy.Description-2')}
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="text-center p-4 bg-background border border-border rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">19+</div>
                <div className="text-sm text-muted-foreground">{t('Stats.Field-Testimonies')}</div>
              </div>
              <div className="text-center p-4 bg-background border border-border rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">70+</div>
                <div className="text-sm text-muted-foreground">{t('Stats.Trauma-Cases')}</div>
              </div>
              <div className="text-center p-4 bg-background border border-border rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">12+</div>
                <div className="text-sm text-muted-foreground">{t('Stats.Blog-Posts')}</div>
              </div>
              <div className="text-center p-4 bg-background border border-border rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">4</div>
                <div className="text-sm text-muted-foreground">{t('Stats.Global-Recommendations')}</div>
              </div>
            </div>
          </div>

          {/* Image Placeholder - Research Documentation */}
          <div className="bg-muted rounded-2xl p-8 border border-border h-80 flex items-center justify-center">
            <div className="text-center space-y-4">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground italic">
                {t('Image-Placeholder.Research-Documentation')}
              </p>
            </div>
            {/* Replace with actual image of research documentation, team analyzing data, or library setup */}
          </div>
        </div>

        {/* Research Impact */}
        <div className="bg-linear-to-r from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
          <div className="flex items-start gap-4">
            <Target className="w-8 h-8 text-primary mt-1 shrink-0" />
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{t('Research-Impact.Title')}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('Research-Impact.Description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}