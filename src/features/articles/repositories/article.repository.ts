import { cache } from 'react';
import { articlesData } from '../data/articles.data';
import { Article, ArticleSummary, toArticleSummary } from '../types/article.type';
import { ReadRepository, PaginationParams, PaginatedResult } from '@/lib/types/repository.type';
import { createReadRepository } from '@/lib/repositories/base.repository';
import { paginateArray } from '@/lib/utils';

export interface ArticleRepository extends ReadRepository<Article> {
  getLatest(limit?: number): Promise<ArticleSummary[]>;
  getAllSummaries(): Promise<ArticleSummary[]>;
  getRelated(currentId: string, category: string, limit?: number): Promise<ArticleSummary[]>;
  findPaginated(params?: PaginationParams): Promise<PaginatedResult<ArticleSummary>>;
}

const baseRepo = createReadRepository(articlesData);

export const articleRepository: ArticleRepository = {
  ...baseRepo,

  getAllSummaries: cache(async (): Promise<ArticleSummary[]> => {
    return articlesData.map(toArticleSummary);
  }),

  getLatest: cache(async (limit = 3): Promise<ArticleSummary[]> => {
    return [...articlesData]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit)
      .map(toArticleSummary);
  }),

  getRelated: cache(async (currentId: string, category: string, limit = 3): Promise<ArticleSummary[]> => {
    const sameCategory: Article[] = [];
    const otherArticles: Article[] = [];

    for (const article of articlesData) {
      if (article.id === currentId) continue;
      if (article.category === category) {
        if (sameCategory.length < limit) sameCategory.push(article);
      } else {
        if (otherArticles.length < limit) otherArticles.push(article);
      }
    }

    return [...sameCategory, ...otherArticles].slice(0, limit).map(toArticleSummary);
  }),

  findPaginated: cache(
    async (params: PaginationParams = {}): Promise<PaginatedResult<ArticleSummary>> => {
      const { page = 1, pageSize = 6, searchQuery = '', category = 'ALL' } = params;
      const normalizedQuery = searchQuery.trim().toLowerCase();

      // Single-pass filter & summary projection
      const filtered: ArticleSummary[] = [];
      for (const article of articlesData) {
        if (category !== 'ALL' && article.category !== category) {
          continue;
        }

        if (
          normalizedQuery &&
          !article.title.toLowerCase().includes(normalizedQuery) &&
          !article.excerpt.toLowerCase().includes(normalizedQuery) &&
          !article.tags.some((t) => t.toLowerCase().includes(normalizedQuery))
        ) {
          continue;
        }

        filtered.push(toArticleSummary(article));
      }

      return paginateArray(filtered, page, pageSize);
    }
  ),
};
