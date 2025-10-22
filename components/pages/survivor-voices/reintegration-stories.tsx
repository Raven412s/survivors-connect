// components/pages/survivor-voices/reintegration-stories.tsx
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { Users, Home, Heart, Shield } from "lucide-react";
import { SurvivorTestimony } from "@/types";
import { formatDateSafe } from "@/lib/formatDate";

// Mock data
const reintegrationStories: SurvivorTestimony[] = [
    {
        id: '4',
        title: "Returning Home After Justice",
        content: "The journey back to my community was challenging but the support I received made all the difference...",
        type: 'written',
        isAnonymous: true,
        theme: ['reintegration', 'community-support'],
        reintegrationStory: "After receiving compensation and legal justice, I faced the challenge of reintegrating into my community. Through peer support and family counseling, I rebuilt relationships and found new purpose.",
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20'),
        status: 'published',
        likes: 18,
        shares: 6
    }
];

export default function ReintegrationStories({ className }: { className?: string }) {
    const t = useTranslations('SurvivorVoicesPage.Reintegration');

    const challenges = [
        {
            icon: Users,
            title: t('Challenges.Community.Title'),
            description: t('Challenges.Community.Description')
        },
        {
            icon: Home,
            title: t('Challenges.Family.Title'),
            description: t('Challenges.Family.Description')
        },
        {
            icon: Heart,
            title: t('Challenges.Emotional.Title'),
            description: t('Challenges.Emotional.Description')
        },
        {
            icon: Shield,
            title: t('Challenges.Support.Title'),
            description: t('Challenges.Support.Description')
        }
    ];

    return (
        <section className={cn("w-full py-20 px-6 md:px-16 bg-muted/30", className)}>
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Challenges Grid */}
                    <div>
                        <h3 className="text-2xl font-bold text-foreground mb-8">
                            {t('ChallengesTitle')}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {challenges.map((challenge, index) => (
                                <div
                                    key={index}
                                    className="bg-background rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="p-2 bg-primary/10 rounded-lg w-fit mb-4">
                                        <challenge.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <h4 className="text-lg font-semibold text-foreground mb-2">
                                        {challenge.title}
                                    </h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {challenge.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stories */}
                    <div>
                        <h3 className="text-2xl font-bold text-foreground mb-8">
                            {t('StoriesTitle')}
                        </h3>
                        <div className="space-y-6">
                            {reintegrationStories.map((story) => (
                                <div
                                    key={story.id}
                                    className="bg-background rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300"
                                >
                                    <h4 className="text-lg font-semibold text-foreground mb-3">
                                        {story.title}
                                    </h4>
                                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                                        {story.reintegrationStory}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <span>
                                            {formatDateSafe(story.createdAt)}
                                        </span>
                                        {story.isAnonymous && (
                                            <span className="bg-muted px-2 py-1 rounded-full">
                                                {t('Anonymous')}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}