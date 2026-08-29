'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Search, BookOpen, RotateCcw, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ArticleCard } from './ArticleCard';
import { Article } from '@/lib/types/article';
import { AnimateIn } from '@/components/shared/AnimateIn';

const ITEMS_PER_PAGE = 6;

export interface ArticleCatalogProps {
  initialArticles: Article[];
}

export function ArticleCatalog({ initialArticles }: ArticleCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page to 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const filteredArticles = useMemo(() => {
    return initialArticles.filter((article) => {
      const matchCategory = selectedCategory === 'ALL' || article.category === selectedCategory;
      const matchQuery =
        !searchQuery ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchQuery;
    });
  }, [initialArticles, selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);

  const paginatedArticles = useMemo(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const isFiltered = selectedCategory !== 'ALL' || searchQuery.trim() !== '';

  const handleReset = () => {
    setSelectedCategory('ALL');
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="w-full">
      {/* 1. Filter Bar with Sticky Positioning & Dashed Borders */}
      <div className="sticky top-16 z-40 w-full border-y border-dashed border-slate-200 bg-white/95 backdrop-blur-md shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-5 min-[1280px]:border-x min-[1280px]:border-dashed min-[1280px]:border-slate-200">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:flex-1 sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
              <Input
                type="text"
                placeholder="Cari topik artikel, tips KPR, atau legalitas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 h-11 bg-slate-50/70 border-slate-200 rounded-xl focus-visible:bg-white transition-all text-sm"
              />
            </div>

            {/* Category Select using Shadcn UI */}
            <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <div className="w-full sm:w-64">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full h-11 bg-slate-50/70 border-slate-200 rounded-xl hover:border-slate-300">
                    <SelectValue placeholder="Pilih Kategori Artikel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Semua Kategori Artikel</SelectItem>
                    <SelectItem value="TIPS_HUNIAN">Tips Hunian & Legalitas</SelectItem>
                    <SelectItem value="INVESTASI">Investasi & Skema KPR</SelectItem>
                    <SelectItem value="PROGRES_PROYEK">Progres Kawasan Proyek</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {isFiltered && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="h-11 px-3.5 sm:px-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <RotateCcw className="size-3.5 text-slate-500" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Article Grid Section with 7xl Dashed Alignment */}
      <div className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 min-[1280px]:border-x min-[1280px]:border-dashed min-[1280px]:border-slate-200">
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

              {/* Pagination Controls matching Shadcn UI */}
              {totalPages > 1 && (
                <div className="pt-8 border-t border-dashed border-slate-200">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            isActive={currentPage === pageNum}
                            onClick={() => handlePageChange(pageNum)}
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-50 p-12 text-center rounded-2xl border border-dashed border-slate-200 flex flex-col items-center gap-3 my-4">
              <div className="size-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <Filter className="size-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Artikel Tidak Ditemukan
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md">
                Tidak ada artikel atau berita yang sesuai dengan kata kunci atau kategori yang dipilih.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              >
                Tampilkan Semua Artikel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
