export interface ConsultationBenefitItem {
  id: string;
  iconName: 'FileText' | 'CalendarCheck2' | 'ShieldCheck';
  title: string;
  desc: string;
}

export const consultationBenefitsData: readonly ConsultationBenefitItem[] = [
  {
    id: 'pricelist',
    iconName: 'FileText',
    title: 'Pricelist Resmi & E-Brosur Lengkap',
    desc: 'Dapatkan daftar harga tipe unit terkini beserta rincian spesifikasi teknis.',
  },
  {
    id: 'kpr-survey',
    iconName: 'CalendarCheck2',
    title: 'Simulasi KPR & Jadwal Survey',
    desc: 'Bebas konsultasi skema cicilan KPR dan pendampingan survey langsung ke lokasi.',
  },
  {
    id: 'legal-guarantee',
    iconName: 'ShieldCheck',
    title: 'Jaminan Kepastian Hukum (SHM & PBG)',
    desc: 'Informasi legalitas sertifikat pecah per unit siap balik nama di hadapan Notaris/PPAT.',
  },
] as const;
