import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoDB";
import Testimonial from "@/models/Testimonial";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  secure_url: string;
}

async function uploadBuffer(
  buffer: Buffer,
  folder = "testimonials",
  resourceType: "image" | "video" | "raw" = "video"
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result as CloudinaryUploadResult);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

const getFile = (form: FormData, field: string): File | null => {
  const file = form.get(field);
  return file instanceof File ? file : null;
};

const getString = (form: FormData, field: string): string | null => {
  const value = form.get(field);
  return typeof value === "string" ? value : null;
};

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const form = await request.formData();

    // Basic fields with validation
    const title = getString(form, "title")?.trim() || "";
    const content = getString(form, "content")?.trim() || "";
    const type = getString(form, "type") || "written";
    
    if (!title) throw new Error("Title is required");
    if (!content) throw new Error("Content is required");

    let theme: string[] = [];
    try {
      const themeStr = getString(form, "theme") || "[]";
      theme = JSON.parse(themeStr);
      if (!Array.isArray(theme)) theme = [];
    } catch (e) {
      console.warn("Invalid theme JSON:", e);
      theme = [];
    }

    let tags: string[] = [];
    try {
      const tagsStr = getString(form, "tags") || "[]";
      tags = JSON.parse(tagsStr);
      if (!Array.isArray(tags)) tags = [];
    } catch (e) {
      console.warn("Invalid tags JSON:", e);
      tags = [];
    }

    const isAnonymous = getString(form, "isAnonymous") === "true";
    const allowContact = getString(form, "allowContact") === "true";
    const consentGiven = getString(form, "consentGiven") === "true";

    if (!consentGiven) {
      throw new Error("Consent must be given to submit a story");
    }

    // Extended info
    const authorName = getString(form, "authorName")?.trim() || "";
    const authorAffiliation = getString(form, "authorAffiliation")?.trim() || "";
    const excerpt = getString(form, "excerpt")?.trim() || "";
    const language = getString(form, "language") || "en";
    const status = getString(form, "status") || "pending";
    const createdBy = getString(form, "createdBy")?.trim() || "";
    const featured = getString(form, "featured") === "true";
    const submittedAtString = getString(form, "submittedAt");
    const submittedAt = submittedAtString
      ? new Date(submittedAtString)
      : new Date();

    // Single media file
    const media = getFile(form, "media");
    let mediaUrl: string | undefined;

    if (media) {
      const buffer = Buffer.from(await media.arrayBuffer());
      const resourceType = media.type.startsWith("image/") ? "image" : "video";
      const uploaded = await uploadBuffer(
        buffer,
        "testimonials/media",
        resourceType
      );
      mediaUrl = uploaded.secure_url;
    }

    const newEntry = await Testimonial.create({
      // Primary fields
      title,
      content,
      type,
      theme,
      tags,
      isAnonymous,
      allowContact,
      consentGiven,
      mediaUrl,

      // Extended fields
      authorName,
      authorAffiliation,
      excerpt,
      language,
      status,
      featured,
      createdBy,
      approvedAt: status === "approved" ? new Date() : null,
      submittedAt: submittedAt || new Date(),
    });

    return NextResponse.json(
      { message: "Story submitted successfully", testimonial: newEntry },
      { status: 201 }
    );
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Testimonial submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit story", details: errorMsg },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();

  // Only fetch testimonials whose status is NOT "pending"
  const testimonials = await Testimonial.find({
    status: { $ne: "pending" }
  }).sort({ createdAt: -1 });

  return NextResponse.json({ success: true, testimonials });
}
