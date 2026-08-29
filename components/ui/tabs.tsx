'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
  variant?: 'pill' | 'segmented';
}

export function Tabs({ tabs, activeTab, onChange, className, variant = 'segmented' }: TabsProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const activeTabRef = React.useRef<HTMLButtonElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const checkScroll = React.useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  React.useEffect(() => {
    checkScroll();
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);

    // Initial check after paint
    const timer = setTimeout(checkScroll, 100);

    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
      clearTimeout(timer);
    };
  }, [checkScroll, tabs]);

  const scroll = (direction: 'left' | 'right') => {
    const el = containerRef.current;
    if (!el) return;

    const scrollAmount = direction === 'left' ? -200 : 200;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleTabClick = (tabId: string, e: React.MouseEvent<HTMLButtonElement>) => {
    onChange(tabId);
    e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  if (variant === 'pill') {
    return (
      <div className="relative w-full">
        {/* Left Scroll Button & Gradient Mask */}
        {canScrollLeft && (
          <div className="absolute left-0 inset-y-0 z-10 flex items-center pr-4 bg-linear-to-r from-white via-white/80 to-transparent">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="size-7 rounded-full bg-white shadow-md border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 transition-all cursor-pointer"
              aria-label="Slide tabs left"
            >
              <ChevronLeft className="size-4" />
            </button>
          </div>
        )}

        <div
          ref={containerRef}
          className={cn(
            'flex items-center gap-1.5 overflow-x-auto scrollbar-none overscroll-x-contain py-1 px-1',
            className
          )}
          role="tablist"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={(e) => handleTabClick(tab.id, e)}
                role="tab"
                aria-selected={isActive}
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer rounded-full select-none shrink-0',
                  isActive
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'text-slate-600 hover:text-emerald-800 bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200/60'
                )}
              >
                {tab.icon && (
                  <span className={isActive ? 'text-emerald-200' : 'text-slate-400'}>{tab.icon}</span>
                )}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right Scroll Button & Gradient Mask */}
        {canScrollRight && (
          <div className="absolute right-0 inset-y-0 z-10 flex items-center pl-4 bg-linear-to-l from-white via-white/80 to-transparent">
            <button
              type="button"
              onClick={() => scroll('right')}
              className="size-7 rounded-full bg-white shadow-md border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 transition-all cursor-pointer"
              aria-label="Slide tabs right"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}
      </div>
    );
  }

  // Full-width segmented control matching the exact Shadcn Studio layout with Slide Indicator
  return (
    <div className="relative w-full group/tabs">
      {/* Left Scroll Chevron Arrow & Fade (visible when scrollable to left) */}
      {canScrollLeft && (
        <div className="absolute left-1 inset-y-1 z-10 flex items-center pr-6 bg-linear-to-r from-slate-100 via-slate-100/90 to-transparent rounded-l-2xl sm:rounded-l-xl">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="size-7 rounded-full bg-white shadow-md border border-slate-200/90 text-emerald-800 flex items-center justify-center hover:bg-emerald-50 transition-all cursor-pointer -ml-0.5"
            aria-label="Slide tabs left"
          >
            <ChevronLeft className="size-4 stroke-[2.5]" />
          </button>
        </div>
      )}

      {/* Main Tab Container */}
      <div
        ref={containerRef}
        className={cn(
          'w-full bg-slate-100/90 p-1 sm:p-1.5 rounded-2xl sm:rounded-xl border border-slate-200/80 shadow-2xs select-none overflow-x-auto scrollbar-none overscroll-x-contain scroll-smooth',
          className
        )}
        role="tablist"
      >
        <div className="flex sm:grid sm:grid-flow-col sm:auto-cols-fr w-full gap-1 sm:gap-1.5 min-w-max sm:min-w-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                ref={isActive ? activeTabRef : undefined}
                type="button"
                onClick={(e) => handleTabClick(tab.id, e)}
                role="tab"
                aria-selected={isActive}
                className={cn(
                  'flex items-center justify-center gap-2 py-2 sm:py-2.5 lg:py-3 px-4 sm:px-4 lg:px-6 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer rounded-xl sm:rounded-lg text-center whitespace-nowrap shrink-0 sm:shrink min-w-max sm:min-w-0',
                  isActive
                    ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200/90 ring-1 ring-black/5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                )}
              >
                {tab.icon && (
                  <span
                    className={cn(
                      'shrink-0 transition-colors',
                      isActive ? 'text-emerald-700' : 'text-slate-400'
                    )}
                  >
                    {tab.icon}
                  </span>
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Scroll Chevron Arrow & Fade (visible when scrollable to right) */}
      {canScrollRight && (
        <div className="absolute right-1 inset-y-1 z-10 flex items-center pl-6 bg-linear-to-l from-slate-100 via-slate-100/90 to-transparent rounded-r-2xl sm:rounded-r-xl">
          <button
            type="button"
            onClick={() => scroll('right')}
            className="size-7 rounded-full bg-white shadow-md border border-slate-200/90 text-emerald-800 flex items-center justify-center hover:bg-emerald-50 transition-all cursor-pointer -mr-0.5 animate-pulse"
            aria-label="Slide tabs right"
          >
            <ChevronRight className="size-4 stroke-[2.5]" />
          </button>
        </div>
      )}
    </div>
  );
}
