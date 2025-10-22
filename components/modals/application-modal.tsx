'use client';

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { ReactNode, MouseEvent } from "react";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

export function ApplicationModal({
  isOpen,
  onClose,
  title,
  children,
  className
}: ApplicationModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    // Close only if the backdrop itself was clicked, not the modal content
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-70 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    >
      <div
        className={cn(
          "bg-background rounded-2xl border border-border shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto",
          className
        )}
        data-lenis-prevent
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6" >{children}</div>
      </div>
    </div>
  );
}
