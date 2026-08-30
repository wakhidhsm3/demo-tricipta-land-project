'use client';

import React, { useCallback, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Search, RotateCcw, MapPin, Building2, Layers, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Combobox, ComboboxOption } from '@/components/ui/combobox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProjectCard } from './project-card';
import {
  ProjectSummary,
  PROJECT_CATEGORY_OPTIONS,
  PROJECT_STATUS_OPTIONS,
} from '../types/project.type';
import { AnimateIn, EmptyState, CatalogPagination, SectionContainer } from '@/components/shared';
import { useCatalogFilter } from '@/hooks';
import { PROVINCES_DATA } from '@/lib/data/provinces.data';

const PROVINCE_OPTIONS: readonly ComboboxOption[] = [
  { value: 'ALL', label: 'Semua Wilayah' },
  ...PROVINCES_DATA.map((p) => ({
    value: p.name,
    label: p.name,
  })),
];

export interface InteractiveProjectCatalogProps {
  initialProjects: ProjectSummary[];
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
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchFilter = useCallback((project: ProjectSummary, debouncedQuery: string) => {
    if (!debouncedQuery.trim()) return true;
    const q = debouncedQuery.toLowerCase();
    return (
      project.name.toLowerCase().includes(q) ||
      project.location.fullAddress.toLowerCase().includes(q) ||
      project.location.city.toLowerCase().includes(q)
    );
  }, []);

  const categoryFilter = useCallback((project: ProjectSummary, cat: string) => {
    return cat === 'ALL' || project.category === cat;
  }, []);

  const extraFilter = useCallback(
    (project: ProjectSummary, extras: { status: string; location: string }) => {
      const matchStatus =
        !extras.status || extras.status === 'ALL' || project.status === extras.status;
      const matchLocation =
        !extras.location ||
        extras.location === 'ALL' ||
        project.location.province === extras.location ||
        project.location.city.toLowerCase().includes(extras.location.toLowerCase()) ||
        project.location.fullAddress.toLowerCase().includes(extras.location.toLowerCase());
      return matchStatus && matchLocation;
    },
    []
  );

  const {
    searchQuery,
    selectedCategory,
    extraFilters,
    setExtraFilterValue,
    currentPage,
    debouncedQuery,
    filteredItems: filteredProjects,
    paginatedItems: paginatedProjects,
    totalPages,
    isFiltered,
    handleSearchChange,
    handleCategoryChange,
    handlePageChange,
    handleReset,
  } = useCatalogFilter<ProjectSummary, { status: string; location: string }>({
    items: initialProjects,
    initialSearchQuery: initialFilters.query,
    initialCategory: initialFilters.category,
    initialExtraFilters: {
      status: initialFilters.status,
      location: initialFilters.location,
    },
    searchFilter,
    categoryFilter,
    extraFilter,
  });

  const category = selectedCategory;
  const status = extraFilters.status;
  const location = extraFilters.location;

  // Sync filter state to URL search parameters without triggering server RSC re-evaluation
  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== 'ALL') params.set('category', category);
    if (status !== 'ALL') params.set('status', status);
    if (location !== 'ALL') params.set('location', location);
    if (debouncedQuery.trim()) params.set('q', debouncedQuery.trim());

    const newQueryString = params.toString();
    const currentQueryString = searchParams.toString();

    if (newQueryString !== currentQueryString) {
      const targetUrl = newQueryString ? `${pathname}?${newQueryString}` : pathname;
      window.history.replaceState(null, '', targetUrl);
    }
  }, [category, status, location, debouncedQuery, pathname, searchParams]);

  return (
    <div className="w-full">
      {/* 1. Filter Controls Bar with Sticky Positioning & Dashed Border */}
      <div className="sticky top-16 z-40 w-full border-y border-dashed border-slate-200 bg-white/95 backdrop-blur-md shadow-2xs">
        <SectionContainer className="py-4 sm:py-5">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="relative w-full lg:flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
              <Input
                type="text"
                placeholder="Cari nama perumahan, kota, atau kecamatan..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 h-11 bg-slate-50/70 hover:bg-white focus-visible:bg-white border-slate-200 rounded-xl transition-all text-sm"
              />
            </div>

            {/* Select Dropdowns & Combobox via Shadcn UI */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0">
              {/* Category Select */}
              <div className="w-full sm:w-44">
                <Select value={category} onValueChange={handleCategoryChange}>
                  <SelectTrigger
                    icon={<Layers className="size-3.5 text-slate-400" />}
                    className="w-full h-11 bg-slate-50/70 hover:bg-white focus:bg-white border-slate-200 rounded-xl"
                  >
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECT_CATEGORY_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status Select */}
              <div className="w-full sm:w-36 lg:w-40">
                <Select
                  value={status}
                  onValueChange={(val) => setExtraFilterValue('status', val)}
                >
                  <SelectTrigger
                    icon={<Tag className="size-3.5 text-slate-400" />}
                    className="w-full h-11 bg-slate-50/70 hover:bg-white focus:bg-white border-slate-200 rounded-xl"
                  >
                    <SelectValue placeholder="Pilih Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECT_STATUS_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Wilayah / Provinsi Combobox with Search Input Field */}
              <div className="w-full sm:w-48 lg:w-52">
                <Combobox
                  options={PROVINCE_OPTIONS}
                  value={location}
                  onValueChange={(val) => setExtraFilterValue('location', val)}
                  placeholder="Pilih Wilayah"
                  searchPlaceholder="Cari nama provinsi..."
                  emptyMessage="Wilayah tidak ditemukan."
                  icon={<MapPin className="size-3.5 text-slate-400" />}
                  className="w-full"
                />
              </div>

              {/* Reset Filter Button */}
              {isFiltered && (
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={handleReset}
                  className="w-full sm:w-auto h-11 bg-slate-50 hover:bg-white border-slate-200 rounded-xl shrink-0 text-xs font-semibold gap-1.5 px-3.5"
                >
                  <RotateCcw className="size-3.5 text-slate-500" />
                  <span>Reset</span>
                </Button>
              )}
            </div>
          </div>
        </SectionContainer>
      </div>

      {/* 2. Results Header and Grid */}
      <SectionContainer className="py-10 sm:py-14">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs sm:text-sm font-medium text-slate-500">
            Menampilkan <strong className="font-semibold text-slate-900">{filteredProjects.length}</strong> kawasan perumahan
            {category !== 'ALL' && ` pada kategori "${PROJECT_CATEGORY_OPTIONS.find((o) => o.value === category)?.label}"`}
            {location !== 'ALL' && ` di wilayah "${location}"`}
          </p>
        </div>

        {/* Project Cards Grid / Empty State */}
        {paginatedProjects.length === 0 ? (
          <EmptyState
            icon={<Building2 className="size-6 text-slate-400" />}
            title="Tidak Ada Proyek yang Sesuai"
            description="Maaf, kami tidak menemukan perumahan dengan filter pencarian yang Anda pilih. Coba gunakan kata kunci lain atau reset filter."
            resetText="Reset Semua Filter"
            onReset={handleReset}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {paginatedProjects.map((project, idx) => (
              <AnimateIn key={project.id} delayMs={idx * 50}>
                <ProjectCard project={project} />
              </AnimateIn>
            ))}
          </div>
        )}

        {/* Pagination Controls via Shared CatalogPagination */}
        <CatalogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </SectionContainer>
    </div>
  );
}
