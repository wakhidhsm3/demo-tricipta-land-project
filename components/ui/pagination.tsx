import * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-row items-center gap-1.5 sm:gap-2', className)}
      {...props}
    />
  );
}

function PaginationItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" className={cn('', className)} {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
  size?: 'default' | 'sm' | 'lg' | 'icon';
} & React.ComponentProps<'button'>;

function PaginationLink({
  className,
  isActive,
  ...props
}: PaginationLinkProps) {
  return (
    <button
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        'inline-flex size-9 sm:size-10 items-center justify-center rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer select-none border',
        isActive
          ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
          : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-100 hover:text-slate-900',
        className
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <button
      aria-label="Go to previous page"
      disabled={disabled}
      className={cn(
        'inline-flex h-9 sm:h-10 items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-3 sm:px-4 text-xs sm:text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 cursor-pointer select-none disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white',
        className
      )}
      {...props}
    >
      <ChevronLeft className="size-4" />
      <span className="hidden sm:inline">Sebelumnya</span>
    </button>
  );
}

function PaginationNext({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <button
      aria-label="Go to next page"
      disabled={disabled}
      className={cn(
        'inline-flex h-9 sm:h-10 items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-3 sm:px-4 text-xs sm:text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 cursor-pointer select-none disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white',
        className
      )}
      {...props}
    >
      <span className="hidden sm:inline">Selanjutnya</span>
      <ChevronRight className="size-4" />
    </button>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn('flex size-9 items-center justify-center text-slate-400', className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">Halaman lainnya</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
