import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ProjectCard } from '@/features/projects/ProjectCard';
import { Project } from '@/lib/types/project';
import { AnimateIn } from '@/components/shared/AnimateIn';

export interface FeaturedProjectsSectionProps {
  projects: Project[];
}

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  return (
    <section id="proyek-pilihan" className="w-full bg-white border-b border-dashed border-slate-200">
      <div className="mx-auto max-w-7xl min-[1280px]:border-x min-[1280px]:border-dashed min-[1280px]:border-slate-200">
        {/* Section Header */}
        <AnimateIn variant="fade-up" durationMs={500}>
          <div className="px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-10 sm:pb-12 text-center flex flex-col items-center gap-3 border-b border-dashed border-slate-200">
            <span className="font-serif italic font-semibold text-emerald-800 text-sm sm:text-base tracking-wide underline underline-offset-6">
              Kawasan Hunian Unggulan
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-slate-900 tracking-tight max-w-3xl">
              Pilihan Perumahan <span className="relative inline-block text-emerald-800">TRICIPTA LAND</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
              Jelajahi portofolio kawasan perumahan pilihan kami yang dirancang khusus untuk kenyamanan keluarga dan nilai investasi masa depan.
            </p>
          </div>
        </AnimateIn>

        {/* Projects Grid */}
        <div className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-slate-50/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <AnimateIn
                key={project.id}
                variant="fade-up"
                delayMs={idx * 120}
                durationMs={550}
              >
                <ProjectCard project={project} />
              </AnimateIn>
            ))}
          </div>
        </div>

        {/* Bottom Action Button Bar */}
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 border-t border-dashed border-slate-200 bg-slate-50/40 flex justify-center">
          <Link href="/projects">
            <button className="h-11 sm:h-12 px-7 rounded-xl bg-slate-900 hover:bg-black text-white font-medium text-sm sm:text-base inline-flex items-center justify-center gap-2.5 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-md shadow-slate-900/10 select-none">
              <span>Explore Semua Proyek</span>
              <ArrowUpRight className="size-4.5 text-slate-300" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
