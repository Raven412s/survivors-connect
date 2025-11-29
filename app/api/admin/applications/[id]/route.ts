// app/api/admin/applications/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

import ProfessionalPartnerApplication from '@/models/ProfessionalPartnerApplication';
import VolunteerApplication from '@/models/VolunteerApplication';
import { ApplicationType, ApplicationStatus } from '@/types/applications';
import connectDB from '@/lib/mongoDB';

interface UpdateApplicationRequest {
  status: ApplicationStatus;
  type: ApplicationType;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body: UpdateApplicationRequest = await request.json();

    if (!body.status || !body.type) {
      return NextResponse.json(
        { error: 'Status and type are required' },
        { status: 400 }
      );
    }

    let updatedApplication;

    if (body.type === 'professional') {
      updatedApplication = await ProfessionalPartnerApplication.findByIdAndUpdate(
        id,
        { status: body.status },
        { new: true }
      );
    } else if (body.type === 'volunteer') {
      updatedApplication = await VolunteerApplication.findByIdAndUpdate(
        id,
        { status: body.status },
        { new: true }
      );
    } else {
      return NextResponse.json(
        { error: 'Invalid application type' },
        { status: 400 }
      );
    }

    if (!updatedApplication) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Application status updated successfully',
      application: updatedApplication
    });
  } catch (error) {
    console.error('Application status update error:', error);
    return NextResponse.json(
      { error: 'Failed to update application status' },
      { status: 500 }
    );
  }
}