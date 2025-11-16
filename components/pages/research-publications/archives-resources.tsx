// components/pages/research-publications/archives-resources.tsx
import { cn } from "@/lib/utils";
import React from "react";
import { Archive, Download, ExternalLink, FileText, Database } from "lucide-react";
import { useTranslations } from 'next-intl';
import Link from "next/link";

export default function ArchivesResources({ className }: { className?: string }) {
  const t = useTranslations('ResearchPublications.Archives-Resources');
  
  return (
    <section
      className={cn(
        "w-full py-20 px-6 md:px-8 lg:px-16 bg-linear-to-b from-muted/10 to-background",
        className
      )}
      id="archives"
    >
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
            <Archive className="w-4 h-4" />
            {t('Badge')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t('Title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('Description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Organizational Reports */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Database className="w-6 h-6 text-blue-600" />
              {t('Organizational-Reports.Title')}
            </h3>

            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="space-y-4">
                <Link href="https://janmitranyas.in/report.html" target="_blank" className="flex items-center justify-between p-4 hover:bg-muted rounded-lg transition-colors group">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="text-foreground group-hover:text-primary font-medium">
                      {t('Organizational-Reports.All-Reports')}
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </Link>

                <Link href="https://janmitranyas.in/report.html" target="_blank" className="flex items-center justify-between p-4 hover:bg-muted rounded-lg transition-colors group">
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-green-600" />
                    <div>
                      <span className="text-foreground group-hover:text-primary font-medium block">
                        {t('Organizational-Reports.Annual-Report.Title')}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {t('Organizational-Reports.Annual-Report.Year')}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </Link>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-foreground text-sm mb-2">
                  {t('Organizational-Reports.Coverage.Title')}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t('Organizational-Reports.Coverage.Description')}
                </p>
              </div>
            </div>
          </div>

          {/* Blog Archives */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Archive className="w-6 h-6 text-purple-600" />
              {t('Blog-Archives.Title')}
            </h3>

            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="space-y-4">
                <Link href="https://pvchr.blogspot.com" target="_blank" className="flex items-center justify-between p-4 hover:bg-muted rounded-lg transition-colors group">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-purple-600" />
                    <div>
                      <span className="text-foreground group-hover:text-primary font-medium block">
                        {t('Blog-Archives.PVCHR-Blog.Title')}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {t('Blog-Archives.PVCHR-Blog.Description')}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </Link>

                <Link href="https://testimonialhealing.blogspot.com" target="_blank" className="flex items-center justify-between p-4 hover:bg-muted rounded-lg transition-colors group">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-orange-600" />
                    <div>
                      <span className="text-foreground group-hover:text-primary font-medium block">
                        {t('Blog-Archives.Testimonial-Blog.Title')}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {t('Blog-Archives.Testimonial-Blog.Description')}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </Link>
              </div>

              <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <h4 className="font-semibold text-foreground text-sm mb-2">
                  {t('Blog-Archives.Research-Contribution.Title')}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t('Blog-Archives.Research-Contribution.Description')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Placeholder - Digital Archive */}
        <div className="mt-16 bg-muted rounded-2xl p-8 border border-border h-64 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Archive className="w-12 h-12 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground italic">
              {t('Image-Placeholder.Digital-Archive')}
            </p>
          </div>
          {/* Replace with actual image of digital archive interface or research database */}
        </div>
      </div>
    </section>
  );
}