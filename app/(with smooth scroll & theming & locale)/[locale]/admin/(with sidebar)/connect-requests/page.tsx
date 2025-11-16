import connectDB from '@/lib/mongoDB';
import { ConnectRequest } from '@/models/ConnectRequest';
import ConnectRequestsApp from '@/components/admin/connect-requests/ConnectRequestsApp';
import { ConnectRequestCategory, ConnectRequestStatus } from '@/models/ConnectRequest';

interface LeanConnectRequest {
  _id: unknown;
  name: string;
  phone: string;
  address?: string;
  category: ConnectRequestCategory;
  message?: string;
  photoUrl?: string;
  audioUrl?: string;
  location?: {
    type?: 'Point';
    coordinates?: [number, number];
    accuracy?: number;
  } | null;
  status: ConnectRequestStatus;
  assignedTo?: string;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}

interface SerializedConnectRequest {
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
    accuracy?: number 
  } | null;
  status: ConnectRequestStatus;
  createdAt: string;
}

export default async function AdminConnectRequestManagementPage() {
  await connectDB();

  const docs = await ConnectRequest.find().sort({ createdAt: -1 }).lean();

  const requests: SerializedConnectRequest[] = docs.map((d: LeanConnectRequest) => ({
    _id: String(d._id),
    name: d.name,
    phone: d.phone,
    address: d.address,
    category: d.category,
    message: d.message,
    photoUrl: d.photoUrl,
    audioUrl: d.audioUrl,
    location: d.location?.coordinates ? {
      coordinates: d.location.coordinates,
      accuracy: d.location.accuracy
    } : null,
    status: d.status,
    createdAt: d.createdAt ? new Date(d.createdAt).toISOString() : new Date().toISOString(),
  }));

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <ConnectRequestsApp initialRequests={requests} />
      </div>
    </div>
  );
}