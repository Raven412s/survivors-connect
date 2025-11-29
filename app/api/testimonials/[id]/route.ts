import { NextResponse } from "next/server";

import Testimonial from "@/models/Testimonial";
import connectDB from "@/lib/mongoDB";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = await params;
  await connectDB();
  const testimonial = await Testimonial.findById(id);

  return NextResponse.json({ success: true, testimonial });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = await params;
  await connectDB();
  const body = await req.json();

  const testimonial = await Testimonial.findByIdAndUpdate(
    id,
    body,
    { new: true }
  );

  return NextResponse.json({ success: true, testimonial });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = await params;
  await connectDB();
  await Testimonial.findByIdAndDelete(id);

  return NextResponse.json({ success: true, message: "Deleted successfully" });
}
