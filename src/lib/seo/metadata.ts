import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site.config';

export interface PageMetadataOptions {
  /** Page-specific title segment (before the brand name). */
  title: string;
  /** Meta description for SEO. */
  description: string;
  /** OG image path(s). Defaults to `siteConfig.defaultOgImage`. */
  ogImages?: string[];
  /** Override the full OG title if different from page title. */
  ogTitle?: string;
  /** Override the OG description if different from page description. */
  ogDescription?: string;
}

/**
 * Generate standardised Next.js Metadata with consistent brand formatting.
 *
 * Title format: `{pageTitle} — {siteConfig.name}`
 */
export function generatePageMetadata({
  title,
  description,
  ogImages,
  ogTitle,
  ogDescription,
}: PageMetadataOptions): Metadata {
  const fullTitle = `${title} — ${siteConfig.name}`;
  const images = ogImages ?? [siteConfig.defaultOgImage];

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: ogTitle ?? fullTitle,
      description: ogDescription ?? description,
      images,
    },
  };
}
