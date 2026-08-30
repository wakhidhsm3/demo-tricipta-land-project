import { Metadata } from 'next';
import {
  HeroSection,
  ValuePillarsSection,
  FeaturedProjectsSection,
  LatestArticlesSection,
  HomeCtaSection,
} from '@/features/home';
import { getCompanyProfile } from '@/features/about';
import { getFeaturedProjects } from '@/features/projects';
import { getLatestArticles } from '@/features/articles';
import { siteConfig } from '@/lib/config/site.config';
import { buildRealEstateAgentJsonLd } from '@/lib/seo/jsonld';
import { SafeJsonLd } from '@/lib/seo/safe-jsonld';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/images/og-home.jpg'],
  },
};

export default async function HomePage() {
  const [companyProfile, featuredProjects, latestArticles] = await Promise.all([
    getCompanyProfile(),
    getFeaturedProjects(),
    getLatestArticles(3),
  ]);

  const jsonLd = buildRealEstateAgentJsonLd(companyProfile);

  return (
    <>
      <SafeJsonLd data={jsonLd} />
      <HeroSection companyData={companyProfile} />
      <ValuePillarsSection pillars={companyProfile.coreValues} />
      <FeaturedProjectsSection projects={featuredProjects} />
      <LatestArticlesSection articles={latestArticles} />
      <HomeCtaSection contactData={companyProfile.headOffice} />
    </>
  );
}
