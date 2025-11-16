'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ConnectRequestCategory, ConnectRequestStatus } from '@/models/ConnectRequest';
import { Download, Filter, Loader2, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import RequestCard from './RequestCard';
import RequestDetailSheet from './request-detail-sheet';

export interface RequestType {
  _id: string;
  name: string;
  phone: string;
  address?: string;
  category: ConnectRequestCategory;
  message?: string;
  photoUrl?: string;
  audioUrl?: string;
  location?: { coordinates: [number, number]; accuracy?: number } | null;
  status: ConnectRequestStatus;
  createdAt: string;
}

interface ApiResponse {
  requests: RequestType[];
}

export default function ConnectRequestsApp({ initialRequests }: { initialRequests: RequestType[] }) {
  const [requests, setRequests] = useState<RequestType[]>(initialRequests || []);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<ConnectRequestStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<ConnectRequestCategory | 'all'>('all');
  const [selectedRequest, setSelectedRequest] = useState<RequestType | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  async function fetchRequests() {
    try {
      setLoading(true);
      const res = await fetch('/api/connect-request');
      const data: ApiResponse = await res.json();
      setRequests(data.requests || []);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // keep initialRequests until user explicitly refreshes
  }, []);

  const handleViewRequest = (request: RequestType) => {
    setSelectedRequest(request);
    setIsSheetOpen(true);
  };

  const filteredRequests = requests.filter(request => {
    const statusMatch = statusFilter === 'all' || request.status === statusFilter;
    const categoryMatch = categoryFilter === 'all' || request.category === categoryFilter;
    return statusMatch && categoryMatch;
  });

  const exportToCSV = () => {
    const headers = ['Name', 'Phone', 'Category', 'Status', 'Address', 'Message', 'Date'];
    const csvData = filteredRequests.map(req => [
      req.name,
      req.phone,
      req.category,
      req.status,
      req.address || '',
      req.message || '',
      new Date(req.createdAt).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `connect-requests-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Connect Requests</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage and monitor all help requests in real-time</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={exportToCSV}
            variant="outline"
            className="flex items-center gap-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>

          <Button
            onClick={fetchRequests}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4" />
                Refreshing
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                Refresh
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters:</span>
            </div>

            <Select value={statusFilter} onValueChange={(value: ConnectRequestStatus | 'all') => setStatusFilter(value)}>
              <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={(value: ConnectRequestCategory | 'all') => setCategoryFilter(value)}>
              <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="legal">Legal</SelectItem>
                <SelectItem value="counselling">Counselling</SelectItem>
                <SelectItem value="shelter">Shelter</SelectItem>
                <SelectItem value="police">Police</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            {(statusFilter !== 'all' || categoryFilter !== 'all') && (
              <Button
                variant="ghost"
                onClick={() => {
                  setStatusFilter('all');
                  setCategoryFilter('all');
                }}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Requests Grid */}
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="animate-pulse overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="p-6 h-48" />
            </Card>
          ))}
        </div>
      ) : filteredRequests.length === 0 ? (
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <CardContent className="p-12 text-center">
            <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No requests found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {requests.length === 0 ? "No connect requests have been submitted yet." : "No requests match your current filters."}
            </p>
            {(statusFilter !== 'all' || categoryFilter !== 'all') && (
              <Button
                onClick={() => {
                  setStatusFilter('all');
                  setCategoryFilter('all');
                }}
                variant="outline"
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Clear Filters
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="columns-1 sm:columns-2 xl:columns-3 gap-6 space-y-6">
          {filteredRequests.map((req) => (
            <RequestCard 
              key={req._id} 
              req={req} 
              onViewRequest={handleViewRequest}
            />
          ))}
        </div>
      )}

      {/* Request Detail Sheet */}
      <RequestDetailSheet
        request={selectedRequest}
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      />
    </div>
  );
}