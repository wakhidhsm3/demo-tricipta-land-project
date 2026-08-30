export type FacilityIconName =
  | 'Car'
  | 'GraduationCap'
  | 'Hospital'
  | 'ShoppingBag'
  | 'Trees'
  | 'Train'
  | 'Building2';

export interface CategoryColor {
  dot: string;
  border: string;
  bg: string;
  text: string;
}

export const FACILITY_CATEGORY_COLORS: Record<string, CategoryColor> = {
  Pendidikan: { dot: 'bg-amber-400', border: 'border-amber-200', bg: 'bg-amber-50', text: 'text-amber-800' },
  Transportasi: { dot: 'bg-emerald-400', border: 'border-emerald-200', bg: 'bg-emerald-50', text: 'text-emerald-800' },
  Kesehatan: { dot: 'bg-rose-400', border: 'border-rose-200', bg: 'bg-rose-50', text: 'text-rose-800' },
  'Pusat Perbelanjaan': { dot: 'bg-purple-400', border: 'border-purple-200', bg: 'bg-purple-50', text: 'text-purple-800' },
  Wisata: { dot: 'bg-cyan-400', border: 'border-cyan-200', bg: 'bg-cyan-50', text: 'text-cyan-800' },
  Pemerintahan: { dot: 'bg-blue-400', border: 'border-blue-200', bg: 'bg-blue-50', text: 'text-blue-800' },
};

export const DEFAULT_FACILITY_IMAGES: Record<string, string> = {
  Transportasi: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop',
  Pendidikan: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop',
  'Pusat Perbelanjaan': 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=600&auto=format&fit=crop',
  Kesehatan: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=600&auto=format&fit=crop',
  Wisata: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop',
  Pemerintahan: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop',
};

export const DEFAULT_FALLBACK_FACILITY_IMAGE =
  DEFAULT_FACILITY_IMAGES.Transportasi;
