import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionContainer } from './section-container';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <div
      className={cn(
        'sticky top-16 z-40 w-full bg-white/95 backdrop-blur-md border-b border-dashed border-slate-200 shadow-2xs',
        className
      )}
    >
      <SectionContainer className="py-3">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1 hover:text-emerald-800 transition-colors font-medium"
          >
            <Home className="size-3.5 text-slate-400" />
            <span>Beranda</span>
          </Link>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <React.Fragment key={index}>
                <ChevronRight className="size-3.5 text-slate-300 shrink-0" />
                {isLast || !item.href ? (
                  <span className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-md lg:max-w-xl">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-emerald-800 transition-colors font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </SectionContainer>
    </div>
  );
}
