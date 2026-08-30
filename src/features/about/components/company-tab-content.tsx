import React from 'react';
import { Target, Award, ShieldCheck, Building2, Trees, HeartHandshake } from 'lucide-react';
import { CompanyProfile } from '@/lib/types/company.type';
import { StatCounter, SectionEyebrow } from '@/components/shared';
import { siteConfig } from '@/lib/config/site.config';

export interface CompanyTabContentProps {
  companyData: CompanyProfile;
}

function CoreValueIcon({ name }: { name: string }) {
  switch (name) {
    case 'Building2':
      return <Building2 className="size-5 shrink-0 text-emerald-700" />;
    case 'Trees':
      return <Trees className="size-5 shrink-0 text-emerald-700" />;
    case 'HeartHandshake':
      return <HeartHandshake className="size-5 shrink-0 text-emerald-700" />;
    case 'ShieldCheck':
    default:
      return <ShieldCheck className="size-5 shrink-0 text-emerald-700" />;
  }
}

export function CompanyTabContent({ companyData }: CompanyTabContentProps) {
  const yearsInBusiness = Math.max(1, new Date().getFullYear() - companyData.establishedYear);
  const unitsBuiltStat = companyData.stats.find((s) => s.label.toLowerCase().includes('unit'))?.value || '1.200+';
  const projectsCountStat = companyData.stats.find((s) => s.label.toLowerCase().includes('kawasan'))?.value || '8 Proyek';

  return (
    <div className="flex flex-col gap-12 sm:gap-16 animate-in fade-in duration-300">
      {/* 1. History & Milestones Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
        <div className="lg:col-span-6 flex flex-col gap-4">
          <SectionEyebrow>
            Sejarah & Rekam Jejak
          </SectionEyebrow>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
            Perjalanan Berdiri{' '}
            <span className="text-emerald-800">{companyData.legalName}</span>
          </h2>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            Didirikan pada tahun {companyData.establishedYear}, {siteConfig.name} berawal dari komitmen teguh untuk menyediakan kawasan hunian yang tidak hanya asri dan berkualitas, melainkan menjamin kepastian hukum sertifikat (SHM) yang telah terpecah per kavling sejak hari pertama unit dipasarkan.
          </p>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            Dalam kurun waktu lebih dari {yearsInBusiness} tahun berkarya, kami telah sukses membangun {projectsCountStat} mandiri dengan lebih dari {unitsBuiltStat} unit rumah yang telah diserahterimakan dengan penuh kepuasan kepada keluarga Indonesia.
          </p>
        </div>

        {/* Milestone Stats Grid */}
        <div className="lg:col-span-6 rounded-2xl bg-slate-50/70 p-6 sm:p-8 border border-dashed border-slate-200 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-3">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
              Pencapaian & Kredibilitas
            </h3>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
              Terverifikasi
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {companyData.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex items-center gap-3.5 group hover:border-emerald-300 hover:shadow-xs transition-all duration-300"
              >
                <StatCounter
                  value={stat.value}
                  durationMs={2000}
                  className="font-sans text-2xl font-extrabold text-slate-900 tracking-tight group-hover:text-emerald-800 transition-colors shrink-0 select-none"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">{stat.label}</span>
                  {stat.description && (
                    <span className="text-[11px] text-slate-500 mt-0.5">{stat.description}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Visi & Misi Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Visi */}
        <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9 shadow-xs flex flex-col justify-between gap-6 hover:shadow-md transition-all duration-300">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
                <Target className="size-5.5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Panduan Masa Depan
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                  Visi Perusahaan
                </h3>
              </div>
            </div>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-serif italic pt-2 pl-2 border-l-2 border-emerald-700">
              &ldquo;{companyData.vision}&rdquo;
            </p>
          </div>
          <div className="text-xs text-slate-500 pt-3 border-t border-dashed border-slate-200">
            Fokus pada keasrian lingkungan dan kepastian legalitas tanpa kompromi.
          </div>
        </div>

        {/* Misi */}
        <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9 shadow-xs flex flex-col justify-between gap-6 hover:shadow-md transition-all duration-300">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
                <Award className="size-5.5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Aksi Nyata
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                  Misi Strategis
                </h3>
              </div>
            </div>
            <ul className="flex flex-col gap-3 text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
              {companyData.mission.map((m, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="size-5 shrink-0 flex items-center justify-center rounded-full bg-emerald-700 text-[11px] font-bold text-white mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-xs text-slate-500 pt-3 border-t border-dashed border-slate-200">
            Komitmen pelayanan terpadu bagi seluruh konsumen dan mitra perbankan.
          </div>
        </div>
      </div>

      {/* 3. Core Values Grid */}
      <div className="flex flex-col gap-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <SectionEyebrow>
            Pondasi Etika & Kerja
          </SectionEyebrow>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Nilai-Nilai Utama {siteConfig.name}
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Prinsip fundamental operasional kami dalam memberikan kepastian dan kenyamanan bagi calon pemilik rumah.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {companyData.coreValues.map((val) => (
            <div
              key={val.title}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between gap-4 group"
            >
              <div>
                <div className="size-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-colors">
                  <CoreValueIcon name={val.iconName} />
                </div>
                <h4 className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                  {val.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed mt-2">
                  {val.description}
                </p>
              </div>

              {val.metric && (
                <div className="pt-3 border-t border-dashed border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Standar Mutu</span>
                  <span className="font-sans font-extrabold text-emerald-800">
                    {val.metric} {val.metricSuffix || ''}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
