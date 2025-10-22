// components/pages/survivor-voices/success-stories.tsx
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { Award, Heart, Scale, Users } from "lucide-react";
import { SurvivorTestimony } from "@/types";
import { formatDateSafe } from "@/lib/formatDate";

// Mock data
const successStories: SurvivorTestimony[] = [
    {
        id: '5',
        title: "From Custody to Compensation: A Legal Victory",
        content: "",
        type: 'written',
        isAnonymous: false,
        theme: ['legal-victory', 'compensation'],
        compensationAmount: 4100000,
        healingJourney: "After years of legal battle, the NHRC recommended ₹4.1 million in compensation for custodial torture. This victory brought not just financial relief but also a sense of justice and closure.",
        createdAt: new Date('2024-02-15'),
        updatedAt: new Date('2024-02-15'),
        status: 'published',
        likes: 56,
        shares: 22
    }
];

export default function SuccessStories({ className }: { className?: string }) {
    const t = useTranslations('SurvivorVoicesPage.SuccessStories');

    const impactStats = [
        {
            icon: Scale,
            value: "₹95.5M",
            label: t('Stats.Compensation')
        },
        {
            icon: Users,
            value: "927+",
            label: t('Stats.Testimonies')
        },
        {
            icon: Award,
            value: "42",
            label: t('Stats.Counselled')
        },
        {
            icon: Heart,
            value: "200+",
            label: t('Stats.SurvivorsSupported')
        }
    ];

    return (
        <section className={cn("w-full py-20 px-6 md:px-16 bg-background", className)}>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center space-y-6 mb-16">
                    <h2 className="text-4xl font-bold text-foreground">
                        {t('Title')}
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        {t('Description')}
                    </p>
                </div>

                {/* Impact Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {impactStats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-muted/30 rounded-2xl p-6 text-center border border-border"
                        >
                            <div className="flex justify-center mb-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <stat.icon className="w-5 h-5 text-primary" />
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-foreground mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-muted-foreground font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Success Stories */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {successStories.map((story) => (
                        <div
                            key={story.id}
                            className="bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 rounded-2xl p-8 border border-green-200 dark:border-green-800"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <Award className="w-6 h-6 text-green-600" />
                                <h3 className="text-xl font-bold text-foreground">
                                    {story.title}
                                </h3>
                            </div>

                            {story.compensationAmount && (
                                <div className="mb-4 p-3 bg-green-100 dark:bg-green-800/30 rounded-lg">
                                    <div className="text-lg font-bold text-green-700 dark:text-green-300">
                                        {t('CompensationAwarded')}: ₹{(story.compensationAmount / 100000).toFixed(1)} Lakh
                                    </div>
                                </div>
                            )}

                            {story.healingJourney && (
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    {story.healingJourney}
                                </p>
                            )}

                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>{formatDateSafe(story.createdAt)}</span>
                                <div className="flex items-center gap-4">
                                    <span>{story.likes} {t('Likes')}</span>
                                    <span>{story.shares} {t('Shares')}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}