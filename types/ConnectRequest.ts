// types/connect-request.ts
export type ConnectRequestCategory = 
  | 'medical' 
  | 'legal' 
  | 'counselling' 
  | 'shelter' 
  | 'police' 
  | 'other';

export type ConnectRequestStatus = 
  | 'pending' 
  | 'assigned' 
  | 'in_progress' 
  | 'resolved' 
  | 'closed';

export interface ConnectRequest {
  _id: string;
  name: string;
  phone: string;
  address?: string;
  category: ConnectRequestCategory;
  message?: string;
  photoUrl?: string;
  audioUrl?: string;
  location?: {
    coordinates: [number, number];
    accuracy?: number;
  } | null;
  status: ConnectRequestStatus;
  adminNotes?: string;
  createdAt: string;
}

export interface ConnectRequestDocument extends Omit<ConnectRequest, '_id' | 'createdAt'> {
  _id: string;
  createdAt: Date;
}