import { getTranslations } from 'next-intl/server';

export default async function HomePage() {
  const t = await getTranslations('HomePage');
  return (
    <main className="w-full">
      <div className="flex items-center justify-center min-h-screen bg-background">
        <h1>{t('title')}</h1>
      </div>
      <div className="flex items-center justify-center min-h-screen bg-muted">
        <h1>section 2</h1>
      </div>
    </main>
  );
}