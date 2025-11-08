// components/pages/news-media/blog-dissemination.tsx
import { cn } from "@/lib/utils";
import { Calendar, ExternalLink, Eye, FileText } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function BlogDissemination({ className }: { className?: string }) {
  const t = useTranslations('NewsMedia.Blog-Dissemination');
  
  return (
    <section
      className={cn(
        "w-full py-20 px-6 md:px-8 lg:px-16 bg-linear-to-b from-muted/10 to-background",
        className
      )}
      id="blog-dissemination"
    >
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
            <FileText className="w-4 h-4" />
            {t('Badge')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t('Title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('Description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Blog Statistics */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Eye className="w-6 h-6 text-blue-600" />
              {t('Blog-Stats.Title')}
            </h3>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="text-2xl font-bold text-blue-600 mb-1">12+</div>
                <div className="text-sm text-muted-foreground">{t('Blog-Stats.Posts-Published')}</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="text-2xl font-bold text-green-600 mb-1">1200+</div>
                <div className="text-sm text-muted-foreground">{t('Blog-Stats.Total-Views')}</div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground text-sm">{t('Blog-Stats.Coverage-Title')}</h4>
              <div className="flex flex-wrap gap-2">
                {['Police Torture', 'Caste Violence', 'Bonded Labour', 'Testimonial Healing', 'Community Empowerment'].map((topic, index) => (
                  <span key={index} className="px-3 py-1 bg-muted text-foreground rounded-full text-xs">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Blog Posts */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <FileText className="w-6 h-6 text-purple-600" />
              {t('Featured-Posts.Title')}
            </h3>

            <div className="space-y-4">
              {[
                {
                  title: t('Featured-Posts.Post-1.Title'),
                  date: t('Featured-Posts.Post-1.Date'),
                  description: t('Featured-Posts.Post-1.Description')
                },
                {
                  title: t('Featured-Posts.Post-2.Title'),
                  date: t('Featured-Posts.Post-2.Date'),
                  description: t('Featured-Posts.Post-2.Description')
                },
                {
                  title: t('Featured-Posts.Post-3.Title'),
                  description: t('Featured-Posts.Post-3.Description')
                }
              ].map((post, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-2">{post.title}</h4>
                      {post.date && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </div>
                      )}
                      <p className="text-sm text-muted-foreground">{post.description}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Source Links */}
        <div className="bg-linear-to-r from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
          <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <ExternalLink className="w-6 h-6 text-primary" />
            {t('Source-Links.Title')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: t('Source-Links.JMN-Website'), url: '#' },
              { name: t('Source-Links.PVCHR-Blog'), url: '#' },
              { name: t('Source-Links.Testimonial-Blog'), url: '#' },
              { name: t('Source-Links.YouTube'), url: '#' },
              { name: t('Source-Links.Project-Website'), url: '#' }
            ].map((link, index) => (
              <a key={index} href={link.url} className="flex items-center gap-3 p-3 hover:bg-white/50 dark:hover:bg-white/10 rounded-lg transition-colors group">
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                <span className="text-foreground group-hover:text-primary font-medium">{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}