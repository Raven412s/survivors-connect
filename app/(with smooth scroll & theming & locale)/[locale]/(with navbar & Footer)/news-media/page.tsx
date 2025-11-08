// app/(with smooth scroll & theming & locale)/[locale]/(with navbar & Footer)/news-media/page.tsx
import HighlightsRecognition from "@/components/pages/news-media/highlights-recognition";
import CaseStudiesAdvocacy from "@/components/pages/news-media/case-studies-advocacy";
import BlogDissemination from "@/components/pages/news-media/blog-dissemination";
import IntroductionSection from "@/components/pages/news-media/introduction-section";
import MediaPartners from "@/components/pages/news-media/media-partners";

export default async function NewsMediaPage() {
  return (
    <main className="w-full">
      <IntroductionSection />
      <HighlightsRecognition />
      <CaseStudiesAdvocacy />
      <BlogDissemination />
      <MediaPartners />
    </main>
  );
}