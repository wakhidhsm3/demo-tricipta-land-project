import { Metadata } from 'next';
import { ArticleHeader } from '@/features/articles/ArticleHeader';
import { ArticleCatalog } from '@/features/articles/ArticleCatalog';
import { getArticles } from '@/lib/data/articles';

export const metadata: Metadata = {
  title: 'Articles & Insights — TRICIPTA LAND',
  description:
    'Wawasan perumahan, panduan KPR, legalitas tanah, dan berita perkembangan proyek TRICIPTA LAND.',
  openGraph: {
    title: 'Articles & Insights — TRICIPTA LAND',
    description: 'Panduan lengkap seputar dunia properti dan hunian keluarga.',
    images: ['/images/og-articles.jpg'],
  },
};

export default async function ArticlesListingPage() {
  const articles = await getArticles();

  return (
    <>
      <ArticleHeader />
      <ArticleCatalog initialArticles={articles} />
    </>
  );
}
