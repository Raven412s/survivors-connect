// components/pages/survivor-voices/impact-section.tsx
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { Quote, Users, Heart, Shield } from "lucide-react";

export default function ImpactSection({ className }: { className?: string }) {
  const t = useTranslations('SurvivorVoicesPage.Impact');

  const feedbackPoints = [
    {
      icon: Heart,
      title: t('Feedback.Emotional.Title'),
      description: t('Feedback.Emotional.Description')
    },
    {
      icon: Shield,
      title: t('Feedback.Dignity.Title'),
      description: t('Feedback.Dignity.Description')
    },
    {
      icon: Users,
      title: t('Feedback.Community.Title'),
      description: t('Feedback.Community.Description')
    }
  ];

  const survivorQuotes = [
    t('Quotes.Quote1'),
    t('Quotes.Quote2'),
    t('Quotes.Quote3')
  ];

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Feedback Points */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">
              {t('FeedbackTitle')}
            </h3>
            <div className="space-y-6">
              {feedbackPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-background rounded-2xl border border-border"
                >
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                    <point.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {point.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Survivor Quotes */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">
              {t('QuotesTitle')}
            </h3>
            <div className="space-y-6">
              {survivorQuotes.map((quote, index) => (
                <div
                  key={index}
                  className="bg-background rounded-2xl p-6 border border-border relative"
                >
                  <Quote className="w-8 h-8 text-primary/20 absolute top-4 left-4" />
                  <blockquote className="text-muted-foreground italic leading-relaxed pl-8">
                    &quot;{quote}&quot;
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}