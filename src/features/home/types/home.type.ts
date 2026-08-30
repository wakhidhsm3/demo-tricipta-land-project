export interface PartnerLogo {
  id: string;
  name: string;
  category?: string;
  logoType?: 'image' | 'svg';
  imageUrl?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}
