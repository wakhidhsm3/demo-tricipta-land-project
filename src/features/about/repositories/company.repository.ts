import { cache } from 'react';
import { companyProfileData } from '../data/company-profile.data';
import { founderData } from '../data/founder.data';
import { legalDocumentsData } from '../data/legal-documents.data';
import {
  organizationData,
  getAllOrgMembers as fetchAllOrgMembers,
  getOrgMemberById as fetchOrgMemberById,
} from '../data/organization.data';
import {
  CompanyProfile,
  Founder,
  LegalCollection,
  OrgMember,
  OrganizationStructure,
} from '@/lib/types/company.type';
import { CompanyRepository } from '@/lib/types/repository.type';

export const companyRepository: CompanyRepository = {
  getProfile: cache(async (): Promise<CompanyProfile> => {
    return companyProfileData;
  }),

  getFounder: cache(async (): Promise<Founder> => {
    return founderData;
  }),

  getLegalDocuments: cache(async (): Promise<LegalCollection> => {
    return legalDocumentsData;
  }),

  getOrganization: cache(async (): Promise<OrganizationStructure> => {
    return organizationData;
  }),

  getAllOrgMembers: cache(async (): Promise<OrgMember[]> => {
    return fetchAllOrgMembers();
  }),

  getAllMemberIds: cache(async (): Promise<string[]> => {
    const members = fetchAllOrgMembers();
    return members.map((m) => m.id);
  }),

  getOrgMemberById: cache(async (id: string): Promise<OrgMember | undefined> => {
    return fetchOrgMemberById(id);
  }),
};
