// app/admin/applications/page.tsx
'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Application, ApplicationStatus, ApplicationType } from '@/types/applications';
import { Award, Briefcase, Eye, GraduationCap, RefreshCw, Users } from 'lucide-react';
import { JSX, useEffect, useState } from 'react';

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const fetchApplications = async (type: string = 'all') => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/applications?type=${type}`);
      const data = await response.json();
      
      if (response.ok) {
        setApplications(data.applications || []);
      } else {
        console.error('Failed to fetch applications:', data.error);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateApplicationStatus = async (applicationId: string, status: ApplicationStatus, type: ApplicationType) => {
    try {
      setUpdatingStatus(applicationId);
      const response = await fetch(`/api/admin/applications/${applicationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, type }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update local state
        setApplications(prev => prev.map(app => 
          app._id === applicationId ? { ...app, status } : app
        ));
        if (selectedApplication?._id === applicationId) {
          setSelectedApplication(prev => prev ? { ...prev, status } : null);
        }
      } else {
        console.error('Failed to update status:', data.error);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getApplicationIcon = (application: Application) => {
    if (application.type === 'professional') {
      return <Briefcase className="w-4 h-4" />;
    }
    
    switch (application.opportunityType) {
      case 'volunteer': return <Users className="w-4 h-4" />;
      case 'internship': return <GraduationCap className="w-4 h-4" />;
      case 'youth-ambassador': return <Award className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getApplicationTypeLabel = (application: Application) => {
    if (application.type === 'professional') {
      return 'Professional Partner';
    }
    
    switch (application.opportunityType) {
      case 'volunteer': return 'Volunteer';
      case 'internship': return 'Internship';
      case 'youth-ambassador': return 'Youth Ambassador';
      default: return 'Volunteer';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const professionalApplications = applications.filter(app => app.type === 'professional');
  const volunteerApplications = applications.filter(app => app.type === 'volunteer');

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Applications</h1>
          <p className="text-muted-foreground">
            Manage and review all applications
          </p>
        </div>
        <Button
          onClick={() => fetchApplications()}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all" onClick={() => fetchApplications('all')}>
            All Applications ({applications.length})
          </TabsTrigger>
          <TabsTrigger value="professional" onClick={() => fetchApplications('professional')}>
            Professional ({professionalApplications.length})
          </TabsTrigger>
          <TabsTrigger value="volunteer" onClick={() => fetchApplications('volunteer')}>
            Volunteer ({volunteerApplications.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <ApplicationsList
            applications={applications}
            loading={loading}
            onViewApplication={setSelectedApplication}
            onUpdateStatus={updateApplicationStatus}
            updatingStatus={updatingStatus}
            getStatusColor={getStatusColor}
            getApplicationIcon={getApplicationIcon}
            getApplicationTypeLabel={getApplicationTypeLabel}
            formatDate={formatDate}
          />
        </TabsContent>

        <TabsContent value="professional" className="space-y-4">
          <ApplicationsList
            applications={professionalApplications}
            loading={loading}
            onViewApplication={setSelectedApplication}
            onUpdateStatus={updateApplicationStatus}
            updatingStatus={updatingStatus}
            getStatusColor={getStatusColor}
            getApplicationIcon={getApplicationIcon}
            getApplicationTypeLabel={getApplicationTypeLabel}
            formatDate={formatDate}
          />
        </TabsContent>

        <TabsContent value="volunteer" className="space-y-4">
          <ApplicationsList
            applications={volunteerApplications}
            loading={loading}
            onViewApplication={setSelectedApplication}
            onUpdateStatus={updateApplicationStatus}
            updatingStatus={updatingStatus}
            getStatusColor={getStatusColor}
            getApplicationIcon={getApplicationIcon}
            getApplicationTypeLabel={getApplicationTypeLabel}
            formatDate={formatDate}
          />
        </TabsContent>
      </Tabs>

      {/* Application Detail Sheet */}
      <ApplicationDetailSheet
        application={selectedApplication}
        onClose={() => setSelectedApplication(null)}
        onUpdateStatus={updateApplicationStatus}
        updatingStatus={updatingStatus}
        getStatusColor={getStatusColor}
        getApplicationTypeLabel={getApplicationTypeLabel}
        formatDate={formatDate}
      />
    </div>
  );
}

interface ApplicationsListProps {
  applications: Application[];
  loading: boolean;
  onViewApplication: (application: Application) => void;
  onUpdateStatus: (id: string, status: ApplicationStatus, type: ApplicationType) => void;
  updatingStatus: string | null;
  getStatusColor: (status: ApplicationStatus) => string;
  getApplicationIcon: (application: Application) => JSX.Element;
  getApplicationTypeLabel: (application: Application) => string;
  formatDate: (dateString: string) => string;
}

function ApplicationsList({
  applications,
  loading,
  onViewApplication,
  onUpdateStatus,
  updatingStatus,
  getStatusColor,
  getApplicationIcon,
  getApplicationTypeLabel,
  formatDate
}: ApplicationsListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <RefreshCw className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center py-12">
          <p className="text-muted-foreground">No applications found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <Card key={application._id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className="shrink-0">
                    {getApplicationIcon(application)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-semibold truncate">{application.name}</p>
                      <Badge variant="secondary" className="text-xs">
                        {getApplicationTypeLabel(application)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {application.email}
                    </p>
                    {application.type === 'professional' && application.profession && (
                      <p className="text-sm text-muted-foreground truncate">
                        {application.profession}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 ml-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {formatDate(application.submittedAt)}
                  </p>
                  <Badge className={getStatusColor(application.status)}>
                    {application.status}
                  </Badge>
                </div>

                <div className="flex items-center space-x-2">
                  <Select
                    value={application.status}
                    onValueChange={(value: ApplicationStatus) => 
                      onUpdateStatus(application._id, value, application.type)
                    }
                    disabled={updatingStatus === application._id}
                  >
                    <SelectTrigger className="w-32 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewApplication(application)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </SheetTrigger>
                  </Sheet>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

interface ApplicationDetailSheetProps {
  application: Application | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: ApplicationStatus, type: ApplicationType) => void;
  updatingStatus: string | null;
  getStatusColor: (status: ApplicationStatus) => string;
  getApplicationTypeLabel: (application: Application) => string;
  formatDate: (dateString: string) => string;
}

function ApplicationDetailSheet({
  application,
  onClose,
  onUpdateStatus,
  updatingStatus,
  getStatusColor,
  getApplicationTypeLabel,
  formatDate
}: ApplicationDetailSheetProps) {
  if (!application) return null;

  return (
    <Sheet open={!!application} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Application Details</SheetTitle>
          <SheetDescription>
            View and manage application for {application.name}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-sm">Name</h4>
              <p className="text-sm">{application.name}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm">Email</h4>
              <p className="text-sm">{application.email}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm">Application Type</h4>
              <p className="text-sm">{getApplicationTypeLabel(application)}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm">Status</h4>
              <Badge className={getStatusColor(application.status)}>
                {application.status}
              </Badge>
            </div>
            <div>
              <h4 className="font-semibold text-sm">Submitted</h4>
              <p className="text-sm">{formatDate(application.submittedAt)}</p>
            </div>
          </div>

          {/* Professional Application Details */}
          {application.type === 'professional' && (
            <>
              <div>
                <h4 className="font-semibold text-sm mb-2">Profession</h4>
                <p className="text-sm">{application.profession}</p>
              </div>
              {application.expertise && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Area of Expertise</h4>
                  <p className="text-sm">{application.expertise}</p>
                </div>
              )}
              {application.experience && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Years of Experience</h4>
                  <p className="text-sm">{application.experience}</p>
                </div>
              )}
              {application.message && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Message</h4>
                  <p className="text-sm whitespace-pre-wrap">{application.message}</p>
                </div>
              )}
            </>
          )}

          {/* Volunteer Application Details */}
          {application.type === 'volunteer' && (
            <>
              {application.phone && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Phone</h4>
                  <p className="text-sm">{application.phone}</p>
                </div>
              )}
              {application.education && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Education</h4>
                  <p className="text-sm">{application.education}</p>
                </div>
              )}
              {application.experience && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Relevant Experience</h4>
                  <p className="text-sm whitespace-pre-wrap">{application.experience}</p>
                </div>
              )}
              {application.availability && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Availability</h4>
                  <p className="text-sm">{application.availability}</p>
                </div>
              )}
              {application.motivation && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Motivation</h4>
                  <p className="text-sm whitespace-pre-wrap">{application.motivation}</p>
                </div>
              )}
            </>
          )}

          {/* Status Update */}
          <div className="border-t pt-4">
            <h4 className="font-semibold text-sm mb-3">Update Status</h4>
            <div className="flex space-x-2">
              {(['pending', 'reviewed', 'accepted', 'rejected'] as ApplicationStatus[]).map((status) => (
                <Button
                  key={status}
                  variant={application.status === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => onUpdateStatus(application._id, status, application.type)}
                  disabled={updatingStatus === application._id}
                  className="capitalize"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}