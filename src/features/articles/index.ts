// Components
export { ArticleCard } from './components/article-card';
export { ArticleCatalog } from './components/article-catalog';
export { ArticleDetailHero } from './components/article-detail-hero';
export { ArticleHeader } from './components/article-header';
export { ArticleMarkdownBody } from './components/article-markdown-body';
export { RelatedArticlesSection } from './components/related-articles-section';

import { articleRepository } from './repositories/article.repository';

// Data Access Layer
export { articleRepository };
export { articlesData } from './data/articles.data';
export const getArticles = () => articleRepository.getAll();
export const getArticleSummaries = () => articleRepository.getAllSummaries();
export const getAllArticleIds = () => articleRepository.getAllIds();
export const getArticleById = (id: string) => articleRepository.getById(id);
export const getLatestArticles = (limit?: number) => articleRepository.getLatest(limit);
export const getRelatedArticles = (currentId: string, category: string, limit?: number) =>
  articleRepository.getRelated(currentId, category, limit);

// Validations
export {
  articleFilterSchema,
  parseArticleFilterParams,
  type ArticleFilterSchemaType,
} from './validations/article-filter.validation';

// Types
export {
  ARTICLE_CATEGORIES,
  ARTICLE_CATEGORY_OPTIONS,
  ARTICLE_CATEGORY_LABEL_MAP,
  toArticleSummary,
} from './types/article.type';
export type {
  Article,
  ArticleSummary,
  ArticleCategory,
} from './types/article.type';
