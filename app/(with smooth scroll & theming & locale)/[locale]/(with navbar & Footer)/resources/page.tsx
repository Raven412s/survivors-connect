// app/[locale]/(with navbar & Footer)/resources/page.tsx
import { Metadata } from 'next';
import ResourcesPage from '@/components/pages/resources';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('ResourcesPage');

  return {
    title: t('Meta.Title'),
    description: t('Meta.Description'),
    openGraph: {
      title: t('Meta.Title'),
      description: t('Meta.Description'),
      type: 'website',
    },
  };
}

export default function Resources() {
  return <ResourcesPage />;
}
