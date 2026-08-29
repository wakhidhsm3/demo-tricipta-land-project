'use client';

import React, { useState } from 'react';
import { ChevronDown, MessageSquare, Phone, MapPin } from 'lucide-react';
import { CompanyHeadOffice } from '@/lib/types/company';
import { FaqItem } from '@/lib/types/faq';
import { propertyFaqsData } from '@/lib/data/faqs';
import { cn } from '@/lib/utils';
import { AnimateIn } from '@/components/shared/AnimateIn';

export interface HomeCtaSectionProps {
  contactData: CompanyHeadOffice;
  faqs?: FaqItem[];
}

export function HomeCtaSection({ contactData, faqs = propertyFaqsData }: HomeCtaSectionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleWaClick = () => {
    const waUrl = `https://wa.me/${contactData.whatsapp}?text=${encodeURIComponent(
      'Halo TRICIPTA LAND, saya ingin berkonsultasi mengenai unit perumahan, skema KPR, atau jadwal survei lokasi.'
    )}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section id="faq" className="w-full bg-white border-b border-dashed border-slate-200">
      <div className="mx-auto max-w-7xl min-[1280px]:border-x min-[1280px]:border-dashed min-[1280px]:border-slate-200">
        {/* Header matching shadcn-studio Any Questions */}
        <AnimateIn variant="fade-up" durationMs={500}>
          <div className="px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-10 sm:pb-12 text-center flex flex-col items-center gap-3 border-b border-dashed border-slate-200">
            <span className="font-serif italic font-semibold text-emerald-800 text-sm sm:text-base tracking-wide underline underline-offset-6">
              FAQ & Konsultasi
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-slate-900 tracking-tight max-w-3xl">
              Ada Pertanyaan Seputar{' '}
              <span className="relative inline-block text-emerald-800">
                Rumah Impian Anda?
                <svg
                  width="223"
                  height="10"
                  viewBox="0 0 223 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-x-0 -bottom-1 w-full translate-y-1/2"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1.11716 8.428C39.7835 3.97282 75.9074 2.10494 114.894 1.48894C143.706 1.05983 175.684 0.213587 204.212 2.71596C209.925 2.9546 215.144 3.79884 221.535 4.74551"
                    stroke="#15803d"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
              Temukan jawaban atas pertanyaan umum seputar legalitas perizinan, skema KPR perbankan, proses booking, hingga jadwal survei lokasi perumahan TRICIPTA LAND.
            </p>
          </div>
        </AnimateIn>

        {/* FAQ Accordion Area */}
        <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-b border-dashed border-slate-200 bg-slate-50/20">
          {/* FAQ Accordion matching shadcn-studio accordion style */}
          <div className="mx-auto w-full max-w-4xl bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.02)] divide-y divide-slate-200 overflow-hidden">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id} className="transition-colors duration-200">
                  <h3>
                    <button
                      type="button"
                      onClick={() => toggle(faq.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 py-5 px-6 sm:px-7 text-left text-base sm:text-lg font-serif font-bold text-slate-900 hover:text-emerald-800 hover:bg-slate-50/50 transition-all cursor-pointer select-none"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={cn(
                          'size-5 text-slate-400 shrink-0 transition-transform duration-300 ease-out',
                          isOpen && 'rotate-180 text-emerald-700'
                        )}
                      />
                    </button>
                  </h3>
                  {isOpen && (
                    <div className="px-6 sm:px-7 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed animate-in fade-in duration-200">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Consultation Callout Box Area */}
        <div className="px-4 sm:px-6 lg:px-8 py-10 sm:py-12 bg-white">
          <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white border border-dashed border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="text-center sm:text-left space-y-1">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                Masih Memiliki Pertanyaan Lain?
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-lg">
                Konsultasikan kebutuhan hunian, simulasi cicilan KPR, atau jadwalkan survei lokasi langsung bersama representatif kami.
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 pt-2 font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-emerald-700" />
                  {contactData.city}, {contactData.province}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-emerald-700" />
                  {contactData.phone}
                </span>
              </div>
            </div>

            <div className="shrink-0">
              <button
                onClick={handleWaClick}
                className="h-11 sm:h-12 px-6 sm:px-7 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm sm:text-base inline-flex items-center justify-center gap-2.5 shadow-md shadow-emerald-800/20 hover:shadow-lg hover:shadow-emerald-800/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer select-none"
              >
                <MessageSquare className="size-4.5 text-emerald-200 shrink-0" />
                <span>Konsultasi WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
