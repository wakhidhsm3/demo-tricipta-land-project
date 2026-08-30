'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home, MessageSquare } from 'lucide-react';
import { SectionContainer } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/config/site.config';
import { createWhatsAppUrl, buildErrorReportInquiryMessage } from '@/lib/whatsapp';
import { reportError } from '@/lib/error-reporting';

export interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    reportError(error, { context: { source: 'ErrorPage' } });
  }, [error]);


  const whatsappHelpUrl = createWhatsAppUrl({
    phone: siteConfig.headOffice.whatsapp,
    message: buildErrorReportInquiryMessage(error.digest),
  });

  return (
    <div className="w-full bg-white">
      <section className="relative w-full border-b border-dashed border-slate-200 py-16 sm:py-24 overflow-hidden">
        {/* Soft Radial Background Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-160 h-80 pointer-events-none z-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(239, 68, 68, 0.06) 0%, transparent 70%)',
          }}
        />

        <SectionContainer className="relative z-10 text-center flex flex-col items-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-800 text-xs font-bold uppercase tracking-wider mb-6 shadow-2xs">
            <AlertTriangle className="size-3.5 text-red-600" />
            <span>Terjadi Kendala Sistem</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight max-w-2xl">
            Maaf, Terjadi Kesalahan Saat Memuat Halaman
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
            Permintaan Anda tidak dapat diproses saat ini. Silakan coba muat ulang halaman atau hubungi layanan bantuan kami.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <Button
              variant="default"
              size="lg"
              onClick={reset}
              className="shadow-emerald-800/20 hover:shadow-lg"
            >
              <RotateCcw className="size-4" />
              <span>Coba Muat Ulang</span>
            </Button>

            <Link href="/">
              <Button
                variant="outline"
                size="lg"
                className="border-slate-200 hover:bg-slate-50"
              >
                <Home className="size-4" />
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
                <span>Bantuan Teknis</span>
              </Button>
            </a>
          </div>
        </SectionContainer>
      </section>
    </div>
  );
}
