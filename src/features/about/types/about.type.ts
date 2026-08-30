/**
 * Domain types for About feature (Company profile, Founders, Organization structure, and Legal documents).
 */

export interface CompanyCoreValue {
  title: string;
  subtitle?: string;
  metric?: string;
  metricSuffix?: string;
  description: string;
  points?: string[];
  footerLabel?: string;
  footerValue?: string;
  iconName: string;
}

export interface CompanyStat {
  label: string;
  value: string;
  description?: string;
}

export interface CompanyHeadOffice {
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  whatsapp: string;
  email: string;
  operatingHours: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface CompanyProfile {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  descriptionEmphasis: string[];
  establishedYear: number;
  vision: string;
  mission: string[];
  coreValues: CompanyCoreValue[];
  stats: CompanyStat[];
  headOffice: CompanyHeadOffice;
  navigation: NavigationItem[];
}

export interface FounderTrackRecord {
  year: string;
  achievement: string;
  description: string;
}

export interface Founder {
  id: string;
  name: string;
  title: string;
  role: string;
  quote: string;
  photoUrl: string;
  cvSummary: string;
  visionStatement: string;
  trackRecord: FounderTrackRecord[];
  education: string[];
  careerHighlights: string[];
}

export type OrgDivision =
  | 'DIREKSI'
  | 'PERENCANAAN_TEKNIK'
  | 'LEGAL_PERIZINAN'
  | 'FINANCE'
  | 'MARKETING_SALES'
  | 'LAPANGAN';

export interface OrgMember {
  id: string;
  name: string;
  position: string;
  roleDescription: string;
  photoUrl: string;
  division: OrgDivision;
  departmentName?: string;
  bio?: string;
  responsibilities?: string[];
  education?: string;
  experienceYears?: string;
  certifications?: string[];
}

export interface OrgDepartment {
  id: string;
  name: string;
  headName: string;
  headPosition: string;
  headPhotoUrl: string;
  headRoleDescription: string;
  responsibilities: string[];
  bio?: string;
  education?: string;
  experienceYears?: string;
}

export interface OrganizationStructure {
  directors: OrgMember[];
  departments: OrgDepartment[];
  siteTeams: OrgMember[];
}

export type LegalCategory = 'CORPORATE' | 'PERMIT';
export type VerificationStatus = 'TERVERIFIKASI' | 'RESMI';

export interface LegalDocument {
  id: string;
  title: string;
  category: LegalCategory;
  documentNumber: string;
  issuedDate: string;
  issuedBy: string;
  description: string;
  previewImageUrl?: string;
  statusBadge: VerificationStatus;
}

export interface LegalCollection {
  corporate: LegalDocument[];
  permits: LegalDocument[];
}
