// components/pages/get-involved/survivor-leadership.tsx
'use client';

import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { Users, Target, Award, Heart, ArrowRight } from "lucide-react";
import { useState } from 'react';
import { ApplicationModal } from "@/components/modals/application-modal";

export default function SurvivorLeadership({ className }: { className?: string }) {
  const t = useTranslations('GetInvolvedPage.SurvivorLeadership');
  const tModal = useTranslations('GetInvolvedPage.Modals.LeadershipProgram');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const programComponents = [
    {
      icon: Target,
      title: t('Components.LeadershipDevelopment.Title'),
      description: t('Components.LeadershipDevelopment.Description')
    },
    {
      icon: Users,
      title: t('Components.PeerMentorship.Title'),
      description: t('Components.PeerMentorship.Description')
    },
    {
      icon: Award,
      title: t('Components.AdvocacyTraining.Title'),
      description: t('Components.AdvocacyTraining.Description')
    },
    {
      icon: Heart,
      title: t('Components.CommunityBuilding.Title'),
      description: t('Components.CommunityBuilding.Description')
    }
  ];

  const programDetails = {
    eligibility: tModal.raw('Eligibility.Items'),
    benefits: tModal.raw('Benefits.Items'),
    timeline: tModal.raw('Timeline.Items')
  };

  const handleLearnMore = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <section className={cn("w-full py-20 px-6 md:px-16 bg-background", className)}>
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
            {/* Program Components */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-foreground">
                {t('ComponentsTitle')}
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {programComponents.map((component, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-muted/30 rounded-2xl border border-border hover:shadow-lg transition-all duration-300"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <component.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        {component.title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {component.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact & Testimonial */}
            <div className="space-y-8">
              <div className="bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 rounded-2xl p-8 border border-green-200 dark:border-green-800">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {t('Impact.Title')}
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">200+</div>
                    <div className="text-xs text-muted-foreground">
                      {t('Impact.SurvivorsTrained')}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">50+</div>
                    <div className="text-xs text-muted-foreground">
                      {t('Impact.CommunityLeaders')}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t('Impact.Description')}
                </p>
              </div>

              {/* CTA */}
              <div className="bg-background rounded-2xl p-6 border border-border text-center">
                <h4 className="font-semibold text-foreground mb-3">
                  {t('CTATitle')}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('CTADescription')}
                </p>
                <button 
                  onClick={handleLearnMore}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {t('LearnMoreButton')}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* Program Details Modal */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={tModal('Title')}
        className="max-w-2xl"
      >
        <div className="space-y-6">
          {/* Program Overview */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              {tModal('Overview.Title')}
            </h3>
            <p className="text-muted-foreground text-sm">
              {tModal('Overview.Description')}
            </p>
          </div>

          {/* Eligibility Criteria */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              {tModal('Eligibility.Title')}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {programDetails.eligibility.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Program Benefits */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              {tModal('Benefits.Title')}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {programDetails.benefits.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Program Timeline */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              {tModal('Timeline.Title')}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {programDetails.timeline.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Application CTA */}
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              {tModal('CTAText')}
            </p>
            <div className="flex gap-3">
              <button className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200 text-sm">
                {tModal('ContactButton')}
              </button>
              <button className="flex-1 py-2 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors duration-200 text-sm">
                {tModal('DownloadButton')}
              </button>
            </div>
          </div>
        </div>
      </ApplicationModal>
    </>
  );
}