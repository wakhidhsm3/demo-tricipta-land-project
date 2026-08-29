'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  Compass,
  HeartHandshake,
  ShieldCheck,
  Trees,
} from 'lucide-react';
import { TrustedClients } from '@/components/shared/TrustedClients';
import { trustedClientLogosData } from '@/lib/data/partners';
import { CompanyProfile, CompanyStat } from '@/lib/types/company';
import { Project } from '@/lib/types/project';

export interface HeroSectionProps {
  companyData: CompanyProfile;
  featuredProjects?: Project[];
}

const HERO_HEADLINES = [
  { prefix: 'Hunian Berkualitas dengan', highlight: 'Legalitas 100% Aman' },
  { prefix: 'Hunian Berkualitas dengan', highlight: 'Nilai Investasi Terus Meningkat' },
  { prefix: 'Hunian Berkualitas dengan', highlight: 'Lokasi Strategis & Terpercaya' },
];

const STAT_ICONS = [
  <Building2 key="bldg" className="size-4.5 text-slate-400 group-hover:text-emerald-700 transition-colors" />,
  <ShieldCheck key="shield" className="size-4.5 text-slate-400 group-hover:text-emerald-700 transition-colors" />,
  <Trees key="trees" className="size-4.5 text-slate-400 group-hover:text-emerald-700 transition-colors" />,
  <HeartHandshake key="heart" className="size-4.5 text-slate-400 group-hover:text-emerald-700 transition-colors" />,
];

/** Parse string value to numeric target and formatted suffix */
function parseStatValue(raw: string): { target: number; prefix: string; suffix: string; isDecimal: boolean } {
  const match = raw.match(/([\d.,]+)/);
  if (!match) return { target: 0, prefix: '', suffix: raw, isDecimal: false };

  const numStr = match[1];
  const cleaned = numStr.replace(/\./g, '');
  const target = parseFloat(cleaned) || 0;
  const prefix = raw.substring(0, match.index ?? 0);
  const suffix = raw.substring((match.index ?? 0) + numStr.length);

  return { target, prefix, suffix, isDecimal: numStr.includes(',') };
}

function StatCounterItem({ stat, icon }: { stat: CompanyStat; icon: React.ReactNode }) {
  const [currentVal, setCurrentVal] = useState(0);
  const itemRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const { target, prefix, suffix } = parseStatValue(stat.value);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const duration = 2000; // 2 seconds
          const startTime = performance.now();

          const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            // Ease-out exponential
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const val = Math.floor(ease * target);
            setCurrentVal(val);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCurrentVal(target);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.25 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, [target]);

  // Format with Indonesian thousand dots if >= 1000
  const formattedNumber = currentVal >= 1000 ? currentVal.toLocaleString('id-ID') : currentVal.toString();

  return (
    <div
      ref={itemRef}
      className="flex flex-col items-center justify-center text-center p-3.5 sm:p-4 group transition-all duration-300 select-none"
    >
      {/* Top Stat Icon */}
      <div className="mb-1.5 flex items-center justify-center size-8 rounded-lg bg-slate-50 border border-slate-100 group-hover:border-emerald-200 group-hover:bg-emerald-50/60 transition-all duration-300">
        {icon}
      </div>

      {/* Animated Number Counter */}
      <span className="font-sans text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight group-hover:text-emerald-800 transition-colors leading-tight">
        {prefix}
        {formattedNumber}
        {suffix}
      </span>

      {/* Label */}
      <span className="mt-0.5 font-sans text-xs sm:text-sm font-medium text-slate-500 tracking-tight group-hover:text-slate-700 transition-colors">
        {stat.label}
      </span>
    </div>
  );
}

/** Render teks dengan kata-kata keunggulan lebih tebal (data dari descriptionEmphasis) */
function renderWithEmphasis(text: string, emphasisWords: string[]): React.ReactNode {
  if (!emphasisWords.length) return text;
  const escaped = emphasisWords.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  return text.split(regex).map((part, i) => {
    const isEmphasis = emphasisWords.some((w) => w.toLowerCase() === part.toLowerCase());
    return isEmphasis ? (
      <strong key={i} className="font-extrabold text-black">
        {part}
      </strong>
    ) : (
      part
    );
  });
}

