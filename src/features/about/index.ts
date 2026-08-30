// Components
export { AboutHero } from './components/about-hero';
export { AboutTabsContainer } from './components/about-tabs-container';
export { CompanyTabContent } from './components/company-tab-content';
export { FounderTabContent } from './components/founder-tab-content';
export { LegalDocModalViewer } from './components/legal-doc-modal-viewer';
export { LegalityTabContent } from './components/legality-tab-content';
export { OrganizationTabContent } from './components/organization-tab-content';
export { OrgMemberCard, type OrgMemberCardProps } from './components/org-member-card';
export { LegalDocCard, type LegalDocCardProps } from './components/legal-doc-card';

import { companyRepository } from './repositories/company.repository';

// Data Access Layer
export { companyRepository };
export { companyProfileData } from './data/company-profile.data';
export { founderData } from './data/founder.data';
export { organizationData } from './data/organization.data';
export { legalDocumentsData } from './data/legal-documents.data';
export const getCompanyProfile = () => companyRepository.getProfile();
export const getFounder = () => companyRepository.getFounder();
export const getLegalDocuments = () => companyRepository.getLegalDocuments();
export const getOrganization = () => companyRepository.getOrganization();
export const getAllOrgMembers = () => companyRepository.getAllOrgMembers();
export const getAllOrgMemberIds = () => companyRepository.getAllMemberIds();
export const getOrgMemberById = (id: string) => companyRepository.getOrgMemberById(id);

// Types (re-exported directly from core domain types)
export type {
  CompanyProfile,
  CompanyStat,
  CompanyCoreValue,
  CompanyHeadOffice,
  NavigationItem,
  Founder,
  FounderTrackRecord,
  OrgDivision,
  OrgMember,
  OrgDepartment,
  OrganizationStructure,
  LegalCategory,
  VerificationStatus,
  LegalDocument,
  LegalCollection,
} from '@/lib/types/company.type';
