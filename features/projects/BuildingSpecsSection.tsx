import React from 'react';
import { ProjectSpecifications } from '@/lib/types/project';

export interface BuildingSpecsSectionProps {
  specs: ProjectSpecifications;
}

export function BuildingSpecsSection({ specs }: BuildingSpecsSectionProps) {
  const specList = [
    { label: 'Pondasi Bangunan', value: specs.foundation },
    { label: 'Struktur Beton', value: specs.structure },
    { label: 'Dinding Utama', value: specs.walls },
    { label: 'Rangka & Atap', value: specs.roof },
    { label: 'Plafon Ruangan', value: specs.ceiling },
    { label: 'Lantai Utama', value: specs.flooring },
    { label: 'Sanitari & Kamar Mandi', value: specs.sanitary },
    { label: 'Instalasi Listrik', value: specs.electricity },
    { label: 'Pasokan Air Bersih', value: specs.water },
  ];

  return (
    <section className="w-full bg-white border-b border-dashed border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 min-[1280px]:border-x min-[1280px]:border-dashed min-[1280px]:border-slate-200">
        <div className="flex flex-col items-center gap-2 text-center mb-8 sm:mb-10">
          <span className="font-serif italic font-semibold text-emerald-800 text-sm tracking-wide underline underline-offset-6">
            Standar Mutu SNI
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Spesifikasi Teknis Bangunan
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            Material konstruksi dipilih dengan standar ketat guna menjamin kekuatan struktur dan kenyamanan jangka panjang.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {specList.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-emerald-300 transition-all duration-200 flex flex-col gap-1.5"
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                {item.label}
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
