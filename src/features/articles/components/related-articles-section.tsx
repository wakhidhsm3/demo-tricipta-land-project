import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { articleRepository } from '../repositories/article.repository';
import { formatDate } from '@/lib/utils';

export interface RelatedArticlesSectionProps {
  currentArticleId: string;
  category: string;
}

export async function RelatedArticlesSection({ currentArticleId, category }: RelatedArticlesSectionProps) {
  const displayArticles = await articleRepository.getRelated(currentArticleId, category, 3);


  if (displayArticles.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Sidebar Section Header */}
      <div className="border-b border-dashed border-slate-200 pb-2.5">
        <span className="font-serif italic font-semibold text-emerald-800 text-xs tracking-wide underline underline-offset-4">
          Wawasan & Edukasi
        </span>
        <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-1">
          Artikel Terkait Lainnya
        </h3>
      </div>

      {/* Vertical Related Articles List */}
      <div className="flex flex-col gap-3">
        {displayArticles.map((art) => (
          <Link
            key={art.id}
            href={`/articles/${art.id}`}
            className="group bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-emerald-300 hover:shadow-xs transition-all duration-200 flex items-center gap-3"
          >
            {/* Cover Thumbnail */}
            <div className="relative size-16 sm:size-18 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200/80">
              <Image
                src={art.coverImage.url}
                alt={art.coverImage.alt}
                fill
                sizes="72px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Title & Metadata */}
            <div className="flex flex-col justify-between flex-1 min-w-0">
              <div>
                <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/70 inline-block mb-1">
                  {art.category}
                </span>
                <h4 className="font-serif text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-emerald-800 transition-colors leading-snug">
                  {art.title}
                </h4>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="size-3 text-slate-400" />
                  <span>{formatDate(art.publishedAt)}</span>
                </span>
                <span>•</span>
                <span>{art.readTimeMinutes} Mnt</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Link to Full Catalog */}
      <Link
        href="/articles"
        className="w-full h-10 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-dashed border-slate-300 hover:border-emerald-300 font-semibold text-xs inline-flex items-center justify-center gap-2 transition-all duration-200"
      >
        <BookOpen className="size-3.5 text-emerald-700" />
        <span>Lihat Semua Artikel & Edukasi</span>
        <ArrowRight className="size-3.5" />
      </Link>
    </div>
  );
}
