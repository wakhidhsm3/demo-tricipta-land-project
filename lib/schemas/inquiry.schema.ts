import { z } from 'zod';

export const projectInquirySchema = z.object({
  name: z.string().min(2, { message: 'Nama harus diisi minimal 2 karakter' }),
  phoneOrEmail: z.string().min(5, { message: 'Nomor WhatsApp atau Email tidak valid' }),
  projectSlug: z.string().min(1, { message: 'Proyek harus dipilih' }),
  unitTypeId: z.string().optional(),
  message: z.string().min(10, { message: 'Pesan minimal 10 karakter' }),
});

export type ProjectInquirySchemaType = z.infer<typeof projectInquirySchema>;
