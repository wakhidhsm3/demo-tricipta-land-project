import React from 'react';
import { Building2 } from 'lucide-react';
import { CompanyProfile } from '@/lib/types/company.type';
import { PageHeader } from '@/components/shared';
import { siteConfig } from '@/lib/config/site.config';

export interface AboutHeroProps {
  companyData: CompanyProfile;
}

export function AboutHero({ companyData }: AboutHeroProps) {
  const headerContent = siteConfig.pageHeaders.about;

  return (
    <PageHeader
      badgeText={headerContent.badgeText}
      badgeIcon={<Building2 className="size-4" />}
      title={headerContent.title}
      highlightText={headerContent.highlightText}
      description={`Mengenal rekam jejak kepemimpinan, kepatuhan legalitas 100% aman, dan tata kelola profesional ${companyData.legalName}.`}
      backgroundImage={siteConfig.headerImages.about}
      imageAlt={`Tentang ${siteConfig.name}`}
    />
  );
}
