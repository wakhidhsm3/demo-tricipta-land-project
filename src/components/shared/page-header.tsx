import React from 'react';
import Image from 'next/image';
import { AnimateIn } from '@/components/shared';
import { CurvedUnderline } from './curved-underline';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/config/site.config';

export interface PageHeaderProps {
  badgeText: string;
  badgeIcon: React.ReactNode;
  title: string;
  highlightText?: string;
  description: string;
  backgroundImage?: string;
  imageAlt?: string;
  className?: string;
}

export function PageHeader({
  badgeText,
  badgeIcon,
  title,
  highlightText,
  description,
  backgroundImage = siteConfig.defaultPageHeaderImage,
  imageAlt = `${siteConfig.name} Header`,
  className,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        'relative bg-white overflow-hidden py-14 sm:py-20 lg:py-24 border-b border-dashed border-slate-200',
        className
      )}
    >
      {/* Background architectural building image with soft overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <Image
          src={backgroundImage}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40 sm:opacity-50"
        />
        <div className="absolute inset-0 bg-linear-to-b from-white/95 via-white/75 to-white" />
        <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-white/40" />
      </div>

      {/* Grid border lines — signature layout */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-7xl border-x border-dashed border-slate-200/80 pointer-events-none z-0" />

      {/* Radial green glow at bottom center */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-200 h-100 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse at center bottom, rgba(22, 163, 74, 0.08) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <AnimateIn variant="fade-up" durationMs={550}>
          {/* Animated Pill Badge */}
          <div className="inline-block relative p-[1.5px] rounded-full mb-4 sm:mb-6 shadow-xs animated-pill-border">
            <div className="rounded-full bg-white/95 backdrop-blur-sm px-4 py-1.5 sm:py-2 flex items-center gap-2.5 shadow-2xs">
              <span className="shrink-0 text-emerald-700">{badgeIcon}</span>
              <span className="text-xs sm:text-sm text-slate-700 font-medium">
                {badgeText}
              </span>
            </div>
          </div>

          {/* Headline with SVG underline */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.18] max-w-4xl mx-auto drop-shadow-xs">
            {title}{' '}
            {highlightText && (
              <span className="relative inline-block text-emerald-800">
                {highlightText}
                <CurvedUnderline strokeVariant="green" />
              </span>
            )}
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
