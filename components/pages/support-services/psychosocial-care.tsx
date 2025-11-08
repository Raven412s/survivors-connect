// components/pages/support-services/psychosocial-care.tsx
import { cn } from "@/lib/utils";
import React from "react";
import { Heart, Users, Home, Shield, Star } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function PsychosocialCare({ className }: { className?: string }) {
  const t = useTranslations('SupportServices.Psychosocial-Care');
  
  return (
    <section
      className={cn(
        "w-full py-20 px-6 md:px-8 lg:px-16 bg-linear-to-b from-background to-muted/10",
        className
      )}
      id="psychosocial-care"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                <Heart className="w-4 h-4" />
                {t('Badge')}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t('Title')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('Description')}
              </p>
            </div>

            {/* Core Components */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center shrink-0 mt-1">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('Components.Trauma-Counseling.Title')}</h4>
                  <p className="text-muted-foreground">{t('Components.Trauma-Counseling.Description')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center shrink-0 mt-1">
                  <Star className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('Components.Testimonial-Therapy.Title')}</h4>
                  <p className="text-muted-foreground">{t('Components.Testimonial-Therapy.Description')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center shrink-0 mt-1">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('Components.Peer-Counseling.Title')}</h4>
                  <p className="text-muted-foreground">{t('Components.Peer-Counseling.Description')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center shrink-0 mt-1">
                  <Home className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('Components.Family-Support.Title')}</h4>
                  <p className="text-muted-foreground">{t('Components.Family-Support.Description')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Card */}
          <div className="space-y-6">
            <div className="bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 rounded-2xl p-8 border border-green-200 dark:border-green-800">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Heart className="w-6 h-6 text-green-600" />
                {t('Impact.Title')}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 shrink-0" />
                  <span className="text-foreground">{t('Impact.List.Emotional-Healing')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 shrink-0" />
                  <span className="text-foreground">{t('Impact.List.Restoration-Dignity')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 shrink-0" />
                  <span className="text-foreground">{t('Impact.List.Reduced-Isolation')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 shrink-0" />
                  <span className="text-foreground">{t('Impact.List.Community-Reintegration')}</span>
                </li>
              </ul>
            </div>

            {/* Approach Card */}
            <div className="bg-muted/50 rounded-2xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                {t('Approach.Title')}
              </h4>
              <p className="text-muted-foreground text-sm">
                {t('Approach.Description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}