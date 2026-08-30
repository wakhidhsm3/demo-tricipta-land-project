import React from 'react';
import Image from 'next/image';
import { ProjectSpecifications } from '../types/project.type';
import { SectionContainer, SectionHeader, AnimateIn } from '@/components/shared';
import { BUILDING_SPECS_MEDIA } from '../data/building-specs-media.data';

export interface BuildingSpecsSectionProps {
  specs: ProjectSpecifications;
}

export function BuildingSpecsSection({ specs }: BuildingSpecsSectionProps) {
  return (
    <section className="w-full bg-white border-b border-dashed border-slate-200">
      <SectionContainer className="py-12 sm:py-16">
        <SectionHeader
          badgeText="Standar Mutu SNI"
          title="Spesifikasi Teknis Bangunan"
          description="Material konstruksi dipilih dengan standar ketat guna menjamin kekuatan struktur dan kenyamanan jangka panjang."
          borderBottom={false}
          className="pt-0 sm:pt-0 pb-8 sm:pb-10 px-0 sm:px-0"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {BUILDING_SPECS_MEDIA.map((item, idx) => {
            const materialValue = specs[item.key] || '-';

            return (
              <AnimateIn key={item.key} delayMs={idx * 50}>
                <div className="group h-full flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 hover-card-lift">
                  {/* Photo Container */}
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 via-slate-900/15 to-transparent" />

                    {/* Floating Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-slate-900/80 backdrop-blur-xs text-white shadow-xs">
                        {item.categoryBadge}
                      </span>
                    </div>

                    {/* Specification Label on Bottom of Image */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-xs font-semibold text-emerald-300 drop-shadow-xs">
                        {item.label}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-2.5 bg-white">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-emerald-800 transition-colors">
                        {materialValue}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
                        {item.qualityGuarantee}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-dashed border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Kualitas Terverifikasi</span>
                      <span className="text-emerald-700 font-semibold">Standar SNI</span>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}
