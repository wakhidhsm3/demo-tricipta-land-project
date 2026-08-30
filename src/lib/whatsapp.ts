import { siteConfig } from './config/site.config';

export interface WhatsAppOptions {
  phone?: string;
  message?: string;
}

/**
 * Format and sanitize a phone number to standard international WhatsApp format without leading zero or plus.
 */
export function sanitizeWhatsAppNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    return `62${cleaned.slice(1)}`;
  }
  return cleaned;
}

/**
 * Sanitize user text payload by stripping HTML tags and control characters.
 */
export function sanitizeMessagePayload(message: string): string {
  return message
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F]/g, '') // Strip ASCII control chars
    .trim();
}

/**
 * Generate standard WhatsApp inquiry message for general customer consultation (e.g. Floating Button).
 */
export function buildGeneralInquiryMessage(): string {
  return `Halo ${siteConfig.name}, saya ingin bertanya mengenai proyek perumahan dan konsultasi hunian.`;
}

/**
 * Generate standard WhatsApp message for 404 Not Found assistance.
 */
export function buildNotFoundHelpMessage(): string {
  return `Halo ${siteConfig.name}, saya membutuhkan bantuan informasi perumahan dari website.`;
}

/**
 * Generate safe WhatsApp message for reporting technical issues from error page.
 * Uses a safe digest reference instead of raw system error message to prevent information disclosure.
 */
export function buildErrorReportInquiryMessage(errorReference?: string): string {
  const refCode = errorReference?.trim() ? ` (Kode Referensi: ${errorReference.trim().slice(0, 16)})` : '';
  return `Halo ${siteConfig.name}, saya mengalami kendala teknis saat mengakses website${refCode}. Mohon bantuannya.`;
}

/**
 * Generate standard WhatsApp inquiry message for property projects.
 */
export function buildProjectInquiryMessage(options: {
  projectName: string;
  unitTypeName?: string;
  senderName?: string;
  senderContact?: string;
  customMessage?: string;
}): string {
  const { projectName, unitTypeName, senderName, senderContact, customMessage } = options;
  if (senderName && senderContact) {
    const unitPart = unitTypeName ? ` (${unitTypeName})` : '';
    return `Halo ${siteConfig.name}, nama saya ${senderName} (${senderContact}). Saya berminat dengan perumahan ${projectName}${unitPart}.\n\nPesan: ${customMessage || 'Mohon informasi pricelist resmi dan jadwal survey lokasi.'}`;
  }
  if (customMessage && customMessage.trim().length > 0) {
    return customMessage.trim();
  }
  if (unitTypeName) {
    return `Halo ${siteConfig.name}, saya tertarik dengan perumahan ${projectName} (Tipe ${unitTypeName}). Mohon informasi pricelist resmi, simulasi cicilan KPR, dan jadwal survey lokasi.`;
  }
  return `Halo ${siteConfig.name}, saya berminat dengan proyek perumahan ${projectName}. Mohon info pricelist resmi dan jadwal survey lokasi.`;
}

/**
 * Generate standard WhatsApp inquiry message for articles and knowledge base.
 */
export function buildArticleInquiryMessage(options: { articleTitle: string }): string {
  return `Halo ${siteConfig.name}, saya membaca artikel "${options.articleTitle}" dan ingin berkonsultasi seputar perumahan & KPR.`;
}

/**
 * Generate standard WhatsApp inquiry message for FAQ & consultation CTA.
 */
export function buildFaqInquiryMessage(): string {
  return `Halo ${siteConfig.name}, saya ingin berkonsultasi mengenai unit perumahan, skema KPR, atau jadwal survei lokasi.`;
}

/**
 * Generate standard WhatsApp message for general contact form.
 */
export function buildContactInquiryMessage(options: {
  name: string;
  phoneOrEmail: string;
  topic: string;
  message: string;
}): string {
  const { name, phoneOrEmail, topic, message } = options;
  return `Halo ${siteConfig.name}, nama saya ${name} (${phoneOrEmail}).\nTopik: ${topic}\n\nPesan: ${message}`;
}

/**
 * Construct a safe, encoded WhatsApp click-to-chat URL.
 */
export function createWhatsAppUrl(options: WhatsAppOptions = {}): string {
  const phone = options.phone ? sanitizeWhatsAppNumber(options.phone) : siteConfig.headOffice.whatsapp;
  const rawMessage = options.message || buildGeneralInquiryMessage();
  const message = sanitizeMessagePayload(rawMessage);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Open WhatsApp in a new tab safely with noopener and noreferrer protection.
 */
export function openWhatsApp(options: WhatsAppOptions = {}): void {
  if (typeof window === 'undefined') return;
  const url = createWhatsAppUrl(options);
  window.open(url, '_blank', 'noopener,noreferrer');
}
