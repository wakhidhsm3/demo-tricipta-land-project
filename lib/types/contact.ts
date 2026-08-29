export type ContactTopic = 'KONSULTASI_HUNIAN' | 'KEMITRAAN' | 'LEGALITAS' | 'LAINNYA';

export interface ContactFormInput {
  name: string;
  phoneOrEmail: string;
  topic: ContactTopic;
  message: string;
}

export interface ProjectInquiryInput {
  name: string;
  phoneOrEmail: string;
  projectSlug: string;
  unitTypeId?: string;
  message: string;
}
