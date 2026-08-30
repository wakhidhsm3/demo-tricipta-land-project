import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionContainerProps {
  children: React.ReactNode;
  /** Additional classes for spacing, background, etc. */
  className?: string;
  /** HTML element to render. Defaults to `'div'`. */
  as?: 'div' | 'section' | 'article' | 'aside' | 'nav';
  /** Skip max-w-7xl + padding (for custom inner layouts). */
  noPadding?: boolean;
  /** Skip the 1280px dashed border. */
  noBorder?: boolean;
}

/**
 * Standard layout container with `max-w-7xl`, responsive padding,
 * and the signature 1280px dashed border side rails.
 *
 * Eliminates 26× repeated Tailwind class strings.
 */
export function SectionContainer({
  children,
  className,
  as: Tag = 'div',
  noPadding = false,
  noBorder = false,
}: SectionContainerProps) {
  return (
    <Tag
      className={cn(
        'mx-auto max-w-7xl',
        !noPadding && 'px-4 sm:px-6 lg:px-8',
        !noBorder &&
          'min-[1280px]:border-x min-[1280px]:border-dashed min-[1280px]:border-slate-200',
        className
      )}
    >
      {children}
    </Tag>
  );
}
