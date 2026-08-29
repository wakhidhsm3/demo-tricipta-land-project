export interface CompanyCoreValue {
  title: string;
  subtitle?: string;
  metric?: string;
  metricSuffix?: string;
  description: string;
  points?: string[];
  footerLabel?: string;
  footerValue?: string;
  iconName: string;
}

export interface CompanyStat {
  label: string;
  value: string;
  description?: string;
}

export interface CompanyHeadOffice {
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  whatsapp: string;
  email: string;
  operatingHours: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface CompanyProfile {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  descriptionEmphasis: string[];
  establishedYear: number;
  vision: string;
  mission: string[];
  coreValues: CompanyCoreValue[];
  stats: CompanyStat[];
  headOffice: CompanyHeadOffice;
  navigation: NavigationItem[];
}
