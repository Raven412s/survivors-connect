"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

import ConnectPlus from "../buttons/connect-plus";
import ConnectRequestForm from "../forms/connect-request-form";

export default function ConnectPlusModal({children}: {children?: React.ReactNode}) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div>
          {children? children : <ConnectPlus handleClick={() => setOpen(true)} />}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] max-h-[99vh] my-auto z-60 w-full overflow-y-auto no-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center text-red-600">
            Request Immediate Help
          </DialogTitle>
          <DialogDescription className="text-center">
            Fill out the form below to get assistance. Our team will contact you shortly.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4"  data-lenis-prevent>
          <ConnectRequestForm onSuccess={handleSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
}