// components/pages/contact-us/digital-resources.tsx
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { Globe, FileText, Youtube, BookOpen, Download, ExternalLink } from "lucide-react";

export default function DigitalResources({ className }: { className?: string }) {
  const t = useTranslations('ContactUsPage.DigitalResources');

  const websites = [
    {
      icon: Globe,
      name: t('Websites.JanMitraNyas'),
      url: "https://janmitranyas.in/",
      description: t('Websites.JanMitraDescription')
    },
    {
      icon: Globe,
      name: t('Websites.PVCHR'),
      url: "https://pvchr.asia/",
      description: t('Websites.PVCHRDescription')
    },
    {
      icon: BookOpen,
      name: t('Websites.ConnectPlus'),
      url: "http://empowersurvivor.com",
      description: t('Websites.ConnectPlusDescription')
    },
    {
      icon: FileText,
      name: t('Websites.PVCHRBlog'),
      url: "https://pvchr.blogspot.com/",
      description: t('Websites.PVCHRBlogDescription')
    },
    {
      icon: FileText,
      name: t('Websites.TestimonialHealing'),
      url: "https://testimonialhealing.blogspot.com/",
      description: t('Websites.TestimonialHealingDescription')
    },
    {
      icon: Youtube,
      name: t('Websites.YouTube'),
      url: "https://www.youtube.com/user/pvchrindia",
      description: t('Websites.YouTubeDescription')
    }
  ];

  const documents = [
    {
      name: t('Documents.AnnualReport'),
      type: "PDF",
      size: "2.4 MB",
      url: "#",
      description: t('Documents.AnnualReportDescription')
    },
    {
      name: t('Documents.ReportsArchive'),
      type: "Collection",
      size: "Multiple",
      url: "#",
      description: t('Documents.ReportsArchiveDescription')
    }
  ];

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
          {/* Websites & Platforms */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              {t('WebsitesTitle')}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {websites.map((website, index) => (
                <a
                  key={index}
                  href={website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 bg-muted/30 rounded-2xl border border-border hover:border-primary hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <website.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {website.name}
                      </h4>
                      <ExternalLink className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {website.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Documentation */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              {t('DocumentsTitle')}
            </h3>
            <div className="space-y-4">
              {documents.map((doc, index) => (
                <div
                  key={index}
                  className="bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/10 rounded-2xl p-6 border border-purple-200 dark:border-purple-800"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-purple-600" />
                      <h4 className="font-semibold text-foreground">
                        {doc.name}
                      </h4>
                    </div>
                    <span className="text-xs bg-purple-100 dark:bg-purple-800/50 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
                      {doc.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {doc.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {doc.size}
                    </span>
                    <button className="flex items-center gap-2 px-3 py-1 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors">
                      <Download className="w-3 h-3" />
                      {t('Download')}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Resources */}
            <div className="bg-muted/50 rounded-2xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-3">
                {t('AdditionalResources.Title')}
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{t('AdditionalResources.Wikipedia')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{t('AdditionalResources.Research')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{t('AdditionalResources.Publications')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}