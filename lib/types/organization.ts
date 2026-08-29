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
