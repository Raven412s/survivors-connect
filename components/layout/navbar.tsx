"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import ToggleActions from "../action-blocks/navbar/ToggleActions";
import { Separator } from "../ui/separator";
import { buttonVariants } from "../ui/button";

export default function Navbar() {
  return (
    <div
      className={cn(
        "fixed top-2 md:top-0 inset-x-2 md:inset-x-0 rounded-lg md:rounded-none h-16 z-[60] bg-accent/20 md:bg-accent border-3 md:border-none text-accent-foreground backdrop-blur-xs md:backdrop-blur-none shadow-lg"
      )}
      id="navbar"
    >
      <nav className="relative w-full h-full flex items-center justify-between px-4">
        {/* Logo Section (now left on all screens) */}
        <div className="flex items-center gap-1 md:gap-2">
          <div className="text-base md:text-xl font-bold p-1 flex gap-1 md:gap-2 items-center">
            <div className="size-7 md:size-10 border-3 md:border-4 border-foreground" />
            <div className="flex flex-col items-start justify-center gap-0.5 md:gap-1">
              <h1 className="uppercase leading-tight">survivors</h1>
              <h1 className="uppercase leading-tight text-muted-foreground text-xs md:text-sm">
                connect
              </h1>
            </div>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center justify-evenly px-2.5 h-full gap-5">
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About" },
            { href: "/survivor-voices", label: "Survivor Voices" },
            { href: "/get-involved", label: "Get Involved" },
            { href: "/contact-us", label: "Contact Us" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative inline-block cursor-pointer group text-sm font-medium"
            >
              <span className="relative z-10">{link.label}</span>
              <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
            <Sheet>
              <SheetTrigger>
                More
              </SheetTrigger>

              <SheetContent
                className="mt-16 h-full bg-background/70 backdrop-blur-sm"
                data-lenis-prevent
              >
                <SheetHeader>
                  <SheetTitle>Survivor Connect</SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>
                <Separator />
                <div className="flex h-full w-full flex-col gap-3 items-center justify-start px-4">
                  {[
                    { href: "/", label: "Home" },
                    { href: "/about", label: "About" },
                    { href: "/survivor-voices", label: "Survivor Voices" },
                    { href: "/get-involved", label: "Get Involved" },
                    { href: "/contact-us", label: "Contact Us" },
                    { href: "/events-activities", label: "Events & Activities" },
                    { href: "/support-services", label: "Support Services" },
                    {
                      href: "/research-publications",
                      label: "Research & Publications",
                    },
                    { href: "/news-media", label: "News & Media" },
                    { href: "/resources", label: "Resources" },
                    { href: "/donate-support", label: "Donate & Support" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="relative inline-block cursor-pointer group text-lg font-medium"
                    >
                      <span className="relative z-10">{link.label}</span>
                      <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
        </div>

        {/* Right Section (Menu trigger on small screens, actions on desktop) */}
        <div className="flex items-center gap-2">
          {/* Mobile Sheet Trigger */}
          <div className="flex md:hidden items-center">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className={cn(
                    buttonVariants({ variant: "outline", size: "icon-sm" })
                  )}
                >
                  <Menu className="size-4" />
                </button>
              </SheetTrigger>

              <SheetContent
                side="top"
                className="mt-16 h-full bg-background/70 backdrop-blur-sm"
                data-lenis-prevent
              >
                <SheetHeader>
                  <SheetTitle>Survivor Connect</SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>
                <Separator />
                <div className="flex h-full w-full flex-col gap-3 items-center justify-start px-4">
                  {[
                    { href: "/", label: "Home" },
                    { href: "/about", label: "About" },
                    { href: "/survivor-voices", label: "Survivor Voices" },
                    { href: "/get-involved", label: "Get Involved" },
                    { href: "/contact-us", label: "Contact Us" },
                    { href: "/events-activities", label: "Events & Activities" },
                    { href: "/support-services", label: "Support Services" },
                    {
                      href: "/research-publications",
                      label: "Research & Publications",
                    },
                    { href: "/news-media", label: "News & Media" },
                    { href: "/resources", label: "Resources" },
                    { href: "/donate-support", label: "Donate & Support" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="relative inline-block cursor-pointer group text-lg font-medium"
                    >
                      <span className="relative z-10">{link.label}</span>
                      <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Actions */}
          <ToggleActions className="hidden md:flex" />
        </div>
      </nav>
    </div>
  );
}
