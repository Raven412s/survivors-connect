// models/ConnectRequest.ts
import mongoose, { Document, Schema } from 'mongoose';

export type ConnectRequestCategory = 'medical' | 'legal' | 'counselling' | 'shelter' | 'police' | 'other';
export type ConnectRequestStatus = 'pending' | 'assigned' | 'in_progress' | 'resolved' | 'closed';

export interface IConnectRequest extends Document {
  name: string;
  phone: string;
  address?: string;
  category: ConnectRequestCategory;
  message?: string;
  photoUrl?: string;
  audioUrl?: string;
  location?: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
    accuracy?: number;
  };
  status: ConnectRequestStatus;
  assignedTo?: string;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ConnectRequestSchema = new Schema<IConnectRequest>(
  {
    name: { 
      type: String, 
      required: [true, 'Name is required'], 
      trim: true,
      maxlength: [100, 'Name cannot be longer than 100 characters']
    },
    phone: { 
      type: String, 
      required: [true, 'Phone number is required'],
      validate: {
        validator: function(v: string) {
          return /^[0-9+\-\s()]{10,}$/.test(v);
        },
        message: 'Please provide a valid phone number'
      }
    },
    address: { 
      type: String,
      maxlength: [200, 'Address cannot be longer than 200 characters']
    },
    category: { 
      type: String, 
      required: [true, 'Category is required'],
      enum: {
        values: ['medical', 'legal', 'counselling', 'shelter', 'police', 'other'],
        message: 'Category must be one of: medical, legal, counselling, shelter, police, other'
      }
    },
    message: { 
      type: String,
      maxlength: [1000, 'Message cannot be longer than 1000 characters']
    },
    photoUrl: { type: String },
    audioUrl: { type: String },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: { 
        type: [Number],
        validate: {
          validator: function(coords: number[]) {
            return coords.length === 2 && 
                   coords[0] >= -180 && coords[0] <= 180 && 
                   coords[1] >= -90 && coords[1] <= 90;
          },
          message: 'Invalid coordinates'
        }
      },
      accuracy: Number,
    },
    status: { 
      type: String, 
      default: 'pending',
      enum: ['pending', 'assigned', 'in_progress', 'resolved', 'closed']
    },
    assignedTo: { type: String },
    adminNotes: { 
      type: String,
      maxlength: [500, 'Admin notes cannot be longer than 500 characters']
    },
  },
  { 
    timestamps: true 
  }
);

// Create 2dsphere index for location-based queries
ConnectRequestSchema.index({ location: '2dsphere' });

// Index for common queries
ConnectRequestSchema.index({ status: 1, createdAt: -1 });
ConnectRequestSchema.index({ category: 1 });

export const ConnectRequest = mongoose.models.ConnectRequest as mongoose.Model<IConnectRequest> || 
  mongoose.model<IConnectRequest>('ConnectRequest', ConnectRequestSchema);