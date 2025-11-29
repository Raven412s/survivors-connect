// components/pages/survivor-voices/testimonies-section.tsx
'use client';

import { formatDateSafe } from "@/lib/formatDate";
import { cn } from "@/lib/utils";
import { SurvivorTestimony, TestimonyFilters, TestimonyType } from "@/types";
import { ApiTestimonialsResponse, ApiTestimonial, mapApiTestimonialToSurvivor } from '@/types/api-testimonial';
import { FileText, Headphones, Play, Search } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useMemo, useState, useEffect } from 'react';

// Testimonies will be fetched from the API
const initialTestimonies: SurvivorTestimony[] = [];

// Skeleton Loading Component
const TestimonySkeleton = () => (
  <div className="bg-muted/30 rounded-2xl p-6 border border-border animate-pulse">
    {/* Type Badge Skeleton */}
    <div className="flex items-center gap-2 mb-3">
      <div className="w-6 h-6 bg-muted rounded"></div>
      <div className="w-20 h-4 bg-muted rounded"></div>
    </div>

    {/* Title Skeleton */}
    <div className="space-y-2 mb-3">
      <div className="w-3/4 h-5 bg-muted rounded"></div>
      <div className="w-1/2 h-5 bg-muted rounded"></div>
    </div>

    {/* Content Preview Skeleton */}
    <div className="space-y-2 mb-4">
      <div className="w-full h-3 bg-muted rounded"></div>
      <div className="w-full h-3 bg-muted rounded"></div>
      <div className="w-2/3 h-3 bg-muted rounded"></div>
    </div>

    {/* Media Preview Skeleton */}
    <div className="bg-muted rounded-lg aspect-video mb-4 flex items-center justify-center">
      <div className="w-12 h-12 bg-muted-foreground/20 rounded-full"></div>
    </div>

    {/* Themes Skeleton */}
    <div className="flex flex-wrap gap-1 mb-4">
      <div className="w-16 h-6 bg-muted rounded-full"></div>
      <div className="w-12 h-6 bg-muted rounded-full"></div>
      <div className="w-20 h-6 bg-muted rounded-full"></div>
    </div>

    {/* Date Skeleton */}
    <div className="w-24 h-3 bg-muted rounded"></div>
  </div>
);

// Skeleton for Search and Filters
const FiltersSkeleton = () => (
  <div className="mb-8 flex flex-col sm:flex-row gap-4 animate-pulse">
    <div className="relative flex-1">
      <div className="w-full h-10 bg-muted rounded-lg"></div>
    </div>
    <div className="flex gap-2">
      <div className="w-32 h-10 bg-muted rounded-lg"></div>
    </div>
  </div>
);

export default function TestimoniesSection({ className }: { className?: string }) {
  const t = useTranslations('SurvivorVoicesPage.Testimonies');
  const [filters, setFilters] = useState<TestimonyFilters>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [testimonies, setTestimonies] = useState<SurvivorTestimony[]>(initialTestimonies);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mediaDurations, setMediaDurations] = useState<Record<string, number>>({});

  const handleLoadedMetadata = (id: string, seconds: number) => {
    if (!seconds || Number.isNaN(seconds)) return;
    setMediaDurations(prev => ({ ...prev, [id]: Math.floor(seconds) }));
  };

  const getDurationSeconds = (id: string, testimony: SurvivorTestimony) => {
    return typeof mediaDurations[id] === 'number' && mediaDurations[id] > 0
      ? mediaDurations[id]
      : (typeof testimony.duration === 'number' ? Math.floor(testimony.duration) : 0);
  };

  const formatDuration = (secs: number) => {
    if (!secs || secs <= 0 || Number.isNaN(secs)) return '';
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.floor(secs % 60);
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/testimonials');
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        // Expected shape: { success?: boolean, testimonials: ApiTestimonial[] }
        if (data && Array.isArray((data as ApiTestimonialsResponse).testimonials)) {
          const resp = data as ApiTestimonialsResponse;
          const mapped = resp.testimonials.map(mapApiTestimonialToSurvivor);
          setTestimonies(mapped);
        } else if (Array.isArray(data)) {
          // fallback: API returned array of testimonials directly
          const arr = data as ApiTestimonial[];
          setTestimonies(arr.map(mapApiTestimonialToSurvivor));
        } else {
          setTestimonies([]);
        }
      } catch (e: unknown) {
        if (!cancelled) {
          const msg = e instanceof Error ? e.message : String(e);
          setError(msg);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  const filteredTestimonies = useMemo(() => {
    return testimonies.filter(testimony => {
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
  }, [searchQuery, filters, testimonies]);

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
        {loading ? (
          <FiltersSkeleton />
        ) : (
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
        )}

        {/* Testimonies Grid */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <TestimonySkeleton key={index} />
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonies.map((testimony) => {
              const TypeIcon = getTypeIcon(testimony.type);
              const durationSeconds = getDurationSeconds(testimony.id, testimony);
              const formattedDuration = formatDuration(durationSeconds);

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

                  {/* Media Preview (playable) */}
                  {testimony.type !== 'written' && testimony.mediaUrl && (
                    <div className="relative bg-muted rounded-lg aspect-video mb-4 flex items-center justify-center overflow-hidden">
                      {testimony.type === 'video' && (
                        <video
                          src={testimony.mediaUrl}
                          controls
                          className="w-full h-full object-cover"
                          onLoadedMetadata={(e) => handleLoadedMetadata(testimony.id, e.currentTarget.duration)}
                        />
                      )}

                      {testimony.type === 'audio' && (
                        <div className="w-full p-4">
                          <audio
                            src={testimony.mediaUrl}
                            controls
                            className="w-full"
                            onLoadedMetadata={(e) => handleLoadedMetadata(testimony.id, e.currentTarget.duration)}
                          />
                        </div>
                      )}

                      {formattedDuration && (
                        <div className="absolute bottom-2 right-2 text-xs bg-black/50 text-white px-2 py-1 rounded">
                          {formattedDuration}
                        </div>
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
                  <div className="flex items-end justify-center text-xs text-muted-foreground">
                    <span>
                      {formatDateSafe(testimony.createdAt)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredTestimonies.length === 0 && (
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