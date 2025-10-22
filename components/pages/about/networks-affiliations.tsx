// components/pages/about/networks-affiliations.tsx
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { Globe, Users, Shield, Heart, Award, Link } from "lucide-react";

export default function NetworksAffiliations({ className }: { className?: string }) {
  const t = useTranslations('AboutPage.NetworksAffiliations');

  const keyPartnerships = [
    {
      category: t('Partnerships.International.Title'),
      organizations: [
        "International Rehabilitation Council for Torture Victims (IRCT)",
        "May 18 Foundation (Gwangju, South Korea)",
        "Human Rights Watch",
        "Amnesty International"
      ]
    },
    {
      category: t('Partnerships.National.Title'),
      organizations: [
        "National Alliance on Testimonial Therapy (NATT)",
        "South Asian Network against Torture and Impunity (SANATI)",
        "National Action and Coordination Group for Ending Violence Against Children",
        "FICCI Startup Committee"
      ]
    },
    {
      category: t('Partnerships.Regional.Title'),
      organizations: [
        "Migrant Forum in Asia",
        "Various grassroots level NGOs",
        "Student unions",
        "Trade unions"
      ]
    }
  ];

  const networkStats = [
    { icon: Globe, value: "15+", label: t('Stats.International-Partners') },
    { icon: Users, value: "50+", label: t('Stats.Grassroots-NGOs') },
    { icon: Shield, value: "10+", label: t('Stats.Years-Collaboration') },
    { icon: Heart, value: "1000+", label: t('Stats.Joint-Initiatives') }
  ];

  return (
    <section className={cn("w-full py-20 px-6 md:px-16 bg-linear-to-br from-muted/50 to-background", className)}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <Globe className="w-4 h-4" />
            {t('Badge')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            {t('Title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('Description')}
          </p>
        </div>

        {/* Network Statistics */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {networkStats.map((stat, index) => (
              <div
                key={index}
                className="bg-background rounded-2xl p-6 text-center border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <stat.icon className="w-6 h-6 text-primary" />
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
        </div>

        {/* Key Partnerships */}
        <div className="space-y-8">
          <h3 className="text-3xl font-bold text-foreground text-center mb-8">
            {t('Partnerships-Title')}
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {keyPartnerships.map((category, index) => (
              <div
                key={index}
                className="bg-background rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Award className="w-5 h-5 text-primary" />
                  <h4 className="text-xl font-semibold text-foreground">
                    {category.category}
                  </h4>
                </div>
                
                <div className="space-y-3">
                  {category.organizations.map((org, orgIndex) => (
                    <div
                      key={orgIndex}
                      className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border/50"
                    >
                      <Link className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground font-medium">
                        {org}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collaboration Impact */}
        <div className="mt-16 bg-linear-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {t('Collaboration-Impact.Title')}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {t('Collaboration-Impact.Description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}