"use client";
import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";

export default function ConnectPlus({className, handleClick}:{className?: string, handleClick?: () => void}) {
  const pathname = usePathname();

  return (
    <Button
      variant={"outline"}
      size={"sm"}
      className={cn(
        pathname.includes("/connect-plus") ? "hidden" : "block",
        "flex items-center relative overflow-hidden",
        "cursor-pointer group",
        "hover:scale-110 transition-all duration-300",
        className
      )}
      onClick={handleClick}
    >
      <span>Connect</span>
      <PlusIcon className="size-4 md:size-5"/>
      {/* ✅ Shimmer animation on hover */}
      <div
        id="shimmer"
        className="absolute top-0 left-[-40%] h-full w-[40%] rounded-lg bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer pointer-events-none"
      />
    </Button>
  );
}
