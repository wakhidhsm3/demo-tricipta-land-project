import React from 'react';
import {
  Layers,
  Building2,
  Boxes,
  Home,
  PanelTop,
  LayoutGrid,
  Bath,
  Zap,
  Droplets,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react';
import { ProjectSpecifications } from '../types/project.type';
import { SectionContainer, SectionHeader, AnimateIn } from '@/components/shared';
import { BUILDING_SPECS_MEDIA } from '../data/building-specs-media.data';

export interface BuildingSpecsSectionProps {
  specs: ProjectSpecifications;
}

const SPEC_ICONS: Record<keyof ProjectSpecifications, LucideIcon> = {
  foundation: Layers,
  structure: Building2,
  walls: Boxes,
  roof: Home,
  ceiling: PanelTop,
  flooring: LayoutGrid,
  sanitary: Bath,
  electricity: Zap,
  water: Droplets,
};

export function BuildingSpecsSection({ specs }: BuildingSpecsSectionProps) {
  const specGroups = [
    {
      index: '01',
      title: 'Struktur & Pondasi',
      items: BUILDING_SPECS_MEDIA.slice(0, 3), // Pondasi, Struktur, Dinding
    },
    {
      index: '02',
      title: 'Arsitektur & Finishing',
      items: BUILDING_SPECS_MEDIA.slice(3, 6), // Atap, Plafon, Lantai
    },
    {
      index: '03',
      title: 'Sanitari & Utilitas',
      items: BUILDING_SPECS_MEDIA.slice(6, 9), // Sanitari, Listrik, Air
    },
  ];

  return (
    <section className="w-full bg-slate-50/40 border-b border-dashed border-slate-200">
      <SectionContainer className="py-12 sm:py-16">
        <SectionHeader
          badgeText="Standar Mutu SNI"
          title="Spesifikasi Teknis Bangunan"
          description="Material konstruksi dipilih dengan standar ketat guna menjamin kekuatan struktur dan kenyamanan jangka panjang."
          borderBottom={false}
          className="pt-0 sm:pt-0 pb-8 sm:pb-10 px-0 sm:px-0"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {specGroups.map((group, gIdx) => (
            <AnimateIn key={group.title} delayMs={gIdx * 50} className="h-full">
              <div className="group/card h-full flex flex-col justify-between rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 p-5 sm:p-6">
                <div>
                  {/* Category Card Header */}
                  <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-dashed border-slate-200">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/80 shrink-0">
                        {group.index}
                      </span>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                        {group.title}
                      </h3>
                    </div>
                  </div>

                  {/* Specification Items List */}
                  <div className="divide-y divide-dashed divide-slate-100">
                    {group.items.map((item) => {
                      const materialValue = specs[item.key] || '-';
                      const Icon = SPEC_ICONS[item.key] || Building2;

                      return (
                        <div
                          key={item.key}
                          className="group/item py-3.5 first:pt-0 last:pb-0 flex items-start gap-3.5 transition-colors"
                        >
                          {/* Minimalist Icon Badge */}
                          <div className="size-9 rounded-xl bg-slate-50 border border-slate-200/80 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-emerald-700 group-hover/item:text-white group-hover/item:border-emerald-700 group-hover/item:shadow-xs transition-all duration-200">
                            <Icon className="size-4.5" />
                          </div>

                          {/* Detail Content */}
                          <div className="min-w-0 flex-1">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                              {item.label}
                            </span>
                            <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug mt-0.5">
                              {materialValue}
                            </h4>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Card Footer Status */}
                <div className="pt-4 mt-4 border-t border-dashed border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="inline-flex items-center gap-1.5 font-medium text-slate-500">
                    <CheckCircle2 className="size-3.5 text-emerald-600" /> Standar SNI
                  </span>
                  <span className="text-emerald-700 font-semibold bg-emerald-50/70 px-2 py-0.5 rounded-md border border-emerald-100">
                    3 Spesifikasi
                  </span>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}




