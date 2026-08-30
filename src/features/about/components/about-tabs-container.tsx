'use client';

import * as React from 'react';
import { Building2, UserCheck, ShieldCheck, Users } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { SectionContainer } from '@/components/shared';
import { CompanyTabContent } from './company-tab-content';
import { FounderTabContent } from './founder-tab-content';
import { LegalityTabContent } from './legality-tab-content';
import { OrganizationTabContent } from './organization-tab-content';

import {
  CompanyProfile,
  Founder,
  LegalCollection,
  OrganizationStructure,
} from '@/lib/types/company.type';

export interface AboutTabsContainerProps {
  initialTab?: string;
  companyData: CompanyProfile;
  founderData: Founder;
  legalDocs: LegalCollection;
  orgData: OrganizationStructure;
}

export function AboutTabsContainer({
  initialTab = 'company',
  companyData,
  founderData,
  legalDocs,
  orgData,
}: AboutTabsContainerProps) {
  const [activeTab, setActiveTab] = React.useState(initialTab);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tabId);
      window.history.replaceState(null, '', url.pathname + url.search);
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} variant="segmented" className="w-full">
      {/* Full-width Sticky Tab Bar Section with dashed borders and backdrop blur */}
      <div className="sticky top-16 z-40 w-full border-b border-dashed border-slate-200 bg-white/95 backdrop-blur-md shadow-2xs">
        <SectionContainer className="py-3.5 sm:py-4">
          <TabsList className="w-full">
            <TabsTrigger value="company" icon={<Building2 className="h-4 w-4" />}>
              Profil Perusahaan
            </TabsTrigger>
            <TabsTrigger value="founders" icon={<UserCheck className="h-4 w-4" />}>
              Pendiri & Kepemimpinan
            </TabsTrigger>
            <TabsTrigger value="legality" icon={<ShieldCheck className="h-4 w-4" />}>
              Legalitas & Perizinan
            </TabsTrigger>
            <TabsTrigger value="organization" icon={<Users className="h-4 w-4" />}>
              Struktur Organisasi
            </TabsTrigger>
          </TabsList>
        </SectionContainer>
      </div>

      {/* Main Tab Content with side dashed border alignment */}
      <div className="w-full bg-white">
        <SectionContainer className="py-10 sm:py-14">
          <div className="min-h-125">
            <TabsContent value="company">
              <CompanyTabContent companyData={companyData} />
            </TabsContent>
            <TabsContent value="founders">
              <FounderTabContent founderData={founderData} />
            </TabsContent>
            <TabsContent value="legality">
              <LegalityTabContent legalDocs={legalDocs} />
            </TabsContent>
            <TabsContent value="organization">
              <OrganizationTabContent orgData={orgData} />
            </TabsContent>
          </div>
        </SectionContainer>
      </div>
    </Tabs>
  );
}
