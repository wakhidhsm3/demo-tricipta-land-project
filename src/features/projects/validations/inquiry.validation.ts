import { z } from 'zod';
import { nameField, phoneOrEmailField, messageField } from '@/lib/validations/common-fields.validation';

export const projectInquirySchema = z.object({
  name: nameField,
  phoneOrEmail: phoneOrEmailField,
  projectSlug: z.string().min(1, { message: 'Proyek harus dipilih' }),
  unitTypeId: z.string().optional(),
  message: messageField,
});

export type ProjectInquirySchemaType = z.infer<typeof projectInquirySchema>;
