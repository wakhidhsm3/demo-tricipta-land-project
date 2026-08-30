export type ProjectStatus = 'DIJUAL' | 'SEGERA_HADIR' | 'HABIS_TERJUAL';
export type ProjectCategory = 'SUBSIDI' | 'KOMERSIL' | 'CLUSTERNATURAL';

export interface ProjectFilterOption<T extends string> {
  value: T | 'ALL';
  label: string;
}

export const PROJECT_CATEGORY_OPTIONS: readonly ProjectFilterOption<ProjectCategory>[] = [
  { value: 'ALL', label: 'Semua Kategori' },
  { value: 'SUBSIDI', label: 'Perumahan Subsidi FLPP' },
  { value: 'KOMERSIL', label: 'Komersil Modern' },
  { value: 'CLUSTERNATURAL', label: 'Cluster Natural Villa' },
] as const;

export const PROJECT_STATUS_OPTIONS: readonly ProjectFilterOption<ProjectStatus>[] = [
  { value: 'ALL', label: 'Semua Status' },
  { value: 'DIJUAL', label: 'Unit Tersedia (Ready)' },
  { value: 'SEGERA_HADIR', label: 'Segera Hadir (Coming Soon)' },
  { value: 'HABIS_TERJUAL', label: 'Habis Terjual (Sold Out)' },
] as const;

export const PROJECT_CATEGORY_LABEL_MAP: Record<ProjectCategory, string> = {
  KOMERSIL: 'Komersil',
  SUBSIDI: 'Subsidi FLPP',
  CLUSTERNATURAL: 'Klaster Natural',
};

export const PROJECT_STATUS_LABEL_MAP: Record<ProjectStatus, string> = {
  DIJUAL: 'Tersedia',
  SEGERA_HADIR: 'Segera Hadir',
  HABIS_TERJUAL: 'Habis Terjual',
};

export interface ProjectUnitType {
  id: string;
  name: string;
  buildingArea: number; // m2
  landArea: number; // m2
  bedrooms: number;
  bathrooms: number;
  carport: number;
  priceStartingFrom: number;
  priceFormatted: string;
  features: string[];
  floorPlanUrl: string;
}

export interface ProjectSpecifications {
  foundation: string;
  structure: string;
  walls: string;
  roof: string;
  ceiling: string;
  flooring: string;
  sanitary: string;
  electricity: string;
  water: string;
}

export interface NearbyFacility {
  category: string;
  name: string;
  distanceTime: string;
  iconName: string;
  imageUrl?: string;
}

export interface ProjectGalleryImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: ProjectCategory;
  status: ProjectStatus;
  location: {
    city: string;
    district: string;
    province: string;
    fullAddress: string;
    googleMapsUrl: string;
  };
  totalAreaHectares: number;
  totalUnits: number;
  availableUnits: number;
  priceStartingFrom: number;
  priceFormatted: string;
  heroImage: string;
  galleryImages: ProjectGalleryImage[];
  sitePlanImage: string;
  brochurePdfUrl?: string;
  unitTypes: ProjectUnitType[];
  specifications: ProjectSpecifications;
  description: string;
  highlights: string[];
  nearbyFacilities: NearbyFacility[];
  isFeatured: boolean;
}

/**
 * Lightweight DTO for project catalog, listing cards, and search results.
 * Reduces client hydration bundle size by omitting heavy spec and gallery payloads.
 */
export interface ProjectSummary {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: ProjectCategory;
  status: ProjectStatus;
  location: {
    city: string;
    district: string;
    province: string;
    fullAddress: string;
  };
  priceStartingFrom: number;
  priceFormatted: string;
  heroImage: string;
  primaryUnit?: {
    name: string;
    buildingArea: number;
    landArea: number;
    bedrooms: number;
    bathrooms: number;
  };
  isFeatured?: boolean;
}

/**
 * Pure transform helper to convert full Project domain entity to ProjectSummary DTO.
 */
export function toProjectSummary(project: Project): ProjectSummary {
  const primaryUnit = project.unitTypes[0];
  return {
    id: project.id,
    slug: project.slug,
    name: project.name,
    tagline: project.tagline,
    category: project.category,
    status: project.status,
    location: {
      city: project.location.city,
      district: project.location.district,
      province: project.location.province,
      fullAddress: project.location.fullAddress,
    },
    priceStartingFrom: project.priceStartingFrom,
    priceFormatted: project.priceFormatted,
    heroImage: project.heroImage,
    primaryUnit: primaryUnit
      ? {
          name: primaryUnit.name,
          buildingArea: primaryUnit.buildingArea,
          landArea: primaryUnit.landArea,
          bedrooms: primaryUnit.bedrooms,
          bathrooms: primaryUnit.bathrooms,
        }
      : undefined,
    isFeatured: project.isFeatured,
  };
}
