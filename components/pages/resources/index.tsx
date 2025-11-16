// components/pages/resources/index.tsx
'use client';

import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { 
  Globe, 
  FileText, 
  Youtube, 
  BookOpen, 
  Link as LinkIcon, 
  ExternalLink,
  Heart,
  Users,
  Archive,
  Download,
  Share2,
  Music
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ResourcesPage({ className }: { className?: string }) {
  const t = useTranslations('ResourcesPage');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Core organizational websites
  const organizationalWebsites = [
    {
      icon: Globe,
      name: "Jan Mitra Nyas",
      url: "https://janmitranyas.in/",
      description: "Official website of Jan Mitra Nyas - Our parent organization working on victim empowerment and human rights advocacy since 1999.",
      category: "Organization"
    },
    {
      icon: Globe,
      name: "PVCHR.asia",
      url: "https://pvchr.asia/",
      description: "People's Vigilance Committee on Human Rights - International initiative ensuring basic rights for marginalized groups.",
      category: "Organization"
    },
    {
      icon: Globe,
      name: "Connect+ Platform",
      url: "http://empowersurvivor.com",
      description: "ICT-based peer learning community platform connecting survivors with professionals and resources.",
      category: "Platform"
    }
  ];

  // Knowledge & Blog Resources
  const knowledgeResources = [
    {
      icon: FileText,
      name: "PVCHR Blog",
      url: "https://pvchr.blogspot.com/",
      description: "Research articles, case studies, and advocacy updates on torture prevention and victim support.",
      category: "Blog",
      content: "Research & Articles"
    },
    {
      icon: BookOpen,
      name: "Testimonial Healing Blog",
      url: "https://testimonialhealing.blogspot.com/",
      description: "Healing stories, therapeutic content, and survivor testimonies for emotional and psychological support.",
      category: "Blog",
      content: "Healing & Stories"
    }
  ];

  // Multimedia Resources
  const multimediaResources = [
    {
      icon: Youtube,
      name: "YouTube Channel",
      url: "https://www.youtube.com/user/pvchrindia",
      description: "Video content including survivor stories, educational materials, training sessions, and advocacy videos.",
      category: "Video",
      content: "Videos"
    },
    {
      icon: Music,
      name: "Audio Resources",
      url: "https://janmitranyas.in/",
      description: "Podcasts and audio content featuring survivor voices and expert insights.",
      category: "Audio",
      content: "Podcasts"
    }
  ];

  // Reports & Documentation
  const reports = [
    {
      icon: FileText,
      name: "Comprehensive Report",
      url: "https://janmitranyas.in/report.html",
      description: "Detailed annual report on victim empowerment initiatives, impact metrics, and program outcomes.",
      category: "Report",
      fileType: "HTML",
      year: "2024"
    },
    {
      icon: Download,
      name: "Annual Reports Archive",
      url: "https://janmitranyas.in/",
      description: "Complete archive of historical annual reports showcasing organizational growth and impact.",
      category: "Archive",
      fileType: "Multiple"
    }
  ];

  // Reference & Verification Resources
  const referenceResources = [
    {
      icon: LinkIcon,
      name: "Wikipedia Entry",
      url: "https://en.wikipedia.org/wiki/People%27s_Vigilance_Committee_on_Human_Rights",
      description: "Wikipedia page providing background information about PVCHR and our human rights work.",
      category: "Reference",
      verified: true
    }
  ];

  // Social Media Connections
  const socialMediaLinks = [
    {
      icon: Globe,
      name: "Facebook",
      url: "https://facebook.com/survivorconnect",
      description: "Follow us for updates, events, and community stories.",
      platform: "Facebook"
    },
    {
      icon: Globe,
      name: "Twitter",
      url: "https://twitter.com/survivorconnect",
      description: "Real-time updates on advocacy, research, and survivor support.",
      platform: "Twitter"
    },
    {
      icon: Globe,
      name: "Instagram",
      url: "https://instagram.com/survivorconnect",
      description: "Visual stories, awareness campaigns, and community highlights.",
      platform: "Instagram"
    }
  ];

  // Support Resources
  const supportResources = [
    {
      icon: Heart,
      title: "Mental Health Support",
      description: "Access to counseling, therapy, and peer support services",
      links: [
        { label: "Testimonial Therapy", url: "https://testimonialhealing.blogspot.com/" },
        { label: "Psychosocial Care", url: "/support-services" }
      ]
    },
    {
      icon: Users,
      title: "Legal & Advocacy",
      description: "Information on legal rights, advocacy resources, and case support",
      links: [
        { label: "Legal Aid Information", url: "/support-services" },
        { label: "Advocacy Resources", url: "/get-involved" }
      ]
    },
    {
      icon: Archive,
      title: "Research & Publications",
      description: "Academic papers, case studies, and research findings",
      links: [
        { label: "Research Archive", url: "/research-publications" },
        { label: "Publications", url: "/research-publications" }
      ]
    }
  ];

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(url);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <div className={cn("w-full bg-background", className)}>
      {/* Hero Section */}
      <section className="w-full py-16 px-6 md:px-16 bg-linear-to-b from-primary/5 to-background border-b border-border">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            {t('Hero.Title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('Hero.Description')}
          </p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            {t('Hero.Subtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="w-full py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto space-y-20">

          {/* Organizational Websites */}
          <section className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Globe className="w-8 h-8 text-primary" />
                {t('Sections.OrganizationalWebsites.Title')}
              </h2>
              <p className="text-muted-foreground">
                {t('Sections.OrganizationalWebsites.Description')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {organizationalWebsites.map((website, index) => (
                <a
                  key={index}
                  href={website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card border border-border rounded-xl p-6 hover:border-primary hover:shadow-lg hover:bg-primary/5 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <website.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                      {website.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {website.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {website.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">Visit</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Knowledge & Learning Resources */}
          <section className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-primary" />
                {t('Sections.KnowledgeResources.Title')}
              </h2>
              <p className="text-muted-foreground">
                {t('Sections.KnowledgeResources.Description')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {knowledgeResources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card border border-border rounded-xl p-6 hover:border-primary hover:shadow-lg hover:bg-primary/5 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <resource.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex gap-2">
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full font-medium">
                        {resource.category}
                      </span>
                      <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full font-medium">
                        {resource.content}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {resource.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {resource.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">Read</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Multimedia Resources */}
          <section className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Youtube className="w-8 h-8 text-primary" />
                {t('Sections.MultimediaResources.Title')}
              </h2>
              <p className="text-muted-foreground">
                {t('Sections.MultimediaResources.Description')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {multimediaResources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card border border-border rounded-xl p-6 hover:border-primary hover:shadow-lg hover:bg-primary/5 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <resource.icon className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="flex gap-2">
                      <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1 rounded-full font-medium">
                        {resource.category}
                      </span>
                      <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full font-medium">
                        {resource.content}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {resource.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {resource.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">Watch</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Reports & Documentation */}
          <section className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <FileText className="w-8 h-8 text-primary" />
                {t('Sections.Reports.Title')}
              </h2>
              <p className="text-muted-foreground">
                {t('Sections.Reports.Description')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reports.map((report, index) => (
                <a
                  key={index}
                  href={report.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card border border-border rounded-xl p-6 hover:border-primary hover:shadow-lg hover:bg-primary/5 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <report.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex gap-2">
                      <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full font-medium">
                        {report.fileType}
                      </span>
                      {report.year && (
                        <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full font-medium">
                          {report.year}
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {report.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {report.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">Access</span>
                    <Download className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Reference Resources */}
          <section className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <LinkIcon className="w-8 h-8 text-primary" />
                {t('Sections.Reference.Title')}
              </h2>
              <p className="text-muted-foreground">
                {t('Sections.Reference.Description')}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {referenceResources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card border border-border rounded-xl p-6 hover:border-primary hover:shadow-lg hover:bg-primary/5 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg group-hover:scale-110 transition-transform duration-300">
                          <resource.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                            {resource.name}
                          </h3>
                          {resource.verified && (
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                              ✓ Verified
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground ml-15">
                        {resource.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Support Resource Categories */}
          <section className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Heart className="w-8 h-8 text-primary" />
                {t('Sections.SupportResources.Title')}
              </h2>
              <p className="text-muted-foreground">
                {t('Sections.SupportResources.Description')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {supportResources.map((resource, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 space-y-4"
                >
                  <div className="p-3 w-fit bg-primary/10 rounded-lg">
                    <resource.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {resource.description}
                    </p>
                  </div>
                  <div className="space-y-2 pt-4 border-t border-border">
                    {resource.links.map((link, linkIndex) => (
                      <Link
                        key={linkIndex}
                        href={link.url}
                        className="flex items-center gap-2 text-sm text-primary hover:underline group"
                      >
                        <LinkIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Social Media */}
          <section className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Share2 className="w-8 h-8 text-primary" />
                {t('Sections.Social.Title')}
              </h2>
              <p className="text-muted-foreground">
                {t('Sections.Social.Description')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {socialMediaLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card border border-border rounded-xl p-6 hover:border-primary hover:shadow-lg hover:bg-primary/5 transition-all duration-300 flex flex-col"
                >
                  <div className="p-3 w-fit bg-primary/10 rounded-lg group-hover:scale-110 transition-transform duration-300 mb-4">
                    <social.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {social.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    {social.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">Follow</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Quick Copy Links */}
          <section className="bg-linear-to-r from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {t('Sections.QuickLinks.Title')}
              </h2>
              <p className="text-muted-foreground">
                {t('Sections.QuickLinks.Description')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Survivor Connect", url: "https://survivorconnect.org" },
                { label: "Jan Mitra Nyas", url: "https://janmitranyas.in/" },
                { label: "PVCHR", url: "https://pvchr.asia/" },
                { label: "Connect+ Platform", url: "http://empowersurvivor.com" }
              ].map((link, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-background/80 border border-border rounded-lg p-4"
                >
                  <div className="text-sm">
                    <p className="font-medium text-foreground">{link.label}</p>
                    <p className="text-xs text-muted-foreground truncate">{link.url}</p>
                  </div>
                  <button
                    onClick={() => handleCopyLink(link.url)}
                    className={cn(
                      "ml-2 px-3 py-1 rounded-lg text-sm font-medium transition-all",
                      copiedLink === link.url
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    )}
                  >
                    {copiedLink === link.url ? "✓ Copied" : "Copy"}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {t('Sections.CTA.Title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('Sections.CTA.Description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact-us"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                {t('Sections.CTA.ContactButton')}
              </Link>
              <Link
                href="/get-involved"
                className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors"
              >
                {t('Sections.CTA.InvolvedButton')}
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
