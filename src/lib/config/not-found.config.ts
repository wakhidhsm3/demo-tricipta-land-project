export interface NotFoundQuickLink {
  href: string;
  title: string;
  desc: string;
  iconName: 'Compass' | 'BookOpen' | 'Building2' | 'PhoneCall';
}

export const notFoundQuickLinksConfig: readonly NotFoundQuickLink[] = [
  {
    href: '/projects',
    title: 'Katalog Perumahan',
    desc: 'Pilihan rumah subsidi & komersil siap huni dengan legalitas resmi 100% aman.',
    iconName: 'Compass',
  },
  {
    href: '/articles',
    title: 'Artikel & Tips KPR',
    desc: 'Panduan lengkap membeli rumah pertama, syarat pengajuan KPR, dan wawasan investasi.',
    iconName: 'BookOpen',
  },
  {
    href: '/about',
    title: 'Profil & Legalitas PT',
    desc: 'Transparansi akta pendirian, izin Kemenkumham, dan jajaran kepemimpinan.',
    iconName: 'Building2',
  },
  {
    href: '/contact',
    title: 'Kontak Kantor Pusat',
    desc: 'Alamat kantor representatif, peta lokasi, jam operasional, dan customer care.',
    iconName: 'PhoneCall',
  },
] as const;

/** Backward-compatible alias */
export const notFoundQuickLinksData = notFoundQuickLinksConfig;
