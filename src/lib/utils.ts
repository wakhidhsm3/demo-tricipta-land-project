import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ZodError } from 'zod';
import type { PaginatedResult } from '@/lib/types/repository.type';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const idCurrencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

const idDateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export function formatCurrency(amount: number): string {
  return idCurrencyFormatter.format(amount);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return idDateFormatter.format(date);
}

/**
 * Determines whether a navigation link is "active" based on the current pathname.
 * Handles exact match for root `/` and prefix matching for nested routes.
 */
export function isActiveNavLink(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Formats a Zod validation error into a clean field-to-message record.
 */
export function formatZodErrors(error: ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    if (issue.path[0]) {
      fieldErrors[issue.path[0].toString()] = issue.message;
    }
  }
  return fieldErrors;
}

/**
 * Pure pagination slice and metadata calculator for arrays.
 */
export function paginateArray<T>(
  items: T[],
  page = 1,
  pageSize = 6
): PaginatedResult<T> {
  const total = items.length;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const validPage = Math.min(Math.max(1, page), totalPages);
  const start = (validPage - 1) * pageSize;
  const paginatedItems = items.slice(start, start + pageSize);

  return {
    items: paginatedItems,
    total,
    page: validPage,
    pageSize,
    totalPages,
  };
}

/**
 * Generates an array of page numbers with ellipses for windowed pagination controls.
 * Example for totalPages=10, current=5: [1, 'ellipsis', 4, 5, 6, 'ellipsis', 10]
 */
export function getPaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount = 1
): (number | 'ellipsis')[] {
  // Total page numbers to show: siblingCount + firstPage + lastPage + currentPage + 2*ellipsis
  const totalPageNumbers = siblingCount + 5;

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, idx) => idx + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftEllipsis = leftSiblingIndex > 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, idx) => idx + 1);
    return [...leftRange, 'ellipsis', totalPages];
  }

  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, idx) => totalPages - rightItemCount + idx + 1
    );
    return [firstPageIndex, 'ellipsis', ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, idx) => leftSiblingIndex + idx
  );
  return [firstPageIndex, 'ellipsis', ...middleRange, 'ellipsis', lastPageIndex];
}
