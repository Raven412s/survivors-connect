"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ContactSubmission } from "@/types/contact";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, Phone, User, MessageSquare, AlertTriangle } from "lucide-react";

interface ViewSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: ContactSubmission | null;
}

export function ViewSheet({ open, onOpenChange, data }: ViewSheetProps) {
  if (!data) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg overflow-y-auto px-4">
        <SheetHeader className="pb-4 border-b">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5" />
            Submission Details
          </SheetTitle>
          <SheetDescription className="text-base">
            Complete contact form submission information
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Header Section */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <h3 className="font-semibold text-lg">{data.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Submitted {new Date(data.createdAt).toLocaleDateString("en-IN")}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge 
                variant={data.isUrgent ? "destructive" : "secondary"}
                className="flex items-center gap-1"
              >
                {data.isUrgent && <AlertTriangle className="h-3 w-3" />}
                {data.isUrgent ? "High Priority" : "Standard"}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {data.category}
              </Badge>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              Contact Information
            </h4>
            
            <div className="grid gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{data.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{data.phone || "Not provided"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Message Section */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Message
            </h4>
            
            <div className="p-4 rounded-lg border bg-card">
              <p className="text-sm whitespace-pre-wrap leading-relaxed">
                {data.message || "No message provided"}
              </p>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>
              Submitted on {new Date(data.createdAt).toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}