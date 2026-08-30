import { CompanyProfile } from '@/lib/types/company.type';
import { CANONICAL_HEAD_OFFICE, CANONICAL_NAVIGATION } from '@/lib/config/site.config';

export const companyProfileData: CompanyProfile = {
  name: 'TRICIPTA LAND',
  legalName: 'PT TRICIPTA LAND INDONESIA',
  tagline: 'Developer Properti Terpercaya & Hunian Berkualitas',
  description:
    'TRICIPTA LAND adalah perusahaan pengembang perumahan (real estate developer) terpercaya yang berfokus pada pembangunan hunian asri, berkualitas tinggi, berlokasi strategis, dan didukung kelengkapan legalitas 100% aman bagi kenyamanan keluarga.',
  descriptionEmphasis: [
    'terpercaya',
    'hunian asri',
    'berkualitas tinggi',
    'berlokasi strategis',
    'legalitas 100% aman',
  ],
  establishedYear: 2018,
  vision:
    'Menjadi developer perumahan terdepan di Indonesia yang terpercaya dalam menyajikan kawasan hunian berkualitas, asri, berkeberlanjutan, dan bernilai investasi tinggi.',
  mission: [
    'Menjamin kepastian hukum dan legalitas sertifikat (SHM/PBG) sebelum memasarkan setiap kawasan hunian.',
    'Mengutamakan standar material bangunan terbaik, pengawasan ketat, dan spesifikasi yang jujur.',
    'Membangun tata letak kawasan perumahan yang asri, berwawasan lingkungan, dan ramah keluarga.',
    'Memberikan pelayanan terbaik bagi calon pembeli dan kemudahan skema kepemilikan hunian.',
  ],
  coreValues: [
    {
      title: 'Kepastian Hukum',
      subtitle: 'Jaminan Legalitas',
      metric: '100%',
      metricSuffix: 'Aman & Resmi',
      description: 'Menjamin kelengkapan legalitas dan sertifikat resmi sebelum kawasan hunian dipasarkan.',
      points: [
        'Sertifikat Hak Milik (SHM) pecah per unit',
        'Persetujuan Bangunan Gedung (PBG) resmi',
        'Izin tata ruang & site plan terverifikasi',
        'Bebas sengketa & status tanah clear',
      ],
      footerLabel: 'Status Legalitas',
      footerValue: 'Terverifikasi',
      iconName: 'ShieldCheck',
    },
    {
      title: 'Mutu Konstruksi',
      subtitle: 'Standar Material',
      metric: 'SNI',
      metricSuffix: 'Grade Utama',
      description: 'Menggunakan spesifikasi material pilihan dengan pengawasan mutu ketat di setiap tahap.',
      points: [
        'Fondasi batu kali & struktur beton kokoh',
        'Dinding bata merah/hebel plester aci rapi',
        'Rangka atap baja ringan & genteng presisi',
        'Instalasi sanitair dan kelistrikan teruji',
      ],
      footerLabel: 'Kualitas Bangunan',
      footerValue: 'Struktur Terjamin',
      iconName: 'Building2',
    },
    {
      title: 'Kawasan Asri',
      subtitle: 'Kenyamanan Lingkungan',
      metric: '100%',
      metricSuffix: 'Hijau & Sehat',
      description: 'Menghadirkan lingkungan perumahan yang sehat, asri, dan ramah untuk seluruh keluarga.',
      points: [
        'Ruang terbuka hijau & taman bermain',
        'Sistem drainase tertutup bebas banjir',
        'Jalan lingkungan lebar berpaving rapi',
        'Penerangan jalan & keamanan terpadu',
      ],
      footerLabel: 'Konsep Hunian',
      footerValue: 'Eco-Living',
      iconName: 'Trees',
    },
    {
      title: 'Layanan Konsumen',
      subtitle: 'Pendampingan Penuh',
      metric: 'Prima',
      metricSuffix: 'Transparan',
      description: 'Mendampingi proses konsultasi, survei lokasi, hingga akad dan serah terima unit rumah.',
      points: [
        'Pendampingan KPR bank rekanan terkemuka',
        'Skema bayar fleksibel (Cash/KPR/Bertahap)',
        'Tanpa biaya tersembunyi, rincian jelas',
        'Layanan customer care responsif & sigap',
      ],
      footerLabel: 'Tingkat Pelayanan',
      footerValue: 'Terpadu & Jujur',
      iconName: 'HeartHandshake',
    },
  ],
  stats: [
    {
      label: 'Unit Terbangun',
      value: '1.200+',
    },
    {
      label: 'Legalitas Terverifikasi',
      value: '100%',
    },
    {
      label: 'Kawasan Hunian',
      value: '8 Proyek',
    },
    {
      label: 'Kepuasan Penghuni',
      value: '98%',
    },
  ],
  headOffice: CANONICAL_HEAD_OFFICE,
  navigation: [...CANONICAL_NAVIGATION],
};
