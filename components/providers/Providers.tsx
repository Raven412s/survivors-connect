"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ReactLenis } from "lenis/react";
import { NextIntlClientProvider } from "next-intl";

type ProvidersProps = {
  children: React.ReactNode;
  locale: string;
};

export function Providers({ children, locale }: ProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale}>
      <ReactLenis root className="w-full">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        
          {children}
        </ThemeProvider>
      </ReactLenis>
    </NextIntlClientProvider>
  );
}
