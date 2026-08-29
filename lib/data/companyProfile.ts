import { CompanyProfile } from '@/lib/types/company';

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
  headOffice: {
    address: 'Jl. Raya Utama TRICIPTA No. 88, Kawasan Bisnis Terpadu',
    city: 'Bandung',
    province: 'Jawa Barat',
    postalCode: '40115',
    phone: '+62 22 8888 7777',
    whatsapp: '6281234567890',
    email: 'info@triciptaland.com',
    operatingHours: 'Senin - Sabtu: 08.00 - 17.00 WIB',
    googleMapsUrl: 'https://maps.google.com',
    googleMapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.40912193563!2d107.5731168!3d-6.9034443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6398252477f%3A0x146a9a72384e4b2d!2sBandung%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid',
  },
  navigation: [
    { label: 'Beranda', href: '/' },
    { label: 'Tentang Kami', href: '/about' },
    { label: 'Proyek', href: '/projects' },
    { label: 'Artikel', href: '/articles' },
    { label: 'Kontak', href: '/contact' },
  ],
};
