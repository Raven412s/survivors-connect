// components/pages/events-activities/visual-gallery.tsx
import { cn } from "@/lib/utils";
import { Award, Camera, Heart, Users } from "lucide-react";
import { useTranslations } from 'next-intl';
import Image from "next/image";

export default function VisualGallery({ className }: { className?: string }) {
  const t = useTranslations('EventsActivitiesPage.VisualGallery');

  const galleryItems = [
    {
      type: "therapy",
      title: t('GalleryItems.TestimonialTherapy.Title'),
      description: t('GalleryItems.TestimonialTherapy.Description'),
      date: "April 10, 2025",
      location: "Koderma, Jharkhand",
      icon: Heart,
      image: "/images/events/e1.png"
    },
    {
      type: "engagement",
      title: t('GalleryItems.FieldEngagement.Title'),
      description: t('GalleryItems.FieldEngagement.Description'),
      date: "April 11, 2025",
      location: "Koderma, Jharkhand",
      icon: Users,
      image: "/images/events/e2.png"
    },
    {
      type: "redress",
      title: t('GalleryItems.SeekingRedress.Title'),
      description: t('GalleryItems.SeekingRedress.Description'),
      date: "June 26, 2025",
      location: "Varanasi, India",
      icon: Award,
      image: "/images/events/e3.jpeg"
    },
    {
      type: "ceremony",
      title: t('GalleryItems.HealingHonour.Title'),
      description: t('GalleryItems.HealingHonour.Description'),
      date: "July 12, 2025",
      location: "Community Center",
      icon: Heart,
      image: "/images/events/e4.jpeg"
    },
    {
      type: "advocacy",
      title: t('GalleryItems.CompassionateAdvocacy.Title'),
      description: t('GalleryItems.CompassionateAdvocacy.Description'),
      date: "July 12, 2025",
      location: "Field Visit",
      icon: Users,
      image: "/images/events/e5.jpeg"
    },
    {
      type: "campaign",
      title: t('GalleryItems.ReintegrationCeremony.Title'),
      description: t('GalleryItems.ReintegrationCeremony.Description'),
      date: "Ongoing",
      location: "Multiple locations",
      icon: Award,
      image: "/images/events/e6.png"
    }
  ];

  const awards = [
    {
      title: t('Awards.HealthIcon.Title'),
      description: t('Awards.HealthIcon.Description'),
      date: "July 6, 2025",
      organization: "Dainik Jagran-Inext"
    },
    {
      title: t('Awards.YouthSelection.Title'),
      description: t('Awards.YouthSelection.Description'),
      date: "2025",
      organization: "May 18 Academy"
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Gallery Items */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary" />
              {t('GalleryTitle')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {galleryItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-muted/30 rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground">
                        {item.title}
                      </h4>
                    </div>

                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{item.date}</span>
                      <span>{item.location}</span>
                    </div>

                    {/* Placeholder for image */}
                    <div className="mt-4 bg-muted rounded-lg aspect-video relative overflow-hidden">
                      <Image
                        fill
                        src={item.image}
                        alt={item.title}
                        className="object-cover object-center"
                      />
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Awards & Recognitions */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                {t('AwardsTitle')}
              </h3>
              <div className="space-y-4">
                {awards.map((award, index) => (
                  <div
                    key={index}
                    className="bg-linear-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/10 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800"
                  >
                    <h4 className="font-semibold text-foreground mb-2">
                      {award.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {award.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{award.date}</span>
                      <span className="bg-yellow-100 dark:bg-yellow-800/30 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded-full">
                        {award.organization}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Media Coverage */}
            <div className="bg-background rounded-2xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-4">
                {t('MediaCoverage.Title')}
              </h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{t('MediaCoverage.FeaturedIRCT')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{t('MediaCoverage.HealthAwards')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{t('MediaCoverage.BlogPublications')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{t('MediaCoverage.YouthEngagement')}</span>
                </div>
              </div>
            </div>

            {/* Campaigns & Advocacy */}
            <div className="bg-muted/50 rounded-2xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-4">
                {t('Campaigns.Title')}
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{t('Campaigns.TortureFree')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{t('Campaigns.SurvivorRights')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{t('Campaigns.DigitalLiteracy')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{t('Campaigns.LegalAid')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}