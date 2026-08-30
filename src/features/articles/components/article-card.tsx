import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowUpRight, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { Article, ArticleSummary, ARTICLE_CATEGORY_LABEL_MAP } from '../types/article.type';

export interface ArticleCardProps {
  article: Article | ArticleSummary;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const categoryDisplay = ARTICLE_CATEGORY_LABEL_MAP[article.category] || article.category;


  return (
    <Link
      href={`/articles/${article.id}`}
      className="group relative flex flex-col justify-between p-6 sm:p-7 bg-white hover:bg-slate-50/50 hover-card-lift rounded-2xl border border-slate-200/90 shadow-2xs hover:border-emerald-300"
    >
      <div>
        {/* Header: Badges & Arrow Action Icon */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-emerald-50 text-emerald-800 font-bold rounded-full px-2.5 py-0.5 text-[11px] border border-emerald-200/60 shadow-xs"
              >
                {categoryDisplay}
              </Badge>
              <span className="text-[11px] font-medium text-slate-400 inline-flex items-center gap-1">
                <Clock className="size-3 text-slate-400" />
                {article.readTimeMinutes} Mnt Baca
              </span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          <div className="size-8 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 group-hover:bg-emerald-700 group-hover:border-emerald-700 group-hover:text-white transition-colors duration-200 shrink-0">
            <ArrowUpRight className="size-4" />
          </div>
        </div>

        {/* Cover Image Container */}
        <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-slate-100 mt-4 border border-slate-200/80">
          <Image
            src={article.coverImage.url}
            alt={article.coverImage.alt}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      {/* Footer: Date & Read More text with arrow */}
      <div className="mt-5 border-t border-dashed border-slate-200 pt-4 flex items-center justify-between text-xs font-semibold">
        <span className="flex items-center gap-1.5 text-slate-500">
          <Calendar className="size-3.5 text-emerald-700" />
          {formatDate(article.publishedAt)}
        </span>
        <span className="text-emerald-800 group-hover:text-emerald-900 inline-flex items-center gap-1 uppercase tracking-wider text-[11px] font-bold">
          Baca Artikel
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
