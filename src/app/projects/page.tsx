import React, { Suspense } from 'react';
import { Metadata } from 'next';
import {
  ProjectListingHeader,
  InteractiveProjectCatalog,
  getAllProjectSummaries,
  parseProjectFilterParams,
} from '@/features/projects';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Project Catalog',
  description:
    'Daftar pilihan perumahan berkualitas, hunian subsidi dan komersil dengan lokasi strategis dan legalitas resmi.',
  ogImages: ['/images/og-projects.jpg'],
  ogDescription: 'Pilihan rumah asri berkualitas dengan skema kepemilikan mudah dan aman.',
});

interface ProjectPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ProjectCatalogPage({ searchParams }: ProjectPageProps) {
  const rawParams = searchParams ? await searchParams : {};
  const filters = parseProjectFilterParams(rawParams);

  const allProjects = await getAllProjectSummaries();

  return (
    <>
      <ProjectListingHeader />
      <Suspense fallback={<div className="w-full py-16 text-center text-slate-400 text-sm">Memuat katalog proyek...</div>}>
        <InteractiveProjectCatalog
          initialProjects={allProjects}
          initialFilters={{
            category: filters.category,
            status: filters.status,
            location: filters.location,
            query: filters.query,
          }}
        />
      </Suspense>
    </>
  );
}
