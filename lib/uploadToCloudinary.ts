// lib/cloudinaryUpload.ts

import crypto from "crypto";

export async function uploadToCloudinary(file: File) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
  const apiKey = process.env.CLOUDINARY_API_KEY!;
  const apiSecret = process.env.CLOUDINARY_API_SECRET!;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary environment variables missing");
  }

  // Convert File → Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Convert to Base64
  const base64 = buffer.toString("base64");
  const mime = file.type;

  // Generate timestamp
  const timestamp = Math.round(Date.now() / 1000);

  // Signature string as per Cloudinary docs
  const signatureString = `timestamp=${timestamp}${apiSecret}`;
  const signature = crypto
    .createHash("sha1")
    .update(signatureString)
    .digest("hex");

  const formData = new FormData();
  formData.append("file", `data:${mime};base64,${base64}`);
  formData.append("api_key", apiKey);
  formData.append("timestamp", String(timestamp));
  formData.append("signature", signature);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("Cloudinary Upload Error:", err);
    throw new Error("Failed to upload Media to Cloudinary");
  }

  return res.json(); // { secure_url, public_id, ... }
}
