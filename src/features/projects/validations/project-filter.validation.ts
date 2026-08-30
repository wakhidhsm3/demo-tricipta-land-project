import { z } from 'zod';

export const projectFilterSchema = z.object({
  category: z.string().optional().default('ALL'),
  status: z.string().optional().default('ALL'),
  location: z.string().optional().default('ALL'),
  query: z.string().optional().default(''),
  page: z.coerce.number().int().positive().optional().default(1),
});

export type ProjectFilterSchemaType = z.infer<typeof projectFilterSchema>;

/**
 * Safe helper to parse URL search params for project catalog.
 */
export function parseProjectFilterParams(
  rawParams: Record<string, string | string[] | undefined>
): ProjectFilterSchemaType {
  const normalized = {
    category: typeof rawParams.category === 'string' ? rawParams.category : undefined,
    status: typeof rawParams.status === 'string' ? rawParams.status : undefined,
    location: typeof rawParams.location === 'string' ? rawParams.location : undefined,
    query:
      typeof rawParams.q === 'string'
        ? rawParams.q
        : typeof rawParams.query === 'string'
        ? rawParams.query
        : undefined,
    page: typeof rawParams.page === 'string' ? rawParams.page : undefined,
  };

  const result = projectFilterSchema.safeParse(normalized);
  if (result.success) {
    return result.data;
  }

  return {
    category: 'ALL',
    status: 'ALL',
    location: 'ALL',
    query: '',
    page: 1,
  };
}
