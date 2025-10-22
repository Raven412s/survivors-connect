// components/pages/get-involved/professional-partners.tsx
'use client';

import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { Users, Heart, Cpu, Network } from "lucide-react";
import { useState } from 'react';
import { ApplicationModal } from "@/components/modals/application-modal";

export default function ProfessionalPartners({ className }: { className?: string }) {
  const t = useTranslations('GetInvolvedPage.ProfessionalPartners');
  const tModal = useTranslations('GetInvolvedPage.Modals.ProfessionalNetwork');
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with backend API
    console.log('Professional partner application:', formData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Close modal and reset form
    setIsModalOpen(false);
    setFormData({
      name: '',
      email: '',
      profession: '',
      expertise: '',
      experience: '',
      message: ''
    });
    
    // Show success message (you can replace with toast notification)
    alert('Thank you for your application! We will contact you soon.');
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
                onClick={() => setIsModalOpen(true)}
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
        onClose={() => setIsModalOpen(false)}
        title={tModal('Title')}
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
              {tModal('Form.Profession')} *
            </label>
            <select
              required
              value={formData.profession}
              onChange={(e) => setFormData(prev => ({ ...prev, profession: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
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
              onChange={(e) => setFormData(prev => ({ ...prev, expertise: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
              placeholder={tModal('Form.ExpertisePlaceholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              {tModal('Form.Experience')}
            </label>
            <input
              type="number"
              value={formData.experience}
              onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
              placeholder={tModal('Form.ExperiencePlaceholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              {tModal('Form.Motivation')}
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
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