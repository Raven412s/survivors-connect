// components/pages/research-publications/publications.tsx
import { cn } from "@/lib/utils";
import React from "react";
import { FileText, ExternalLink, BookOpen, Film, Award, Users } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function Publications({ className }: { className?: string }) {
  const t = useTranslations('ResearchPublications.Publications');
  
  return (
    <section
      className={cn(
        "w-full py-20 px-6 md:px-8 lg:px-16 bg-linear-to-b from-background to-muted/10",
        className
      )}
      id="publications"
    >
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
            <BookOpen className="w-4 h-4" />
            {t('Badge')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t('Title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('Description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Featured Reports */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-600" />
              {t('Featured-Reports.Title')}
            </h3>

            <div className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-2">{t('Featured-Reports.IRCT-Report.Title')}</h4>
                    <p className="text-muted-foreground text-sm mb-3">
                      {t('Featured-Reports.IRCT-Report.Description')}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-primary font-medium">{t('Featured-Reports.IRCT-Report.Global-Contribution')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-2">{t('Featured-Reports.Ghasia-Adivasis.Title')}</h4>
                    <p className="text-muted-foreground text-sm mb-3">
                      {t('Featured-Reports.Ghasia-Adivasis.Description')}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-primary font-medium">{t('Featured-Reports.Ghasia-Adivasis.Emergency-Intervention')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-2">{t('Featured-Reports.Survivor-Stories.Title')}</h4>
                    <p className="text-muted-foreground text-sm mb-3">
                      {t('Featured-Reports.Survivor-Stories.Description')}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="text-foreground">• {t('Featured-Reports.Survivor-Stories.Story-1')}</div>
                      <div className="text-foreground">• {t('Featured-Reports.Survivor-Stories.Story-2')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Posts & Media */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <ExternalLink className="w-6 h-6 text-purple-600" />
              {t('Blogs-Media.Title')}
            </h3>

            <div className="space-y-4">
              <div className="bg-card border border-border rounded-xl p-6">
                <h4 className="font-semibold text-foreground mb-4">{t('Blogs-Media.Blog-Posts.Title')}</h4>
                <div className="space-y-3">
                  <a href="#" className="block p-3 hover:bg-muted rounded-lg transition-colors group">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground group-hover:text-primary">{t('Blogs-Media.Blog-Posts.Post-1')}</span>
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </a>
                  <a href="#" className="block p-3 hover:bg-muted rounded-lg transition-colors group">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground group-hover:text-primary">{t('Blogs-Media.Blog-Posts.Post-2')}</span>
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </a>
                  <a href="#" className="block p-3 hover:bg-muted rounded-lg transition-colors group">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground group-hover:text-primary">{t('Blogs-Media.Blog-Posts.Post-3')}</span>
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </a>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  {t('Blogs-Media.Blog-Posts.Total-Posts')}
                </div>
              </div>

              {/* Media Recognition */}
              <div className="bg-linear-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/10 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
                <div className="flex items-center gap-3 mb-4">
                  <Film className="w-6 h-6 text-orange-600" />
                  <h4 className="font-semibold text-foreground">{t('Blogs-Media.Media-Recognition.Title')}</h4>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  {t('Blogs-Media.Media-Recognition.Documentary')}
                </p>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Award className="w-4 h-4 text-orange-600" />
                  {t('Blogs-Media.Media-Recognition.Health-Awards')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tools & Documentation */}
        <div className="mt-16 bg-card border border-border rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <FileText className="w-6 h-6 text-green-600" />
            {t('Tools-Documentation.Title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">{t('Tools-Documentation.Self-Assessment.Title')}</h4>
              <p className="text-sm text-muted-foreground">{t('Tools-Documentation.Self-Assessment.Description')}</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">{t('Tools-Documentation.Implementation-Narratives.Title')}</h4>
              <p className="text-sm text-muted-foreground">{t('Tools-Documentation.Implementation-Narratives.Description')}</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">{t('Tools-Documentation.Workshop-Docs.Title')}</h4>
              <p className="text-sm text-muted-foreground">{t('Tools-Documentation.Workshop-Docs.Description')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}