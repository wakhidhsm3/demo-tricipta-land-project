import React from 'react';
import { cn } from '@/lib/utils';
import { AnimateIn } from './animate-in';
import { SectionEyebrow } from './section-eyebrow';

export interface SectionHeaderProps {
  badgeText?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  centered?: boolean;
  borderBottom?: boolean;
  className?: string;
}

export function SectionHeader({
  badgeText,
  title,
  description,
  centered = true,
  borderBottom = true,
  className,
}: SectionHeaderProps) {
  return (
    <AnimateIn variant="fade-up" durationMs={500}>
      <div
        className={cn(
          'px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-10 flex flex-col gap-2.5 sm:gap-3',
          centered && 'text-center items-center',
          borderBottom && 'border-b border-dashed border-slate-200',
          className
        )}
      >
        {badgeText && (
          <SectionEyebrow className="sm:text-base">
            {badgeText}
          </SectionEyebrow>
        )}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-slate-900 tracking-tight max-w-3xl leading-tight">
          {title}
        </h2>
        {description && (
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed font-normal">
            {description}
          </p>
        )}
      </div>
    </AnimateIn>
  );
}
