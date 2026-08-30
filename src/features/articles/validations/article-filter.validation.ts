import { z } from 'zod';
import { ARTICLE_CATEGORIES } from '../types/article.type';

/**
 * Zod schema for validating article catalog search and category query parameters.
 */
export const articleFilterSchema = z.object({
  category: z.enum(['ALL', ...ARTICLE_CATEGORIES]).optional().default('ALL'),
  query: z.string().optional().default(''),
  page: z.coerce.number().int().positive().optional().default(1),
});

export type ArticleFilterSchemaType = z.infer<typeof articleFilterSchema>;

/**
 * Safe helper to parse URL search params for article catalog.
 */
export function parseArticleFilterParams(
  rawParams: Record<string, string | string[] | undefined>
): ArticleFilterSchemaType {
  const normalized = {
    category: typeof rawParams.category === 'string' ? rawParams.category : undefined,
    query: typeof rawParams.q === 'string' ? rawParams.q : (typeof rawParams.query === 'string' ? rawParams.query : undefined),
    page: typeof rawParams.page === 'string' ? rawParams.page : undefined,
  };

  const result = articleFilterSchema.safeParse(normalized);
  if (result.success) {
    return result.data;
  }

  return {
    category: 'ALL',
    query: '',
    page: 1,
  };
}
