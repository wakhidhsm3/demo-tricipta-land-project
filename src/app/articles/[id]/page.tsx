import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowUpRight, MessageSquare } from 'lucide-react';
import {
  ArticleDetailHero,
  ArticleMarkdownBody,
  RelatedArticlesSection,
  getArticleById,
  getAllArticleIds,
} from '@/features/articles';
import { getCompanyProfile } from '@/features/about';
import { SectionContainer } from '@/components/shared';
import { createWhatsAppUrl, buildArticleInquiryMessage } from '@/lib/whatsapp';
import { buildArticleJsonLd } from '@/lib/seo/jsonld';
import { SafeJsonLd } from '@/lib/seo/safe-jsonld';
import { siteConfig } from '@/lib/config/site.config';

// Next.js App Router segment config requires statically analyzable literal
export const revalidate = 3600;

interface ArticleDetailProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const ids = await getAllArticleIds();
  return ids.map((id) => ({ id }));
}


export async function generateMetadata({ params }: ArticleDetailProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) return { title: `Artikel Tidak Ditemukan — ${siteConfig.name}` };

  return {
    title: `${article.title} — ${siteConfig.name}`,
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
  const [article, companyProfile] = await Promise.all([
    getArticleById(id),
    getCompanyProfile(),
  ]);

  if (!article) notFound();

  const jsonLd = buildArticleJsonLd(article);

  const whatsappInquiryUrl = createWhatsAppUrl({
    phone: companyProfile.headOffice.whatsapp,
    message: buildArticleInquiryMessage({ articleTitle: article.title }),
  });



  return (
    <main className="w-full bg-white">
      <SafeJsonLd data={jsonLd} />

      {/* Hero Section */}
      <ArticleDetailHero article={article} />

      {/* Main Content Area with Split 2-Column (Body on Left, Sticky Sidebar on Right) */}
      <section className="w-full bg-white border-b border-dashed border-slate-200">
        <SectionContainer className="py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0">
            {/* Left Column (Main Article Content + End-of-Article Consultation CTA) */}
            <article className="lg:col-span-8 lg:pr-10 xl:pr-14 flex flex-col gap-8">
              <ArticleMarkdownBody content={article.contentMarkdown} />

              {/* Consultation CTA Banner at Bottom of Reading */}
              <div className="p-6 sm:p-8 rounded-3xl border border-dashed border-emerald-300 bg-emerald-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-2xs mt-4">
                <div className="space-y-1.5 flex-1">
                  <span className="font-serif italic font-semibold text-emerald-800 text-xs tracking-wide underline underline-offset-4">
                    Konsultasi Properti Gratis
                  </span>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                    Cari Rumah Impian yang Sesuai Budget Anda?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                    Tim konsultan {siteConfig.name} siap membantu simulasi KPR subsidi/komersil dan pendampingan survey lokasi gratis.
                  </p>
                </div>

                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm inline-flex items-center justify-center gap-2.5 shadow-xs transition-colors shrink-0"
                >
                  <MessageSquare className="size-4" />
                  <span>Hubungi via WhatsApp</span>
                  <ArrowUpRight className="size-4 opacity-75" />
                </a>
              </div>
            </article>

            {/* Right Column (Sidebar: Sticky Wawasan & Edukasi Artikel Terkait) */}
            <aside className="lg:col-span-4 lg:pl-10 xl:pl-14 border-t lg:border-t-0 lg:border-l border-dashed border-slate-200 pt-10 lg:pt-4 lg:sticky lg:top-24 lg:self-start">
              <RelatedArticlesSection currentArticleId={article.id} category={article.category} />
            </aside>
          </div>
        </SectionContainer>
      </section>
    </main>
  );
}
