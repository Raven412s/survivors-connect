// app/api/admin/applications/route.ts
import { NextRequest, NextResponse } from 'next/server';
import ProfessionalPartnerApplication from '@/models/ProfessionalPartnerApplication';
import VolunteerApplication from '@/models/VolunteerApplication';
import connectDB from '@/lib/mongoDB';
import { 
  Application, 
  ProfessionalApplication, 
  VolunteerApplication as VolunteerApp,
  ApplicationStatus 
} from '@/types/applications';
import { ProfessionalApplicationDocument, VolunteerApplicationDocument } from '@/types/mongodb';

interface ApplicationFilter {
  status?: ApplicationStatus;
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as 'professional' | 'volunteer' | 'all';
    const status = searchParams.get('status') as ApplicationStatus | null;

    let professionalApps: ProfessionalApplication[] = [];
    let volunteerApps: VolunteerApp[] = [];

    // Build query filters with proper types
    const professionalFilter: ApplicationFilter = {};
    const volunteerFilter: ApplicationFilter = {};

    if (status) {
      professionalFilter.status = status;
      volunteerFilter.status = status;
    }

    if (type === 'all' || type === 'professional') {
      const professionalData = await ProfessionalPartnerApplication
        .find(professionalFilter)
        .sort({ submittedAt: -1 })
        .lean<ProfessionalApplicationDocument[]>();
      
      professionalApps = professionalData.map((app: ProfessionalApplicationDocument) => ({
        _id: app._id.toString(),
        type: 'professional' as const,
        name: app.name,
        email: app.email,
        profession: app.profession,
        expertise: app.expertise,
        experience: app.experience,
        message: app.message,
        status: app.status,
        submittedAt: app.submittedAt.toISOString()
      }));
    }

    if (type === 'all' || type === 'volunteer') {
      const volunteerData = await VolunteerApplication
        .find(volunteerFilter)
        .sort({ submittedAt: -1 })
        .lean<VolunteerApplicationDocument[]>();
      
      volunteerApps = volunteerData.map((app: VolunteerApplicationDocument) => ({
        _id: app._id.toString(),
        type: 'volunteer' as const,
        name: app.name,
        email: app.email,
        phone: app.phone,
        education: app.education,
        experience: app.experience,
        availability: app.availability,
        motivation: app.motivation,
        opportunityType: app.opportunityType,
        status: app.status,
        submittedAt: app.submittedAt.toISOString()
      }));
    }

    // Combine applications
    const applications: Application[] = [
      ...professionalApps,
      ...volunteerApps
    ].sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

    return NextResponse.json({ applications });
  } catch (error) {
    console.error('Admin applications fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}