export const CONTACT_TOPICS = [
  'KONSULTASI_HUNIAN',
  'LEGALITAS',
  'KEMITRAAN',
  'LAINNYA',
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

export interface ContactTopicOption {
  value: ContactTopic;
  label: string;
}

export const CONTACT_TOPIC_OPTIONS: readonly ContactTopicOption[] = [
  { value: 'KONSULTASI_HUNIAN', label: 'Konsultasi Pembelian & KPR' },
  { value: 'LEGALITAS', label: 'Informasi Legalitas & Sertifikat' },
  { value: 'KEMITRAAN', label: 'Kerjasama & Kemitraan Bisnis' },
  { value: 'LAINNYA', label: 'Pertanyaan Lainnya' },
] as const;
