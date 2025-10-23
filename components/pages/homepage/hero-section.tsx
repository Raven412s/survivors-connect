// hero-section.tsx
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react'

export default function HeroSection({ className }: { className?: string }) {
    const t = useTranslations('HomePage.Hero-Section');

    return (
        <div className={cn("relative flex flex-col items-center justify-center min-h-[90vh]  overflow-hidden", className)}>
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-background via-background to-muted/20" />

            <div className="relative z-10 flex flex-col items-center justify-center text-center mx-auto">
                <div className="md:scale-200 flex flex-col items-center justify-start">
                    <div className="relative w-full flex items-center justify-center h-36">
                        <div className="flex w-[75%] items-center justify-center h-8 blur-[30px] z-0">
                            <div className="bg-green-800 dark:bg-green-300 w-20 h-full " />
                            <div className="bg-teal-800 dark:bg-teal-300 w-20 h-full " />
                            <div className="bg-orange-800 dark:bg-orange-300 w-20 h-full " />
                            <div className="bg-cyan-800 dark:bg-cyan-300 w-20 h-full " />
                            <div className="bg-rose-800 dark:bg-rose-300 w-20 h-full " />
                        </div>
                        <h1 className='absolute z-10 text-7xl font-bold w-max  '>{t("Heading")}</h1>
                    </div>
                    <div className="flex flex-col text-center font-semibold text-2xl text-muted-foreground">
                        <p>{t("Tagline.Line-1")}</p>
                        <p>{t("Tagline.Line-2")}</p>
                    </div>
                    {/* CTA Buttons */}
                    <div className=" flex flex-col sm:flex-row gap-4 mt-8">
                        <Button variant={"default"} className="px-8 py-3 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition-all duration-200 transform hover:scale-105">
                            {t("Get-Help-Btn")}
                        </Button>
                        <Button variant={"outline"} className="px-8 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition-all duration-200">
                            {t("Share-Testimony-Btn")}
                        </Button>
                        <Button variant={"outline"} className="px-8 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition-all duration-200">
                            {t("Join-Community-Btn")}
                        </Button>
                    </div>
                </div>

            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="w-6 h-10 border-2 border-border rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-border rounded-full mt-2 animate-bounce" />
                </div>
            </div>
        </div>
    )
}