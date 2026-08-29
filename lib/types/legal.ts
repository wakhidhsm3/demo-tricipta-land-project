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
