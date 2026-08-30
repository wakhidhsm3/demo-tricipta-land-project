'use client';

import React from 'react';
import { MessageSquare, Phone, MapPin } from 'lucide-react';
import { CompanyHeadOffice } from '@/lib/types/company.type';
import { FaqItem } from '../types/home.type';
import { propertyFaqsData } from '../data/faqs.data';
import { AnimateIn, SectionContainer, SectionEyebrow, CurvedUnderline } from '@/components/shared';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { siteConfig } from '@/lib/config/site.config';
import { openWhatsApp, buildFaqInquiryMessage } from '@/lib/whatsapp';

export interface HomeCtaSectionProps {
  contactData: CompanyHeadOffice;
  faqs?: FaqItem[];
}

export function HomeCtaSection({ contactData, faqs = propertyFaqsData }: HomeCtaSectionProps) {
  const handleWaClick = () => {
    openWhatsApp({
      phone: contactData.whatsapp,
      message: buildFaqInquiryMessage(),
    });
  };

  return (
    <section id="faq" className="w-full bg-white border-b border-dashed border-slate-200">
      <SectionContainer noPadding>
        {/* Header matching shadcn-studio Any Questions */}
        <AnimateIn variant="fade-up" durationMs={500}>
          <div className="px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-10 sm:pb-12 text-center flex flex-col items-center gap-3 border-b border-dashed border-slate-200">
            <SectionEyebrow>
              FAQ & Konsultasi
            </SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-slate-900 tracking-tight max-w-3xl">
              Ada Pertanyaan Seputar{' '}
              <span className="relative inline-block text-emerald-800">
                Rumah Impian Anda?
                <CurvedUnderline strokeVariant="green" className="absolute inset-x-0 -bottom-1 w-full translate-y-1/2" />
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
              Temukan jawaban atas pertanyaan umum seputar legalitas perizinan, skema KPR perbankan, proses booking, hingga jadwal survei lokasi perumahan {siteConfig.name}.
            </p>
          </div>
        </AnimateIn>

        {/* FAQ Accordion Area */}
        <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-b border-dashed border-slate-200 bg-slate-50/20">
          <Accordion
            type="single"
            defaultValue={faqs[0]?.id}
            className="mx-auto w-full max-w-4xl bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.02)]"
          >
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <p>{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
              <Button
                variant="default"
                size="lg"
                onClick={handleWaClick}
              >
                <MessageSquare className="size-4.5 text-emerald-200" />
                <span>Konsultasi WhatsApp</span>
              </Button>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
