import connectDB from "@/lib/mongoDB";
import Testimonial from "@/models/Testimonial";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, testimonials });
}
