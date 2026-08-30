import React, { Suspense } from 'react';
import { Metadata } from 'next';
import {
  ArticleHeader,
  ArticleCatalog,
  getArticleSummaries,
  parseArticleFilterParams,
} from '@/features/articles';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Articles & Insights',
  description:
    'Wawasan perumahan, panduan KPR, legalitas tanah, dan berita perkembangan proyek perumahan terpercaya.',
  ogImages: ['/images/og-articles.jpg'],
  ogDescription: 'Panduan lengkap seputar dunia properti dan hunian keluarga.',
});

interface ArticlesPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ArticlesListingPage({ searchParams }: ArticlesPageProps) {
  const rawParams = searchParams ? await searchParams : {};
  const parsedFilters = parseArticleFilterParams(rawParams);
  const articles = await getArticleSummaries();

  return (
    <>
      <ArticleHeader />
      <Suspense fallback={<div className="w-full py-16 text-center text-slate-400 text-sm">Memuat katalog artikel...</div>}>
        <ArticleCatalog
          initialArticles={articles}
          initialFilters={{
            category: parsedFilters.category,
            query: parsedFilters.query,
          }}
        />
      </Suspense>
    </>
  );
}
