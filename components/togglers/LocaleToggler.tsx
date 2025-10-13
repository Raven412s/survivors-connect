"use client"
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface LocaleTogglerProps {
    switchLocale: (locale: string) => void;
    className?: string;
}

export function LocaleToggler({ switchLocale, className }: LocaleTogglerProps) {
    const pathname = usePathname()
    const currentLocale = pathname.startsWith('/en') ? 'en' : 'hi'
    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => switchLocale(currentLocale === 'en' ? 'hi' : 'en')}
            className={cn(
                "font-medium transition-colors rounded-sm",
                className
            )}
        >
            {currentLocale === 'en' ? 'हि' : 'En'}
        </Button>
    )
}
