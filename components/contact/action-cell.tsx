"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Trash } from "lucide-react";
import { ViewSheet } from "@/components/contact/view-sheet";
import { ContactSubmission } from "@/types/contact";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function ActionCell({ item, refresh }: { item: ContactSubmission, refresh: () => void }) {
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = async () => {
    await fetch("/api/contact/", {
      method: "DELETE",
      body: JSON.stringify({ id: item._id }),
    });

    refresh();
  };

  return (
    <>
      <div className="flex gap-3">
        {/* View Button */}
        <Button variant="outline" size="icon" onClick={() => setOpenView(true)}>
          <Eye className="w-4 h-4" />
        </Button>

        {/* Delete Button */}
        <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon">
              <Trash className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Delete submission?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the submission
                from the database.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>

              <AlertDialogAction
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={handleDelete}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* View Sheet */}
      <ViewSheet open={openView} onOpenChange={setOpenView} data={item} />
    </>
  );
}
