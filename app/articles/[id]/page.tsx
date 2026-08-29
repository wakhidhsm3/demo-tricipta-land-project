import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowUpRight, MessageSquare } from 'lucide-react';
import { ArticleDetailHero } from '@/features/articles/ArticleDetailHero';
import { ArticleMarkdownBody } from '@/features/articles/ArticleMarkdownBody';
import { RelatedArticlesSection } from '@/features/articles/RelatedArticlesSection';
import { getArticleById, getArticles } from '@/lib/data/articles';
import { companyProfileData } from '@/lib/data/companyProfile';

interface ArticleDetailProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ id: article.id }));
}

export async function generateMetadata({ params }: ArticleDetailProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) return { title: 'Artikel Tidak Ditemukan — TRICIPTA LAND' };

  return {
    title: `${article.title} — TRICIPTA LAND`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage.url],
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailProps) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage.url,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'TRICIPTA LAND Editorial',
    },
  };

  const whatsappInquiryUrl = `https://wa.me/${companyProfileData.headOffice.whatsapp}?text=${encodeURIComponent(
    `Halo TRICIPTA LAND, saya membaca artikel "${article.title}" dan ingin berkonsultasi seputar perumahan & KPR.`
  )}`;

  return (
    <main className="w-full bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <ArticleDetailHero article={article} />

      {/* Main Content Area with Split 2-Column (Body on Left, Sticky Sidebar on Right) */}
      <section className="w-full bg-white border-b border-dashed border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 min-[1280px]:border-x min-[1280px]:border-dashed min-[1280px]:border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left Column (Main Article Content) */}
            <article className="lg:col-span-8 flex flex-col gap-6">
              <ArticleMarkdownBody content={article.contentMarkdown} />
            </article>

            {/* Right Column (Sticky Sidebar: Related Articles & Consultation CTA) */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start flex flex-col gap-5">
              {/* Related Articles Widget */}
              <RelatedArticlesSection currentArticleId={article.id} category={article.category} />

              {/* Consultation CTA Banner */}
              <div className="p-5 sm:p-6 rounded-3xl border border-dashed border-emerald-300 bg-emerald-50/70 flex flex-col gap-3.5 shadow-2xs">
                <div>
                  <span className="font-serif italic font-semibold text-emerald-800 text-xs tracking-wide underline underline-offset-4">
                    Konsultasi Properti Gratis
                  </span>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-slate-900 mt-1">
                    Cari Rumah Impian yang Sesuai Budget Anda?
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Tim konsultan TRICIPTA LAND siap membantu simulasi KPR subsidi/komersil dan pendampingan survey lokasi gratis.
                  </p>
                </div>

                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs inline-flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <MessageSquare className="size-3.5" />
                  <span>Hubungi via WhatsApp</span>
                  <ArrowUpRight className="size-3.5 opacity-75" />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
