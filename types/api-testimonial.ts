import { TestimonyType, SurvivorTestimony } from './index';

/**
 * Shape of a testimonial as returned by the server API (serialized).
 * Dates are ISO strings when sent over HTTP.
 */
export interface ApiTestimonial {
  _id: string;
  title: string;
  content: string;
  type: TestimonyType;
  mediaUrl?: string;
  duration?: number;
  isAnonymous: boolean;
  survivorDemographics?: {
    age?: number;
    community?: string;
    region?: string;
  };
  theme: string[];
  compensationAmount?: number;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  status?: string;
  likes?: number;
  shares?: number;
}

export interface ApiTestimonialsResponse {
  success?: boolean;
  testimonials: ApiTestimonial[];
}

/**
 * Convert an ApiTestimonial into the client domain model `SurvivorTestimony`.
 */
export function mapApiTestimonialToSurvivor(t: ApiTestimonial): SurvivorTestimony {
  return {
    id: t._id,
    title: t.title ?? '',
    content: t.content ?? '',
    type: (t.type ?? 'written') as TestimonyType,
    mediaUrl: t.mediaUrl,
    duration: t.duration,
    isAnonymous: Boolean(t.isAnonymous),
    theme: Array.isArray(t.theme) ? t.theme : [],
    compensationAmount: t.compensationAmount,
    createdAt: t.createdAt ? new Date(t.createdAt) : new Date(),
    updatedAt: t.updatedAt ? new Date(t.updatedAt) : new Date(),
    status: (t.status as SurvivorTestimony['status']) ?? 'published',
    likes: typeof t.likes === 'number' ? t.likes : 0,
    shares: typeof t.shares === 'number' ? t.shares : 0,
  };
}
