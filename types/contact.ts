export interface ContactSubmission {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  category: 
    | "general" 
    | "support" 
    | "partnership" 
    | "volunteer" 
    | "media" 
    | "other";
  isUrgent: boolean;
  allowFollowUp: boolean;
  createdAt: string;
}
