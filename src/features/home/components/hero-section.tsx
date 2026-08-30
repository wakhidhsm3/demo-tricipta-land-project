import React from 'react';
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
import { TrustedClients, StatCounter } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { partnerLogosData } from '../data/partners.data';
import { CompanyProfile, CompanyStat } from '@/lib/types/company.type';
import { siteConfig } from '@/lib/config/site.config';
import { HERO_HEADLINES } from '../data/hero.data';
import { HeroHeadlineRotator } from './hero-headline-rotator';

export interface HeroSectionProps {
  companyData: CompanyProfile;
}

const STAT_ICONS = [
  <Building2 key="bldg" className="size-4.5 text-slate-400 group-hover:text-emerald-700 transition-colors" />,
  <ShieldCheck key="shield" className="size-4.5 text-slate-400 group-hover:text-emerald-700 transition-colors" />,
  <Trees key="trees" className="size-4.5 text-slate-400 group-hover:text-emerald-700 transition-colors" />,
  <HeartHandshake key="heart" className="size-4.5 text-slate-400 group-hover:text-emerald-700 transition-colors" />,
];

function StatCounterItem({ stat, icon }: { stat: CompanyStat; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-3.5 sm:p-4 group transition-all duration-300 select-none">
      {/* Top Stat Icon */}
      <div className="mb-1.5 flex items-center justify-center size-8 rounded-lg bg-slate-50 border border-slate-100 group-hover:border-emerald-200 group-hover:bg-emerald-50/60 transition-all duration-300">
        {icon}
      </div>

      {/* Animated Number Counter via shared component */}
      <StatCounter
        value={stat.value}
        className="font-sans text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight group-hover:text-emerald-800 transition-colors leading-tight"
      />

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
  return (
    <section className="relative w-full bg-white overflow-hidden pt-10 sm:pt-14 pb-12 sm:pb-16 border-b border-dashed border-slate-200">
      {/* Background architectural building image with soft overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <Image
          src={siteConfig.defaultHeroImage}
          alt={`${siteConfig.name} Architecture`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-35 sm:opacity-45"
        />
        <div className="absolute inset-0 bg-linear-to-b from-white/95 via-white/70 to-white" />
        <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-white/30" />
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

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center">
          {/* Animated Pill Badge */}
          <div className="inline-block relative p-[1.5px] rounded-full mb-4 sm:mb-6 shadow-xs animated-pill-border">
            <div className="rounded-full bg-white/95 backdrop-blur-sm px-4 py-1.5 sm:py-2 flex items-center gap-2.5 shadow-2xs">
              <span className="shrink-0 size-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs sm:text-sm text-slate-700 font-medium">
                {companyData.legalName} • Terpercaya Sejak {companyData.establishedYear}
              </span>
            </div>
          </div>

          {/* Main Hero Headline (Rotating Client Component) */}
          <HeroHeadlineRotator headlines={HERO_HEADLINES} />

          {/* Subtitle */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-slate-900 max-w-2xl mx-auto leading-relaxed font-normal">
            {renderWithEmphasis(companyData.description, companyData.descriptionEmphasis)}
          </p>

          {/* Trusted By Client Logos with 3D Flip Animation */}
          <TrustedClients logos={partnerLogosData} label="Dipercaya oleh : " />

          {/* CTAs */}
          <div className="mt-4 sm:mt-6 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            {/* Primary CTA */}
            <Link href="/projects" className="inline-flex">
              <Button
                variant="default"
                size="lg"
                className="shadow-emerald-800/20 hover:shadow-emerald-800/30"
              >
                Jelajahi Proyek
                <Compass className="size-4.5 text-emerald-200 shrink-0" />
              </Button>
            </Link>

            {/* Secondary CTA */}
            <Link href="/contact" className="inline-flex">
              <Button
                variant="default"
                size="lg"
                className="bg-slate-900 hover:bg-black text-white shadow-slate-900/15 hover:shadow-slate-900/25"
              >
                Konsultasi Gratis
                <ArrowRight className="size-4 text-slate-300 shrink-0" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Integrated Stats Trust Card */}
        <div className="w-full max-w-5xl mx-auto mt-6 sm:mt-8 pt-2">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-dashed divide-slate-200/90 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] transition-shadow duration-300 overflow-hidden">
            {companyData.stats.map((stat, idx) => (
              <StatCounterItem
                key={stat.label}
                stat={stat}
                icon={STAT_ICONS[idx % STAT_ICONS.length]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
