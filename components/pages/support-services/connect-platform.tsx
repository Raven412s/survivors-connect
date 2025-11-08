// components/pages/support-services/connect-platform.tsx
import { cn } from "@/lib/utils";
import React from "react";
import { Shield, Users, BookOpen, Network, Heart } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function ConnectPlatform({ className }: { className?: string }) {
  const t = useTranslations('SupportServices.Connect-Platform');
  
  return (
    <section
      className={cn(
        "w-full py-20 px-6 md:px-8 lg:px-16 bg-linear-to-b from-muted/20 to-background",
        className
      )}
      id="connect-platform"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                <Network className="w-4 h-4" />
                {t('Badge')}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t('Title')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('Description')}
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center shrink-0 mt-1">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('Features.Safe-Space.Title')}</h4>
                  <p className="text-muted-foreground">{t('Features.Safe-Space.Description')}</p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      {t('Features.Safe-Space.Security.2FA')}
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      {t('Features.Safe-Space.Security.Anonymous')}
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      {t('Features.Safe-Space.Security.Moderation')}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center shrink-0 mt-1">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('Features.Peer-Support.Title')}</h4>
                  <p className="text-muted-foreground">{t('Features.Peer-Support.Description')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center shrink-0 mt-1">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('Features.Resource-Hub.Title')}</h4>
                  <p className="text-muted-foreground">{t('Features.Resource-Hub.Description')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Card */}
          <div className="space-y-6">
            <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Heart className="w-6 h-6 text-blue-600" />
                {t('Benefits.Title')}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0" />
                  <span className="text-foreground">{t('Benefits.List.Professional-Network')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0" />
                  <span className="text-foreground">{t('Benefits.List.Online-Counseling')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0" />
                  <span className="text-foreground">{t('Benefits.List.Sustainability')}</span>
                </li>
              </ul>
            </div>

            {/* Quote Card */}
            <div className="bg-muted/50 rounded-2xl p-6 border border-border">
              <blockquote className="text-lg italic text-muted-foreground text-center">
                &quot;{t('Quote')}&quot;
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}