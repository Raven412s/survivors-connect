// app/api/professional-partners/apply/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from "@/lib/mongoDB";
import ProfessionalPartnerApplication from '@/models/ProfessionalPartnerApplication';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    
    const { name, email, profession, expertise, experience, message } = body;

    // Basic validation
    if (!name || !email || !profession) {
      return NextResponse.json(
        { error: 'Name, email, and profession are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Check for existing application from same email in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const existingApplication = await ProfessionalPartnerApplication.findOne({
      email,
      submittedAt: { $gte: thirtyDaysAgo }
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: 'You have already submitted an application recently. Please wait 30 days before submitting again.' },
        { status: 429 }
      );
    }

    // Create new application
    const application = await ProfessionalPartnerApplication.create({
      name,
      email,
      profession,
      expertise,
      experience,
      message
    });

    // Here you can add email notification logic
    // await sendNotificationEmail(application);

    return NextResponse.json(
      { 
        message: 'Application submitted successfully!', 
        applicationId: application._id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Professional partner application error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}