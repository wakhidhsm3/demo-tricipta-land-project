import { OrganizationStructure, OrgMember } from '@/lib/types/organization';

export const organizationData: OrganizationStructure = {
  directors: [
    {
      id: 'dir-1',
      name: 'Ir. H. Budi Santoso, M.T.',
      position: 'Direktur Utama',
      roleDescription: 'Memimpin visi strategis, kebijakan pengusahaan, dan kepatuhan hukum perusahaan.',
      photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
      division: 'DIREKSI',
      departmentName: 'Direksi Eksekutif',
      education: 'Magister Teknik Sipil — Institut Teknologi Bandung (ITB)',
      experienceYears: '18+ Tahun di Industri Pengembangan Properti & Konstruksi',
      bio: 'Ir. H. Budi Santoso telah memimpin TRICIPTA LAND sejak awal berdirinya perusahaan. Berbekal pengalaman lebih dari 18 tahun dalam manajemen proyek konstruksi skala besar, beliau memegang komitmen teguh terhadap transparansi legalitas, ketepatan waktu serah terima, dan standar kelayakan hunian berkelanjutan.',
      responsibilities: [
        'Merumuskan arah kebijakan strategis dan rencana ekspansi bisnis jangka panjang perseroan.',
        'Mengawasi tata kelola kepatuhan hukum, perizinan tata ruang, dan integritas perseroan.',
        'Menjalin kemitraan strategis dengan institusi perbankan, regulator daerah, dan mitra penyedia lahan.',
      ],
      certifications: [
        'Sertifikasi Ahli Utama Manajemen Proyek Konstruksi (LPJK)',
        'Sertifikasi Pengembang Perumahan Berkelanjutan (REI)',
      ],
    },
    {
      id: 'dir-2',
      name: 'Hj. Siska Wardhani, S.E., M.M.',
      position: 'Direktur Keuangan & Operasional',
      roleDescription: 'Mengelola tata kelola keuangan, struktur investasi, dan operasional bisnis.',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
      division: 'DIREKSI',
      departmentName: 'Direksi Keuangan & Operasional',
      education: 'Magister Manajemen Keuangan — Universitas Indonesia (UI)',
      experienceYears: '15+ Tahun di Bidang Corporate Finance & Real Estate Investment',
      bio: 'Hj. Siska Wardhani bertanggung jawab atas kesehatan likuiditas keuangan perseroan, pengelolaan portofolio modal proyek, serta kelancaran pembiayaan KPR konsumen melalui kemitraan perbankan terkemuka. Beliau memastikan setiap alokasi anggaran proyek berjalan efektif dan akuntabel.',
      responsibilities: [
        'Mengendalikan arus kas perseroan dan kelayakan finansial setiap klaster perumahan baru.',
        'Mengembangkan skema kerja sama KPR dengan bank rekanan (Syariah dan Konvensional).',
        'Mengawasi efisiensi operasional harian, audit internal, dan tata kelola SDM perseroan.',
      ],
      certifications: [
        'Certified Financial Planner (CFP)',
        'Sertifikasi Manajemen Risiko Perbankan & Properti',
      ],
    },
    {
      id: 'dir-3',
      name: 'Hendrik Pratama, S.T.',
      position: 'Direktur Teknik & Perencanaan',
      roleDescription: 'Mengawasi perancangan site plan, mutu konstruksi bangunan, dan infrastruktur kawasan.',
      photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
      division: 'DIREKSI',
      departmentName: 'Direksi Teknik & Perencanaan',
      education: 'Sarjana Teknik Arsitektur & Perencanaan Wilayah — Universitas Diponegoro (UNDIP)',
      experienceYears: '14+ Tahun di Perencanaan Arsitektur & Master Plan Kawasan',
      bio: 'Hendrik Pratama memimpin divisi teknis dalam merancang desain arsitektur modern tropis yang fungsional, pencahayaan alami optimal, dan perencanaan master plan kawasan hunian yang terintegrasi dengan ruang terbuka hijau dan sistem drainase modern.',
      responsibilities: [
        'Mengarahkan perancangan master site plan kawasan, denah unit, dan spesifikasi material SNI.',
        'Mengawasi implementasi standar mutu konstruksi dan manajemen waktu penyelesaian proyek.',
        'Memastikan infrastruktur utilitas (jaringan drainase bawah tanah, instalasi listrik, row jalan) terbangun prima.',
      ],
      certifications: [
        'Ikatan Arsitek Indonesia (IAI) — Lisensi Madya',
        'Green Building Certified Professional',
      ],
    },
  ],
  departments: [
    {
      id: 'dept-1',
      name: 'Divisi Perencanaan & Pengawasan Teknik',
      headName: 'Agus Setiawan, S.T.',
      headPosition: 'Kepala Divisi Perencanaan & Teknik',
      headPhotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
      headRoleDescription: 'Memimpin perancangan struktur teknis, RAB konstruksi, dan pengawasan berkala vendor pelaksana.',
      responsibilities: [
        'Perancangan denah rumah, fasad arsitektur modern, dan site plan kawasan.',
        'Pengawasan kualitas material struktur (beton bertulang, baja ringan, sanitasi SNI).',
        'Manajemen vendor pelaksana konstruksi dan pengendalian timeline pembangunan unit.',
      ],
      education: 'Sarjana Teknik Sipil — Universitas Gadjah Mada (UGM)',
      experienceYears: '11+ Tahun di Perencanaan Teknik Proyek Perumahan',
      bio: 'Agus Setiawan berfokus pada ketelitian kalkulasi struktur teknis dan efisiensi tata ruang rumah agar setiap unit memiliki sirkulasi udara optimal dan ketahanan bangunan jangka panjang.',
    },
    {
      id: 'dept-2',
      name: 'Divisi Legalitas & Pertanahan',
      headName: 'Rina Rahmawati, S.H.',
      headPosition: 'Kepala Divisi Legalitas & Pertanahan',
      headPhotoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop',
      headRoleDescription: 'Mengawal kepatuhan izin tata ruang, penerbitan SHM pecah perkavling, dan PBG.',
      responsibilities: [
        'Pengurusan legalitas Sertifikat Hak Milik (SHM) pemecahan per-kavling di Kantor Pertanahan (BPN).',
        'Penerbitan Persetujuan Bangunan Gedung (PBG) dan izin tata ruang daerah.',
        'Pendampingan proses Akta Jual Beli (AJB) di hadapan PPAT dan balik nama sertifikat konsumen.',
      ],
      education: 'Sarjana Hukum — Universitas Padjadjaran (UNPAD)',
      experienceYears: '10+ Tahun di Bidang Hukum Agraria & Perizinan Properti',
      bio: 'Rina Rahmawati memastikan TRICIPTA LAND menjalankan prinsip legalitas 100% aman dengan status sertifikat clear & clean sebelum tahap pembangunan dipasarkan kepada masyarakat.',
    },
    {
      id: 'dept-3',
      name: 'Divisi Keuangan & Perbankan',
      headName: 'Dedi Kurniawan, S.E.',
      headPosition: 'Kepala Divisi Keuangan & KPR',
      headPhotoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
      headRoleDescription: 'Mengelola kerja sama KPR perbankan, administrasi pembayaran, dan verifikasi berkas konsumen.',
      responsibilities: [
        'Pengelolaan arus kas operasional dan alokasi anggaran proyek.',
        'Fasilitasi kerja sama KPR perbankan terkemuka (Bank BTN, BSI, Mandiri, BCA, BRI).',
        'Pendampingan proses akad kredit KPR dan verifikasi berkas permohonan konsumen.',
      ],
      education: 'Sarjana Ekonomi Akuntansi — Universitas Brawijaya (UB)',
      experienceYears: '9+ Tahun di Manajemen Keuangan & Perbankan KPR',
      bio: 'Dedi Kurniawan mendampingi konsumen TRICIPTA LAND dalam memilih skema pembiayaan hunian terbaik yang sesuai kemampuan finansial keluarga, baik KPR Subsidi FLPP maupun KPR Komersil.',
    },
    {
      id: 'dept-4',
      name: 'Divisi Pemasaran & Pelayanan Pelanggan',
      headName: 'Maya Indah, S.Sos.',
      headPosition: 'Kepala Divisi Pemasaran & Pelayanan',
      headPhotoUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop',
      headRoleDescription: 'Memimpin strategi edukasi properti, survey lokasi konsumen, dan layanan purna jual.',
      responsibilities: [
        'Penyusunan strategi promosi digital, pameran properti, dan edukasi kepemilikan rumah.',
        'Pendampingan calon pembeli saat survei lokasi perumahan & rumah contoh.',
        'Layanan purna jual, penanganan garansi pemeliharaan bangunan pasca serah terima kunci.',
      ],
      education: 'Sarjana Ilmu Komunikasi — Universitas Sebelas Maret (UNS)',
      experienceYears: '8+ Tahun di Bidang Real Estate Marketing & Customer Care',
      bio: 'Maya Indah berkomitmen memberikan pelayanan konsultasi hunian yang ramah, informatif, dan transparan, membantu setiap keluarga menemukan rumah impian yang tepat.',
    },
  ],
  siteTeams: [
    {
      id: 'site-1',
      name: 'Bambang Triyono',
      position: 'Chief Project Site Manager',
      roleDescription: 'Memimpin eksekusi pembangunan fisik dan pengawasan harian di lokasi perumahan.',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
      division: 'LAPANGAN',
      departmentName: 'Tim Lapangan & Konstruksi Fisik',
      education: 'D3 Teknik Sipil Bangunan Gedung — Politeknik Negeri Bandung',
      experienceYears: '16+ Tahun Pengalaman Supervisi Lapangan Properti',
      bio: 'Bambang Triyono mengoordinasikan seluruh mandor, tukang ahli, dan logistik material di lapangan. Beliau memastikan setiap tahapan pekerjaan pondasi, dinding, atap, dan jalan lingkungan selesai sesuai schedule yang telah ditetapkan.',
      responsibilities: [
        'Memimpin koordinasi harian seluruh tim kontraktor dan sub-kontraktor di lokasi proyek.',
        'Memastikan ketersediaan material berkualitas tepat waktu dan sesuai spesifikasi teknis.',
        'Mengawasi penerapan standar keselamatan dan kesehatan kerja (K3) di lingkungan proyek.',
      ],
      certifications: [
        'Sertifikat Ahli Pelaksana Lapangan Perumahan (LPJK)',
        'Sertifikasi Pengawas K3 Konstruksi Bangunan',
      ],
    },
    {
      id: 'site-2',
      name: 'Rian Firmansyah, S.T.',
      position: 'Quality Control Engineer',
      roleDescription: 'Memastikan seluruh pengerjaan pondasi, struktur, dan spesifikasi sesuai standar mutu SNI.',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
      division: 'LAPANGAN',
      departmentName: 'Tim Pengendali Mutu (Quality Control)',
      education: 'Sarjana Teknik Sipil — Universitas Islam Indonesia (UII)',
      experienceYears: '9+ Tahun di Pengujian Mutu Konstruksi & Finishing',
      bio: 'Rian Firmansyah bertindak sebagai garda penjaga mutu fisik bangunan di TRICIPTA LAND. Beliau melakukan checklist pengujian ketat pada setiap unit rumah sebelum serah terima kunci kepada konsumen.',
      responsibilities: [
        'Melakukan inspeksi berkala pada adukan beton bertulang, pembesian, dan instalasi pipa sanitasi.',
        'Menguji ketahanan rangka atap baja ringan, presisi kusen aluminium, dan kerapian finishing cat.',
        'Menyusun laporan checklist kelayakan unit untuk penerbitan Berita Acara Serah Terima (BAST).',
      ],
      certifications: [
        'Quality Control Inspector Certificate (HAKI)',
        'Sertifikasi Pengujian Material Konstruksi',
      ],
    },
  ],
};

/**
 * Returns all organization members flattened into a single list for dynamic routing & lookup
 */
export function getAllOrgMembers(): OrgMember[] {
  const departmentMembers: OrgMember[] = organizationData.departments.map((dept) => ({
    id: dept.id,
    name: dept.headName,
    position: dept.headPosition,
    roleDescription: dept.headRoleDescription,
    photoUrl: dept.headPhotoUrl,
    division:
      dept.id === 'dept-1'
        ? 'PERENCANAAN_TEKNIK'
        : dept.id === 'dept-2'
        ? 'LEGAL_PERIZINAN'
        : dept.id === 'dept-3'
        ? 'FINANCE'
        : 'MARKETING_SALES',
    departmentName: dept.name,
    responsibilities: dept.responsibilities,
    education: dept.education,
    experienceYears: dept.experienceYears,
    bio: dept.bio,
  }));

  return [
    ...organizationData.directors,
    ...departmentMembers,
    ...organizationData.siteTeams,
  ];
}

/**
 * Retrieve a specific member profile by ID
 */
export function getOrgMemberById(id: string): OrgMember | undefined {
  const all = getAllOrgMembers();
  return all.find((m) => m.id === id);
}
