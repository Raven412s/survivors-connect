"use client";

import { ActionCell } from "@/components/contact/action-cell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ContactSubmission } from "@/types/contact";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";


export const columns = (refresh: () => void): ColumnDef<ContactSubmission>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="w-4 h-4 ml-2" />
      </Button>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => row.original.phone || "—",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.category;
      const colors: Record<string, string> = {
        general: "bg-gray-200",
        support: "bg-blue-200",
        partnership: "bg-green-200",
        volunteer: "bg-purple-200",
        media: "bg-yellow-200",
        other: "bg-orange-200",
      };
      return <Badge className={cn(colors[category],"text-black capitalize" )}>{category}</Badge>;
    },
  },
  {
    accessorKey: "isUrgent",
    header: "Urgent",
    cell: ({ row }) =>
      row.original.isUrgent ? (
        <Badge className="bg-red-500 text-white">Yes</Badge>
      ) : (
        <Badge variant="outline">No</Badge>
      ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleString("en-IN"),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionCell item={row.original} refresh={refresh} />,
  },
];
