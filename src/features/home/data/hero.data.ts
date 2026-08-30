export interface HeroHeadline {
  prefix: string;
  highlight: string;
}

export const HERO_HEADLINES: readonly HeroHeadline[] = [
  { prefix: 'Hunian Berkualitas dengan', highlight: 'Legalitas 100% Aman' },
  { prefix: 'Hunian Berkualitas dengan', highlight: 'Nilai Investasi Terus Meningkat' },
  { prefix: 'Hunian Berkualitas dengan', highlight: 'Lokasi Strategis & Terpercaya' },
] as const;

export const STANDARD_GUARANTEES: readonly string[] = [
  'Sertifikat Hak Milik (SHM) & PBG resmi terbit per unit hunian',
  'Struktur bangunan kokoh berstandar SNI dengan pengawasan teknis ketat',
] as const;
