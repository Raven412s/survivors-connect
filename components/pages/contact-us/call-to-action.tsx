// components/pages/contact-us/call-to-action.tsx
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { Heart, Users, Shield, ArrowRight } from "lucide-react";

export default function CallToAction({ className }: { className?: string }) {
  const t = useTranslations('ContactUsPage.CallToAction');

  const quotes = [
    {
      text: t('Quotes.Injustice'),
      author: ""
    },
    {
      text: t('Quotes.TortureFree'),
      author: ""
    },
    {
      text: t('Quotes.ConnectPlus'),
      author: ""
    }
  ];

  const collaborationAreas = [
    {
      icon: Users,
      title: t('Collaboration.Legal.Title'),
      description: t('Collaboration.Legal.Description')
    },
    {
      icon: Shield,
      title: t('Collaboration.Advocacy.Title'),
      description: t('Collaboration.Advocacy.Description')
    },
    {
      icon: Heart,
      title: t('Collaboration.Support.Title'),
      description: t('Collaboration.Support.Description')
    }
  ];

  return (
    <section className={cn("w-full py-20 px-6 md:px-16 bg-linear-to-br from-primary/5 to-primary/10", className)}>
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
          {/* Inspiring Quotes */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              {t('QuotesTitle')}
            </h3>
            <div className="space-y-6">
              {quotes.map((quote, index) => (
                <div
                  key={index}
                  className="bg-background rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300"
                >
                  <blockquote className="text-lg italic text-muted-foreground leading-relaxed mb-4">
                    &quot;{quote.text}&quot;
                  </blockquote>
                  {quote.author && (
                    <cite className="text-sm text-foreground font-medium">
                      — {quote.author}
                    </cite>
                  )}
                </div>
              ))}
            </div>

            {/* Explore Archive CTA */}
            <div className="bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 rounded-2xl p-6 border border-green-200 dark:border-green-800 text-center">
              <h4 className="text-xl font-bold text-foreground mb-3">
                {t('ArchiveTitle')}
              </h4>
              <p className="text-muted-foreground mb-4">
                {t('ArchiveDescription')}
              </p>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200">
                {t('ExploreStories')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Collaboration Opportunities */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              {t('CollaborationTitle')}
            </h3>
            <div className="space-y-6">
              {collaborationAreas.map((area, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-background rounded-2xl border border-border hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                    <area.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {area.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* General Collaboration CTA */}
            <div className="bg-background rounded-2xl p-8 border border-border text-center">
              <h4 className="text-2xl font-bold text-foreground mb-3">
                {t('CollaborationCTA.Title')}
              </h4>
              <p className="text-muted-foreground mb-6">
                {t('CollaborationCTA.Description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200">
                  {t('CollaborationCTA.PartnerButton')}
                </button>
                <button className="px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors duration-200">
                  {t('CollaborationCTA.LearnMoreButton')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}