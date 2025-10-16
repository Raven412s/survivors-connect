// introduction-section.tsx

import { cn } from "@/lib/utils";
import React from "react";
import { Users, Heart, Shield, Target } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function IntroductionSection({ className }: { className?: string }) {
  const t = useTranslations('HomePage.Introduction-Section');
  
  return (
    <section
      className={cn(
        "w-full py-24 px-6 md:px-8 lg:px-16 bg-gradient-to-b from-background to-muted/20",
        className
      )}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Target className="w-4 h-4" />
            {t('Mission-Badge')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            {t.rich('Title', {
              1: (chunks) => <span className="text-primary">{chunks}</span>
            })}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('Description')}
          </p>
        </div>

        {/* JMN Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-foreground">{t('JMN.Title')}</h3>
            </div>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                {t.rich('JMN.Description-1', {
                  1: (chunks) => <strong className="text-foreground">{chunks}</strong>
                })}
              </p>
              <p>
                {t('JMN.Description-2')}
              </p>
              <p>
                {t.rich('JMN.Description-3', {
                  1: (chunks) => <em className="text-foreground font-medium">{chunks}</em>
                })}
              </p>
            </div>
          </div>

          {/* Key Facts Card */}
          <div className="bg-muted/50 rounded-2xl p-8 border border-border">
            <h4 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              {t('JMN.Key-Facts.Title')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>
                  {t.rich('JMN.Key-Facts.Fact-1', {
                    1: (chunks) => <strong>{chunks}</strong>
                  })}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>
                  {t.rich('JMN.Key-Facts.Fact-2', {
                    1: (chunks) => <em>{chunks}</em>
                  })}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>
                  {t.rich('JMN.Key-Facts.Fact-3', {
                    1: (chunks) => <strong>{chunks}</strong>
                  })}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>
                  {t.rich('JMN.Key-Facts.Fact-4', {
                    1: (chunks) => <strong>{chunks}</strong>
                  })}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>
                  {t.rich('JMN.Key-Facts.Fact-5', {
                    1: (chunks) => <strong>{chunks}</strong>
                  })}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Connect+ Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-6 order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-foreground">{t('Connect-Plus.Title')}</h3>
            </div>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                {t.rich('Connect-Plus.Description', {
                  1: (chunks) => <strong className="text-foreground">{chunks}</strong>
                })}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="bg-background border border-border rounded-lg p-4">
                  <h5 className="font-semibold text-foreground mb-2">
                    {t('Connect-Plus.Features.Safe-Space.Title')}
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    {t('Connect-Plus.Features.Safe-Space.Description')}
                  </p>
                </div>
                <div className="bg-background border border-border rounded-lg p-4">
                  <h5 className="font-semibold text-foreground mb-2">
                    {t('Connect-Plus.Features.Resource-Hub.Title')}
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    {t('Connect-Plus.Features.Resource-Hub.Description')}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-sm">
                  {t.rich('Connect-Plus.Current-Impact', {
                    1: (chunks) => <strong>{chunks}</strong>,
                    3: (chunks) => <strong>{chunks}</strong>,
                    5: (chunks) => <strong>{chunks}</strong>,
                    7: (chunks) => <strong>{chunks}</strong>
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Platform Features Card */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20 order-1 lg:order-2">
            <h4 className="text-xl font-semibold text-foreground mb-6">
              {t('Connect-Plus.Vision.Title')}
            </h4>
            <blockquote className="text-lg italic text-muted-foreground border-l-4 border-primary pl-4 mb-6">
              {t('Connect-Plus.Vision.Quote')}
            </blockquote>
            <p className="text-muted-foreground mb-6">
              {t('Connect-Plus.Vision.Description')}
            </p>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{t('Connect-Plus.Status.Development')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>{t('Connect-Plus.Status.Beta-Testing')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>{t('Connect-Plus.Status.Launch')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}