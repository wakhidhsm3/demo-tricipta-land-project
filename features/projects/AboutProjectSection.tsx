import React from 'react';
import { ShieldCheck, Check, FileText, Download, Sparkles, Building2, Trees, Compass } from 'lucide-react';
import { Project } from '@/lib/types/project';
import { AnimateIn } from '@/components/shared/AnimateIn';

export interface AboutProjectSectionProps {
  project: Project;
}

export function AboutProjectSection({ project }: AboutProjectSectionProps) {
  return (
    <section id="tentang-proyek" className="w-full bg-white border-b border-dashed border-slate-200">
      <div className="mx-auto max-w-7xl min-[1280px]:border-x min-[1280px]:border-dashed min-[1280px]:border-slate-200">
        {/* Section Header */}
        <AnimateIn variant="fade-up" durationMs={500}>
          <div className="px-4 sm:px-6 lg:px-8 pt-14 sm:pt-18 pb-8 sm:pb-10 text-center flex flex-col items-center gap-3 border-b border-dashed border-slate-200">
            <span className="font-serif italic font-semibold text-emerald-800 text-sm sm:text-base tracking-wide underline underline-offset-6">
              Tentang Kawasan Hunian
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-slate-900 tracking-tight max-w-3xl">
              Konsep & Keunggulan <span className="text-emerald-800">{project.name}</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
              {project.tagline}
            </p>
          </div>
        </AnimateIn>

        {/* Main Content: 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-dashed divide-slate-200">
          {/* Left Column: Narrative Description & Key Highlights */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-12 flex flex-col gap-8 bg-white">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-serif font-bold text-lg sm:text-xl">
                <Sparkles className="size-5 text-emerald-700 shrink-0" />
                <h3>Deskripsi & Filosofi Kawasan</h3>
              </div>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-justify sm:text-left font-normal">
                {project.description}
              </p>
            </div>

            {/* Highlights Grid */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-dashed border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Keunggulan Utama Kawasan
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all duration-200"
                    >
                      <div className="size-5 rounded-full bg-emerald-100/80 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="size-3 stroke-[2.5]" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-700 font-medium leading-snug">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Key Facts Card & Legal Guarantee */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-12 flex flex-col justify-between gap-6 bg-slate-50/30">
            <div className="space-y-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Informasi Penting Kawasan
              </h4>

              {/* Quick Facts List */}
              <div className="divide-y divide-dashed divide-slate-200 rounded-2xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden">
                <div className="p-4 flex items-center justify-between gap-3 text-xs sm:text-sm">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Building2 className="size-4 text-emerald-700" />
                    Kategori Hunian
                  </span>
                  <span className="font-bold text-slate-900">
                    {project.category === 'KOMERSIL'
                      ? 'Komersil Modern'
                      : project.category === 'SUBSIDI'
                      ? 'Subsidi FLPP Pemerintah'
                      : 'Klaster Tropical Villa'}
                  </span>
                </div>

                <div className="p-4 flex items-center justify-between gap-3 text-xs sm:text-sm">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Trees className="size-4 text-emerald-700" />
                    Total Luas Lahan
                  </span>
                  <span className="font-bold text-slate-900">{project.totalAreaHectares} Hektar</span>
                </div>

                <div className="p-4 flex items-center justify-between gap-3 text-xs sm:text-sm">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Compass className="size-4 text-emerald-700" />
                    Total Unit Rencana
                  </span>
                  <span className="font-bold text-slate-900">{project.totalUnits} Unit</span>
                </div>

                <div className="p-4 flex items-center justify-between gap-3 text-xs sm:text-sm">
                  <span className="text-slate-500 flex items-center gap-2">
                    <ShieldCheck className="size-4 text-emerald-700" />
                    Legalitas Sertifikat
                  </span>
                  <span className="font-bold text-emerald-800">SHM & PBG Terbit</span>
                </div>
              </div>

              {/* Legal Guarantee Trust Callout */}
              <div className="p-5 rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/60 flex items-start gap-3.5">
                <ShieldCheck className="size-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs leading-relaxed">
                  <strong className="text-slate-900 font-bold block text-sm">
                    Garansi Legalitas 100% Aman
                  </strong>
                  <p className="text-slate-600">
                    Setiap unit kavling di {project.name} telah melalui verifikasi izin tata ruang, perizinan bangunan gedung (PBG), dan sertifikat siap balik nama.
                  </p>
                </div>
              </div>
            </div>

            {/* Brochure Download CTA (if brochurePdfUrl exists) */}
            {project.brochurePdfUrl && (
              <a
                href={project.brochurePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 px-5 rounded-xl bg-slate-900 hover:bg-black text-white font-medium text-xs sm:text-sm inline-flex items-center justify-center gap-2.5 shadow-xs transition-colors"
              >
                <FileText className="size-4 text-emerald-300" />
                <span>Unduh E-Brosur Lengkap (PDF)</span>
                <Download className="size-3.5 opacity-70" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
