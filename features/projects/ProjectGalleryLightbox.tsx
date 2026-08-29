'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Maximize2, ChevronLeft, ChevronRight, X, Sparkles, Eye } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';

export interface ProjectGalleryLightboxProps {
  images: { url: string; alt: string; caption?: string }[];
}

export function ProjectGalleryLightbox({ images }: ProjectGalleryLightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const isOpen = selectedIndex !== null;

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, images.length]);

  // Safe fallback if images array is short
  const mainImage = images[0];
  const item1 = images[1] || images[0];
  const item2 = images[2] || images[0];
  const item3 = images[3] || images[0];
  const item4 = images[4] || images[0];

  const remainingCount = Math.max(1, images.length - 4);

  return (
    <section className="w-full bg-white border-b border-dashed border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 min-[1280px]:border-x min-[1280px]:border-dashed min-[1280px]:border-slate-200">
        {/* Header matching Home Page & Shadcn Studio blocks */}
        <div className="flex flex-col items-center gap-2 text-center mb-8 sm:mb-10">
          <span className="font-serif italic font-semibold text-emerald-800 text-sm tracking-wide underline underline-offset-6">
            Visual & Lingkungan Asri
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Galeri Foto Perumahan & Rumah Contoh
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl leading-relaxed">
            Klik foto untuk melihat visualisasi fasad, interior, dan fasilitas lingkungan kawasan secara penuh.
          </p>
        </div>

        {/* Mosaic Collage Grid matching User Reference Screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
          {/* 1. Large Main Hero Image on Left */}
          {mainImage && (
            <div
              onClick={() => setSelectedIndex(0)}
              className="md:col-span-7 relative h-70 sm:h-95 lg:h-120 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group bg-slate-100 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all duration-300"
            >
              <Image
                src={mainImage.url}
                alt={mainImage.alt}
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

              {/* Floating Action Button */}
              <div className="absolute top-4 left-4 size-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-700 group-hover:bg-emerald-700 group-hover:text-white transition-colors duration-200 shadow-xs">
                <Eye className="size-4.5" />
              </div>

              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="text-xs sm:text-sm font-semibold drop-shadow-xs line-clamp-1">
                  {mainImage.caption || mainImage.alt}
                </span>
              </div>
            </div>
          )}

          {/* 2. 2x2 Grid of Smaller Images on Right */}
          <div className="md:col-span-5 grid grid-cols-2 gap-3 sm:gap-3.5 h-70 sm:h-95 lg:h-120">
            {/* Top-Left Small Card */}
            <div
              onClick={() => setSelectedIndex(1)}
              className="relative h-full rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group bg-slate-100 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all duration-300"
            >
              <Image
                src={item1.url}
                alt={item1.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            </div>

            {/* Top-Right Small Card */}
            <div
              onClick={() => setSelectedIndex(2)}
              className="relative h-full rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group bg-slate-100 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all duration-300"
            >
              <Image
                src={item2.url}
                alt={item2.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            </div>

            {/* Bottom-Left Small Card */}
            <div
              onClick={() => setSelectedIndex(3)}
              className="relative h-full rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group bg-slate-100 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all duration-300"
            >
              <Image
                src={item3.url}
                alt={item3.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            </div>

            {/* Bottom-Right Card with +N Foto Overlay if images > 5 */}
            <div
              onClick={() => setSelectedIndex(4 < images.length ? 4 : 0)}
              className="relative h-full rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group bg-slate-100 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all duration-300"
            >
              <Image
                src={item4.url}
                alt={item4.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />

              {/* Soft Thin Blur Overlay matching Reference Image when images > 5 */}
              {images.length > 5 ? (
                <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1.5px] flex items-center justify-center text-white transition-all duration-300 group-hover:bg-slate-950/50 p-2 text-center">
                  <span className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-white drop-shadow-md">
                    +{images.length - 5} Foto
                  </span>
                </div>
              ) : (
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal Dialog with Clean White Theme */}
      <Dialog
        isOpen={isOpen}
        onClose={() => setSelectedIndex(null)}
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
              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                className="size-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="Tutup Galeri"
              >
                <X className="size-4.5" />
              </button>
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
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/90 hover:bg-emerald-700 text-slate-800 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-slate-200 shadow-md"
                aria-label="Foto sebelumnya"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/90 hover:bg-emerald-700 text-slate-800 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-slate-200 shadow-md"
                aria-label="Foto selanjutnya"
              >
                <ChevronRight className="size-6" />
              </button>
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
