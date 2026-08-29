import React from 'react';
import Image from 'next/image';
import { BookOpen } from 'lucide-react';
import { AnimateIn } from '@/components/shared/AnimateIn';

export function ArticleHeader() {
  return (
    <section className="relative bg-white overflow-hidden py-14 sm:py-20 lg:py-24 border-b border-dashed border-slate-200">
      {/* Background architectural building image with soft overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop"
          alt="Edukasi Properti & KPR"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-35 sm:opacity-45"
        />
        <div className="absolute inset-0 bg-linear-to-b from-white/95 via-white/75 to-white" />
        <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-white/40" />
      </div>

      {/* Grid border lines — shadcnstudio signature */}
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
          <div
            className="inline-block relative p-[1.5px] rounded-full mb-4 sm:mb-6 shadow-xs"
            style={{
              background:
                'conic-gradient(from var(--border-angle), #e2e8f0 0%, #e2e8f0 60%, #22c55e 72%, #4ade80 80%, #22c55e 88%, #e2e8f0 100%)',
              animation: 'border-rotate 2.5s linear infinite',
            }}
          >
            <div className="rounded-full bg-white/95 backdrop-blur-sm px-4 py-1.5 sm:py-2 flex items-center gap-2.5 shadow-2xs">
              <BookOpen className="h-4 w-4 text-emerald-700 shrink-0" />
              <span className="text-xs sm:text-sm text-slate-700 font-medium">
                Edukasi & Wawasan Properti
              </span>
            </div>
          </div>

          {/* Headline with SVG underline */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.18] max-w-4xl mx-auto drop-shadow-xs">
            Wawasan Hunian &{' '}
            <span className="relative inline-block text-emerald-800">
              Panduan KPR Keluarga
              <svg
                width="223"
                height="12"
                viewBox="0 0 223 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-x-0 bottom-0 w-full translate-y-1/2"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M1.11716 10.428C39.7835 4.97282 75.9074 2.70494 114.894 1.98894C143.706 1.45983 175.684 0.313587 204.212 3.31596C209.925 3.60546 215.144 4.59884 221.535 5.74551"
                  stroke="#15803d"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Temukan panduan praktis seputar legalitas sertifikat tanah, tips memilih rumah pertama, dan simulasi skema cicilan KPR terpercaya.
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
