import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Nama harus diisi minimal 2 karakter' }),
  phoneOrEmail: z.string().min(5, { message: 'Nomor WhatsApp atau Email tidak valid' }),
  topic: z.enum(['KONSULTASI_HUNIAN', 'KEMITRAAN', 'LEGALITAS', 'LAINNYA'], {
    message: 'Topik harus dipilih',
  }),
  message: z.string().min(10, { message: 'Pesan minimal 10 karakter' }),
});

export type ContactFormSchemaType = z.infer<typeof contactFormSchema>;
