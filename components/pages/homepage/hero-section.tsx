// hero-section.tsx
"use client"
import ConnectPlusModal from '@/components/modals/connect+_modal';
import { Button } from '@/components/ui/button';
import { handleJoin, handleShareTestimony } from '@/lib/actions';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import Carousel from './carousel';


// Color mapping for gradient background
const gradientColors = [
    { light: "bg-green-800", dark: "dark:bg-green-300" },
    { light: "bg-teal-800", dark: "dark:bg-teal-300" },
    { light: "bg-orange-800", dark: "dark:bg-orange-300" },
    { light: "bg-cyan-800", dark: "dark:bg-cyan-300" },
    { light: "bg-rose-800", dark: "dark:bg-rose-300" }
] as const;



export default function HeroSection({ className }: { className?: string }) {
    const t = useTranslations('HomePage.Hero-Section');
    

    const handleShareTestimonyClick = () => {
        handleShareTestimony();
    };

    const handleJoinClick = () => {
        handleJoin();
    };



    return (
        <section className={cn(
            "relative flex flex-col items-center lg:justify-center justify-end min-h-[90vh] overflow-hidden",
            "bg-linear-to-br from-background via-background to-muted/20",
            className
        )}>
            <Carousel/>
       
            {/* Main Content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center pointer-events-none text-center mx-auto max-w-6xl p-16 ">
                <div className="flex flex-col items-center lg:justify-end h-full space-y-8">

                    {/* Heading with Gradient Effect */}
                    <div className="relative w-full flex items-center justify-center h-28 lg:h-42">
                        <div
                            className="flex w-[85%] items-center justify-center h-6 lg:h-16 lg:blur-[60px] blur-[30px] z-0"
                            aria-hidden="true"
                        >
                            {gradientColors.map((colorObj, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        colorObj.light,
                                        colorObj.dark,
                                        "w-16 lg:w-40 h-full"
                                    )}
                                />
                            ))}
                        </div>
                        <h1 className='absolute z-10 text-4xl lg:text-8xl font-bold w-max'>
                            {t("Heading")}
                        </h1>
                    </div>

                    {/* Tagline */}
                    <div className="flex flex-col text-center font-semibold text-xl lg:text-3xl text-muted-foreground space-y-2">
                        <p>{t("Tagline.Line-1")}</p>
                        <p>{t("Tagline.Line-2")}</p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8 pointer-events-auto">
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