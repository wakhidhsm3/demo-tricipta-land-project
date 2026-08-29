import { Metadata } from 'next';
import { HeroSection } from '@/features/home/HeroSection';
import { ValuePillarsSection } from '@/features/home/ValuePillarsSection';
import { FeaturedProjectsSection } from '@/features/home/FeaturedProjectsSection';
import { LatestArticlesSection } from '@/features/home/LatestArticlesSection';
import { HomeCtaSection } from '@/features/home/HomeCtaSection';
import {
  companyProfileData,
  getFeaturedProjects,
  getLatestArticles,
} from '@/lib/data';

export const metadata: Metadata = {
  title: 'TRICIPTA LAND — Developer Properti Terpercaya & Hunian Berkualitas',
  description:
    'Pengembang perumahan terpercaya dengan legalitas 100% aman, desain hunian asri, dan lokasi strategis. Temukan rumah impian keluarga Anda di sini.',
  openGraph: {
    title: 'TRICIPTA LAND — Developer Properti Terpercaya',
    description: 'Hunian asri dan berkualitas dengan legalitas resmi dan lokasi strategis.',
    images: ['/images/og-home.jpg'],
  },
};

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();
  const latestArticles = await getLatestArticles(3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: companyProfileData.name,
    description: companyProfileData.description,
    url: 'https://triciptaland.com',
    telephone: companyProfileData.headOffice.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyProfileData.headOffice.address,
      addressLocality: companyProfileData.headOffice.city,
      addressRegion: companyProfileData.headOffice.province,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection companyData={companyProfileData} featuredProjects={featuredProjects} />
      <ValuePillarsSection pillars={companyProfileData.coreValues} />
      <FeaturedProjectsSection projects={featuredProjects} />
      <LatestArticlesSection articles={latestArticles} />
      <HomeCtaSection contactData={companyProfileData.headOffice} />
    </>
  );
}
