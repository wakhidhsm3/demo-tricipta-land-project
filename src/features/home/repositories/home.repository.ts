import { cache } from 'react';
import { partnerLogosData } from '../data/partners.data';
import { propertyFaqsData } from '../data/faqs.data';
import { HERO_HEADLINES, STANDARD_GUARANTEES, HeroHeadline } from '../data/hero.data';
import { PartnerLogo, FaqItem } from '../types/home.type';

export interface HomeRepository {
  getPartnerLogos: () => Promise<PartnerLogo[]>;
  getFaqs: () => Promise<FaqItem[]>;
  getHeroHeadlines: () => Promise<readonly HeroHeadline[]>;
  getStandardGuarantees: () => Promise<readonly string[]>;
}

export const homeRepository: HomeRepository = {
  getPartnerLogos: cache(async (): Promise<PartnerLogo[]> => {
    return [...partnerLogosData];
  }),

  getFaqs: cache(async (): Promise<FaqItem[]> => {
    return [...propertyFaqsData];
  }),

  getHeroHeadlines: cache(async (): Promise<readonly HeroHeadline[]> => {
    return HERO_HEADLINES;
  }),

  getStandardGuarantees: cache(async (): Promise<readonly string[]> => {
    return STANDARD_GUARANTEES;
  }),
};
