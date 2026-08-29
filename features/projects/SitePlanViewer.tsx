'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Maximize2, Map } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';

export interface SitePlanViewerProps {
  sitePlanUrl: string;
  projectName: string;
}

export function SitePlanViewer({ sitePlanUrl, projectName }: SitePlanViewerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="w-full bg-slate-50/40 border-b border-dashed border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 min-[1280px]:border-x min-[1280px]:border-dashed min-[1280px]:border-slate-200">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-serif italic font-semibold text-emerald-800 text-sm tracking-wide underline underline-offset-6">
              Tata Ruang & Kavling
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Site Plan & Master Plan Kawasan
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Peta tata letak kavling, posisi fasos/fasum, dan jaringan row jalan di {projectName}.
            </p>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition-colors cursor-pointer shrink-0"
          >
            <Maximize2 className="size-4" />
            <span>Perbesar Master Plan</span>
          </button>
        </div>

        <div
          onClick={() => setIsOpen(true)}
          className="relative h-80 sm:h-110 w-full rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-100 group cursor-pointer shadow-xs hover:border-emerald-300 transition-all duration-300"
        >
          <Image
            src={sitePlanUrl}
            alt={`Site Plan ${projectName}`}
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
            <span className="inline-flex items-center gap-2 bg-emerald-700 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-xl">
              <Map className="size-4.5" /> Klik Untuk Memperbesar Peta
            </span>
          </div>
        </div>
      </div>

      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} className="max-w-5xl bg-black/95 text-white p-3 rounded-2xl border border-white/20">
        <div className="relative h-[75vh] w-full">
          <Image src={sitePlanUrl} alt={`Site Plan Full ${projectName}`} fill sizes="100vw" className="object-contain" />
        </div>
      </Dialog>
    </section>
  );
}
