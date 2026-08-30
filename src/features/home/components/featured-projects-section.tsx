import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Project, ProjectSummary, ProjectCard } from '@/features/projects';
import { AnimateIn, SectionHeader, SectionContainer } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/config/site.config';

export interface FeaturedProjectsSectionProps {
  projects: (Project | ProjectSummary)[];
}

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  return (
    <section id="proyek-pilihan" className="w-full bg-white border-b border-dashed border-slate-200">
      <SectionContainer noPadding>
        {/* Section Header */}
        <SectionHeader
          badgeText="Kawasan Hunian Unggulan"
          title={
            <>
              Pilihan Perumahan <span className="relative inline-block text-emerald-800">{siteConfig.name}</span>
            </>
          }
          description="Jelajahi portofolio kawasan perumahan pilihan kami yang dirancang khusus untuk kenyamanan keluarga dan nilai investasi masa depan."
        />

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
            <Button
              variant="default"
              size="lg"
              className="bg-slate-900 hover:bg-black text-white"
            >
              <span>Explore Semua Proyek</span>
              <ArrowUpRight className="size-4.5 text-slate-300" />
            </Button>
          </Link>
        </div>
      </SectionContainer>
    </section>
  );
}
