import React from 'react';
import { ShieldCheck, Check, Building2, Trees, HeartHandshake } from 'lucide-react';
import { CompanyCoreValue } from '@/lib/types/company.type';
import { AnimateIn, SectionHeader, SectionContainer } from '@/components/shared';
import { siteConfig } from '@/lib/config/site.config';
import { STANDARD_GUARANTEES } from '../data/hero.data';

export interface ValuePillarsSectionProps {
  pillars: CompanyCoreValue[];
}

function ValuePillarIcon({ name }: { name: string }) {
  switch (name) {
    case 'Building2':
      return <Building2 className="size-5 shrink-0" />;
    case 'Trees':
      return <Trees className="size-5 shrink-0" />;
    case 'HeartHandshake':
      return <HeartHandshake className="size-5 shrink-0" />;
    case 'ShieldCheck':
    default:
      return <ShieldCheck className="size-5 shrink-0" />;
  }
}

export function ValuePillarsSection({ pillars }: ValuePillarsSectionProps) {
  return (
    <section id="keunggulan" className="w-full bg-white border-b border-dashed border-slate-200">
      <SectionContainer noPadding>
        {/* Section Header */}
        <SectionHeader
          badgeText="Nilai Keunggulan"
          title={`Mengapa Memilih ${siteConfig.name}?`}
          description="Komitmen penuh kami menghadirkan kepastian hukum, mutu material tinggi, dan kenyamanan lingkungan bagi hunian keluarga Anda."
        />

        {/* Main 4-Column Grid: Dashed Border Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-dashed divide-slate-200 border-b border-dashed border-slate-200 bg-white">
          {pillars.map((pillar, idx) => (
            <AnimateIn
              key={pillar.title}
              variant="fade-up"
              delayMs={idx * 100}
              durationMs={500}
              className="h-full"
            >
              <div className="h-full px-5 py-8 sm:px-6 lg:px-7 flex flex-col justify-between group hover:bg-emerald-50/20 transition-all duration-300 cursor-default">
                <div>
                  {/* Pillar Header with Icon */}
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-emerald-50/90 border border-emerald-200/60 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white group-hover:border-emerald-700 group-hover:scale-110 group-hover:shadow-md transition-all duration-300 shrink-0">
                      <ValuePillarIcon name={pillar.iconName} />
                    </div>
                    <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                      {pillar.title}
                    </span>
                  </div>

                  {/* Subtitle / Category */}
                  <p className="text-slate-500 mt-6 text-xs font-semibold tracking-wider uppercase">
                    {pillar.subtitle || 'Standar Keunggulan'}
                  </p>

                  {/* Metric Highlight */}
                  {pillar.metric && (
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="font-sans text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors">
                        {pillar.metric}
                      </span>
                      {pillar.metricSuffix && (
                        <span className="text-xs font-bold text-emerald-700">
                          {pillar.metricSuffix}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Bottom Trust Micro-badge */}
                <div className="mt-6 pt-4 border-t border-dashed border-slate-200 flex items-center gap-2 text-xs font-semibold text-emerald-800">
                  <div className="size-1.5 rounded-full bg-emerald-600" />
                  <span>Garansi Resmi Pengembang</span>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Bottom Guarantee Banner Strip matching shadcn-studio feature blocks */}
        <AnimateIn variant="fade-up" delayMs={300} durationMs={500}>
          <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center shrink-0 shadow-2xs">
                <ShieldCheck className="size-6" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold font-serif text-slate-900">
                  Standar Legalitas & Kualitas Tanpa Kompromi
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Seluruh proyek berizin resmi, sertifikat SHM terpecah per kavling, dan didukung garansi konstruksi.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {STANDARD_GUARANTEES.map((guarantee, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs font-medium text-slate-700"
                >
                  <Check className="size-3.5 text-emerald-700 font-bold" />
                  <span>{guarantee.split(':')[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>
      </SectionContainer>
    </section>
  );
}
