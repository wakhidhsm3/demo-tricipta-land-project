export const ARTICLE_CATEGORIES = [
  'BERITA',
  'TIPS_HUNIAN',
  'INVESTASI',
  'PROGRES_PROYEK',
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

export const ARTICLE_CATEGORY_OPTIONS: readonly { value: ArticleCategory | 'ALL'; label: string }[] = [
  { value: 'ALL', label: 'Semua Kategori Artikel' },
  { value: 'BERITA', label: 'Berita & Informasi Terkini' },
  { value: 'TIPS_HUNIAN', label: 'Tips Hunian & Legalitas' },
  { value: 'INVESTASI', label: 'Investasi & Skema KPR' },
  { value: 'PROGRES_PROYEK', label: 'Progres Kawasan Proyek' },
] as const;

export const ARTICLE_CATEGORY_LABEL_MAP: Record<ArticleCategory, string> = {
  BERITA: 'Berita Terkini',
  TIPS_HUNIAN: 'Tips Hunian',
  INVESTASI: 'Investasi & KPR',
  PROGRES_PROYEK: 'Progres Kawasan',
};

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: ArticleCategory;
  province?: string;
  publishedAt: string;
  readTimeMinutes: number;
  author: string;
  excerpt: string;
  contentMarkdown: string;
  coverImage: {
    url: string;
    alt: string;
  };
  tags: string[];
  isFeatured: boolean;
}

/**
 * Lightweight DTO for article cards and catalog lists.
 * Omits heavy contentMarkdown string payload from RSC client hydration.
 */
export interface ArticleSummary {
  id: string;
  slug: string;
  title: string;
  category: ArticleCategory;
  province?: string;
  publishedAt: string;
  readTimeMinutes: number;
  author: string;
  excerpt: string;
  coverImage: {
    url: string;
    alt: string;
  };
  tags: string[];
  isFeatured: boolean;
}

/**
 * Pure transform helper to convert full Article entity to ArticleSummary DTO.
 */
export function toArticleSummary(article: Article): ArticleSummary {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    category: article.category,
    province: article.province,
    publishedAt: article.publishedAt,
    readTimeMinutes: article.readTimeMinutes,
    author: article.author,
    excerpt: article.excerpt,
    coverImage: article.coverImage,
    tags: article.tags,
    isFeatured: article.isFeatured,
  };
}
