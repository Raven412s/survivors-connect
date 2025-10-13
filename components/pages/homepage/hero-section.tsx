// "use client"
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react'

export default function HeroSection({ className }: { className?: string }) {
    const t = useTranslations('HomePage.Hero-Section');
    return (
        <div className={cn("flex flex-col md:min-h-screen items-center md:my-64 justify-start bg-background my-32",className)}>
            <div className="md:scale-200 flex flex-col items-center justify-start">
                <div className="relative w-full flex items-center justify-center h-36">
                    <div className="flex w-[75%] items-center justify-center h-8 blur-[30px] z-0">
                        <div className="bg-green-800 dark:bg-amber-200 w-20 h-full dark:brightness-125 brightness-85" />
                        <div className="bg-teal-800 dark:bg-amber-200 w-20 h-full dark:brightness-125 brightness-85" />
                        <div className="bg-orange-800 dark:bg-amber-200 w-20 h-full dark:brightness-125 brightness-85" />
                        <div className="bg-cyan-800 dark:bg-amber-200 w-20 h-full dark:brightness-125 brightness-85" />
                        <div className="bg-rose-800 dark:bg-amber-200 w-20 h-full dark:brightness-125 brightness-85" />
                    </div>
                    <h1 className='absolute z-10 text-7xl font-bold w-max  '>{t("Heading")} +</h1>
                </div>
                <div className="flex flex-col text-center font-semibold text-2xl text-muted-foreground">
                    <p>{t("Tagline.Line-1")}</p>
                    <p>{t("Tagline.Line-2")}</p>
                </div>
            </div>

        </div>
    )
}
