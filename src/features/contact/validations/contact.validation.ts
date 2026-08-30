import { z } from 'zod';
import { nameField, phoneOrEmailField, messageField } from '@/lib/validations/common-fields.validation';
import { CONTACT_TOPICS } from '../types/contact.type';

export const contactFormSchema = z.object({
  name: nameField,
  phoneOrEmail: phoneOrEmailField,
  topic: z.enum(CONTACT_TOPICS, {
    message: 'Topik harus dipilih',
  }),
  message: messageField,
});

export type ContactFormSchemaType = z.infer<typeof contactFormSchema>;
