import { z } from 'zod';

/**
 * Matches Indonesian phone numbers (08xx, +628xx, 628xx) or email addresses.
 * Used for the combined phoneOrEmail input field.
 */
const PHONE_REGEX = /^(\+?62|0)8\d{7,12}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isPhoneOrEmail(value: string): boolean {
  const trimmed = value.trim();
  return PHONE_REGEX.test(trimmed) || EMAIL_REGEX.test(trimmed);
}

/** Shared: Name field — minimum 2 characters. */
export const nameField = z
  .string()
  .min(2, { message: 'Nama harus diisi minimal 2 karakter' });

/** Shared: Phone or email — must match phone regex OR email format. */
export const phoneOrEmailField = z
  .string()
  .min(5, { message: 'Nomor WhatsApp atau Email tidak valid' })
  .refine(isPhoneOrEmail, {
    message: 'Format harus nomor HP Indonesia (08xx / +628xx) atau alamat email yang valid',
  });

/** Shared: Message field — minimum 10 characters. */
export const messageField = z
  .string()
  .min(10, { message: 'Pesan minimal 10 karakter' });
