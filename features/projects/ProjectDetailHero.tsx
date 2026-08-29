import React from 'react';
import Link from 'next/link';
import { MapPin, ShieldCheck, ChevronRight, Home, Building2, Trees, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/lib/types/project';

export interface ProjectDetailHeroProps {
  project: Project;
}

const CATEGORY_LABELS: Record<string, string> = {
  KOMERSIL: 'Komersil',
  SUBSIDI: 'Subsidi FLPP',
  CLUSTERNATURAL: 'Klaster Natural',
};

export function ProjectDetailHero({ project }: ProjectDetailHeroProps) {
  const statusBadgeVariant =
    project.status === 'DIJUAL' ? 'default' : project.status === 'SEGERA_HADIR' ? 'gold' : 'muted';

  const statusLabel =
    project.status === 'DIJUAL'
      ? 'Dijual (Tersedia)'
      : project.status === 'SEGERA_HADIR'
      ? 'Segera Hadir'
      : 'Habis Terjual';

  return (
    <>
      {/* Sticky Breadcrumb Bar */}
      <div className="sticky top-16 z-40 w-full bg-white/95 backdrop-blur-md border-b border-dashed border-slate-200 shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 min-[1280px]:border-x min-[1280px]:border-dashed min-[1280px]:border-slate-200">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap">
            <Link href="/" className="inline-flex items-center gap-1 hover:text-emerald-800 transition-colors font-medium">
              <Home className="size-3.5 text-slate-400" />
              <span>Beranda</span>
            </Link>
            <ChevronRight className="size-3.5 text-slate-300" />
            <Link href="/projects" className="hover:text-emerald-800 transition-colors font-medium">
              Katalog Proyek
            </Link>
            <ChevronRight className="size-3.5 text-slate-300" />
            <span className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-md lg:max-w-xl">
              {project.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Hero Header Section */}
      <div className="relative w-full overflow-hidden bg-white border-b border-dashed border-slate-200">
        {/* Background Architectural Grid Pattern */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-size-[3.5rem_3.5rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 min-[1280px]:border-x min-[1280px]:border-dashed min-[1280px]:border-slate-200">

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          <Badge variant={statusBadgeVariant} className="text-xs px-3 py-1 rounded-full shadow-2xs font-semibold">
            {statusLabel}
          </Badge>
          <Badge variant="outline" className="text-xs px-3 py-1 rounded-full text-emerald-800 border-emerald-200 bg-emerald-50/50 font-bold">
            {CATEGORY_LABELS[project.category] || project.category}
          </Badge>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 px-3 py-1 text-xs font-semibold text-emerald-800">
            <ShieldCheck className="size-3.5 text-emerald-700" />
            <span>Sertifikat Ready (SHM & PBG)</span>
          </span>
        </div>

        {/* Title with Curve Underline & Location */}
        <div className="max-w-4xl space-y-3">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            {project.name}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            {project.tagline}
          </p>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 pt-1">
            <MapPin className="size-4 text-emerald-700 shrink-0" />
            <span>{project.location.fullAddress}</span>
          </div>
        </div>

        {/* Highlight Stats Bar inside Dashed Card */}
        <div className="mt-8 rounded-2xl bg-slate-50/70 p-5 sm:p-6 border border-dashed border-slate-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Harga Mulai Dari
              </span>
              <span className="font-sans text-xl sm:text-2xl lg:text-3xl font-extrabold text-emerald-800 tracking-tight block">
                {project.priceFormatted}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Luas Kawasan
              </span>
              <span className="font-sans text-xl sm:text-2xl font-bold text-slate-900 tracking-tight block">
                {project.totalAreaHectares} <span className="text-sm font-medium text-slate-500">Hektar</span>
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Sisa Unit Tersedia
              </span>
              <span className="font-sans text-xl sm:text-2xl font-bold text-slate-900 tracking-tight block">
                {project.availableUnits} <span className="text-sm font-medium text-slate-500">/ {project.totalUnits} Unit</span>
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Status Kepemilikan
              </span>
              <span className="font-sans text-base sm:text-lg font-bold text-emerald-800 tracking-tight block mt-1">
                SHM Murni (Pecah)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
