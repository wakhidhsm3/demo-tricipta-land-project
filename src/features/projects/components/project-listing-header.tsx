import React from 'react';
import { Home } from 'lucide-react';
import { PageHeader } from '@/components/shared';
import { siteConfig } from '@/lib/config/site.config';

export function ProjectListingHeader() {
  const headerContent = siteConfig.pageHeaders.projects;

  return (
    <PageHeader
      badgeText={headerContent.badgeText}
      badgeIcon={<Home className="size-4" />}
      title={headerContent.title}
      highlightText={headerContent.highlightText}
      description={headerContent.description}
      backgroundImage={siteConfig.headerImages.projects}
      imageAlt={`Katalog Proyek ${siteConfig.name}`}
    />
  );
}
