import { Document } from "mongoose";

// types/testimony.ts
export type TestimonyType = "written" | "audio" | "video";
export type TestimonyStatus = "pending" | "approved" | "rejected";
export type TestimonyTheme =
  | "abuse"
  | "discrimination"
  | "mental-health"
  | "recovery"
  | "empowerment"
  | "other";

export interface TestimonySubmission {
  _id: string;
  title: string;
  content: string;
  type: TestimonyType;
  isAnonymous: boolean;
  theme: TestimonyTheme[];
  allowContact: boolean;
  consentGiven: boolean;
  mediaUrl?: string;
  mediaType?: "image" | "audio" | "video";
}

export interface TestimonyDocument extends Document {
  _id: string;
  title: string;
  content: string;
  type: TestimonyType;
  isAnonymous: boolean;
  theme: TestimonyTheme[];
  allowContact: boolean;
  consentGiven: boolean;
  mediaUrl?: string;
  mediaType?: "image" | "audio" | "video";
  status: TestimonyStatus;
  submittedBy?: string; // User ID if logged in
  submittedByRole: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

// Filter interface for querying testimonies
export interface TestimonyFilters {
  status?: TestimonyStatus | "all";
  type?: TestimonyType | "all";
  page?: number;
  limit?: number;
}
