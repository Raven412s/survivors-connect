import mongoose, { Schema } from "mongoose";

const ContactSchema = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    subject: String,
    message: String,
    category: String,
    isUrgent: Boolean,
    allowFollowUp: Boolean,
  },
  { timestamps: true }
);

export default mongoose.models.ContactMessage ||
  mongoose.model("ContactMessage", ContactSchema);
