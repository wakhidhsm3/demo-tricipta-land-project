'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ProjectGalleryImage } from '../types/project.type';
import { SectionHeader, SectionContainer } from '@/components/shared';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GalleryMosaicCard } from './gallery-mosaic-card';

export interface ProjectGalleryLightboxProps {
  images: ProjectGalleryImage[];
}

export function ProjectGalleryLightbox({ images }: ProjectGalleryLightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const isOpen = selectedIndex !== null;

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  }, [selectedIndex, images.length]);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  }, [selectedIndex, images.length]);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);


  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev]);

  // Safe fallback if images array is short
  const mainImage = images[0];
  const item1 = images[1] || images[0];
  const item2 = images[2] || images[0];
  const item3 = images[3] || images[0];
  const item4 = images[4] || images[0];

  return (
    <section className="w-full bg-white border-b border-dashed border-slate-200">
      <SectionContainer className="py-10 sm:py-14">
        <SectionHeader
          badgeText="Visual & Lingkungan Asri"
          title="Galeri Foto Perumahan & Rumah Contoh"
          description="Klik foto untuk melihat visualisasi fasad, interior, dan fasilitas lingkungan kawasan secara penuh."
          borderBottom={false}
          className="pt-0 sm:pt-0 pb-6 sm:pb-8 px-0 sm:px-0"
        />

        {/* Mosaic Collage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
          {/* 1. Large Main Hero Image on Left */}
          {mainImage && (
            <GalleryMosaicCard
              image={mainImage}
              onClick={() => setSelectedIndex(0)}
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
              isMainHero
              className="md:col-span-7 h-70 sm:h-95 lg:h-120"
            />
          )}

          {/* 2. 2x2 Grid of Smaller Images on Right */}
          <div className="md:col-span-5 grid grid-cols-2 gap-3 sm:gap-3.5 h-70 sm:h-95 lg:h-120">
            <GalleryMosaicCard
              image={item1}
              onClick={() => setSelectedIndex(1)}
              sizes="(max-width: 768px) 50vw, 25vw"
              className="h-full"
            />
            <GalleryMosaicCard
              image={item2}
              onClick={() => setSelectedIndex(2)}
              sizes="(max-width: 768px) 50vw, 25vw"
              className="h-full"
            />
            <GalleryMosaicCard
              image={item3}
              onClick={() => setSelectedIndex(3)}
              sizes="(max-width: 768px) 50vw, 25vw"
              className="h-full"
            />
            <GalleryMosaicCard
              image={item4}
              onClick={() => setSelectedIndex(4 < images.length ? 4 : 0)}
              sizes="(max-width: 768px) 50vw, 25vw"
              className="h-full"
              extraCount={images.length > 5 ? images.length - 5 : undefined}
            />
          </div>
        </div>
      </SectionContainer>

      {/* Fullscreen Lightbox Modal Dialog with Clean White Theme */}
      <Dialog
        isOpen={isOpen}
        onClose={handleClose}
        hideHeader
        className="max-w-5xl w-full bg-white text-slate-900 p-4 sm:p-5 lg:p-6 rounded-3xl border border-slate-200 shadow-2xl overflow-hidden"
      >
        {selectedIndex !== null && (
          <div className="relative flex flex-col items-center justify-center w-full">
            {/* Header info: counter & caption */}
            <div className="w-full flex items-center justify-between border-b border-dashed border-slate-200 pb-3 mb-3.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80 shrink-0">
                  Foto {selectedIndex + 1} dari {images.length}
                </span>
                <span className="text-xs text-slate-600 font-medium truncate max-w-md hidden sm:inline">
                  {images[selectedIndex].caption || images[selectedIndex].alt}
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="size-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 shrink-0"
                aria-label="Tutup Galeri"
              >
                <X className="size-4.5" />
              </Button>
            </div>

            {/* Main high-res image view */}
            <div className="relative h-[44vh] sm:h-[50vh] lg:h-[54vh] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80">
              <Image
                src={images[selectedIndex].url}
                alt={images[selectedIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />

              {/* Navigation Arrows */}
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/90 hover:bg-emerald-700 text-slate-800 hover:text-white border border-slate-200 shadow-md"
                aria-label="Foto sebelumnya"
              >
                <ChevronLeft className="size-6" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/90 hover:bg-emerald-700 text-slate-800 hover:text-white border border-slate-200 shadow-md"
                aria-label="Foto selanjutnya"
              >
                <ChevronRight className="size-6" />
              </Button>
            </div>

            {/* Bottom caption */}
            <p className="mt-3.5 text-center text-xs sm:text-sm font-semibold text-slate-800">
              {images[selectedIndex].caption || images[selectedIndex].alt}
            </p>

            {/* Thumbnails Row */}
            <div className="flex items-center gap-2 mt-4 overflow-x-auto max-w-full pb-2 scrollbar-none">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={`relative size-14 sm:size-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    selectedIndex === idx
                      ? 'border-emerald-600 ring-2 ring-emerald-600/30 scale-105 shadow-xs'
                      : 'border-slate-200 opacity-60 hover:opacity-100 hover:border-emerald-300'
                  }`}
                >
                  <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          </div>
        )}
      </Dialog>
    </section>
  );
}
