/**
 * Centralized UI layout, scroll, and animation constants.
 * Eliminates magic numbers throughout components and hooks.
 */

export const SCROLL_THRESHOLDS = {
  /** Scroll position in pixels before WhatsApp floating button appears */
  FLOATING_WA_BUTTON: 280,
  /** Scroll target top in pixels when changing catalog pagination page */
  CATALOG_PAGE_TOP: 400,
} as const;

export const ANIMATION_DURATIONS = {
  /** Interval in ms for rotating headline hero typography */
  HERO_HEADLINE_ROTATOR_MS: 4500,
  /** Interval in ms for 3D flip card transition of partner logos */
  PARTNER_LOGO_FLIP_MS: 3200,
  /** Stagger delay in ms between partner logo slots during flip */
  PARTNER_LOGO_STAGGER_MS: 70,
  /** Flip out transition duration in ms */
  PARTNER_LOGO_FLIP_OUT_MS: 300,
  /** Flip in transition duration in ms */
  PARTNER_LOGO_FLIP_IN_MS: 350,
  /** Default duration in ms for numeric stat counter animation */
  STAT_COUNTER_DEFAULT_MS: 2000,
  /** Duration in seconds for hero pill animated rotating gradient border */
  HERO_BORDER_ROTATE_SEC: 2.5,
  /** Speed in seconds for trusted clients partner logos marquee */
  MARQUEE_SPEED_SEC: 25,
} as const;

export const FORM_SETTINGS = {
  /** Anti-spam submit button cooldown in ms to prevent double clicks */
  SUBMIT_COOLDOWN_MS: 1200,
  /** Animation settle delay in ms after form submission */
  SUBMIT_RESET_DELAY_MS: 600,
} as const;

export const GOOGLE_MAPS_CONFIG = {
  /** Default zoom level for location maps */
  DEFAULT_ZOOM: 16,
  /** Standard embed query flags for Google Maps iframe */
  EMBED_QUERY_FLAGS: '&t=&z=16&ie=UTF8&iwloc=&output=embed',
} as const;

export const LEGAL_VERIFICATION_LABELS = {
  OFFICIAL_VERIFIED: 'DOKUMEN RESMI TERVERIFIKASI',
  KEMENKUMHAM_VERIFIED: 'Salinan Akta & SK Kemenkumham Resmi — Terdaftar di BPN & Kemenkumham RI',
  WATERMARK_TEXT: 'WATERMARK VERIFIED 100% CLEAN',
} as const;
