import type { CompanyHeadOffice, NavigationItem } from '@/lib/types/company.type';

export interface SiteConfigType {
  readonly name: string;
  readonly shortName: string;
  readonly legalName: string;
  readonly title: string;
  readonly description: string;
  readonly url: string;
  readonly locale: string;
  readonly themeColor: string;
  readonly headOffice: CompanyHeadOffice;
  readonly socials: {
    readonly instagram: string;
    readonly facebook: string;
    readonly youtube: string;
    readonly tiktok: string;
  };
  readonly navigation: readonly NavigationItem[];
  readonly pagination: {
    readonly defaultPageSize: number;
  };
  readonly defaultOgImage: string;
  readonly defaultHeroImage: string;
  readonly defaultPageHeaderImage: string;
  readonly headerImages: {
    readonly about: string;
    readonly projects: string;
    readonly articles: string;
    readonly contact: string;
  };
}

export const CANONICAL_HEAD_OFFICE: CompanyHeadOffice = {
  address: 'Jl. Raya Utama TRICIPTA No. 88, Kawasan Bisnis Terpadu',
  city: 'Bandung',
  province: 'Jawa Barat',
  postalCode: '40115',
  phone: '+62 22 8888 7777',
  whatsapp: '6281234567890',
  email: 'info@triciptaland.com',
  operatingHours: 'Senin - Sabtu: 08.00 - 17.00 WIB',
  googleMapsUrl: 'https://maps.google.com/?q=TRICIPTA+LAND+Head+Office',
  googleMapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.40912193563!2d107.5731168!3d-6.9034443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6398252477f%3A0x146a9a72384e4b2d!2sBandung%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid',
};

export const CANONICAL_NAVIGATION: readonly NavigationItem[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang Kami', href: '/about' },
  { label: 'Katalog Proyek', href: '/projects' },
  { label: 'Artikel & Tips', href: '/articles' },
  { label: 'Kontak Kami', href: '/contact' },
] as const;

export const siteConfig = {
  name: 'TRICIPTA LAND',
  shortName: 'TRICIPTA LAND',
  legalName: 'PT TRICIPTA LAND INDONESIA',
  title: 'TRICIPTA LAND — Developer Properti Terpercaya & Hunian Berkualitas',
  description:
    'Pengembang perumahan terpercaya dengan legalitas 100% aman, desain hunian asri, dan lokasi strategis. Temukan rumah impian keluarga Anda di sini.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://triciptaland.com',
  locale: 'id_ID',
  themeColor: '#064e3b',
  headOffice: CANONICAL_HEAD_OFFICE,
  socials: {
    instagram: 'https://instagram.com/triciptaland',
    facebook: 'https://facebook.com/triciptaland',
    youtube: 'https://youtube.com/@triciptaland',
    tiktok: 'https://tiktok.com/@triciptaland',
  },
  navigation: CANONICAL_NAVIGATION,
  pagination: {
    defaultPageSize: 6,
  },
  defaultOgImage: '/images/logo.png',
  defaultHeroImage:
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
  defaultPageHeaderImage:
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop',
  headerImages: {
    about:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
    projects:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop',
    articles:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop',
    contact:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
  },
  cacheRevalidateDurations: {
    detailPages: 3600,
  },
  pageHeaders: {
    about: {
      badgeText: 'Profil Perusahaan & Kredibilitas',
      title: 'Integritas & Kepercayaan dalam',
      highlightText: 'Setiap Bangunan',
      description:
        'Mengenal rekam jejak kepemimpinan, kepatuhan legalitas 100% aman, dan tata kelola profesional PT TRICIPTA LAND INDONESIA.',
    },
    projects: {
      badgeText: 'Katalog Perumahan Resmi',
      title: 'Temukan Kawasan Hunian',
      highlightText: 'Berlegalitas Resmi',
      description:
        'Pilihan perumahan subsidi FLPP, komersil modern, dan klaster tropical villa berlokasi strategis dengan sertifikat 100% aman dan terverifikasi.',
    },
    articles: {
      badgeText: 'Edukasi & Wawasan Properti',
      title: 'Wawasan Hunian &',
      highlightText: 'Panduan KPR Keluarga',
      description:
        'Temukan panduan praktis seputar legalitas sertifikat tanah, tips memilih rumah pertama, dan simulasi skema cicilan KPR terpercaya.',
    },
    contact: {
      badgeText: 'Konsultasi & Layanan Resmi',
      title: 'Konsultasi Properti Bersama',
      highlightText: 'Tim TRICIPTA LAND',
      description:
        'Tim marketing dan customer care kami siap membantu kebutuhan informasi perumahan, cek ketersediaan kavling, dan penjadwalan survei lokasi.',
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
