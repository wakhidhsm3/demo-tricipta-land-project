import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, ChevronRight, Home } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Article } from '@/lib/types/article';

export interface ArticleDetailHeroProps {
  article: Article;
}

export function ArticleDetailHero({ article }: ArticleDetailHeroProps) {
  return (
    <>
      {/* Sticky Breadcrumb Bar */}
      <div className="sticky top-16 z-40 w-full bg-white/95 backdrop-blur-md border-b border-dashed border-slate-200 shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 min-[1280px]:border-x min-[1280px]:border-dashed min-[1280px]:border-slate-200">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap">
            <Link href="/" className="inline-flex items-center gap-1 hover:text-emerald-700 transition-colors font-medium">
              <Home className="size-3.5 text-slate-400" />
              <span>Beranda</span>
            </Link>
            <ChevronRight className="size-3.5 text-slate-400" />
            <Link href="/articles" className="hover:text-emerald-700 transition-colors font-medium">
              Artikel & Edukasi
            </Link>
            <ChevronRight className="size-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-md lg:max-w-xl">
              {article.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Hero Header Section */}
      <section className="w-full bg-white border-b border-dashed border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-10 sm:pb-12 min-[1280px]:border-x min-[1280px]:border-dashed min-[1280px]:border-slate-200">

        {/* Headline */}
        <div className="flex flex-col gap-4 max-w-4xl">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            {article.title}
          </h1>

          {/* Author & Published Info Strip */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-500 pt-2 border-t border-dashed border-slate-200 mt-2">
            <span className="flex items-center gap-1.5 font-medium text-slate-800">
              <User className="size-4 text-emerald-700" />
              <span>{article.author}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4 text-emerald-700" />
              <span>{formatDate(article.publishedAt)}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4 text-emerald-700" />
              <span>{article.readTimeMinutes} Menit Baca</span>
            </span>
          </div>
        </div>

        {/* Main Cover Image */}
        <div className="relative h-80 sm:h-110 lg:h-130 w-full rounded-2xl sm:rounded-3xl overflow-hidden mt-8 border border-slate-200/90 shadow-md bg-slate-100">
          <Image
            src={article.coverImage.url}
            alt={article.coverImage.alt}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
    </>
  );
}
