// components/pages/get-involved/volunteer-internship.tsx
'use client';

import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { GraduationCap, Users, Clock, Award } from "lucide-react";
import { useState } from 'react';
import { ApplicationModal } from "@/components/modals/application-modal";

type OpportunityType = 'volunteer' | 'internship' | 'youth-ambassador';

export default function VolunteerInternship({ className }: { className?: string }) {
  const t = useTranslations('GetInvolvedPage.VolunteerInternship');
  const tModal = useTranslations('GetInvolvedPage.Modals.VolunteerApplication');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<OpportunityType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    availability: '',
    motivation: ''
  });

  const opportunities = [
    {
      id: 'volunteer' as OpportunityType,
      icon: Users,
      title: t('Opportunities.Volunteer.Title'),
      description: t('Opportunities.Volunteer.Description'),
      duration: t('Opportunities.Volunteer.Duration'),
      commitment: t('Opportunities.Volunteer.Commitment')
    },
    {
      id: 'internship' as OpportunityType,
      icon: GraduationCap,
      title: t('Opportunities.Internship.Title'),
      description: t('Opportunities.Internship.Description'),
      duration: t('Opportunities.Internship.Duration'),
      commitment: t('Opportunities.Internship.Commitment')
    },
    {
      id: 'youth-ambassador' as OpportunityType,
      icon: Award,
      title: t('Opportunities.YouthAmbassador.Title'),
      description: t('Opportunities.YouthAmbassador.Description'),
      duration: t('Opportunities.YouthAmbassador.Duration'),
      commitment: t('Opportunities.YouthAmbassador.Commitment')
    }
  ];

  const handleApplyClick = (opportunityId: OpportunityType) => {
    setSelectedOpportunity(opportunityId);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedOpportunity) return;

    // TODO: Integrate with backend API
    console.log('Application submitted:', {
      opportunity: selectedOpportunity,
      ...formData
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Close modal and reset form
    setIsModalOpen(false);
    setSelectedOpportunity(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      education: '',
      experience: '',
      availability: '',
      motivation: ''
    });

    // Show success message
    const opportunityTitle = opportunities.find(o => o.id === selectedOpportunity)?.title;
    alert(`Thank you for applying to the ${opportunityTitle} program! We will review your application and contact you soon.`);
  };

  const getModalTitle = () => {
    if (!selectedOpportunity) return tModal('Title', { opportunity: '' });
    const opportunity = opportunities.find(o => o.id === selectedOpportunity);
    return tModal('Title', { opportunity: opportunity?.title || '' });
  };
  return (
    <>
      <section id="join-volunteer" className={cn("w-full py-20 px-6 md:px-16 bg-muted/30", className)}>
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

          {/* Opportunities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {opportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="bg-background rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <opportunity.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {opportunity.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {opportunity.description}
                </p>

                {/* Details */}
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    <span>{opportunity.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3" />
                    <span>{opportunity.commitment}</span>
                  </div>
                </div>

                {/* Apply Button */}
                <button 
                  onClick={() => handleApplyClick(opportunity.id)}
                  className="w-full mt-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200 text-sm"
                >
                  {t('ApplyButton')}
                </button>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-12 bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 rounded-2xl p-8 border border-blue-200 dark:border-blue-800 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {t('AdditionalInfo.Title')}
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {t('AdditionalInfo.Description')}
            </p>
          </div>
        </div>
      </section>

         {/* Application Modal */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOpportunity(null);
        }}
        title={getModalTitle()}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              {tModal('Form.Name')} *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
              placeholder={tModal('Form.NamePlaceholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              {tModal('Form.Email')} *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
              placeholder={tModal('Form.EmailPlaceholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              {tModal('Form.Phone')}
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
              placeholder={tModal('Form.PhonePlaceholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              {tModal('Form.Education')}
            </label>
            <input
              type="text"
              value={formData.education}
              onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
              placeholder={tModal('Form.EducationPlaceholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              {tModal('Form.Experience')}
            </label>
            <textarea
              rows={3}
              value={formData.experience}
              onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background resize-none"
              placeholder={tModal('Form.ExperiencePlaceholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              {tModal('Form.Availability')}
            </label>
            <input
              type="text"
              value={formData.availability}
              onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
              placeholder={tModal('Form.AvailabilityPlaceholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              {tModal('Form.Motivation')} *
            </label>
            <textarea
              rows={4}
              required
              value={formData.motivation}
              onChange={(e) => setFormData(prev => ({ ...prev, motivation: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background resize-none"
              placeholder={tModal('Form.MotivationPlaceholder')}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200"
          >
            {tModal('Form.Submit')}
          </button>
        </form>
      </ApplicationModal>
    </>
  );
}