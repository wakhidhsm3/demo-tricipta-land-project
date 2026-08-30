'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type AnimateInVariant = 'fade-up' | 'fade-down' | 'fade-in' | 'scale-in' | 'slide-right' | 'slide-left';

export interface AnimateInProps {
  children: React.ReactNode;
  variant?: AnimateInVariant;
  delayMs?: number;
  durationMs?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

const VARIANT_STYLES: Record<AnimateInVariant, { visible: string; hidden: string }> = {
  'fade-up': {
    visible: 'opacity-100 translate-y-0',
    hidden: 'opacity-0 translate-y-8',
  },
  'fade-down': {
    visible: 'opacity-100 translate-y-0',
    hidden: 'opacity-0 -translate-y-8',
  },
  'fade-in': {
    visible: 'opacity-100',
    hidden: 'opacity-0',
  },
  'scale-in': {
    visible: 'opacity-100 scale-100',
    hidden: 'opacity-0 scale-95',
  },
  'slide-right': {
    visible: 'opacity-100 translate-x-0',
    hidden: 'opacity-0 -translate-x-8',
  },
  'slide-left': {
    visible: 'opacity-100 translate-x-0',
    hidden: 'opacity-0 translate-x-8',
  },
};

export function AnimateIn({
  children,
  variant = 'fade-up',
  delayMs = 0,
  durationMs = 600,
  className = '',
  threshold = 0.1,
  once = true,
}: AnimateInProps) {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once, isVisible]);

  const styleConfig = VARIANT_STYLES[variant] || VARIANT_STYLES['fade-up'];
  const variantClass = isVisible ? styleConfig.visible : styleConfig.hidden;

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${durationMs}ms`,
        transitionDelay: `${delayMs}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={cn(
        'transition-all will-change-[transform,opacity]',
        variantClass,
        className
      )}
    >
      {children}
    </div>
  );
}

