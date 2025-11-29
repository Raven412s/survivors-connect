// models/VolunteerApplication.ts
import mongoose, { Schema } from 'mongoose';
import { VolunteerApplicationDocument } from '@/types/mongodb';

const VolunteerApplicationSchema = new Schema<VolunteerApplicationDocument>({
  opportunityType: {
    type: String,
    required: [true, 'Opportunity type is required'],
    enum: ['volunteer', 'internship', 'youth-ambassador']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  education: {
    type: String,
    trim: true
  },
  experience: {
    type: String,
    trim: true
  },
  availability: {
    type: String,
    trim: true
  },
  motivation: {
    type: String,
    required: [true, 'Motivation is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'accepted', 'rejected'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.VolunteerApplication || 
  mongoose.model<VolunteerApplicationDocument>('VolunteerApplication', VolunteerApplicationSchema);