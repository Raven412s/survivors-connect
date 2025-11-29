// models/ProfessionalPartnerApplication.ts
import mongoose, { Schema } from 'mongoose';
import { ProfessionalApplicationDocument } from '@/types/mongodb';

const ProfessionalPartnerApplicationSchema = new Schema<ProfessionalApplicationDocument>({
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
  profession: {
    type: String,
    required: [true, 'Profession is required']
  },
  expertise: {
    type: String,
    trim: true
  },
  experience: {
    type: String,
    trim: true
  },
  message: {
    type: String,
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

export default mongoose.models.ProfessionalPartnerApplication || 
  mongoose.model<ProfessionalApplicationDocument>('ProfessionalPartnerApplication', ProfessionalPartnerApplicationSchema);