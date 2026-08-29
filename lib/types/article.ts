export type ArticleCategory = 'BERITA' | 'TIPS_HUNIAN' | 'INVESTASI' | 'PROGRES_PROYEK';

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: ArticleCategory;
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
