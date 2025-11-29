// hero-section.tsx
"use client"
import ConnectPlusModal from '@/components/modals/connect+_modal';
import { Button } from '@/components/ui/button';
import { handleJoin, handleShareTestimony } from '@/lib/actions';
import { cn } from '@/lib/utils';
import { Quote } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState, useEffect } from 'react'

// Testimonial data structure for better maintainability
const TESTIMONIALS = [
    {
        id: 1,
        content: "Healing is not linear, but every step matters.",
        rating: 4,
        author: "Anonymous",
        stars: 5
    },
    {
        id: 2,
        content: "This journey taught me a strength I never knew I had. I am reclaiming my life, one day at a time.",
        rating: 4,
        author: "Maria J.",
        stars: 5
    },
    {
        id: 3,
        content: "Your story matters. Your voice matters. You matter.",
        rating: 5,
        author: "Survivor",
        stars: 5
    }
];

// Color mapping for testimonial cards
const colorMap = {
    green: "text-green-500",
    amber: "text-amber-500",
    purple: "text-purple-500"
} as const;

// Color mapping for gradient background
const gradientColors = [
    { light: "bg-green-800", dark: "dark:bg-green-300" },
    { light: "bg-teal-800", dark: "dark:bg-teal-300" },
    { light: "bg-orange-800", dark: "dark:bg-orange-300" },
    { light: "bg-cyan-800", dark: "dark:bg-cyan-300" },
    { light: "bg-rose-800", dark: "dark:bg-rose-300" }
] as const;

const TestimonialCard = ({
    content,
    color,
    rating,
    author,
    className,
    stars = 5,
    isCenter = false
}: {
    content: string;
    rating: number;
    author: string;
    className?: string;
    stars?: number;
    color?: keyof typeof colorMap;
    isCenter?: boolean;
}) => (
    <div
        className={cn(
            "relative w-80 lg:w-[420px] p-8 rounded-2xl bg-[#e5e5e5] dark:bg-muted/40 shadow-md border border-border transition-all duration-500",
            "flex flex-col items-center text-center",
            isCenter 
                ? "opacity-100 scale-105 z-10" 
                : "opacity-40 hover:opacity-100",
            className
        )}
    >
        {/* Left quotation icon */}
        <div className={cn(
            "absolute top-4 left-4 opacity-70 text-6xl leading-none",
            color && colorMap[color]
        )}>
            <Quote className='rotate-180 fill-current' />
        </div>

        {/* Testimonial Text */}
        <p className="text-lg lg:text-xl font-medium leading-relaxed max-w-[90%]">
            {content}
        </p>

        {/* Stars */}
        <div className="flex justify-center mt-4 text-amber-300 text-2xl">
            {"★".repeat(rating)}
            <span className="text-gray-300">
                {"★".repeat(stars - rating)}
            </span>
        </div>

        {/* Author */}
        <p className="mt-4 text-lg font-semibold text-black dark:text-white">
            - {author}
        </p>
    </div>
);

export default function HeroSection({ className }: { className?: string }) {
    const t = useTranslations('HomePage.Hero-Section');
    const [currentPositions, setCurrentPositions] = useState([0, 1, 2]); // [left, center, right]

    const handleShareTestimonyClick = () => {
        handleShareTestimony();
    };

    const handleJoinClick = () => {
        handleJoin();
    };

    // Rotate testimonial positions every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPositions(prev => {
                // Rotate positions: left -> center, center -> right, right -> left
                return [prev[2], prev[0], prev[1]];
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const getPositionClass = (positionIndex: number) => {
        const positions = [
            "absolute left-10 top-1/2 -translate-y-1/2 hidden lg:block", // Left
            "absolute bottom-[8%] left-1/2 -translate-x-1/2", // Center
            "absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block" // Right
        ];
        return positions[positionIndex];
    };

    // Find which testimonial is currently in center position
    const getCenterTestimonialIndex = () => {
        const centerPositionIndex = 1; // currentPositions array में center position का index
        return currentPositions[centerPositionIndex];
    };

    return (
        <section className={cn(
            "relative flex flex-col items-center justify-center min-h-[90vh] overflow-hidden",
            "bg-linear-to-br from-background via-background to-muted/20",
            className
        )}>

            {/* Testimonial Cards */}
            <div className="absolute inset-0 flex items-start justify-center">
                {/* LEFT CARD */}
                <div className={getPositionClass(0)}>
                    <TestimonialCard 
                        {...TESTIMONIALS[currentPositions[0]]} 
                        isCenter={currentPositions[0] === getCenterTestimonialIndex()}
                        color='green'
                    />
                </div>

                {/* CENTER CARD */}
                <div className={getPositionClass(1)}>
                    <TestimonialCard 
                        {...TESTIMONIALS[currentPositions[1]]} 
                        isCenter={currentPositions[1] === getCenterTestimonialIndex()}
                        color='amber'
                    />
                </div>

                {/* RIGHT CARD */}
                <div className={getPositionClass(2)}>
                    <TestimonialCard 
                        {...TESTIMONIALS[currentPositions[2]]} 
                        isCenter={currentPositions[2] === getCenterTestimonialIndex()}
                        color='purple'
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center text-center mx-auto max-w-6xl p-16 ">
                <div className="flex flex-col items-center justify-start space-y-8">

                    {/* Heading with Gradient Effect */}
                    <div className="relative w-full flex items-center justify-center h-28 lg:h-36">
                        <div
                            className="flex w-[75%] items-center justify-center h-6 lg:h-8 blur-[30px] z-0"
                            aria-hidden="true"
                        >
                            {gradientColors.map((colorObj, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        colorObj.light,
                                        colorObj.dark,
                                        "w-16 lg:w-20 h-full"
                                    )}
                                />
                            ))}
                        </div>
                        <h1 className='absolute z-10 text-4xl lg:text-7xl font-bold w-max'>
                            {t("Heading")}
                        </h1>
                    </div>

                    {/* Tagline */}
                    <div className="flex flex-col text-center font-semibold text-xl lg:text-2xl text-muted-foreground space-y-2">
                        <p>{t("Tagline.Line-1")}</p>
                        <p>{t("Tagline.Line-2")}</p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <ConnectPlusModal>
                            <Button
                                variant="default"
                                className="px-8 py-3 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition-all duration-200 transform hover:scale-105 min-w-40"
                                size="lg"
                            >
                                {t("Get-Help-Btn")}
                            </Button>
                        </ConnectPlusModal>
                        <Button
                            onClick={handleShareTestimonyClick}
                            variant="outline"
                            className="px-8 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition-all duration-200 min-w-40"
                            size="lg"
                        >
                            {t("Share-Testimony-Btn")}
                        </Button>
                        <Button
                            onClick={handleJoinClick}
                            variant="outline"
                            className="px-8 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition-all duration-200 min-w-40"
                            size="lg"
                        >
                            {t("Join-Community-Btn")}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10">
                <div
                    className="w-6 h-10 border-2 border-border rounded-full flex justify-center"
                    aria-label="Scroll to continue"
                >
                    <div className="w-1 h-3 bg-border rounded-full mt-2 animate-bounce" />
                </div>
            </div>
        </section>
    )
}