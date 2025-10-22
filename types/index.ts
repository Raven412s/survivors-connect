// types/survivor-voices.ts
export type TestimonyType = 'written' | 'audio' | 'video';

export interface SurvivorTestimony {
  id: string;
  title: string;
  content: string;
  type: TestimonyType;
  mediaUrl?: string;
  duration?: number;
  isAnonymous: boolean;
  survivorDemographics?: {
    age?: number;
    community?: 'dalit' | 'adivasi' | 'muslim' | 'other';
    region?: string;
  };
  theme: string[];
  compensationAmount?: number;
  healingJourney?: string;
  reintegrationStory?: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'published' | 'pending' | 'rejected';
  likes: number;
  shares: number;
}

export interface TestimonyFilters {
  type?: TestimonyType[];
  theme?: string[];
  community?: string[];
  sortBy?: 'newest' | 'oldest' | 'most-liked';
}

export interface TestimonySubmission {
  title: string;
  content: string;
  type: TestimonyType;
  mediaFile?: File;
  isAnonymous: boolean;
  survivorDemographics?: {
    age?: number;
    community?: string;
    region?: string;
  };
  theme: string[];
  allowContact: boolean;
  consentGiven: boolean;
}