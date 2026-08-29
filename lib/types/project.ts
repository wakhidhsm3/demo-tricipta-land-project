export type ProjectStatus = 'DIJUAL' | 'SEGERA_HADIR' | 'HABIS_TERJUAL';
export type ProjectCategory = 'SUBSIDI' | 'KOMERSIL' | 'CLUSTERNATURAL';

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
  galleryImages: { url: string; alt: string; caption?: string }[];
  sitePlanImage: string;
  brochurePdfUrl?: string;
  unitTypes: ProjectUnitType[];
  specifications: ProjectSpecifications;
  description: string;
  highlights: string[];
  nearbyFacilities: NearbyFacility[];
  isFeatured: boolean;
}
