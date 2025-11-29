import connectDB from "@/lib/mongoDB";
import ContactMessage from "@/models/ContactMessage";
import { NextResponse } from "next/server";


// GET → Fetch all submissions (admin)
export async function GET() {
  try {
    await connectDB();

    const submissions = await ContactMessage.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({ success: true, submissions });
  } catch (error) {
    console.error("Admin GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}

// DELETE → Delete a submission by ID (admin)
export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const deleted = await ContactMessage.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Submission deleted successfully",
    });
  } catch (error) {
    console.error("Admin DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete submission" },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate required fields
    const requiredFields = ["name", "email", "subject", "message", "category"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // OPTIONAL: Save to DB (add your DB logic here)
    await connectDB();
    await ContactMessage.create(body);

    // OPTIONAL: Send email notification (NodeMailer / Resend / SMTP)
    // await sendEmail(body);

    return NextResponse.json({
      success: true,
      message: "Your message has been received! We will contact you soon.",
    });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}


