export type NavIconName = 'Home' | 'Building2' | 'Compass' | 'BookOpen' | 'PhoneCall';

/**
 * Pure configuration mapping route paths to standard icon names.
 * Presentation components in app-shell render the corresponding icon component.
 */
export const NAV_ICON_NAMES: Record<string, NavIconName> = {
  '/': 'Home',
  '/about': 'Building2',
  '/projects': 'Compass',
  '/articles': 'BookOpen',
  '/contact': 'PhoneCall',
};
