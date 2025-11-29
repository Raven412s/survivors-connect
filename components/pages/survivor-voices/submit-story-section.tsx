// components/pages/survivor-voices/submit-story-section.tsx
'use client';

import MultiSelect from "@/components/starter-kit-ui/multi-select";
import { cn } from "@/lib/utils";
import { TestimonySubmission } from "@/types";
import { Check, Eye, EyeOff, Lock, Shield, Upload, X } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function SubmitStorySection({ className }: { className?: string }) {
    const t = useTranslations('SurvivorVoicesPage.SubmitStory');
    const [showSecurityInfo, setShowSecurityInfo] = useState(false);
    const [formData, setFormData] = useState<TestimonySubmission & {
        authorAffiliation?: string;
        excerpt?: string;
        language: string;
        status: "draft" | "pending" | "approved" | "rejected" | "archived";
        featured: boolean;
        createdBy?: string;
    }>({
        title: '',
        content: '',
        type: 'written',
        isAnonymous: true,
        theme: [],
        allowContact: false,
        consentGiven: false,
        authorName: '',
        tags: [],
        authorAffiliation: '',
        excerpt: '',
        language: 'en',
        status: 'pending',
        featured: false,
        createdBy: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mediaFile, setMediaFile] = useState<File | null>(null);

    // Auto-dismiss success message after 5 seconds
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setMediaFile(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validation
        if (!formData.consentGiven) {
            alert("You must give consent to submit your story.");
            return;
        }
        if (!formData.title || !formData.content) {
            alert("Title and content are required.");
            return;
        }
        if (!formData.isAnonymous && !formData.authorName) {
            alert("Please provide your name or select anonymous posting.");
            return;
        }

        setLoading(true);
        setSuccess(false);

        try {
            const fd = new FormData();
            
            // Add form data with proper type coercion
            fd.append("title", formData.title);
            fd.append("content", formData.content);
            fd.append("type", formData.type);
            fd.append("isAnonymous", String(formData.isAnonymous));
            fd.append("allowContact", String(formData.allowContact));
            fd.append("consentGiven", String(formData.consentGiven));
            fd.append("featured", String(formData.featured));
            fd.append("language", formData.language);
            fd.append("status", formData.status);
            
            // Send arrays as JSON strings
            fd.append("theme", JSON.stringify(formData.theme || []));
            fd.append("tags", JSON.stringify(formData.tags || []));
            
            // Author name - send "Anonymous" if anonymous posting is selected
            const authorName = formData.isAnonymous ? "Anonymous" : (formData.authorName || "");
            fd.append("authorName", authorName);
            
            // Optional fields
            if (formData.authorAffiliation) fd.append("authorAffiliation", formData.authorAffiliation);
            if (formData.excerpt) fd.append("excerpt", formData.excerpt);
            if (formData.createdBy) fd.append("createdBy", formData.createdBy);
            
            if (mediaFile) fd.append("media", mediaFile);

            const res = await fetch("/api/testimonials", {
                method: "POST",
                body: fd,
            });

            const json = await res.json();
            if (!res.ok) {
                const errorMsg = json.details || json.error || "Submission failed";
                console.error("Submission error:", errorMsg);
                throw new Error(errorMsg);
            }

            console.log("Story submitted successfully:", json);
            setSuccess(true);

            // Reset form
            setFormData({
                title: '',
                content: '',
                type: 'written',
                isAnonymous: true,
                theme: [],
                allowContact: false,
                consentGiven: false,
                authorName: '',
                tags: [],
                authorAffiliation: '',
                excerpt: '',
                language: 'en',
                status: 'pending',
                featured: false,
                createdBy: '',
            });
            setMediaFile(null);
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : "Something went wrong. Try again.";
            console.error("Form submission error:", err);
            setError(errorMsg);
            alert(errorMsg);
        }

        setLoading(false);
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
                    <h2 className="text-4xl font-bold text-foreground">{t('Title')}</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('Description')}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Success Message */}
                    {success && (
                        <div className="lg:col-span-3 mb-6 flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
                            <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-green-900">
                                    Success! Your story has been submitted and is pending review.
                                </p>
                                <p className="text-xs text-green-700 mt-1">
                                    Thank you for sharing your story. Our team will review it and publish it soon.
                                </p>
                            </div>
                            <button
                                onClick={() => setSuccess(false)}
                                className="text-green-600 hover:text-green-700 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="lg:col-span-3 mb-6 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
                            <X className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-red-900">
                                    Error submitting your story
                                </p>
                                <p className="text-xs text-red-700 mt-1">
                                    {error}
                                </p>
                            </div>
                            <button
                                onClick={() => setError(null)}
                                className="text-red-600 hover:text-red-700 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {/* Security Features */}
                    <div className="lg:col-span-1">
                        <div className="bg-muted/30 rounded-2xl p-6 border border-border sticky top-28">
                            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <Lock className="w-5 h-5 text-primary" />
                                {t('Security.Title')}
                            </h3>
                            <div className="space-y-4">
                                {['Encryption', 'TwoFactor', 'Anonymous', 'Moderation'].map((item) => (
                                    <div key={item} className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                                        <span className="text-sm text-muted-foreground">{t(`Security.${item}`)}</span>
                                    </div>
                                ))}
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
                                <h3 className="text-xl font-bold text-foreground mb-6">{t('Form.StoryDetails')}</h3>

                                {/* Story Type */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-foreground mb-3">{t('Form.StoryType')}</label>
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
                                    <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">{t('Form.Title')}</label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                                        placeholder={t('Form.TitlePlaceholder')}
                                        required
                                    />
                                </div>

                                {/* Author Name */}
                                <div className="mb-6">
                                    <label htmlFor="authorName" className="block text-sm font-medium text-foreground mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        id="authorName"
                                        value={formData.authorName}
                                        onChange={(e) => setFormData(prev => ({ ...prev, authorName: e.target.value }))}
                                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                                        placeholder="Enter your name"
                                        disabled={formData.isAnonymous}
                                        required={!formData.isAnonymous}
                                    />
                                </div>

                                {/* Author Affiliation */}
                                <div className="mb-6">
                                    <label htmlFor="authorAffiliation" className="block text-sm font-medium text-foreground mb-2">Affiliation / Organization</label>
                                    <input
                                        type="text"
                                        id="authorAffiliation"
                                        value={formData.authorAffiliation}
                                        onChange={(e) => setFormData(prev => ({ ...prev, authorAffiliation: e.target.value }))}
                                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                                        placeholder="Your affiliation (optional)"
                                    />
                                </div>

                                {/* Excerpt */}
                                <div className="mb-6">
                                    <label htmlFor="excerpt" className="block text-sm font-medium text-foreground mb-2">Excerpt</label>
                                    <input
                                        type="text"
                                        id="excerpt"
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                                        placeholder="Short excerpt / summary (optional)"
                                    />
                                </div>

                                {/* Content */}
                                <div className="mb-6">
                                    <label htmlFor="content" className="block text-sm font-medium text-foreground mb-2">{t('Form.Content')}</label>
                                    <textarea
                                        id="content"
                                        value={formData.content}
                                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                        rows={6}
                                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background resize-none"
                                        placeholder={t('Form.ContentPlaceholder')}
                                        required
                                    />
                                </div>

                                {/* Tags */}
                                <MultiSelect
                                    label="Tags"
                                    placeholder="Select or add tags"
                                    options={["Friendly","Professional","Helpful","Quick Response","Affordable","Highly Recommended"]}
                                    value={formData.tags}
                                    onChange={(values) => setFormData(prev => ({ ...prev, tags: values }))}
                                />

                                {/* Media Upload */}
                                {formData.type !== "written" && (
                                    <div className="mb-6">
                                        <label htmlFor="media" className="block text-sm font-medium text-foreground mb-2">{t("Form.UploadMedia")}</label>
                                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors duration-200">
                                            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                                            <p className="text-sm text-muted-foreground mb-2">{t("Form.UploadHint")}</p>
                                            <input type="file" accept="image/*,video/*,audio/*" id="mediaUploadInput" className="hidden" onChange={handleMediaUpload} />
                                            <button type="button" onClick={() => document.getElementById("mediaUploadInput")?.click()} className="text-sm text-primary hover:text-primary/80 font-medium">{t("Form.ChooseFile")}</button>
                                            {mediaFile && <p className="mt-3 text-sm text-foreground font-medium">Selected: {mediaFile.name}</p>}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Privacy & Settings */}
                            <div className="bg-muted/30 rounded-2xl p-6 border border-border space-y-4">
                                {/* Anonymity Toggle */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1">{t('Form.AnonymousPosting')}</label>
                                        <p className="text-xs text-muted-foreground">{t('Form.AnonymousDescription')}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, isAnonymous: !prev.isAnonymous }))}
                                        className={cn(
                                            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200",
                                            formData.isAnonymous ? "bg-primary" : "bg-muted"
                                        )}
                                    >
                                        <span className={cn(
                                            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200",
                                            formData.isAnonymous ? "translate-x-6" : "translate-x-1"
                                        )}/>
                                    </button>
                                </div>

                                {/* Consent */}
                                <div className="flex items-start gap-3">
                                    <input type="checkbox" id="consent" checked={formData.consentGiven} onChange={e => setFormData(prev => ({ ...prev, consentGiven: e.target.checked }))} className="mt-1 rounded border-border text-primary focus:ring-primary" />
                                    <label htmlFor="consent" className="text-sm text-muted-foreground">{t('Form.Consent')}</label>
                                </div>

                                {/* Featured */}
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="featured" checked={formData.featured} onChange={e => setFormData(prev => ({ ...prev, featured: e.target.checked }))} className="mt-1 rounded border-border text-primary focus:ring-primary" />
                                    <label htmlFor="featured" className="text-sm text-muted-foreground">Mark as Featured</label>
                                </div>

                                {/* Language */}
                                <div>
                                    <label htmlFor="language" className="block text-sm font-medium text-foreground mb-1">Language</label>
                                    <select id="language" value={formData.language} onChange={e => setFormData(prev => ({ ...prev, language: e.target.value }))} className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background">
                                        <option value="en">English</option>
                                        <option value="hi">Hindi</option>
                                        <option value="es">Spanish</option>
                                        <option value="fr">French</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !formData.consentGiven || !formData.title || !formData.content}
                                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 disabled:opacity-50"
                            >
                                {loading ? "Submitting..." : t('Form.SubmitButton')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
