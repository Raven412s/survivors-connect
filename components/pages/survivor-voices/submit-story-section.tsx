// components/pages/survivor-voices/submit-story-section.tsx
'use client';

import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, Upload } from "lucide-react";
import { TestimonySubmission } from "@/types";

export default function SubmitStorySection({ className }: { className?: string }) {
    const t = useTranslations('SurvivorVoicesPage.SubmitStory');
    const [showSecurityInfo, setShowSecurityInfo] = useState(false);
    const [formData, setFormData] = useState<TestimonySubmission>({
        title: '',
        content: '',
        type: 'written',
        isAnonymous: true,
        theme: [],
        allowContact: false,
        consentGiven: false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement submission with encryption and 2FA
        console.log('Submitting testimony:', formData);
    };

    return (
        <section id="public-testimony-form" className={cn("w-full py-20 px-6 md:px-16 bg-background", className)}>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center space-y-6 mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        <Shield className="w-4 h-4" />
                        {t('Badge')}
                    </div>
                    <h2 className="text-4xl font-bold text-foreground">
                        {t('Title')}
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {t('Description')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Security Features */}
                    <div className="lg:col-span-1">
                        <div className="bg-muted/30 rounded-2xl p-6 border border-border sticky top-28">
                            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <Lock className="w-5 h-5 text-primary" />
                                {t('Security.Title')}
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                                    <span className="text-sm text-muted-foreground">
                                        {t('Security.Encryption')}
                                    </span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                                    <span className="text-sm text-muted-foreground">
                                        {t('Security.TwoFactor')}
                                    </span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                                    <span className="text-sm text-muted-foreground">
                                        {t('Security.Anonymous')}
                                    </span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                                    <span className="text-sm text-muted-foreground">
                                        {t('Security.Moderation')}
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowSecurityInfo(!showSecurityInfo)}
                                className="w-full mt-6 text-sm text-primary hover:text-primary/80 flex items-center gap-2 justify-center"
                            >
                                {showSecurityInfo ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                {showSecurityInfo ? t('Security.HideDetails') : t('Security.ShowDetails')}
                            </button>

                            {showSecurityInfo && (
                                <div className="mt-4 p-4 bg-background rounded-lg border border-border">
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        {t('Security.DetailedInfo')}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submission Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="bg-muted/30 rounded-2xl p-6 border border-border">
                                <h3 className="text-xl font-bold text-foreground mb-6">
                                    {t('Form.StoryDetails')}
                                </h3>

                                {/* Story Type */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-foreground mb-3">
                                        {t('Form.StoryType')}
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        {(['written', 'audio', 'video'] as const).map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, type }))}
                                                className={cn(
                                                    "p-3 border rounded-lg text-sm font-medium transition-all duration-200",
                                                    formData.type === type
                                                        ? "border-primary bg-primary/10 text-primary"
                                                        : "border-border bg-background text-muted-foreground hover:border-primary/50"
                                                )}
                                            >
                                                {t(`Form.Types.${type.charAt(0).toUpperCase() + type.slice(1)}`)}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Title */}
                                <div className="mb-6">
                                    <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                                        {t('Form.Title')}
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                                        placeholder={t('Form.TitlePlaceholder')}
                                    />
                                </div>

                                {/* Content */}
                                <div className="mb-6">
                                    <label htmlFor="content" className="block text-sm font-medium text-foreground mb-2">
                                        {t('Form.Content')}
                                    </label>
                                    <textarea
                                        id="content"
                                        value={formData.content}
                                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                        rows={6}
                                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background resize-none"
                                        placeholder={t('Form.ContentPlaceholder')}
                                    />
                                </div>

                                {/* Media Upload */}
                                {formData.type !== 'written' && (
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            {t('Form.UploadMedia')}
                                        </label>
                                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors duration-200">
                                            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                                            <p className="text-sm text-muted-foreground mb-2">
                                                {t('Form.UploadHint')}
                                            </p>
                                            <button
                                                type="button"
                                                className="text-sm text-primary hover:text-primary/80 font-medium"
                                            >
                                                {t('Form.ChooseFile')}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Privacy Settings */}
                            <div className="bg-muted/30 rounded-2xl p-6 border border-border">
                                <h3 className="text-xl font-bold text-foreground mb-6">
                                    {t('Form.PrivacySettings')}
                                </h3>

                                {/* Anonymity Toggle */}
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1">
                                            {t('Form.AnonymousPosting')}
                                        </label>
                                        <p className="text-xs text-muted-foreground">
                                            {t('Form.AnonymousDescription')}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, isAnonymous: !prev.isAnonymous }))}
                                        className={cn(
                                            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200",
                                            formData.isAnonymous ? "bg-primary" : "bg-muted"
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200",
                                                formData.isAnonymous ? "translate-x-6" : "translate-x-1"
                                            )}
                                        />
                                    </button>
                                </div>

                                {/* Consent */}
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        id="consent"
                                        checked={formData.consentGiven}
                                        onChange={(e) => setFormData(prev => ({ ...prev, consentGiven: e.target.checked }))}
                                        className="mt-1 rounded border-border text-primary focus:ring-primary"
                                    />
                                    <label htmlFor="consent" className="text-sm text-muted-foreground">
                                        {t('Form.Consent')}
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={!formData.consentGiven || !formData.title || !formData.content}
                                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {t('Form.SubmitButton')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}