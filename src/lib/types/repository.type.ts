import type {
  CompanyProfile,
  Founder,
  LegalCollection,
  OrganizationStructure,
  OrgMember,
} from './company.type';

/**
 * Generic interface for read-only repository data access.
 */
export interface ReadRepository<T> {
  getAll(): Promise<T[]>;
  getAllIds(): Promise<string[]>;
  getById(id: string): Promise<T | undefined>;
}

/**
 * Generic pagination query parameters for scalable data sources.
 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  category?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Generic paginated response structure.
 */
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Contract interface for company and corporate profile repository access.
 */
export interface CompanyRepository {
  getProfile(): Promise<CompanyProfile>;
  getFounder(): Promise<Founder>;
  getLegalDocuments(): Promise<LegalCollection>;
  getOrganization(): Promise<OrganizationStructure>;
  getAllOrgMembers(): Promise<OrgMember[]>;
  getAllMemberIds(): Promise<string[]>;
  getOrgMemberById(id: string): Promise<OrgMember | undefined>;
}

/**
 * Lead capture record categories.
 */
export type LeadInquiryType = 'CONTACT' | 'PROJECT';

/**
 * Standardized lead persistence entity.
 */
export interface LeadRecord {
  id: string;
  type: LeadInquiryType;
  name: string;
  contact: string;
  topicOrProject: string;
  unitType?: string;
  message: string;
  createdAt: string;
  metadata?: Record<string, unknown>;
}

/**
 * Contract interface for lead persistence, audit trail, and CRM synchronization.
 */
export interface LeadRepository {
  saveLead(lead: Omit<LeadRecord, 'id' | 'createdAt'>): Promise<LeadRecord>;
  getAllLeads(): Promise<LeadRecord[]>;
}
