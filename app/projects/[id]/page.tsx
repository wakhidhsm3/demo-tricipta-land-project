import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectDetailHero } from '@/features/projects/ProjectDetailHero';
import { AboutProjectSection } from '@/features/projects/AboutProjectSection';
import { ProjectGalleryLightbox } from '@/features/projects/ProjectGalleryLightbox';
import { UnitTypesSection } from '@/features/projects/UnitTypesSection';
import { BuildingSpecsSection } from '@/features/projects/BuildingSpecsSection';
import { SitePlanViewer } from '@/features/projects/SitePlanViewer';
import { LocationFacilitiesSection } from '@/features/projects/LocationFacilitiesSection';
import { ProjectInquiryForm } from '@/features/projects/ProjectInquiryForm';
import { getProjectById, getAllProjects } from '@/lib/data/projects';

interface ProjectDetailProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: ProjectDetailProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) return { title: 'Proyek Tidak Ditemukan — TRICIPTA LAND' };

  return {
    title: `${project.name} — Perumahan ${project.category} di ${project.location.city}`,
    description: project.description,
    openGraph: {
      title: `${project.name} — TRICIPTA LAND`,
      description: `Hunian nyaman di ${project.location.city}. ${project.priceFormatted}`,
      images: [project.heroImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SingleFamilyResidence',
    name: project.name,
    description: project.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: project.location.city,
      addressRegion: project.location.province,
    },
    offers: {
      '@type': 'Offer',
      price: project.priceStartingFrom,
      priceCurrency: 'IDR',
      availability: project.status === 'DIJUAL' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
