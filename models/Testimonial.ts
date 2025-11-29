import mongoose, { Schema, Document } from "mongoose";

export interface TestimonialDocument extends Document {
  // From user form
  title: string;
  content: string;
  type: "written" | "audio" | "video";
  mediaUrl?: string;
  theme: string[];

  isAnonymous: boolean;
  allowContact: boolean;
  consentGiven: boolean;

  // From extended schema
  authorName: string;
  authorAffiliation?: string;
  excerpt?: string;
  
  language: string;
  tags: string[];

  status: "draft" | "pending" | "approved" | "rejected" | "archived";
  featured: boolean;
  createdBy?: string;
  approvedAt?: Date;

  submittedAt: Date;

  // timestamps auto-generated
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<TestimonialDocument>(
  {
    // Your fields (from story form)
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, enum: ["written", "audio", "video"], required: true },

    mediaUrl: { type: String },

    theme: { type: [String], default: [] },

    isAnonymous: { type: Boolean, default: false },
    allowContact: { type: Boolean, default: false },
    consentGiven: { type: Boolean, default: false },

    submittedAt: { type: Date, default: Date.now },

    // Extended fields (moderation + metadata)
    authorName: { type: String, required: true },
    authorAffiliation: { type: String },
    excerpt: { type: String },

    

    language: { type: String, default: "en" },

    tags: { type: [String], default: [] },

    status: {
      type: String,
      enum: ["draft", "pending", "approved", "rejected", "archived"],
      default: "pending",
    },

    featured: { type: Boolean, default: false },

    createdBy: { type: String },

    approvedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial ||
  mongoose.model<TestimonialDocument>("Testimonial", TestimonialSchema);
