import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  ProjectDetailHero,
  AboutProjectSection,
  ProjectGalleryLightbox,
  UnitTypesSection,
  BuildingSpecsSection,
  SitePlanViewer,
  LocationFacilitiesSection,
  ProjectInquiryForm,
  getProjectById,
  getAllProjectIds,
} from '@/features/projects';

import { buildProjectJsonLd } from '@/lib/seo/jsonld';
import { SafeJsonLd } from '@/lib/seo/safe-jsonld';
import { siteConfig } from '@/lib/config/site.config';

// Next.js App Router segment config requires statically analyzable literal
export const revalidate = 3600;

interface ProjectDetailProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const ids = await getAllProjectIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: ProjectDetailProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) return { title: `Proyek Tidak Ditemukan — ${siteConfig.name}` };

  return {
    title: `${project.name} — Perumahan ${project.category} di ${project.location.city}`,
    description: project.description,
    openGraph: {
      title: `${project.name} — ${siteConfig.name}`,
      description: `Hunian nyaman di ${project.location.city}. ${project.priceFormatted}`,
      images: [project.heroImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) notFound();

  const jsonLd = buildProjectJsonLd(project);


  return (
    <>
      <SafeJsonLd data={jsonLd} />
      <ProjectDetailHero project={project} />
      <ProjectGalleryLightbox images={project.galleryImages} />
      <AboutProjectSection project={project} />
      <UnitTypesSection unitTypes={project.unitTypes} />
      <BuildingSpecsSection specs={project.specifications} />
      <SitePlanViewer sitePlanUrl={project.sitePlanImage} projectName={project.name} />
      <LocationFacilitiesSection location={project.location} facilities={project.nearbyFacilities} />
      <ProjectInquiryForm project={project} />
    </>
  );
}
