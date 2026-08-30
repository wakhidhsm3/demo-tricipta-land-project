import React from 'react';
import { PhoneCall } from 'lucide-react';
import { PageHeader } from '@/components/shared';
import { siteConfig } from '@/lib/config/site.config';

export function ContactHeader() {
  const headerContent = siteConfig.pageHeaders.contact;

  return (
    <PageHeader
      badgeText={headerContent.badgeText}
      badgeIcon={<PhoneCall className="size-4" />}
      title={headerContent.title}
      highlightText={headerContent.highlightText}
      description={headerContent.description}
      backgroundImage={siteConfig.defaultHeroImage}
      imageAlt={`Hubungi ${siteConfig.name}`}
    />
  );
}
