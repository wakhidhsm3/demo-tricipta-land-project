import { Metadata } from 'next';
import {
  AboutHero,
  AboutTabsContainer,
  getCompanyProfile,
  getFounder,
  getLegalDocuments,
  getOrganization,
} from '@/features/about';
import { buildAboutPageJsonLd } from '@/lib/seo/jsonld';
import { SafeJsonLd } from '@/lib/seo/safe-jsonld';
import { generatePageMetadata } from '@/lib/seo/metadata';

interface AboutPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export const metadata: Metadata = generatePageMetadata({
  title: 'About Us',
  description:
    'Mengenal profil perusahaan, rekam jejak pendiri, transparansi legalitas 100% aman, dan struktur organisasi pengembang perumahan terpercaya.',
  ogImages: ['/images/og-about.jpg'],
  ogDescription: 'Profil perusahaan, pendiri, legalitas resmi, dan tata kelola profesional.',
});

export default async function AboutPage({ searchParams }: AboutPageProps) {
  const params = await searchParams;
  const activeTab = params.tab || 'company';

  const [companyProfile, founder, legalDocs, organization] = await Promise.all([
    getCompanyProfile(),
    getFounder(),
    getLegalDocuments(),
    getOrganization(),
  ]);

  const jsonLd = buildAboutPageJsonLd(companyProfile);

  return (
    <>
      <SafeJsonLd data={jsonLd} />
      <AboutHero companyData={companyProfile} />
      <AboutTabsContainer
        initialTab={activeTab}
        companyData={companyProfile}
        founderData={founder}
        legalDocs={legalDocs}
        orgData={organization}
      />
    </>
  );
}
