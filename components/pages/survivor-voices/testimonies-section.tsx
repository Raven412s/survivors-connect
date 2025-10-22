// components/pages/survivor-voices/testimonies-section.tsx
'use client';

import { formatDateSafe } from "@/lib/formatDate";
import { cn } from "@/lib/utils";
import { SurvivorTestimony, TestimonyFilters, TestimonyType } from "@/types";
import { FileText, Headphones, Play, Search } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

// Mock data - will be replaced with database fetch
const mockTestimonies: SurvivorTestimony[] = [
  {
    id: '1',
    title: "Healing through Honour: A Ceremony of Truth",
    content: "Sharing my story was the first step toward reclaiming my dignity...",
    type: 'written',
    isAnonymous: false,
    theme: ['healing', 'justice'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    status: 'published',
    likes: 24,
    shares: 8
  },
  {
    id: '2',
    title: "Shaheeba's Journey: From Injustice to Inspiration",
    content: "",
    type: 'video',
    mediaUrl: '/sample-video.jpg',
    duration: 180,
    isAnonymous: false,
    survivorDemographics: { age: 32, community: 'muslim' },
    theme: ['empowerment', 'legal-victory'],
    compensationAmount: 500000,
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20'),
    status: 'published',
    likes: 45,
    shares: 15
  },
  {
    id: '3',
    title: "Breaking the Silence - Anonymous Story",
    content: "I never thought I would speak out, but here I am...",
    type: 'audio',
    mediaUrl: '/sample-audio.mp3',
    duration: 300,
    isAnonymous: true,
    theme: ['courage', 'community'],
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10'),
    status: 'published',
    likes: 32,
    shares: 12
  }
];

export default function TestimoniesSection({ className }: { className?: string }) {
  const t = useTranslations('SurvivorVoicesPage.Testimonies');
  const [filters, setFilters] = useState<TestimonyFilters>({});
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTestimonies = useMemo(() => {
    return mockTestimonies.filter(testimony => {
      if (searchQuery && !testimony.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (filters.type && filters.type.length > 0 && !filters.type.includes(testimony.type)) {
        return false;
      }
      if (filters.theme && filters.theme.length > 0 && !filters.theme.some(theme => testimony.theme.includes(theme))) {
        return false;
      }
      return true;
    });
  }, [searchQuery, filters]);

  const getTypeIcon = (type: TestimonyType) => {
    switch (type) {
      case 'video': return Play;
      case 'audio': return Headphones;
      default: return FileText;
    }
  };

  const handleTypeFilterChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      type: value ? [value as TestimonyType] : undefined
    }));
  };

  return (
    <section className={cn("w-full py-20 px-6 md:px-16 bg-background", className)}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <h2 className="text-4xl font-bold text-foreground">
            {t('Title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('Description')}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder={t('SearchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filters.type?.[0] || ''}
              onChange={(e) => handleTypeFilterChange(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
            >
              <option value="">{t('AllTypes')}</option>
              <option value="written">{t('Types.Written')}</option>
              <option value="audio">{t('Types.Audio')}</option>
              <option value="video">{t('Types.Video')}</option>
            </select>
          </div>
        </div>

        {/* Testimonies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonies.map((testimony) => {
            const TypeIcon = getTypeIcon(testimony.type);
            
            return (
              <div
                key={testimony.id}
                className="bg-muted/30 rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300 group"
              >
                {/* Type Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1 bg-primary/10 rounded">
                    <TypeIcon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {t(`Types.${testimony.type.charAt(0).toUpperCase() + testimony.type.slice(1)}`)}
                  </span>
                  {testimony.isAnonymous && (
                    <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                      {t('Anonymous')}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2">
                  {testimony.title}
                </h3>

                {/* Content Preview */}
                {testimony.type === 'written' && testimony.content && (
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {testimony.content}
                  </p>
                )}

                {/* Media Preview */}
                {testimony.type !== 'written' && testimony.mediaUrl && (
                  <div className="relative bg-muted rounded-lg aspect-video mb-4 flex items-center justify-center">
                    {testimony.type === 'video' && (
                      <>
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-primary" />
                        </div>
                      </>
                    )}
                    {testimony.type === 'audio' && (
                      <>
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                          <Headphones className="w-6 h-6 text-primary" />
                        </div>
                        <div className="absolute bottom-2 right-2 text-xs bg-black/50 text-white px-2 py-1 rounded">
                          {Math.floor(testimony.duration! / 60)}:{(testimony.duration! % 60).toString().padStart(2, '0')}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Themes */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {testimony.theme.slice(0, 3).map((theme, index) => (
                    <span
                      key={index}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                    >
                      #{theme}
                    </span>
                  ))}
                </div>

                {/* Stats and Date */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {formatDateSafe(testimony.createdAt)}
                  </span>
                  <div className="flex items-center gap-3">
                    <span>{testimony.likes} {t('Likes')}</span>
                    <span>{testimony.shares} {t('Shares')}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredTestimonies.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              {t('NoTestimonies')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}