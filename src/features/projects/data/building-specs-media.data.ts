import { ProjectSpecifications } from '../types/project.type';

export interface SpecMediaMeta {
  key: keyof ProjectSpecifications;
  label: string;
  categoryBadge: string;
  imageUrl: string;
  imageAlt: string;
  qualityGuarantee: string;
}

export const BUILDING_SPECS_MEDIA: readonly SpecMediaMeta[] = [
  {
    key: 'foundation',
    label: 'Pondasi Bangunan',
    categoryBadge: 'Struktur Bawah',
    imageUrl:
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=600&auto=format&fit=crop',
    imageAlt: 'Pondasi Batu Kali & Struktur Tapak Bangunan',
    qualityGuarantee: 'Batu kali padat penopang beban struktural stabil & kokoh',
  },
  {
    key: 'structure',
    label: 'Struktur Beton',
    categoryBadge: 'Kerangka Bangunan',
    imageUrl:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&auto=format&fit=crop',
    imageAlt: 'Struktur Kolom Beton Bertulang SNI',
    qualityGuarantee: 'Beton bertulang besi ulir SNI berstandar anti-gempa',
  },
  {
    key: 'walls',
    label: 'Dinding Utama',
    categoryBadge: 'Dinding & Penyekat',
    imageUrl:
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop',
    imageAlt: 'Dinding Hebel Bata Ringan Diplester Halus',
    qualityGuarantee: 'Double hebel kedap suara, presisi rapi & tahan cuaca',
  },
  {
    key: 'roof',
    label: 'Rangka & Atap',
    categoryBadge: 'Proteksi Atas',
    imageUrl:
      'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?q=80&w=600&auto=format&fit=crop',
    imageAlt: 'Rangka Baja Ringan & Penutup Atap Berkualitas',
    qualityGuarantee: 'Baja ringan anti karat & penutup atap kedap rembesan',
  },
  {
    key: 'ceiling',
    label: 'Plafon Ruangan',
    categoryBadge: 'Interior Plafon',
    imageUrl:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop',
    imageAlt: 'Plafon Gypsum Rangka Hollow Rapi',
    qualityGuarantee: 'Rangka hollow kokoh & permukaan gypsum rata berestetika',
  },
  {
    key: 'flooring',
    label: 'Lantai Utama',
    categoryBadge: 'Finishing Lantai',
    imageUrl:
      'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=600&auto=format&fit=crop',
    imageAlt: 'Lantai Keramik Glazur & Homogeneous Tile',
    qualityGuarantee: 'Permukaan kilau bersih, mudah dibersihkan & anti gores',
  },
  {
    key: 'sanitary',
    label: 'Sanitari & Kamar Mandi',
    categoryBadge: 'Perlengkapan Sanitasi',
    imageUrl:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop',
    imageAlt: 'Sanitari Higienis & Perlengkapan Kamar Mandi',
    qualityGuarantee: 'Perlengkapan sanitasi higienis & keran stainless tahan karat',
  },
  {
    key: 'electricity',
    label: 'Instalasi Listrik',
    categoryBadge: 'Jaringan Kelistrikan',
    imageUrl:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop',
    imageAlt: 'Instalasi Listrik PLN Standar Keamanan SNI',
    qualityGuarantee: 'Kabel tembaga standar SNI dengan proteksi MCB aman',
  },
  {
    key: 'water',
    label: 'Pasokan Air Bersih',
    categoryBadge: 'Utilitas Air',
    imageUrl:
      'https://images.unsplash.com/photo-1585670210693-e7fdd16b142e?q=80&w=600&auto=format&fit=crop',
    imageAlt: 'Pasokan Air Bersih Jernih & Pompa Otomatis',
    qualityGuarantee: 'Kualitas air jernih higienis & pasokan lancar terjaga',
  },
] as const;
