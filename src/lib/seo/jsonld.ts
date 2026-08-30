import { siteConfig } from '@/lib/config/site.config';
import { CompanyProfile, OrgMember } from '@/lib/types/company.type';
import { Project } from '@/features/projects/types/project.type';
import { Article } from '@/features/articles/types/article.type';

/**
 * Shared helper to generate Schema.org PostalAddress structured data.
 */
export function buildPostalAddress(addressData: {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode?: string;
  addressCountry?: string;
}) {
  return {
    '@type': 'PostalAddress',
    streetAddress: addressData.streetAddress,
    addressLocality: addressData.addressLocality,
    addressRegion: addressData.addressRegion,
    ...(addressData.postalCode ? { postalCode: addressData.postalCode } : {}),
    addressCountry: addressData.addressCountry || 'ID',
  };
}

/**
 * Internal base helper for organization and local business schema mapping.
 */
function buildBusinessSchemaBase(type: 'RealEstateAgent' | 'LocalBusiness', companyData: CompanyProfile) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name: companyData.name,
    legalName: companyData.legalName,
    description: companyData.description,
    url: siteConfig.url,
    telephone: companyData.headOffice.phone,
    email: companyData.headOffice.email,
    address: buildPostalAddress({
      streetAddress: companyData.headOffice.address,
      addressLocality: companyData.headOffice.city,
      addressRegion: companyData.headOffice.province,
      postalCode: companyData.headOffice.postalCode,
    }),
  };
}

/**
 * Generate Schema.org RealEstateAgent structured data.
 */
export function buildRealEstateAgentJsonLd(companyData: CompanyProfile) {
  return buildBusinessSchemaBase('RealEstateAgent', companyData);
}

/**
 * Generate Schema.org AboutPage structured data.
 */
export function buildAboutPageJsonLd(companyData: CompanyProfile) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${companyData.name}`,
    description: companyData.description,
    mainEntity: {
      '@type': 'Organization',
      name: companyData.legalName,
      foundingDate: `${companyData.establishedYear}`,
      url: siteConfig.url,
      telephone: companyData.headOffice.phone,
      email: companyData.headOffice.email,
    },
  };
}

/**
 * Generate Schema.org LocalBusiness structured data for contact page.
 */
export function buildContactPageJsonLd(companyData: CompanyProfile) {
  return buildBusinessSchemaBase('LocalBusiness', companyData);
}

/**
 * Generate Schema.org Person structured data for org members / directors.
 */
export function buildPersonJsonLd(member: OrgMember) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.position,
    worksFor: {
      '@type': 'Organization',
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
    image: member.photoUrl,
    description: member.roleDescription,
  };
}

/**
 * Generate Schema.org SingleFamilyResidence structured data for projects.
 */
export function buildProjectJsonLd(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SingleFamilyResidence',
    name: project.name,
    description: project.description,
    image: project.heroImage,
    address: buildPostalAddress({
      streetAddress: project.location.fullAddress,
      addressLocality: project.location.city,
      addressRegion: project.location.province,
    }),
    offers: {
      '@type': 'Offer',
      price: project.priceStartingFrom,
      priceCurrency: 'IDR',
      availability:
        project.status === 'DIJUAL'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
    },
  };
}

/**
 * Generate Schema.org Article structured data.
 */
export function buildArticleJsonLd(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage.url,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Organization',
      name: `${siteConfig.name} Editorial`,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
  };
}
