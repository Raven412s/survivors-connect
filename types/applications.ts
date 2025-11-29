// types/applications.ts
export type ApplicationStatus = 'pending' | 'reviewed' | 'accepted' | 'rejected';

export type OpportunityType = 'volunteer' | 'internship' | 'youth-ambassador';

export type ApplicationType = 'professional' | 'volunteer';

// Base application interface with common fields
export interface BaseApplication {
  _id: string;
  name: string;
  email: string;
  status: ApplicationStatus;
  submittedAt: string;
  type: ApplicationType;
}

// Professional application specific fields
export interface ProfessionalApplication extends BaseApplication {
  type: 'professional';
  profession: string;
  expertise?: string;
  experience?: string;
  message?: string;
}

// Volunteer application specific fields
export interface VolunteerApplication extends BaseApplication {
  type: 'volunteer';
  opportunityType: OpportunityType;
  phone?: string;
  education?: string;
  experience?: string;
  availability?: string;
  motivation: string;
}

// Union type for all applications
export type Application = ProfessionalApplication | VolunteerApplication;

// Type guards for better type safety
export function isProfessionalApplication(app: Application): app is ProfessionalApplication {
  return app.type === 'professional';
}

export function isVolunteerApplication(app: Application): app is VolunteerApplication {
  return app.type === 'volunteer';
}

// Filter types for querying
export interface ApplicationFilters {
  type?: ApplicationType | 'all';
  status?: ApplicationStatus | 'all';
}