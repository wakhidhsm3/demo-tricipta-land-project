'use client';

import React, { useCallback, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Search, RotateCcw, BookOpen, Layers } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArticleCard } from './article-card';
import { ArticleSummary, ARTICLE_CATEGORY_OPTIONS } from '../types/article.type';
import { AnimateIn, EmptyState, CatalogPagination, SectionContainer } from '@/components/shared';
import { useCatalogFilter } from '@/hooks';

export interface ArticleCatalogProps {
  initialArticles: ArticleSummary[];
  initialFilters?: {
    category?: string;
    query?: string;
  };
}

export function ArticleCatalog({
  initialArticles,
  initialFilters = { category: 'ALL', query: '' },
}: ArticleCatalogProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchFilter = useCallback((article: ArticleSummary, debouncedQuery: string) => {
    if (!debouncedQuery.trim()) return true;
    const q = debouncedQuery.toLowerCase();
    return (
      article.title.toLowerCase().includes(q) ||
      article.excerpt.toLowerCase().includes(q) ||
      article.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, []);

  const categoryFilter = useCallback((article: ArticleSummary, category: string) => {
    return category === 'ALL' || article.category === category;
  }, []);

  const {
    searchQuery,
    selectedCategory,
    currentPage,
    debouncedQuery,
    filteredItems: filteredArticles,
    paginatedItems: paginatedArticles,
    totalPages,
    isFiltered,
    handleSearchChange,
    handleCategoryChange,
    handlePageChange,
    handleReset,
  } = useCatalogFilter<ArticleSummary>({
    items: initialArticles,
    initialSearchQuery: initialFilters.query || '',
    initialCategory: initialFilters.category || 'ALL',
    searchFilter,
    categoryFilter,
  });

  const category = selectedCategory;

  // Sync filter state to URL search parameters without triggering server RSC re-evaluation
  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== 'ALL') params.set('category', category);
    if (debouncedQuery.trim()) params.set('q', debouncedQuery.trim());

    const newQueryString = params.toString();
    const currentQueryString = searchParams.toString();

    if (newQueryString !== currentQueryString) {
      const targetUrl = newQueryString ? `${pathname}?${newQueryString}` : pathname;
      window.history.replaceState(null, '', targetUrl);
    }
  }, [category, debouncedQuery, pathname, searchParams]);

  return (
    <div className="w-full">
      {/* 1. Filter Bar with Sticky Positioning & Dashed Borders */}
      <div className="sticky top-16 z-40 w-full border-y border-dashed border-slate-200 bg-white/95 backdrop-blur-md shadow-2xs">
        <SectionContainer className="py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:flex-1 sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
              <Input
                type="text"
                placeholder="Cari topik artikel, tips KPR, atau legalitas..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 h-11 bg-slate-50/70 hover:bg-white focus-visible:bg-white border-slate-200 rounded-xl transition-all text-sm"
              />
            </div>

            {/* Category Select using Shadcn UI */}
            <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <div className="w-full sm:w-64">
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger
                    icon={<Layers className="size-3.5 text-slate-400" />}
                    className="w-full h-11 bg-slate-50/70 hover:bg-white focus:bg-white border-slate-200 rounded-xl"
                  >
                    <SelectValue placeholder="Pilih Kategori Artikel" />
                  </SelectTrigger>
                  <SelectContent>
                    {ARTICLE_CATEGORY_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {isFiltered && (
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={handleReset}
                  className="bg-slate-50 shrink-0 text-xs font-semibold gap-1.5"
                >
                  <RotateCcw className="size-3.5 text-slate-500" />
                  <span>Reset</span>
                </Button>
              )}
            </div>
          </div>
        </SectionContainer>
      </div>

      {/* 2. Article Grid Section with 7xl Dashed Alignment */}
      <div className="w-full bg-white">
        <SectionContainer className="py-10 sm:py-14">
          {/* Results Header */}
          <div className="mb-8 flex items-center justify-between border-b border-dashed border-slate-200 pb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="size-4.5 text-emerald-700" />
              <span className="text-sm font-semibold text-slate-700">
                Menampilkan{' '}
                <strong className="text-slate-900 font-extrabold">{filteredArticles.length}</strong>{' '}
                Artikel & Panduan Terverifikasi
              </span>
            </div>

            {isFiltered && (
              <span className="text-xs text-emerald-800 font-medium bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                Filter Aktif
              </span>
            )}
          </div>

          {/* Article Grid (6 per page) */}
          {paginatedArticles.length > 0 ? (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedArticles.map((article, idx) => (
                  <AnimateIn
                    key={article.id}
                    variant="fade-up"
                    delayMs={idx * 90}
                    durationMs={500}
                  >
                    <ArticleCard article={article} />
                  </AnimateIn>
                ))}
              </div>

              {/* Reusable Catalog Pagination */}
              <CatalogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          ) : (
            <EmptyState
              title="Artikel Tidak Ditemukan"
              description="Tidak ada artikel atau berita yang sesuai dengan kata kunci atau kategori yang dipilih."
              resetText="Tampilkan Semua Artikel"
              onReset={handleReset}
            />
          )}
        </SectionContainer>
      </div>
    </div>
  );
}
