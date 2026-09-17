'use client';

import React from 'react';
import Image from 'next/image';
import { Map, X } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SectionContainer, SectionEyebrow } from '@/components/shared';
import { useDisclosure } from '@/hooks';

export interface SitePlanViewerProps {
  sitePlanUrl: string;
  projectName: string;
}

export function SitePlanViewer({ sitePlanUrl, projectName }: SitePlanViewerProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <section className="w-full bg-slate-50/40 border-b border-dashed border-slate-200">
      <SectionContainer className="py-12 sm:py-16">
        <div className="mb-8">
          <SectionEyebrow>
            Tata Ruang & Kavling
          </SectionEyebrow>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Site Plan & Master Plan Kawasan
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Peta tata letak kavling, posisi fasos/fasum, dan jaringan jalan di {projectName}.
          </p>
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={onOpen}
          onKeyDown={handleKeyDown}
          aria-label={`Perbesar Master Plan ${projectName}`}
          className="relative h-80 sm:h-110 w-full rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-100 group cursor-pointer shadow-xs hover:border-emerald-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 transition-all duration-300"
        >
          <Image
            src={sitePlanUrl}
            alt={`Site Plan ${projectName}`}
            fill
            quality={85}
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
            <span className="inline-flex items-center gap-2 bg-emerald-700 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-xl">
              <Map className="size-4.5" /> Klik Untuk Memperbesar Peta
            </span>
          </div>
        </div>
      </SectionContainer>

      {/* Fullscreen Modal Dialog with Clean White Theme */}
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        hideHeader
        className="max-w-5xl w-full bg-white text-slate-900 p-4 sm:p-5 lg:p-6 rounded-3xl border border-slate-200 shadow-2xl overflow-hidden"
      >
        <div className="relative flex flex-col items-center justify-center w-full">
          {/* Header info: counter/badge & title */}
          <div className="w-full flex items-center justify-between border-b border-dashed border-slate-200 pb-3 mb-3.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80 shrink-0">
                Master Plan Kawasan
              </span>
              <span className="text-xs text-slate-600 font-medium truncate max-w-md hidden sm:inline">
                {projectName} • Peta Blok & Fasilitas
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="size-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 shrink-0"
              aria-label="Tutup Peta Master Plan"
            >
              <X className="size-4.5" />
            </Button>
          </div>

          {/* Main high-res image view */}
          <div className="relative h-[55vh] sm:h-[65vh] lg:h-[70vh] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80">
            <Image
              src={sitePlanUrl}
              alt={`Site Plan Full ${projectName}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Bottom caption */}
          <p className="mt-3.5 text-center text-xs sm:text-sm font-semibold text-slate-700">
            Tata Letak Kavling, Fasilitas Umum & Row Jalan • {projectName}
          </p>
        </div>
      </Dialog>
    </section>
  );
}
