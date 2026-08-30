import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { cn, getPaginationRange } from '@/lib/utils';

export interface CatalogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function CatalogPagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: CatalogPaginationProps) {
  if (totalPages <= 1) return null;

  const paginationRange = getPaginationRange(currentPage, totalPages);

  return (
    <div className={cn('mt-12 flex justify-center', className)}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              className={cn(
                currentPage === 1 && 'pointer-events-none opacity-40 cursor-not-allowed'
              )}
            />
          </PaginationItem>

          {paginationRange.map((pageItem, idx) => {
            if (pageItem === 'ellipsis') {
              return (
                <PaginationItem key={`ellipsis-${idx}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={pageItem}>
                <PaginationLink
                  isActive={currentPage === pageItem}
                  onClick={() => onPageChange(pageItem)}
                >
                  {pageItem}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              className={cn(
                currentPage === totalPages && 'pointer-events-none opacity-40 cursor-not-allowed'
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
