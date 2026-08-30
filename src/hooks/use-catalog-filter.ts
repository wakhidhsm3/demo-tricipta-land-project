import { useState, useMemo, useEffect, ChangeEvent } from 'react';
import { useDebounce } from './use-debounce';
import { siteConfig } from '@/lib/config/site.config';
import { SCROLL_THRESHOLDS } from '@/lib/config/ui.constants';

export interface UseCatalogFilterOptions<T, E extends Record<string, string> = Record<string, string>> {
  items: T[];
  pageSize?: number;
  initialSearchQuery?: string;
  initialCategory?: string;
  initialExtraFilters?: E;
  searchFilter: (item: T, debouncedQuery: string) => boolean;
  categoryFilter?: (item: T, category: string) => boolean;
  extraFilter?: (item: T, extraFilters: E) => boolean;
  scrollOnPageChangeTop?: number;
  onFilterChange?: (state: {
    query: string;
    debouncedQuery: string;
    category: string;
    extraFilters: E;
  }) => void;
}

export function useCatalogFilter<T, E extends Record<string, string> = Record<string, string>>({
  items,
  pageSize = siteConfig.pagination.defaultPageSize,
  initialSearchQuery = '',
  initialCategory = 'ALL',
  initialExtraFilters = {} as E,
  searchFilter,
  categoryFilter,
  extraFilter,
  scrollOnPageChangeTop = SCROLL_THRESHOLDS.CATALOG_PAGE_TOP,
  onFilterChange,
}: UseCatalogFilterOptions<T, E>) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [extraFilters, setExtraFilters] = useState<E>(initialExtraFilters);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedQuery = useDebounce(searchQuery, 300);

  // Notify consumer of debounced filter changes
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        query: searchQuery,
        debouncedQuery,
        category: selectedCategory,
        extraFilters,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, selectedCategory, extraFilters, onFilterChange]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchCat = categoryFilter ? categoryFilter(item, selectedCategory) : true;
      const matchSearch = searchFilter(item, debouncedQuery);
      const matchExtra = extraFilter ? extraFilter(item, extraFilters) : true;
      return matchCat && matchSearch && matchExtra;
    });
  }, [items, selectedCategory, debouncedQuery, extraFilters, categoryFilter, searchFilter, extraFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));

  const paginatedItems = useMemo(() => {
    const startIdx = (currentPage - 1) * pageSize;
    return filteredItems.slice(startIdx, startIdx + pageSize);
  }, [filteredItems, currentPage, pageSize]);

  const isFiltered = useMemo(() => {
    const hasSearch = searchQuery.trim() !== '';
    const hasCat = selectedCategory !== 'ALL';
    const hasExtra = Object.values(extraFilters).some((val) => val && val !== 'ALL');
    return hasSearch || hasCat || hasExtra;
  }, [searchQuery, selectedCategory, extraFilters]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
    setCurrentPage(1);
  };

  const setExtraFilterValue = (key: keyof E, val: string) => {
    setExtraFilters((prev) => ({ ...prev, [key]: val }));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: scrollOnPageChangeTop, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    const resetExtras = Object.keys(extraFilters).reduce((acc, key) => {
      acc[key as keyof E] = 'ALL' as E[keyof E];
      return acc;
    }, {} as E);
    setExtraFilters(resetExtras);
    setCurrentPage(1);
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    extraFilters,
    setExtraFilters,
    setExtraFilterValue,
    currentPage,
    setCurrentPage,
    debouncedQuery,
    filteredItems,
    paginatedItems,
    totalPages,
    isFiltered,
    handleSearchChange,
    handleCategoryChange,
    handlePageChange,
    handleReset,
  };
}
