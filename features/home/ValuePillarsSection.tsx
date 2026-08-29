import React from 'react';
import { ShieldCheck, Building2, Trees, HeartHandshake, Check } from 'lucide-react';
import { CompanyCoreValue } from '@/lib/types/company';
import { AnimateIn } from '@/components/shared/AnimateIn';

export interface ValuePillarsSectionProps {
  pillars: CompanyCoreValue[];
}

const iconMap: Record<string, React.ReactElement> = {
  ShieldCheck: <ShieldCheck className="size-5 shrink-0" />,
  Building2: <Building2 className="size-5 shrink-0" />,
  Trees: <Trees className="size-5 shrink-0" />,
  HeartHandshake: <HeartHandshake className="size-5 shrink-0" />,
};

const STANDARD_GUARANTEES = [
  'Sertifikat Hak Milik (SHM) & PBG resmi terbit per unit hunian',
  'Struktur bangunan kokoh berstandar SNI dengan pengawasan teknis ketat',
  'Fasilitas kawasan lengkap: jalan lingkungan lebar, drainase tertutup & ruang hijau',
  'Dukungan kerjasama perbankan terkemuka untuk proses KPR mudah dan transparan',
];

export function ValuePillarsSection({ pillars }: ValuePillarsSectionProps) {
  return (
    <section id="keunggulan" className="w-full bg-white border-b border-dashed border-slate-200">
      <div className="mx-auto max-w-7xl min-[1280px]:border-x min-[1280px]:border-dashed min-[1280px]:border-slate-200">
        {/* Section Header */}
        <AnimateIn variant="fade-up" durationMs={500}>
          <div className="px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-10 sm:pb-12 text-center flex flex-col items-center gap-3 border-b border-dashed border-slate-200">
            <span className="font-serif italic font-semibold text-emerald-800 text-sm sm:text-base tracking-wide underline underline-offset-6">
              Nilai Keunggulan
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-slate-900 tracking-tight max-w-3xl">
              Mengapa Memilih TRICIPTA LAND?
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
              Komitmen penuh kami menghadirkan kepastian hukum, mutu material tinggi, dan kenyamanan lingkungan bagi hunian keluarga Anda.
            </p>
          </div>
        </AnimateIn>

        {/* Main 4-Column Grid: Dashed Border Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-dashed divide-slate-200 border-b border-dashed border-slate-200 bg-white">
          {pillars.map((pillar, idx) => (
            <AnimateIn
              key={idx}
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
                      {iconMap[pillar.iconName] || <ShieldCheck className="size-5 shrink-0" />}
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
                  <p className="mt-1 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight group-hover:text-emerald-800 group-hover:translate-x-1 transition-all duration-300">
                    {pillar.metric || '100%'}
                    {pillar.metricSuffix && (
                      <span className="text-slate-500 ml-1.5 text-xs sm:text-sm font-normal">
                        {pillar.metricSuffix}
                      </span>
                    )}
                  </p>

                  {/* Bullet Points */}
                  <ul className="mt-6 ml-4 list-disc space-y-2.5">
                    {(pillar.points || [pillar.description]).map((pt, i) => (
                      <li key={i} className="text-slate-600 text-xs sm:text-sm leading-relaxed group-hover:text-slate-800 transition-colors">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Dashed Sub-Footer */}
                <div className="mt-6 border-t border-dashed border-slate-200 pt-5">
                  <p className="text-slate-500 text-xs font-medium tracking-wide uppercase">
                    {pillar.footerLabel || 'Jaminan'}
                  </p>
                  <p className="mt-1 text-lg sm:text-xl font-bold text-emerald-800 tracking-tight group-hover:scale-102 transition-transform">
                    {pillar.footerValue || 'Terjamin'}
                  </p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Bottom Summary Strip: Standard Guarantees */}
        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 bg-slate-50/40">
          <p className="font-semibold text-slate-900 text-sm sm:text-base">
            Standar Pasti di Setiap Kawasan Hunian TRICIPTA LAND
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 sm:gap-x-12 lg:gap-x-16">
            {STANDARD_GUARANTEES.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 p-2 rounded-xl hover:bg-white hover:shadow-2xs transition-all duration-200"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-emerald-600 font-bold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
