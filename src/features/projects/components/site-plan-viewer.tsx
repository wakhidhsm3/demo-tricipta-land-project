'use client';

import React from 'react';
import Image from 'next/image';
import { Maximize2, Map } from 'lucide-react';
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
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
          <div>
            <SectionEyebrow>
              Tata Ruang & Kavling
            </SectionEyebrow>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Site Plan & Master Plan Kawasan
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Peta tata letak kavling, posisi fasos/fasum, dan jaringan row jalan di {projectName}.
            </p>
          </div>

          <Button
            variant="default"
            size="md"
            onClick={onOpen}
            className="shrink-0"
          >
            <Maximize2 className="size-4" />
            <span>Perbesar Master Plan</span>
          </Button>
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

      <Dialog isOpen={isOpen} onClose={onClose} className="max-w-5xl bg-black/95 text-white p-3 rounded-2xl border border-white/20">
        <div className="relative h-[75vh] w-full">
          <Image src={sitePlanUrl} alt={`Site Plan Full ${projectName}`} fill sizes="100vw" className="object-contain" />
        </div>
      </Dialog>
    </section>
  );
}
