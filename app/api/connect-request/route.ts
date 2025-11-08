import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDB";
import { ConnectRequest } from "@/models/ConnectRequest";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface ConnectRequestFormData {
  name: string;
  phone: string;
  address?: string;
  category: string;
  message?: string;
  lat?: string;
  lng?: string;
  accuracy?: string;
  photo?: File;
  audio?: File;
}

interface CloudinaryUploadResult {
  secure_url: string;
}

interface CreateConnectRequestData {
  name: string;
  phone: string;
  address?: string;
  category: string;
  message?: string;
  photoUrl?: string;
  audioUrl?: string;
  status: "pending" | "assigned" | "in_progress" | "resolved" | "closed";
  location?: {
    type: "Point";
    coordinates: [number, number];
    accuracy?: number;
  };
}

/**
 * Uploads a file buffer to Cloudinary.
 * @param buffer - The file buffer
 * @param folder - Cloudinary folder
 * @param resourceType - image | video | raw
 */
async function uploadBuffer(
  buffer: Buffer,
  folder = "connect_requests",
  resourceType: "image" | "video" | "raw" = "image"
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType, // 🔥 key fix
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result)
          return reject(new Error("Upload failed: No result from Cloudinary"));
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

// Helper extractors
const getFileFromFormData = (
  formData: FormData,
  field: string
): File | null => {
  const file = formData.get(field);
  return file instanceof File ? file : null;
};
const getStringFromFormData = (
  formData: FormData,
  field: string
): string | null => {
  const value = formData.get(field);
  return typeof value === "string" ? value : null;
};

export async function POST(req: Request): Promise<NextResponse> {
  await connectDB();
  try {
    const formData = await req.formData();

    const form: ConnectRequestFormData = {
      name: getStringFromFormData(formData, "name") || "",
      phone: getStringFromFormData(formData, "phone") || "",
      address: getStringFromFormData(formData, "address") || undefined,
      category: getStringFromFormData(formData, "category") || "",
      message: getStringFromFormData(formData, "message") || undefined,
      lat: getStringFromFormData(formData, "lat") || undefined,
      lng: getStringFromFormData(formData, "lng") || undefined,
      accuracy: getStringFromFormData(formData, "accuracy") || undefined,
      photo: getFileFromFormData(formData, "photo") || undefined,
      audio: getFileFromFormData(formData, "audio") || undefined,
    };

    if (!form.name.trim() || !form.phone.trim() || !form.category.trim()) {
      return NextResponse.json(
        { error: "Name, phone, and category are required fields" },
        { status: 400 }
      );
    }


    let photoUrl: string | undefined;
    let audioUrl: string | undefined;

    // 🖼 Upload Photo
    if (form.photo) {
      try {
        const buffer = Buffer.from(await form.photo.arrayBuffer());
        const uploaded = await uploadBuffer(
          buffer,
          "connect_requests/photos",
          "image"
        );
        photoUrl = uploaded.secure_url;
      } catch (err) {
        console.error("❌ Photo upload failed:", err);
      }
    }

    // 🎤 Upload Audio (Cloudinary expects resource_type: "video")
    if (form.audio) {
      try {
        const buffer = Buffer.from(await form.audio.arrayBuffer());
        const uploaded = await uploadBuffer(
          buffer,
          "connect_requests/audio",
          "video"
        );
        audioUrl = uploaded.secure_url;
      } catch (err) {
        console.error("❌ Audio upload failed:", err);
      }
    }

    const data: CreateConnectRequestData = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address?.trim(),
      category: form.category,
      message: form.message?.trim(),
      photoUrl,
      audioUrl,
      status: "pending",
    };

    // ✅ Only add location if both lat & lng are valid numbers
    const lat = form.lat && !isNaN(Number(form.lat)) ? Number(form.lat) : null;
    const lng = form.lng && !isNaN(Number(form.lng)) ? Number(form.lng) : null;

    if (lat !== null && lng !== null) {
      data.location = {
        type: "Point",
        coordinates: [lng, lat],
      };

      if (form.accuracy && !isNaN(Number(form.accuracy))) {
        data.location.accuracy = Number(form.accuracy);
      }
    }

    // optional safety guard before save
    if (
      data.location &&
      (!Array.isArray(data.location.coordinates) ||
        data.location.coordinates.length !== 2)
    ) {
      delete data.location;
    }

    const created = await ConnectRequest.create(data);

    return NextResponse.json(
      {
        success: true,
        id: created._id,
        message: "Help request submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ ConnectRequest API error:", error);
    return NextResponse.json(
      {
        error: "Failed to submit help request",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();
    const requests = await ConnectRequest.find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return NextResponse.json({ requests });
  } catch (error) {
    console.error("❌ Failed to fetch connect requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch requests" },
      { status: 500 }
    );
  }
}
