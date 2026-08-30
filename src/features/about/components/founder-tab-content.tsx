import React from 'react';
import Image from 'next/image';
import { Quote, GraduationCap, CheckCircle2, Award } from 'lucide-react';
import { Founder } from '@/lib/types/company.type';
import { SectionEyebrow } from '@/components/shared';

export interface FounderTabContentProps {
  founderData: Founder;
}

export function FounderTabContent({ founderData }: FounderTabContentProps) {
  return (
    <div className="flex flex-col gap-12 sm:gap-16 animate-in fade-in duration-300">
      {/* Profile Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
        <div className="lg:col-span-5">
          <div className="relative h-110 sm:h-125 w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 group">
            <Image
              src={founderData.photoUrl}
              alt={founderData.name}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                {founderData.name}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                {founderData.title}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-5">
          <div>
            <SectionEyebrow>
              Visi Kepemimpinan
            </SectionEyebrow>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mt-2">
              {founderData.role}
            </h2>
          </div>

          <div className="relative bg-emerald-50/60 p-6 rounded-2xl border-l-4 border-emerald-700 font-serif text-base sm:text-lg italic text-slate-800 leading-relaxed shadow-2xs">
            <Quote className="h-6 w-6 text-emerald-700/30 absolute top-3 right-3" />
            &ldquo;{founderData.quote}&rdquo;
          </div>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {founderData.cvSummary}
          </p>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {founderData.visionStatement}
          </p>
        </div>
      </div>

      {/* Track Record Timeline & Education */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 pt-4 border-t border-dashed border-slate-200">
        {/* Milestones Timeline */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div>
            <SectionEyebrow>
              Dedikasi & Karya
            </SectionEyebrow>
            <h3 className="font-serif text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Rekam Jejak & Milestone
            </h3>
          </div>

          <div className="flex flex-col gap-6 border-l-2 border-dashed border-emerald-700/30 pl-6 ml-2">
            {founderData.trackRecord.map((tr, idx) => (
              <div key={idx} className="relative flex flex-col gap-1 group">
                <div className="absolute -left-7.75 top-1.5 size-3.5 rounded-full bg-emerald-700 ring-4 ring-white shadow-xs" />
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full w-fit border border-emerald-200/60">
                  Tahun {tr.year}
                </span>
                <h4 className="font-serif text-base sm:text-lg font-bold text-slate-900 mt-1">
                  {tr.achievement}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {tr.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Achievements Cards */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-slate-900 font-bold border-b border-dashed border-slate-200 pb-3">
              <div className="size-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">
                <GraduationCap className="size-5" />
              </div>
              <h4 className="font-serif text-lg">Latar Belakang Pendidikan</h4>
            </div>
            <ul className="flex flex-col gap-3 text-xs sm:text-sm text-slate-600">
              {founderData.education.map((edu, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="size-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{edu}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-slate-900 font-bold border-b border-dashed border-slate-200 pb-3">
              <div className="size-9 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700">
                <Award className="size-5" />
              </div>
              <h4 className="font-serif text-lg">Pencapaian Profesional</h4>
            </div>
            <ul className="flex flex-col gap-3 text-xs sm:text-sm text-slate-600">
              {founderData.careerHighlights.map((hl, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="size-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
