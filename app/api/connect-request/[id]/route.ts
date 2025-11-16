import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoDB';
import { ConnectRequest } from '@/models/ConnectRequest';
import { ConnectRequestStatus } from '@/models/ConnectRequest';

interface UpdateRequestBody {
  status?: ConnectRequestStatus;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const { status }: UpdateRequestBody = await request.json();
    
    // Validate status
    const validStatuses: ConnectRequestStatus[] = ['pending', 'assigned', 'in_progress', 'resolved', 'closed'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const updateData: { status?: ConnectRequestStatus } = {};
    if (status) updateData.status = status;

    const updatedRequest = await ConnectRequest.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedRequest) {
      return NextResponse.json(
        { error: 'Request not found' },
        { status: 404 }
      );
    }

    // Serialize the response
    const serializedRequest = {
      _id: String(updatedRequest._id),
      name: updatedRequest.name,
      phone: updatedRequest.phone,
      address: updatedRequest.address,
      category: updatedRequest.category,
      message: updatedRequest.message,
      photoUrl: updatedRequest.photoUrl,
      audioUrl: updatedRequest.audioUrl,
      location: updatedRequest.location,
      status: updatedRequest.status,
      createdAt: updatedRequest.createdAt.toISOString(),
      updatedAt: updatedRequest.updatedAt.toISOString(),
    };

    return NextResponse.json({ 
      success: true, 
      request: serializedRequest 
    });
  } catch (error) {
    console.error('Error updating request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}