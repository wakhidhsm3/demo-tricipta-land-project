import { Metadata } from 'next';
import { AboutHero } from '@/features/about/AboutHero';
import { AboutTabsContainer } from '@/features/about/AboutTabsContainer';
import {
  companyProfileData,
  founderData,
  legalDocumentsData,
  organizationData,
} from '@/lib/data';

interface AboutPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export const metadata: Metadata = {
  title: 'About Us — TRICIPTA LAND',
  description:
    'Mengenal profil perusahaan, rekam jejak pendiri, transparansi legalitas 100% aman, dan struktur organisasi pengembang perumahan TRICIPTA LAND.',
  openGraph: {
    title: 'About Us — TRICIPTA LAND',
    description: 'Profil perusahaan, pendiri, legalitas resmi, dan tata kelola profesional TRICIPTA LAND.',
    images: ['/images/og-about.jpg'],
  },
};

export default async function AboutPage({ searchParams }: AboutPageProps) {
  const params = await searchParams;
  const activeTab = params.tab || 'company';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${companyProfileData.name}`,
    description: companyProfileData.description,
    mainEntity: {
      '@type': 'Organization',
      name: companyProfileData.legalName,
      foundingDate: `${companyProfileData.establishedYear}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutHero companyData={companyProfileData} />
      <AboutTabsContainer
        initialTab={activeTab}
        companyData={companyProfileData}
        founderData={founderData}
        legalDocs={legalDocumentsData}
        orgData={organizationData}
      />
    </>
  );
}
