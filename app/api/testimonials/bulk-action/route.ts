import { NextResponse } from "next/server";

import Testimonial from "@/models/Testimonial";
import connectDB from "@/lib/mongoDB";

export async function POST(req: Request) {
  await connectDB();
  const { action, ids } = await req.json();

  let updateData = {};

  switch (action) {
    case "approve":
      updateData = { status: "approved", approvedAt: new Date() };
      break;
    case "reject":
      updateData = { status: "rejected" };
      break;
    case "feature":
      updateData = { featured: true };
      break;
    case "unfeature":
      updateData = { featured: false };
      break;
    default:
      return NextResponse.json({
        success: false,
        message: "Invalid action",
      });
  }

  await Testimonial.updateMany(
    { _id: { $in: ids } },
    updateData
  );

  return NextResponse.json({
    success: true,
    message: "Bulk action successful",
  });
}
