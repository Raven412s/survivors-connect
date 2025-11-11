'use client';

import MapsEmbedder from '@/components/starter-kit-ui/maps-embedder';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Download,
  Eye,
  Filter,
  Loader2,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  Phone,
  RefreshCw,
  User
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ConnectRequest {
  _id: string;
  name: string;
  phone: string;
  address?: string;
  category: string;
  message?: string;
  photoUrl?: string;
  audioUrl?: string;
  location?: {
    coordinates: [number, number];
    accuracy?: number;
  };
  status: string;
  createdAt: string;
}

export default function AdminConnectRequestManagementPage() {
  const [requests, setRequests] = useState<ConnectRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  async function fetchRequests() {
    try {
      setLoading(true);
      const res = await fetch('/api/connect-request');
      const data = await res.json();
      setRequests(data.requests || []);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  const filteredRequests = requests.filter(request => {
    const statusMatch = statusFilter === 'all' || request.status === statusFilter;
    const categoryMatch = categoryFilter === 'all' || request.category === categoryFilter;
    return statusMatch && categoryMatch;
  });

  const getStatusColor = (status: string) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800',
      assigned: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
      in_progress: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800',
      resolved: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
      closed: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800'
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
  };

  const getCategoryColor = (category: string) => {
    const categoryColors = {
      medical: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
      legal: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
      counselling: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800',
      shelter: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800',
      police: 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800',
      other: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800'
    };
    return categoryColors[category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-IN'),
      time: date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };
  };

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
      ...csvData.map(row => row.map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `connect-requests-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleCallUser = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleOpenMaps = (coordinates: [number, number]) => {
    window.open(`https://www.google.com/maps?q=${coordinates[1]},${coordinates[0]}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Connect Requests
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage and monitor all help requests in real-time
            </p>
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Total Requests',
              value: requests.length,
              color: 'blue',
              icon: User,
              border: 'border-l-blue-500'
            },
            {
              title: 'Pending',
              value: requests.filter(r => r.status === 'pending').length,
              color: 'yellow',
              icon: Loader2,
              border: 'border-l-yellow-500'
            },
            {
              title: 'Resolved',
              value: requests.filter(r => r.status === 'resolved').length,
              color: 'green',
              icon: MessageSquare,
              border: 'border-l-green-500'
            },
            {
              title: 'Active',
              value: requests.filter(r => r.status === 'in_progress' || r.status === 'assigned').length,
              color: 'purple',
              icon: MapPin,
              border: 'border-l-purple-500'
            },
          ].map((stat, index) => (
            <Card key={index} className={`
              border-l-4 ${stat.border} 
              bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 
              transition-colors duration-300
            `}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`
                    p-3 rounded-full
                    ${stat.color === 'blue' && 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300'}
                    ${stat.color === 'yellow' && 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-300'}
                    ${stat.color === 'green' && 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-300'}
                    ${stat.color === 'purple' && 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300'}
                  `}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Filters:
                </span>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
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

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
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
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-2 justify-between">
                    {/* Photo Skeleton */}
                    <div className="w-32 h-32 rounded-lg bg-gray-200 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600" />

                    <div className="flex-1 space-y-2">
                      <div className="h-6 rounded-md bg-gray-200 dark:bg-gray-700" />
                      <div className="h-4 rounded-md bg-gray-200 dark:bg-gray-700 w-3/4" />
                      <div className="flex gap-2 mt-2">
                        <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
                        <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
                      </div>
                    </div>

                    <div className="h-8 w-8 rounded-md bg-gray-200 dark:bg-gray-700" />
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Contact Info Skeleton */}
                  <div className="h-12 rounded-lg bg-gray-200 dark:bg-gray-700" />

                  {/* Message Skeleton */}
                  <div className="h-20 rounded-lg bg-gray-200 dark:bg-gray-700" />

                  {/* Audio Skeleton */}
                  <div className="space-y-2">
                    <div className="h-4 rounded-md bg-gray-200 dark:bg-gray-700 w-1/2" />
                    <div className="h-12 rounded-lg bg-gray-200 dark:bg-gray-700" />
                  </div>

                  {/* Map Skeleton */}
                  <div className="space-y-2">
                    <div className="h-4 rounded-md bg-gray-200 dark:bg-gray-700 w-1/3" />
                    <div className="h-32 rounded-lg bg-gray-200 dark:bg-gray-700" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredRequests.length === 0 ? (
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <CardContent className="p-12 text-center">
              <MessageSquare className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No requests found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {requests.length === 0
                  ? "No connect requests have been submitted yet."
                  : "No requests match your current filters."
                }
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
            {filteredRequests.map((req) => {
              const { date, time } = formatDate(req.createdAt);
              const hasLocation = req.location && req.location.coordinates;
              const mapUrl = hasLocation
                ? `https://maps.google.com/maps?q=${req.location?.coordinates[1]},${req.location?.coordinates[0]}&z=15&output=embed`
                : null;

              return (
                <div key={req._id} className="break-inside-avoid animate-fadeIn">
                  <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600">
                    <CardHeader className='py-0'>
                      <div className="flex items-start gap-2 justify-between">
                        {/* Photo */}
                        {req.photoUrl && (
                          <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600 group-hover:border-blue-400 transition-colors duration-300">
                            <Image
                              src={req.photoUrl}
                              alt="Attached photo"
                              fill
                              className="object-cover hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300" />
                          </div>
                        )}

                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                            {req.name}
                          </CardTitle>
                          <CardDescription className="text-gray-500 dark:text-gray-400">
                            {date} at {time}
                          </CardDescription>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge className={`${getStatusColor(req.status)} font-medium`}>
                              {req.status.replace('_', ' ')}
                            </Badge>
                            <Badge className={`${getCategoryColor(req.category)} font-medium`}>
                              {req.category}
                            </Badge>
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white" align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                            <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="hover:bg-gray-100 dark:hover:bg-gray-700"
                              onClick={() => handleCallUser(req.phone)}
                            >
                              <Phone className="h-4 w-4 mr-2" />
                              Call User
                            </DropdownMenuItem>
                            {hasLocation && (
                              <DropdownMenuItem
                                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={() => handleOpenMaps(req.location!.coordinates)}
                              >
                                <MapPin className="h-4 w-4 mr-2" />
                                Open in Maps
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4 py-0">
                      {/* Contact Info */}
                      <div className="flex items-center text-sm p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-200">
                        <Phone className="h-4 w-4 mr-3 text-blue-500 shrink-0" />
                        <a
                          href={`tel:${req.phone}`}
                          className="font-medium hover:underline text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200"
                        >
                          {req.phone}
                        </a>
                      </div>

                      {/* Message */}
                      {req.message && (
                        <div className="flex items-start text-sm p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200">
                          <MessageSquare className="h-4 w-4 mr-3 mt-0.5 shrink-0 text-gray-600 dark:text-gray-400" />
                          <p className="leading-relaxed line-clamp-3">{req.message}</p>
                        </div>
                      )}

                      {/* Audio */}
                      {req.audioUrl && (
                        <div className="space-y-2">
                          <div className="flex items-center text-sm px-1 text-gray-700 dark:text-gray-300">
                            <MessageSquare className="h-4 w-4 mr-2 text-orange-500" />
                            <span className="font-medium">Voice Message</span>
                          </div>
                          <div className="rounded-lg p-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700">
                            <audio controls className="w-full h-8" src={req.audioUrl} />
                          </div>
                        </div>
                      )}

                      {/* Location */}
                      {hasLocation && (
                        <div className="space-y-2">
                          <div className="flex items-center text-sm px-1 text-gray-700 dark:text-gray-300">
                            <MapPin className="h-4 w-4 mr-2 text-green-500" />
                            <span className="font-medium">Location</span>
                            {req.location?.accuracy && (
                              <span className="text-xs ml-2 text-gray-500 dark:text-gray-400">
                                (Accuracy: {req.location?.accuracy.toFixed(0)}m)
                              </span>
                            )}
                          </div>
                          {mapUrl && (
                            <div className="relative h-32 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
                              <MapsEmbedder mapUrl={mapUrl} />
                            </div>
                          )}
                          {req.address && (
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              📍 {req.address}
                            </p>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}