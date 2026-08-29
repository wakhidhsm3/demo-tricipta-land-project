'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Search, Filter, RotateCcw, Building2 } from 'lucide-react';
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
import { ProjectCard } from './ProjectCard';
import { Project } from '@/lib/types/project';
import { AnimateIn } from '@/components/shared/AnimateIn';

const ITEMS_PER_PAGE = 6;

export interface InteractiveProjectCatalogProps {
  initialProjects: Project[];
  initialFilters: {
    category: string;
    status: string;
    location: string;
    query: string;
  };
}

export function InteractiveProjectCatalog({
  initialProjects,
  initialFilters,
}: InteractiveProjectCatalogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState(initialFilters.category);
  const [status, setStatus] = useState(initialFilters.status);
  const [query, setQuery] = useState(initialFilters.query);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page to 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [category, status, query]);

  const updateFilters = (newCategory: string, newStatus: string, newQuery: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newCategory !== 'ALL') params.set('category', newCategory);
    else params.delete('category');

    if (newStatus !== 'ALL') params.set('status', newStatus);
    else params.delete('status');

    if (newQuery) params.set('q', newQuery);
    else params.delete('q');

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleReset = () => {
    setCategory('ALL');
    setStatus('ALL');
    setQuery('');
    setCurrentPage(1);
    router.push(pathname, { scroll: false });
  };

  const isFiltered = category !== 'ALL' || status !== 'ALL' || query.trim() !== '';

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((p) => {
      const matchCategory = category === 'ALL' || p.category === category;
      const matchStatus = status === 'ALL' || p.status === status;
      const matchQuery =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.location.city.toLowerCase().includes(query.toLowerCase()) ||
        p.location.district.toLowerCase().includes(query.toLowerCase());
      return matchCategory && matchStatus && matchQuery;
    });
  }, [initialProjects, category, status, query]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  const paginatedProjects = useMemo(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* 1. Filter Controls Bar with Sticky Positioning & Dashed Border */}
      <div className="sticky top-16 z-40 w-full border-y border-dashed border-slate-200 bg-white/95 backdrop-blur-md shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-5 min-[1280px]:border-x min-[1280px]:border-dashed min-[1280px]:border-slate-200">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
              <Input
                type="text"
                placeholder="Cari nama perumahan, kota, atau kecamatan..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  updateFilters(category, status, e.target.value);
                }}
                className="pl-10 h-11 bg-slate-50/70 border-slate-200 rounded-xl focus-visible:bg-white transition-all text-sm"
              />
            </div>

            {/* Select Dropdowns via Shadcn UI */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Category Select */}
              <div className="w-full sm:w-52">
                <Select
                  value={category}
                  onValueChange={(val) => {
                    setCategory(val);
                    updateFilters(val, status, query);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Semua Kategori</SelectItem>
                    <SelectItem value="KOMERSIL">Komersil Modern</SelectItem>
                    <SelectItem value="SUBSIDI">Subsidi FLPP</SelectItem>
                    <SelectItem value="CLUSTERNATURAL">Klaster Natural</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status Select */}
              <div className="w-full sm:w-48">
                <Select
                  value={status}
                  onValueChange={(val) => {
                    setStatus(val);
                    updateFilters(category, val, query);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Semua Status</SelectItem>
                    <SelectItem value="DIJUAL">Dijual (Tersedia)</SelectItem>
                    <SelectItem value="SEGERA_HADIR">Segera Hadir</SelectItem>
                    <SelectItem value="HABIS_TERJUAL">Habis Terjual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Reset Filter Button */}
              {isFiltered && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <RotateCcw className="size-3.5 text-slate-500" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Project Grid Section with 7xl Dashed Alignment */}
      <div className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 min-[1280px]:border-x min-[1280px]:border-dashed min-[1280px]:border-slate-200">
          {/* Results Counter Header */}
          <div className="mb-8 flex items-center justify-between border-b border-dashed border-slate-200 pb-4">
            <div className="flex items-center gap-2">
              <Building2 className="size-4.5 text-emerald-700" />
              <span className="text-sm font-semibold text-slate-700">
                Menampilkan{' '}
                <strong className="text-slate-900 font-extrabold">{filteredProjects.length}</strong>{' '}
                Kawasan Perumahan Terverifikasi
              </span>
            </div>

            {isFiltered && (
              <span className="text-xs text-emerald-800 font-medium bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                Filter Aktif
              </span>
            )}
          </div>

          {/* Project Cards Grid (6 per page) */}
          {paginatedProjects.length > 0 ? (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedProjects.map((project, idx) => (
                  <AnimateIn
                    key={project.id}
                    variant="fade-up"
                    delayMs={idx * 90}
                    durationMs={500}
                  >
                    <ProjectCard project={project} />
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
                Kawasan Proyek Tidak Ditemukan
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md">
                Tidak ada unit perumahan yang sesuai dengan filter saat ini. Silakan coba sesuaikan kata kunci pencarian atau reset filter.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              >
                Tampilkan Semua Proyek
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
