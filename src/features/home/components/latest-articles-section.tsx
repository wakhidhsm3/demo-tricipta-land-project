import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Article, ArticleSummary, ArticleCard } from '@/features/articles';
import { AnimateIn, SectionHeader, SectionContainer } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/config/site.config';

export interface LatestArticlesSectionProps {
  articles: (Article | ArticleSummary)[];
}

export function LatestArticlesSection({ articles }: LatestArticlesSectionProps) {
  return (
    <section id="artikel-terbaru" className="w-full bg-white border-b border-dashed border-slate-200">
      <SectionContainer noPadding>
        {/* Section Header */}
        <SectionHeader
          badgeText="Edukasi Properti & Berita"
          title={
            <>
              Wawasan Hunian & <span className="relative inline-block text-emerald-800">Legalitas Tanah</span>
            </>
          }
          description={`Dapatkan panduan seputar KPR, tips membeli rumah pertama, serta berita perkembangan kawasan perumahan ${siteConfig.name}.`}
        />

        {/* Articles Grid */}
        <div className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-slate-50/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article, idx) => (
              <AnimateIn
                key={article.id}
                variant="fade-up"
                delayMs={idx * 120}
                durationMs={550}
              >
                <ArticleCard article={article} />
              </AnimateIn>
            ))}
          </div>
        </div>

        {/* Bottom Action Button Bar */}
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 border-t border-dashed border-slate-200 bg-slate-50/40 flex justify-center">
          <Link href="/articles">
            <Button
              variant="default"
              size="lg"
              className="bg-slate-900 hover:bg-black text-white"
            >
              <span>Lihat Semua Artikel</span>
              <ArrowUpRight className="size-4.5 text-slate-300" />
            </Button>
          </Link>
        </div>
      </SectionContainer>
    </section>
  );
}
