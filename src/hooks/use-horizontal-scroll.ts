'use client';

import { useState, useRef, useEffect, useCallback, RefObject } from 'react';

export interface UseHorizontalScrollOptions {
  /** Pixel amount to move when clicking previous/next chevron buttons (default: 200) */
  scrollAmount?: number;
  /** Pixel tolerance before indicating scroll boundaries (default: 4) */
  threshold?: number;
}

export interface UseHorizontalScrollResult<T extends HTMLElement = HTMLDivElement> {
  containerRef: RefObject<T | null>;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  scrollLeft: () => void;
  scrollRight: () => void;
  checkScroll: () => void;
}

export function useHorizontalScroll<T extends HTMLElement = HTMLDivElement>(
  options: UseHorizontalScrollOptions = {}
): UseHorizontalScrollResult<T> {
  const { scrollAmount = 200, threshold = 4 } = options;
  const containerRef = useRef<T | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const { scrollLeft: sLeft, scrollWidth: sWidth, clientWidth: cWidth } = el;
    setCanScrollLeft(sLeft > threshold);
    setCanScrollRight(sLeft + cWidth < sWidth - threshold);
  }, [threshold]);

  useEffect(() => {
    checkScroll();
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll, { passive: true });

    const timer = setTimeout(checkScroll, 100);

    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
      clearTimeout(timer);
    };
  }, [checkScroll]);

  const scrollLeft = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  }, [scrollAmount]);

  const scrollRight = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }, [scrollAmount]);

  return {
    containerRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
    checkScroll,
  };
}
