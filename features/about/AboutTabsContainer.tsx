'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Building2, UserCheck, ShieldCheck, Users } from 'lucide-react';
import { Tabs } from '@/components/ui/tabs';
import { CompanyTabContent } from './CompanyTabContent';
import { FounderTabContent } from './FounderTabContent';
import { LegalityTabContent } from './LegalityTabContent';
import { OrganizationTabContent } from './OrganizationTabContent';

import { CompanyProfile } from '@/lib/types/company';
import { Founder } from '@/lib/types/founder';
import { LegalCollection } from '@/lib/types/legal';
import { OrganizationStructure } from '@/lib/types/organization';

export interface AboutTabsContainerProps {
  initialTab: string;
  companyData: CompanyProfile;
  founderData: Founder;
  legalDocs: LegalCollection;
  orgData: OrganizationStructure;
}

export function AboutTabsContainer({
  initialTab,
  companyData,
  founderData,
  legalDocs,
  orgData,
}: AboutTabsContainerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = React.useState(initialTab || 'company');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    router.push(`${pathname}?tab=${tabId}`, { scroll: false });
  };

  const tabItems = [
    { id: 'company', label: 'Profil Perusahaan', icon: <Building2 className="h-4 w-4" /> },
    { id: 'founders', label: 'Pendiri & Kepemimpinan', icon: <UserCheck className="h-4 w-4" /> },
    { id: 'legality', label: 'Legalitas & Perizinan', icon: <ShieldCheck className="h-4 w-4" /> },
    { id: 'organization', label: 'Struktur Organisasi', icon: <Users className="h-4 w-4" /> },
  ];

  return (
    <div className="w-full">
      {/* Full-width Sticky Tab Bar Section with dashed borders and backdrop blur */}
      <div className="sticky top-16 z-40 w-full border-b border-dashed border-slate-200 bg-white/95 backdrop-blur-md shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 min-[1280px]:border-x min-[1280px]:border-dashed min-[1280px]:border-slate-200">
          <Tabs
            tabs={tabItems}
            activeTab={activeTab}
            onChange={handleTabChange}
            variant="segmented"
            className="w-full"
          />
        </div>
      </div>

      {/* Main Tab Content with side dashed border alignment */}
      <div className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 min-[1280px]:border-x min-[1280px]:border-dashed min-[1280px]:border-slate-200">
          <div className="min-h-125">
            {activeTab === 'company' && <CompanyTabContent companyData={companyData} />}
            {activeTab === 'founders' && <FounderTabContent founderData={founderData} />}
            {activeTab === 'legality' && <LegalityTabContent legalDocs={legalDocs} />}
            {activeTab === 'organization' && <OrganizationTabContent orgData={orgData} />}
          </div>
        </div>
      </div>
    </div>
  );
}
