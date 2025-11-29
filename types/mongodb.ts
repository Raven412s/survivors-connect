// types/mongodb.ts
import { Document } from 'mongoose';
import { ApplicationStatus, OpportunityType } from './applications';

export interface ProfessionalApplicationDocument extends Document {
    _id: string;
  name: string;
  email: string;
  profession: string;
  expertise?: string;
  experience?: string;
  message?: string;
  status: ApplicationStatus;
  submittedAt: Date;
}

export interface VolunteerApplicationDocument extends Document {
    _id: string;
  opportunityType: OpportunityType;
  name: string;
  email: string;
  phone?: string;
  education?: string;
  experience?: string;
  availability?: string;
  motivation: string;
  status: ApplicationStatus;
  submittedAt: Date;
}