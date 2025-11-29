// app/api/volunteer-applications/apply/route.ts
import { NextRequest, NextResponse } from 'next/server';

import VolunteerApplication from '@/models/VolunteerApplication';
import connectDB from '@/lib/mongoDB';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    
    const { opportunityType, name, email, phone, education, experience, availability, motivation } = body;

    // Basic validation
    if (!opportunityType || !name || !email || !motivation) {
      return NextResponse.json(
        { error: 'Opportunity type, name, email, and motivation are required' },
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

    // Check for existing application from same email for same opportunity type in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const existingApplication = await VolunteerApplication.findOne({
      email,
      opportunityType,
      submittedAt: { $gte: thirtyDaysAgo }
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: `You have already submitted an application for ${opportunityType} recently. Please wait 30 days before submitting again.` },
        { status: 429 }
      );
    }

    // Create new application
    const application = await VolunteerApplication.create({
      opportunityType,
      name,
      email,
      phone,
      education,
      experience,
      availability,
      motivation
    });

    // Here you can add email notification logic
    // await sendVolunteerNotificationEmail(application);

    return NextResponse.json(
      { 
        message: 'Application submitted successfully!', 
        applicationId: application._id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Volunteer application error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}