import { Metadata } from 'next';
import { ProjectListingHeader } from '@/features/projects/ProjectListingHeader';
import { InteractiveProjectCatalog } from '@/features/projects/InteractiveProjectCatalog';
import { getAllProjects } from '@/lib/data/projects';

export const metadata: Metadata = {
  title: 'Project Catalog — TRICIPTA LAND',
  description:
    'Daftar pilihan perumahan berkualitas, hunian subsidi dan komersil dengan lokasi strategis dan legalitas resmi.',
  openGraph: {
    title: 'Project Catalog — TRICIPTA LAND',
    description: 'Pilihan rumah asri berkualitas dengan skema kepemilikan mudah dan aman.',
    images: ['/images/og-projects.jpg'],
  },
};

interface ProjectPageProps {
  searchParams: Promise<{
    category?: string;
    status?: string;
    location?: string;
    q?: string;
  }>;
}

export default async function ProjectCatalogPage({ searchParams }: ProjectPageProps) {
  const params = await searchParams;
  const allProjects = await getAllProjects();

  return (
    <>
      <ProjectListingHeader />
      <InteractiveProjectCatalog
        initialProjects={allProjects}
        initialFilters={{
          category: params.category || 'ALL',
          status: params.status || 'ALL',
          location: params.location || 'ALL',
          query: params.q || '',
        }}
      />
    </>
  );
}
