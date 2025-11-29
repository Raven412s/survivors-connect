// components/pages/news-media/highlights-recognition.tsx
import { cn } from "@/lib/utils";
import React from "react";
import { Award, Film, Users, Globe, Calendar } from "lucide-react";
import { useTranslations } from 'next-intl';
import Image from "next/image";

export default function HighlightsRecognition({ className }: { className?: string }) {
  const t = useTranslations('NewsMedia.Highlights-Recognition');
  
  return (
    <section
      className={cn(
        "w-full py-20 px-6 md:px-8 lg:px-16 bg-linear-to-b from-muted/20 to-background",
        className
      )}
      id="highlights"
    >
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
            <Award className="w-4 h-4" />
            {t('Badge')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t('Title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('Description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Health Icon Awards */}
          <div className="space-y-8">
            <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{t('Health-Awards.Title')}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Calendar className="w-4 h-4" />
                    {t('Health-Awards.Date')}
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6">
                {t('Health-Awards.Description')}
              </p>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                <h4 className="font-semibold text-foreground text-sm mb-2">
                  {t('Health-Awards.Recognition.Title')}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t('Health-Awards.Recognition.Description')}
                </p>
              </div>
            </div>

            {/* Documentary Screening */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Film className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{t('Documentary.Title')}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Calendar className="w-4 h-4" />
                    {t('Documentary.Date')}
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6">
                {t('Documentary.Description')}
              </p>
              
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Film className="w-4 h-4 text-purple-600" />
                {t('Documentary.Production')}
              </div>
            </div>
          </div>

          {/* International Recognition */}
          <div className="space-y-8">
            {/* Youth Representation */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{t('Youth-Representation.Title')}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Calendar className="w-4 h-4" />
                    {t('Youth-Representation.Date')}
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">
                {t('Youth-Representation.Description')}
              </p>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-foreground text-sm mb-2">
                  {t('Youth-Representation.Impact.Title')}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t('Youth-Representation.Impact.Description')}
                </p>
              </div>
            </div>

            {/* Global Research Feature */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{t('Global-Research.Title')}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Calendar className="w-4 h-4" />
                    {t('Global-Research.Period')}
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">
                {t('Global-Research.Description')}
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-foreground text-sm mb-2">
                  {t('Global-Research.Impact.Title')}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t('Global-Research.Impact.Description')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Placeholder - Award Ceremony */}
        <div className="mt-16 bg-muted rounded-2xl p-8 border border-border h-64 relative overflow-hidden  flex items-center justify-center">
          <Image src={'/images/media-coverage/2.jpeg'} alt="award-ceremony" fill className="object-cover object-bottom "/>
          {/* Replace with actual image from Health Icon Awards ceremony or documentary screening */}
        </div>
      </div>
    </section>
  );
}