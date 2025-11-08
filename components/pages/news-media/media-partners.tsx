// components/pages/news-media/media-partners.tsx
import { cn } from "@/lib/utils";
import React from "react";
import { Video, Users, MapPin, Calendar, Award } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function MediaPartners({ className }: { className?: string }) {
  const t = useTranslations('NewsMedia.Media-Partners');
  
  return (
    <section
      className={cn(
        "w-full py-20 px-6 md:px-8 lg:px-16 bg-linear-to-b from-background to-muted/20",
        className
      )}
      id="media-partners"
    >
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium">
            <Video className="w-4 h-4" />
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
          {/* Viacam Productions Detailed Section */}
          <div className="space-y-8">
            <div className="bg-card border border-border rounded-2xl p-8">
              {/* Logo and Basic Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                  <Video className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{t('Viacam.Title')}</h3>
                  <p className="text-muted-foreground">{t('Viacam.Tagline')}</p>
                </div>
              </div>

              {/* Founder Information */}
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 mb-6 border border-orange-200 dark:border-orange-800">
                <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-600" />
                  {t('Viacam.Founder.Title')}
                </h4>
                <div className="flex items-start gap-4">
                  {/* Founder Image Placeholder */}
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-foreground">{t('Viacam.Founder.Name')}</h5>
                    <p className="text-sm text-muted-foreground mb-2">{t('Viacam.Founder.Position')}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {t('Viacam.Founder.Location')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  <div>
                    <span className="font-medium text-foreground">{t('Viacam.Details.Location.Title')}</span>
                    <p className="text-sm text-muted-foreground">{t('Viacam.Details.Location.Address')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <div>
                    <span className="font-medium text-foreground">{t('Viacam.Details.Established.Title')}</span>
                    <p className="text-sm text-muted-foreground">{t('Viacam.Details.Established.Year')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-orange-600" />
                  <div>
                    <span className="font-medium text-foreground">{t('Viacam.Details.Specialization.Title')}</span>
                    <p className="text-sm text-muted-foreground">{t('Viacam.Details.Specialization.Description')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Partnership Details */}
            <div className="bg-linear-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/10 rounded-2xl p-8 border border-orange-200 dark:border-orange-800">
              <h4 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Video className="w-5 h-5 text-orange-600" />
                {t('Viacam.Partnership.Title')}
              </h4>
              <p className="text-muted-foreground mb-6">
                {t('Viacam.Partnership.Description')}
              </p>
              
              <div className="space-y-3">
                <h5 className="font-semibold text-foreground text-sm">{t('Viacam.Partnership.Role.Title')}</h5>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 shrink-0" />
                    {t('Viacam.Partnership.Role.Digital-Dissemination')}
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 shrink-0" />
                    {t('Viacam.Partnership.Role.Communication-Strategy')}
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 shrink-0" />
                    {t('Viacam.Partnership.Role.Content-Production')}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Image Placeholder - Viacam Productions */}
          <div className="space-y-6">
            <div className="bg-muted rounded-2xl p-8 border border-border h-80 flex items-center justify-center">
              <div className="text-center space-y-4">
                <Video className="w-16 h-16 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground italic">
                  {t('Image-Placeholder.Viacam-Studio')}
                </p>
              </div>
              {/* Replace with actual image of Viacam Productions studio, team, or production work */}
            </div>

            {/* Placeholder for Additional Details */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h4 className="font-semibold text-foreground mb-4">{t('Viacam.Placeholder.Title')}</h4>
              <p className="text-sm text-muted-foreground italic">
                {t('Viacam.Placeholder.Description')}
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground text-center">
                  {t('Viacam.Placeholder.Note')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}