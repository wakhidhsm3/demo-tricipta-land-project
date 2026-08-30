import React from 'react';
import { BookOpen } from 'lucide-react';
import { PageHeader } from '@/components/shared';
import { siteConfig } from '@/lib/config/site.config';

export function ArticleHeader() {
  const headerContent = siteConfig.pageHeaders.articles;

  return (
    <PageHeader
      badgeText={headerContent.badgeText}
      badgeIcon={<BookOpen className="size-4" />}
      title={headerContent.title}
      highlightText={headerContent.highlightText}
      description={headerContent.description}
      backgroundImage={siteConfig.headerImages.articles}
      imageAlt="Edukasi Properti & KPR"
    />
  );
}
