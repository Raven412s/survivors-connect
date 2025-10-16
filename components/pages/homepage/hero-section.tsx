// hero-section.tsx
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react'

export default function HeroSection({ className }: { className?: string }) {
    const t = useTranslations('HomePage.Hero-Section');
    
    return (
        <div className={cn("relative flex flex-col items-center justify-center min-h-[90vh] bg-background overflow-hidden", className)}>
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
            
            {/* Animated Gradient Blobs */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-300/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
            
            <div className="relative z-10 flex flex-col gap-8 items-center justify-center text-center max-w-4xl mx-auto px-6">
                {/* Main Heading */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-96 h-16 bg-gradient-to-r from-green-400/30 via-blue-400/30 to-purple-400/30 blur-2xl rounded-full" />
                    </div>
                    <h1 className='relative text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/90 bg-clip-text text-transparent'>
                        {t("Heading")}
                    </h1>
                </div>
                
                {/* Tagline */}
                <div className="flex flex-col gap-2 text-lg md:text-xl lg:text-2xl font-medium text-muted-foreground max-w-2xl">
                    <p className="leading-relaxed">{t("Tagline.Line-1")}</p>
                    <p className="leading-relaxed">{t("Tagline.Line-2")}</p>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <button className="px-8 py-3 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition-all duration-200 transform hover:scale-105">
                        {t("Get-Started-Btn")}
                    </button>
                    <button className="px-8 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition-all duration-200">
                        {t("Learn-More-Btn")}
                    </button>
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