export function HeroSection({ companyData }: HeroSectionProps) {
  const [headlineIdx, setHeadlineIdx] = useState(0);
  const [headlineFade, setHeadlineFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineFade(false);
      setTimeout(() => {
        setHeadlineIdx((i) => (i + 1) % HERO_HEADLINES.length);
        setHeadlineFade(true);
      }, 400);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const currentHeadline = HERO_HEADLINES[headlineIdx];

  return (
    <section className="relative bg-white overflow-hidden min-h-[calc(100svh-4rem)] flex flex-col justify-between border-b border-dashed border-slate-200">
      {/* Background architectural building image — clearly visible with soft clean overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
          alt="Modern Housing Architecture"
          fill
          priority
          className="object-cover object-center opacity-45 sm:opacity-55"
        />
        {/* Soft light gradient overlay so the house is clearly visible while text stays sharp */}
        <div className="absolute inset-0 bg-linear-to-b from-white/90 via-white/65 to-white" />
        <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-white/40" />
      </div>

      {/* Grid border lines — shadcnstudio signature */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-7xl border-x border-dashed border-slate-200/80 pointer-events-none z-0" />

      {/* Radial green glow at bottom center */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-225 h-150 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse at center bottom, rgba(22, 163, 74, 0.08) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 flex flex-col justify-between flex-1 text-center">
        {/* Main Hero Center Content */}
        <div className="my-auto flex flex-col items-center">
          {/* Social proof badge — conic-gradient spinning border mengelilingi pill */}
          <div
            className="inline-block relative p-[1.5px] rounded-full mb-4 sm:mb-6 shadow-xs"
            style={{
              background:
                'conic-gradient(from var(--border-angle), #e2e8f0 0%, #e2e8f0 60%, #22c55e 72%, #4ade80 80%, #22c55e 88%, #e2e8f0 100%)',
              animation: 'border-rotate 2.5s linear infinite',
            }}
          >
            <div className="rounded-full bg-white/95 backdrop-blur-sm px-4 py-1.5 sm:py-2 flex items-center gap-2.5 shadow-2xs">
              <Building2 className="h-4 w-4 text-emerald-700 shrink-0" />
              <span className="text-xs sm:text-sm text-slate-700 font-medium">
                Developer Perumahan Terpercaya
              </span>
            </div>
          </div>

          {/* Headline with SVG underline — persis shadcnstudio pattern */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.65rem] font-bold tracking-tight text-slate-900 leading-[1.12] max-w-4xl mx-auto drop-shadow-xs">
            {currentHeadline.prefix}{' '}
            <span
              className="relative inline-block transition-opacity duration-400"
              style={{ opacity: headlineFade ? 1 : 0 }}
            >
              <span className="text-emerald-800">{currentHeadline.highlight}</span>
              {/* SVG path underline — shadcnstudio static gradient style */}
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
                  stroke="url(#hero-underline-gradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="hero-underline-gradient"
                    x1="18.8541"
                    y1="3.72033"
                    x2="42.6487"
                    y2="66.6308"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#15803d" />
                    <stop offset="1" stopColor="#4ade80" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-slate-900 max-w-2xl mx-auto leading-relaxed font-normal">
            {renderWithEmphasis(companyData.description, companyData.descriptionEmphasis)}
          </p>

          {/* Trusted By Client Logos with 3D Flip Animation — persis shadcnstudio */}
          <TrustedClients logos={trustedClientLogosData} label="Dipercaya oleh : " />

          {/* CTAs matching clean modern shadcn rounded-xl button styling */}
          <div className="mt-4 sm:mt-6 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            {/* Primary CTA: Clean Emerald Green Button */}
            <Link href="/projects" className="inline-flex">
              <button className="h-11 sm:h-12 px-6 sm:px-7 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm sm:text-base inline-flex items-center justify-center gap-2.5 shadow-md shadow-emerald-800/20 hover:shadow-lg hover:shadow-emerald-800/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer select-none">
                Jelajahi Proyek
                <Compass className="size-4.5 text-emerald-200 shrink-0" />
              </button>
            </Link>

            {/* Secondary CTA: Sleek Black rounded button with arrow */}
            <Link href="/contact" className="inline-flex">
              <button className="h-11 sm:h-12 px-6 sm:px-7 rounded-xl bg-slate-900 hover:bg-black text-white font-medium text-sm sm:text-base inline-flex items-center justify-center gap-2.5 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-md shadow-slate-900/15 hover:shadow-lg hover:shadow-slate-900/25 select-none">
                Konsultasi Gratis
                <ArrowRight className="size-4 text-slate-300 shrink-0" />
              </button>
            </Link>
          </div>
        </div>

        {/* Integrated Stats Trust Card — Seamlessly embedded inside Hero Section (No z-index / negative margin hacks) */}
        <div className="w-full max-w-5xl mx-auto mt-6 sm:mt-8 pt-2">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-dashed divide-slate-200/90 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] transition-shadow duration-300 overflow-hidden">
            {companyData.stats.map((stat, idx) => (
              <StatCounterItem key={idx} stat={stat} icon={STAT_ICONS[idx % STAT_ICONS.length]} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
