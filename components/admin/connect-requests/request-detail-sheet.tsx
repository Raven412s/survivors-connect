'use client';

import * as React from 'react';
import { X, Phone, MapPin, Calendar, User, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Image from 'next/image';
import MapsEmbedder from '@/components/starter-kit-ui/maps-embedder';
import { RequestType } from './RequestCard';
import { getStatusColor, getCategoryColor } from '@/lib/request-ui-helpers';
import { ConnectRequestStatus } from '@/models/ConnectRequest';
import { useState } from 'react';

interface RequestDetailSheetProps {
  request: RequestType | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestUpdate?: (updatedRequest: RequestType) => void;
}

export default function RequestDetailSheet({ 
  request, 
  isOpen, 
  onClose, 
  onRequestUpdate 
}: RequestDetailSheetProps) {
  const [currentRequest, setCurrentRequest] = useState<RequestType | null>(request);
  const [status, setStatus] = useState<ConnectRequestStatus>(request?.status || 'pending');
  const [isUpdating, setIsUpdating] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  React.useEffect(() => {
    if (request) {
      setCurrentRequest(request);
      setStatus(request.status);
    }
  }, [request]);

  if (!isOpen || !currentRequest) return null;

  const date = new Date(currentRequest.createdAt);
  const formattedDate = date.toLocaleDateString('en-IN');
  const formattedTime = date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  const hasLocation = currentRequest.location && Array.isArray(currentRequest.location.coordinates) && currentRequest.location.coordinates.length === 2;
  const mapUrl = hasLocation
    ? `https://maps.google.com/maps?q=${currentRequest.location!.coordinates[1]},${currentRequest.location!.coordinates[0]}&z=15&output=embed`
    : null;

  const handleSave = async () => {
    if (!currentRequest) return;

    setIsUpdating(true);
    setSaveMessage('');

    try {
      const response = await fetch(`/api/connect-request/${currentRequest._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update request');
      }

      // Update local state
      const updatedRequest = { ...currentRequest, status };
      setCurrentRequest(updatedRequest);
      
      // Notify parent component
      if (onRequestUpdate) {
        onRequestUpdate(updatedRequest);
      }

      setSaveMessage('Status updated successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error updating request:', error);
      setSaveMessage('Error updating status. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setIsUpdating(false);
    }
  };

  const hasChanges = status !== request?.status;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Sheet */}
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out" data-lenis-prevent>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Request Details</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Status Update Section */}
              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="text-blue-900 dark:text-blue-100">
                    Update Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-blue-900 dark:text-blue-100">
                      Current Status
                    </Label>
                    <Select value={status} onValueChange={(value: ConnectRequestStatus) => setStatus(value)}>
                      <SelectTrigger className="bg-white dark:bg-gray-800 border-blue-300 dark:border-blue-700">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 border-blue-300 dark:border-blue-700">
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="assigned">Assigned</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {saveMessage && (
                    <div className={`p-3 rounded-lg text-sm ${
                      saveMessage.includes('Error') 
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300' 
                        : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                    }`}>
                      {saveMessage}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Basic Info */}
              <Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {currentRequest.photoUrl ? (
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600">
                        <Image
                          src={currentRequest.photoUrl}
                          alt="Attached photo"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-2 border-gray-200 dark:border-gray-600">
                        <User className="h-8 w-8 text-gray-400" />
                      </div>
                    )}

                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {currentRequest.name}
                      </h3>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formattedDate} at {formattedTime}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge className={`${getStatusColor(currentRequest.status)} font-medium`}>
                          {currentRequest.status.replace('_', ' ')}
                        </Badge>
                        <Badge className={`${getCategoryColor(currentRequest.category)} font-medium`}>
                          {currentRequest.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                    <span className="font-medium text-blue-700 dark:text-blue-300">Phone</span>
                    <a
                      href={`tel:${currentRequest.phone}`}
                      className="font-semibold text-blue-700 dark:text-blue-300 hover:underline"
                    >
                      {currentRequest.phone}
                    </a>
                  </div>
                  
                  {currentRequest.address && (
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Address</span>
                      <span className="text-gray-600 dark:text-gray-400 text-right">
                        {currentRequest.address}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Message */}
              {currentRequest.message && (
                <Card>
                  <CardHeader>
                    <CardTitle>Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                        {currentRequest.message}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Voice Message */}
              {currentRequest.audioUrl && (
                <Card>
                  <CardHeader>
                    <CardTitle>Voice Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <audio controls className="w-full" src={currentRequest.audioUrl} />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Location */}
              {hasLocation && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Location
                      {currentRequest.location?.accuracy && (
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          (Accuracy: {currentRequest.location.accuracy.toFixed(0)}m)
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mapUrl && (
                      <div className="relative h-64 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
                        <MapsEmbedder mapUrl={mapUrl} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex-1">
              {hasChanges && (
                <p className="text-sm text-orange-600 dark:text-orange-400">
                  Status change pending
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="border-gray-300 dark:border-gray-600"
              >
                Close
              </Button>
              
              <Button
                onClick={handleSave}
                disabled={!hasChanges || isUpdating}
                className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Update Status
                  </>
                )}
              </Button>
              
              <Button
                onClick={() => window.open(`tel:${currentRequest.phone}`, '_self')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call User
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}