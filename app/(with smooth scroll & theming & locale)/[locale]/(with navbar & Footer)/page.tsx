import HeroSection from "@/components/pages/homepage/hero-section";

export default async function HomePage() {
  
  return (
    <main className="w-full">
      <HeroSection/>
      <div className="flex items-center justify-center min-h-screen bg-muted">
        <h1>section 2</h1>
      </div>
    </main>
  );
}