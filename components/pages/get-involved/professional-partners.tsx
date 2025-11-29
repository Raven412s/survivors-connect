// components/pages/get-involved/professional-partners.tsx
'use client';

import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { Users, Heart, Cpu, Network, CheckCircle } from "lucide-react";
import { useState, useEffect } from 'react';
import { ApplicationModal } from "@/components/modals/application-modal";

export default function ProfessionalPartners({ className }: { className?: string }) {
  const t = useTranslations('GetInvolvedPage.ProfessionalPartners');
  const tModal = useTranslations('GetInvolvedPage.Modals.ProfessionalNetwork');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profession: '',
    expertise: '',
    experience: '',
    message: ''
  });

  const partnerRoles = [
    {
      icon: Users,
      title: t('Roles.ExpertGuidance.Title'),
      description: t('Roles.ExpertGuidance.Description')
    },
    {
      icon: Network,
      title: t('Roles.JoinNetwork.Title'),
      description: t('Roles.JoinNetwork.Description')
    },
    {
      icon: Heart,
      title: t('Roles.ExpandNetwork.Title'),
      description: t('Roles.ExpandNetwork.Description')
    }
  ];

  const currentExperts = [
    t('CurrentExperts.Lawyers'),
    t('CurrentExperts.MentalHealth'),
    t('CurrentExperts.SocialWorkers')
  ];

  const professions = [
    tModal('Professions.Lawyer'),
    tModal('Professions.MentalHealthCounselor'),
    tModal('Professions.SocialWorker'),
    tModal('Professions.MedicalProfessional'),
    tModal('Professions.HumanRightsAdvocate'),
    tModal('Professions.AcademicResearcher'),
    tModal('Professions.CSORepresentative'),
    tModal('Professions.Other')
  ];

  // Auto-close success message after 5 seconds
  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await fetch('/api/professional-partners/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application');
      }

      // Success
      setSubmitSuccess(true);
      setIsModalOpen(false);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        profession: '',
        expertise: '',
        experience: '',
        message: ''
      });

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear errors when user starts typing
    if (submitError) setSubmitError(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      profession: '',
      expertise: '',
      experience: '',
      message: ''
    });
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  return (
    <>
      <section className={cn("w-full py-20 px-6 md:px-16 bg-background", className)}>
        <div className="max-w-6xl mx-auto">
          {/* Success Message Banner */}
          {submitSuccess && (
            <div className="fixed bottom-4 right-4 left-4 md:left-auto md:right-4 md:w-96 z-999 animate-in slide-in-from-top duration-300">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-800">
                      Application Submitted Successfully!
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      Thank you for your application! We will review it and contact you soon.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="text-green-600 hover:text-green-800 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          )}

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
            {/* Connect+ Platform */}
            <div className="space-y-6">
              <div className="bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 rounded-2xl p-8 border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="w-6 h-6 text-green-600" />
                  <h3 className="text-2xl font-bold text-foreground">
                    {t('ConnectPlus.Title')}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t('ConnectPlus.Description')}
                </p>
                <blockquote className="text-lg italic text-muted-foreground border-l-4 border-green-500 pl-4">
                  {t('ConnectPlus.Vision')}
                </blockquote>
              </div>

              {/* Current Experts */}
              <div className="bg-muted/50 rounded-2xl p-6 border border-border">
                <h4 className="font-semibold text-foreground mb-4">
                  {t('CurrentExperts.Title')}
                </h4>
                <div className="space-y-2">
                  {currentExperts.map((expert, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm text-muted-foreground">{expert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Partner Roles */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                {t('RolesTitle')}
              </h3>
              <div className="space-y-6">
                {partnerRoles.map((role, index) => (
                  <div
                    key={index}
                    className="bg-background rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <role.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="text-xl font-semibold text-foreground">
                        {role.title}
                      </h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {role.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button 
                onClick={() => {
                  resetForm();
                  setIsModalOpen(true);
                }}
                className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-semibold hover:bg-primary/90 transition-all duration-200 transform hover:scale-105"
              >
                {t('JoinButton')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={tModal('Title')}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {submitError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{submitError}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              {tModal('Form.Name')} *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
              placeholder={tModal('Form.NamePlaceholder')}
              disabled={isSubmitting}
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
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
              placeholder={tModal('Form.EmailPlaceholder')}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              {tModal('Form.Profession')} *
            </label>
            <select
              required
              value={formData.profession}
              onChange={(e) => handleInputChange('profession', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
              disabled={isSubmitting}
            >
              <option value="">{tModal('Form.ProfessionPlaceholder')}</option>
              {professions.map(profession => (
                <option key={profession} value={profession}>{profession}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              {tModal('Form.Expertise')}
            </label>
            <input
              type="text"
              value={formData.expertise}
              onChange={(e) => handleInputChange('expertise', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
              placeholder={tModal('Form.ExpertisePlaceholder')}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              {tModal('Form.Experience')}
            </label>
            <input
              type="number"
              value={formData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
              placeholder={tModal('Form.ExperiencePlaceholder')}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              {tModal('Form.Motivation')}
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background resize-none"
              placeholder={tModal('Form.MotivationPlaceholder')}
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                {tModal('Form.Submitting')}
              </>
            ) : (
              tModal('Form.Submit')
            )}
          </button>
        </form>
      </ApplicationModal>
    </>
  );
}