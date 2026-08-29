import { z } from 'zod';

export const projectFilterSchema = z.object({
  category: z.string().default('ALL'),
  status: z.string().default('ALL'),
  location: z.string().default('ALL'),
  query: z.string().default(''),
});

export type ProjectFilterSchemaType = z.infer<typeof projectFilterSchema>;
