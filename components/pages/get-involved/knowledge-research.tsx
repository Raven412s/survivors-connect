// components/pages/get-involved/knowledge-research.tsx
'use client';

import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { BookOpen, Share2, FileText, Download, Check } from "lucide-react";
import { useState } from 'react';

export default function KnowledgeResearch({ className }: { className?: string }) {
  const t = useTranslations('GetInvolvedPage.KnowledgeResearch');
  const [isSharing, setIsSharing] = useState(false);
  const [sharedSuccess, setSharedSuccess] = useState(false);

  const knowledgeProducts = [
    {
      icon: FileText,
      title: t('Products.PublicBlogs.Title'),
      description: t('Products.PublicBlogs.Description'),
      link: "https://pvchr.blogspot.com/"
    },
    {
      icon: BookOpen,
      title: t('Products.Testimonials.Title'),
      description: t('Products.Testimonials.Description'),
      link: "https://testimonialhealing.blogspot.com/"
    },
    {
      icon: Share2,
      title: t('Products.ResearchPapers.Title'),
      description: t('Products.ResearchPapers.Description'),
      link: "https://janmitranyas.in/"
    }
  ];

  const featuredPublications = [
    {
      name: t('FeaturedPublications.HealingHonour'),
      link: "https://testimonialhealing.blogspot.com/"
    },
    {
      name: t('FeaturedPublications.TortureFreeSociety'),
      link: "https://pvchr.blogspot.com/"
    }
  ];

  const handleShareKnowledge = async () => {
    setIsSharing(true);
    
    // Simulate sharing process
    try {
      // Share on social media or copy link
      const shareText = "Check out these important resources from Survivor Connect:";
      const shareUrl = "https://survivorconnect.org/resources";
      
      if (navigator.share) {
        // Use Web Share API if available
        await navigator.share({
          title: 'Survivor Connect Resources',
          text: shareText,
          url: shareUrl,
        });
      } else if (navigator.clipboard) {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      }
      
      setSharedSuccess(true);
      setTimeout(() => setSharedSuccess(false), 3000);
    } catch (error) {
      console.log('Sharing failed:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleDownloadPublication = (publicationName: string, link: string) => {
    // Simulate download or redirect to publication
    console.log(`Downloading: ${publicationName}`);
    window.open(link, '_blank');
  };

  return (
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
          {/* Knowledge Products */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-foreground">
              {t('ProductsTitle')}
            </h3>
            <div className="space-y-6">
              {knowledgeProducts.map((product, index) => (
                <div
                  key={index}
                  className="bg-muted/30 rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <product.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="text-lg font-semibold text-foreground">
                        {product.title}
                      </h4>
                    </div>
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Visit
                    </a>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Publications */}
          <div className="space-y-8">
            <div className="bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/10 rounded-2xl p-8 border border-purple-200 dark:border-purple-800">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                {t('FeaturedPublicationsTitle')}
              </h3>
              <div className="space-y-4 mb-6">
                {featuredPublications.map((publication, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Download className="w-4 h-4 text-purple-600 mt-1 shrink-0" />
                      <span className="text-muted-foreground">{publication.name}</span>
                    </div>
                    <button
                      onClick={() => handleDownloadPublication(publication.name, publication.link)}
                      className="ml-4 px-3 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                    >
                      Read
                    </button>
                  </div>
                ))}
              </div>
              <button 
                onClick={handleShareKnowledge}
                disabled={isSharing}
                className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSharing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sharing...
                  </>
                ) : sharedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    Shared Successfully!
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    {t('ShareKnowledgeButton')}
                  </>
                )}
              </button>
            </div>

            {/* Recognition */}
            <div className="bg-background rounded-2xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-3">
                {t('Recognition.Title')}
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                {t('Recognition.Description')}
              </p>
              <div className="text-xs text-muted-foreground">
                {t('Recognition.GlobalReport')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}