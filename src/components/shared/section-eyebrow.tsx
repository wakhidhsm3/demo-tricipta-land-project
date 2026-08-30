import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionEyebrowProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Standardised section label / eyebrow text.
 *
 * Replaces 15× inline `<span>` elements with identical Tailwind classes.
 */
export function SectionEyebrow({ children, className }: SectionEyebrowProps) {
  return (
    <span
      className={cn(
        'font-serif italic font-semibold text-emerald-800 text-sm tracking-wide underline underline-offset-6',
        className
      )}
    >
      {children}
    </span>
  );
}
