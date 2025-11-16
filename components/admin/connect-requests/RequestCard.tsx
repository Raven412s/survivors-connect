'use client';

import * as React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MapPin, MoreHorizontal, Phone } from 'lucide-react';
import MapsEmbedder from '@/components/starter-kit-ui/maps-embedder';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getStatusColor, getCategoryColor, formatDate } from '@/lib/request-ui-helpers';
import { ConnectRequestCategory, ConnectRequestStatus } from '@/models/ConnectRequest';

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

interface RequestCardProps {
  req: RequestType;
  onViewRequest: (request: RequestType) => void;
}

export default function RequestCard({ req, onViewRequest }: RequestCardProps) {
  const { date, time } = formatDate(req.createdAt);
  const hasLocation = req.location && req.location.coordinates;
  const mapUrl = hasLocation
    ? `https://maps.google.com/maps?q=${req.location?.coordinates[1]},${req.location?.coordinates[0]}&z=15&output=embed`
    : null;

  const handleView = () => {
    onViewRequest(req);
  };

  const handleCallUser = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleOpenMaps = (coords: [number, number]) => {
    window.open(`https://www.google.com/maps?q=${coords[1]},${coords[0]}`, '_blank');
  };

  return (
    <div className="break-inside-avoid animate-fadeIn">
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
                <DropdownMenuItem
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={handleView}
                >
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
              <MessageSquareIcon />
              <p className="leading-relaxed line-clamp-3">{req.message}</p>
            </div>
          )}

          {/* Audio */}
          {req.audioUrl && (
            <div className="space-y-2">
              <div className="flex items-center text-sm px-1 text-gray-700 dark:text-gray-300">
                <MessageSquareIcon className="h-4 w-4 mr-2 text-orange-500" />
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
}

// small helper icon component to avoid extra dependency in this file
function MessageSquareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg className="h-4 w-4 mr-3 mt-0.5 shrink-0 text-gray-600 dark:text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  );
}