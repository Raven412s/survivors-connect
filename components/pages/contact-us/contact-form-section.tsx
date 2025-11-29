// components/pages/contact-us/contact-form-section.tsx
'use client';

import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { Send, User, Mail, Phone, MessageSquare, Shield } from "lucide-react";
import { useState } from 'react';
import { toast } from "sonner";

export default function ContactFormSection({ className }: { className?: string }) {
  const t = useTranslations('ContactUsPage.ContactForm');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'general',
    isUrgent: false,
    allowFollowUp: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'general', label: t('Categories.General') },
    { value: 'support', label: t('Categories.Support') },
    { value: 'partnership', label: t('Categories.Partnership') },
    { value: 'volunteer', label: t('Categories.Volunteer') },
    { value: 'media', label: t('Categories.Media') },
    { value: 'other', label: t('Categories.Other') }
  ];

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || t("ErrorMessage"));
      return;
    }

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      category: "general",
      isUrgent: false,
      allowFollowUp: true,
    });

    toast.success(t("SuccessMessage"));
  } catch (error) {
    console.error(error);
    toast.error(t("ErrorMessage"));
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <section className={cn("w-full py-20 px-6 md:px-16 bg-muted/30", className)}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <h2 className="text-4xl font-bold text-foreground">
            {t('Title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('Description')}
          </p>
        </div>

        <div className="bg-background rounded-2xl p-8 border border-border shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  {t('Form.Name')} *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                    placeholder={t('Form.NamePlaceholder')}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  {t('Form.Email')} *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                    placeholder={t('Form.EmailPlaceholder')}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  {t('Form.Phone')}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                    placeholder={t('Form.PhonePlaceholder')}
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
                  {t('Form.Category')} *
                </label>
                <select
                  id="category"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                {t('Form.Subject')} *
              </label>
              <input
                type="text"
                id="subject"
                required
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                placeholder={t('Form.SubjectPlaceholder')}
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                {t('Form.Message')} *
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background resize-none"
                  placeholder={t('Form.MessagePlaceholder')}
                />
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.isUrgent}
                  onChange={(e) => setFormData(prev => ({ ...prev, isUrgent: e.target.checked }))}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">
                  {t('Form.Urgent')}
                </span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.allowFollowUp}
                  onChange={(e) => setFormData(prev => ({ ...prev, allowFollowUp: e.target.checked }))}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">
                  {t('Form.FollowUp')}
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                  {t('Form.Submitting')}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {t('Form.Submit')}
                </>
              )}
            </button>

            {/* Privacy Notice */}
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Shield className="w-3 h-3 mt-0.5 shrink-0" />
              <span>{t('Form.PrivacyNotice')}</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}