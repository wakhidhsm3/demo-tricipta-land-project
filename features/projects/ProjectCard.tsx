import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bed, Bath, Maximize, ArrowUpRight, ShieldCheck, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/lib/types/project';

export interface ProjectCardProps {
  project: Project;
}

const CATEGORY_LABELS: Record<string, string> = {
  KOMERSIL: 'Komersil',
  SUBSIDI: 'Subsidi FLPP',
  CLUSTERNATURAL: 'Klaster Natural',
};

export function ProjectCard({ project }: ProjectCardProps) {
  const primaryUnit = project.unitTypes[0];

  const statusLabel =
    project.status === 'DIJUAL'
      ? 'Dijual'
      : project.status === 'SEGERA_HADIR'
      ? 'Segera Hadir'
      : 'Habis Terjual';

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group relative flex flex-col justify-between p-6 sm:p-7 bg-white hover:bg-slate-50/50 hover-card-lift rounded-2xl border border-slate-200/90 shadow-2xs hover:border-emerald-300"
    >
      <div>
        {/* Card Header: Title & Action Arrow */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
              <MapPin className="size-3.5 text-emerald-700 shrink-0" />
              <span>{project.location.city}, {project.location.province}</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
              {project.name}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-1">
              {project.tagline}
            </p>
          </div>

          <div className="size-8 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 group-hover:bg-emerald-700 group-hover:border-emerald-700 group-hover:text-white transition-colors duration-200 shrink-0">
            <ArrowUpRight className="size-4" />
          </div>
        </div>

        {/* Thumbnail Image Container */}
        <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-slate-100 mt-4 border border-slate-200/80">
          <Image
            src={project.heroImage}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-slate-950/20 to-transparent" />

          {/* Floating Badges */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10">
            <div className="flex items-center gap-1.5 min-w-0">
              <span
                className={`h-6.5 px-2.5 rounded-full text-[11px] font-bold whitespace-nowrap inline-flex items-center shadow-xs ${
                  project.status === 'DIJUAL'
                    ? 'bg-emerald-700 text-white'
                    : project.status === 'SEGERA_HADIR'
                    ? 'bg-amber-500 text-slate-950 font-extrabold'
                    : 'bg-slate-700/90 text-slate-200'
                }`}
              >
                {statusLabel}
              </span>
              <span className="h-6.5 px-2.5 rounded-full text-[11px] font-semibold whitespace-nowrap inline-flex items-center bg-white/95 backdrop-blur-md text-slate-800 border border-slate-200/80 shadow-xs">
                {CATEGORY_LABELS[project.category] || project.category}
              </span>
            </div>

            <span className="h-6.5 px-2.5 rounded-full text-[10px] font-bold whitespace-nowrap inline-flex items-center gap-1 bg-slate-950/75 backdrop-blur-md text-emerald-300 border border-emerald-500/30 shadow-xs shrink-0">
              <ShieldCheck className="size-3 text-emerald-400" />
              <span>SHM & PBG</span>
            </span>
          </div>

          {/* Floating Price */}
          <div className="absolute bottom-3 left-3 z-10">
            <span className="text-[10px] font-medium text-white/80 block uppercase tracking-wider">
              Mulai Dari
            </span>
            <span className="font-sans text-xl sm:text-2xl font-extrabold text-white tracking-tight drop-shadow-xs">
              {project.priceFormatted}
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer: Specs Grid */}
      <div className="mt-5 border-t border-dashed border-slate-200 pt-4">
        {primaryUnit && (
          <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
            <div className="flex items-center gap-1.5">
              <Bed className="size-3.5 text-emerald-700 shrink-0" />
              <span>{primaryUnit.bedrooms} KT</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="size-3.5 text-emerald-700 shrink-0" />
              <span>{primaryUnit.bathrooms} KM</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize className="size-3.5 text-emerald-700 shrink-0" />
              <span>{primaryUnit.buildingArea}/{primaryUnit.landArea}m²</span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
