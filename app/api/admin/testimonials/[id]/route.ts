import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoDB";
import Testimonial from "@/models/Testimonial";

interface UpdateTestimonialPayload {
  status?: "draft" | "pending" | "approved" | "rejected" | "archived";
  featured?: boolean;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const body: UpdateTestimonialPayload = await req.json();

    const updateData: UpdateTestimonialPayload & {
      approvedAt?: string;
    } = {};

    if (body.status) updateData.status = body.status;
    if (body.featured !== undefined) updateData.featured = body.featured;
    if (body.status === "approved") {
      updateData.approvedAt = new Date().toISOString();
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      (await params).id,
      updateData,
      { new: true }
    );

    if (!testimonial) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ testimonial });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
