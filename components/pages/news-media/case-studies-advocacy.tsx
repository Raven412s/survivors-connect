// components/pages/news-media/case-studies-advocacy.tsx
import { cn } from "@/lib/utils";
import { Calendar, FileText, MessageCircle, Shield, Users } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function CaseStudiesAdvocacy({ className }: { className?: string }) {
  const t = useTranslations('NewsMedia.Case-Studies-Advocacy');
  
  return (
    <section
      className={cn(
        "w-full py-20 px-6 md:px-8 lg:px-16 bg-linear-to-b from-background to-muted/10",
        className
      )}
      id="case-studies"
    >
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
            <FileText className="w-4 h-4" />
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
          {/* Social Media Advocacy */}
          <div className="space-y-8">
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{t('Social-Media.Title')}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Calendar className="w-4 h-4" />
                    {t('Social-Media.Date')}
                  </div>
                </div>
              </div>

              <blockquote className="border-l-4 border-blue-600 pl-4 mb-6">
                <p className="text-lg italic text-muted-foreground">
                  &quot;{t('Social-Media.Quote')}&quot;
                </p>
              </blockquote>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">
                      {t('Social-Media.Support-Action.Title')}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {t('Social-Media.Support-Action.Description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Justice for Ghasia Adivasis */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{t('Ghasia-Adivasis.Title')}</h3>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6">
                {t('Ghasia-Adivasis.Description')}
              </p>
              
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Shield className="w-4 h-4 text-green-600" />
                {t('Ghasia-Adivasis.Emergency-Intervention')}
              </div>
            </div>
          </div>

          {/* Survivor Narratives */}
          <div className="space-y-8">
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{t('Survivor-Narratives.Title')}</h3>
                  <div className="text-sm text-muted-foreground mt-1">
                    {t('Survivor-Narratives.Subtitle')}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border border-border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                  <h4 className="font-semibold text-foreground mb-3">{t('Survivor-Narratives.Story-1.Title')}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('Survivor-Narratives.Story-1.Description')}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-primary">
                    <FileText className="w-3 h-3" />
                    {t('Survivor-Narratives.Published-Case')}
                  </div>
                </div>

                <div className="border border-border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                  <h4 className="font-semibold text-foreground mb-3">{t('Survivor-Narratives.Story-2.Title')}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('Survivor-Narratives.Story-2.Description')}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-primary">
                    <FileText className="w-3 h-3" />
                    {t('Survivor-Narratives.Published-Case')}
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                <h4 className="font-semibold text-foreground text-sm mb-2">
                  {t('Survivor-Narratives.Impact.Title')}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t('Survivor-Narratives.Impact.Description')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Placeholder - Advocacy in Action */}
        <div className="mt-16 bg-muted rounded-2xl p-8 border border-border h-64 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Users className="w-12 h-12 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground italic">
              {t('Image-Placeholder.Advocacy-Action')}
            </p>
          </div>
          {/* Replace with actual image from advocacy events, community meetings, or legal interventions */}
        </div>
      </div>
    </section>
  );
}