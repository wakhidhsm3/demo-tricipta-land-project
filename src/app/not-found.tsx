import Link from 'next/link';
import { Compass, BookOpen, Building2, PhoneCall, Home, MessageSquare, ArrowRight } from 'lucide-react';
import { SectionContainer, SectionEyebrow } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/config/site.config';
import { notFoundQuickLinksConfig } from '@/lib/config/not-found.config';
import { createWhatsAppUrl, buildNotFoundHelpMessage } from '@/lib/whatsapp';

const QUICK_LINK_ICONS = {
  Compass: <Compass className="size-5 text-emerald-700" />,
  BookOpen: <BookOpen className="size-5 text-emerald-700" />,
  Building2: <Building2 className="size-5 text-emerald-700" />,
  PhoneCall: <PhoneCall className="size-5 text-emerald-700" />,
};

export default function NotFound() {
  const whatsappHelpUrl = createWhatsAppUrl({
    phone: siteConfig.headOffice.whatsapp,
    message: buildNotFoundHelpMessage(),
  });


  return (
    <div className="w-full bg-white">
      {/* 404 Hero Section */}
      <section className="relative w-full border-b border-dashed border-slate-200 py-16 sm:py-24 overflow-hidden">
        {/* Signature Dashed Lateral Borders */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-7xl border-x border-dashed border-slate-200 pointer-events-none z-0" />

        {/* Soft Radial Background Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-160 h-80 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-6 shadow-2xs">
            <span>Kode Status 404</span>
            <span className="size-1 rounded-full bg-emerald-600" />
            <span>Halaman Tidak Ditemukan</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
            Oops! Halaman yang Anda Cari <span className="text-emerald-800 underline underline-offset-6">Belum Tersedia</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            Halaman mungkin telah dipindahkan, tautan tidak tepat, atau kawasan hunian sedang dalam pembaruan berkala oleh tim {siteConfig.name}.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <Link href="/">
              <Button variant="default" size="lg" className="shadow-emerald-800/20 hover:shadow-lg">
                <Home className="size-4.5" />
                <span>Kembali ke Beranda</span>
              </Button>
            </Link>

            <a
              href={whatsappHelpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <Button
                variant="default"
                size="lg"
                className="bg-slate-900 hover:bg-black text-white shadow-slate-900/10"
              >
                <MessageSquare className="size-4" />
                <span>Bantuan WhatsApp</span>
                <ArrowRight className="size-3.5 opacity-75" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Quick Discovery Directory */}
      <section className="w-full bg-slate-50/40 py-12 sm:py-16">
        <SectionContainer>
          <div className="text-center max-w-xl mx-auto mb-8">
            <SectionEyebrow>
              Navigasi Cepat
            </SectionEyebrow>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Temukan Informasi Properti yang Anda Butuhkan
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {notFoundQuickLinksConfig.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="size-11 rounded-xl bg-emerald-50/80 border border-emerald-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-emerald-700 group-hover:text-white transition-all duration-300">
                    {QUICK_LINK_ICONS[link.iconName]}
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-2 line-clamp-3">
                    {link.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-dashed border-slate-200 flex items-center justify-between text-xs font-semibold text-emerald-800 group-hover:text-emerald-700">
                  <span>Akses Halaman</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </SectionContainer>
      </section>
    </div>
  );
}
