'use server';

import { contactFormSchema } from '@/features/contact/validations/contact.validation';
import { projectInquirySchema } from '@/features/projects/validations/inquiry.validation';
import {
  createWhatsAppUrl,
  buildContactInquiryMessage,
  buildProjectInquiryMessage,
  sanitizeWhatsAppNumber,
  sanitizeMessagePayload,
} from '@/lib/whatsapp';
import { siteConfig } from '@/lib/config/site.config';
import { checkRateLimit } from '@/lib/security/rate-limiter';
import { getClientIp } from '@/lib/security/client-ip';
import { leadRepository } from '@/lib/repositories/lead.repository';
import { formatZodErrors } from '@/lib/utils';

export interface ActionResult<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  fieldErrors?: Record<string, string>;
  whatsappUrl?: string;
}

/**
 * Server Action to capture and validate general contact inquiry leads before WhatsApp redirection.
 */
export async function submitContactInquiryAction(
  formData: unknown
): Promise<ActionResult<{ name: string; topic: string }>> {
  try {
    const validation = contactFormSchema.safeParse(formData);

    if (!validation.success) {
      return {
        success: false,
        message: 'Validasi data formulir gagal. Silakan periksa kolom isian.',
        fieldErrors: formatZodErrors(validation.error),
      };
    }

    const cleanName = sanitizeMessagePayload(validation.data.name);
    const cleanTopic = sanitizeMessagePayload(validation.data.topic);
    const cleanMessage = validation.data.message ? sanitizeMessagePayload(validation.data.message) : '';
    const phoneOrEmail = validation.data.phoneOrEmail;

    // Secure rate limiting keyed on client IP address
    const clientIp = await getClientIp();
    const rateLimit = checkRateLimit(`contact_${clientIp}`, 5, 60000);
    if (!rateLimit.success) {
      return {
        success: false,
        message: `Terlalu banyak permintaan. Silakan coba kembali dalam ${rateLimit.retryAfterSeconds} detik.`,
      };
    }

    // Persist lead in repository for audit logging and CRM dispatch
    await leadRepository.saveLead({
      type: 'CONTACT',
      name: cleanName,
      contact: sanitizeWhatsAppNumber(phoneOrEmail) || phoneOrEmail,
      topicOrProject: cleanTopic,
      message: cleanMessage,
      metadata: { ip: clientIp },
    });

    const waText = buildContactInquiryMessage({
      name: cleanName,
      phoneOrEmail,
      topic: cleanTopic,
      message: cleanMessage,
    });

    const whatsappUrl = createWhatsAppUrl({
      phone: siteConfig.headOffice.whatsapp,
      message: waText,
    });

    return {
      success: true,
      message: 'Pesan berhasil diproses.',
      data: { name: cleanName, topic: cleanTopic },
      whatsappUrl,
    };
  } catch (error) {
    console.error('[LeadCapture:Contact:Error]', error);
    return {
      success: false,
      message: 'Terjadi kesalahan sistem saat memproses inquiry.',
    };
  }
}

/**
 * Server Action to capture and validate project inquiry leads before WhatsApp redirection.
 */
export async function submitProjectInquiryAction(
  formData: unknown,
  projectInfo: { projectName: string; unitTypeName?: string }
): Promise<ActionResult<{ name: string; projectSlug: string }>> {
  try {
    const validation = projectInquirySchema.safeParse(formData);

    if (!validation.success) {
      return {
        success: false,
        message: 'Validasi data pemesanan unit gagal. Silakan periksa kolom isian.',
        fieldErrors: formatZodErrors(validation.error),
      };
    }

    const cleanName = sanitizeMessagePayload(validation.data.name);
    const cleanProjectName = sanitizeMessagePayload(projectInfo.projectName);
    const cleanUnitType = projectInfo.unitTypeName ? sanitizeMessagePayload(projectInfo.unitTypeName) : undefined;
    const cleanMessage = validation.data.message ? sanitizeMessagePayload(validation.data.message) : '';
    const { phoneOrEmail, projectSlug } = validation.data;

    // Secure rate limiting keyed on client IP address
    const clientIp = await getClientIp();
    const rateLimit = checkRateLimit(`project_${clientIp}`, 5, 60000);
    if (!rateLimit.success) {
      return {
        success: false,
        message: `Terlalu banyak permintaan. Silakan coba kembali dalam ${rateLimit.retryAfterSeconds} detik.`,
      };
    }

    // Persist lead in repository for audit logging and CRM dispatch
    await leadRepository.saveLead({
      type: 'PROJECT',
      name: cleanName,
      contact: sanitizeWhatsAppNumber(phoneOrEmail) || phoneOrEmail,
      topicOrProject: cleanProjectName,
      unitType: cleanUnitType,
      message: cleanMessage || `Inquiry unit ${cleanUnitType || ''} proyek ${cleanProjectName}`,
      metadata: { ip: clientIp, projectSlug },
    });

    const waText = buildProjectInquiryMessage({
      projectName: cleanProjectName,
      unitTypeName: cleanUnitType,
      senderName: cleanName,
      senderContact: phoneOrEmail,
      customMessage: cleanMessage,
    });

    const whatsappUrl = createWhatsAppUrl({
      phone: siteConfig.headOffice.whatsapp,
      message: waText,
    });

    return {
      success: true,
      message: 'Inquiry perumahan berhasil diproses.',
      data: { name: cleanName, projectSlug },
      whatsappUrl,
    };
  } catch (error) {
    console.error('[LeadCapture:ProjectInquiry:Error]', error);
    return {
      success: false,
      message: 'Terjadi kesalahan sistem saat memproses pemesanan unit.',
    };
  }
}
