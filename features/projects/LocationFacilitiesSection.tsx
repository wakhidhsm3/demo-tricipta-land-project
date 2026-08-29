'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  MapPin,
  Navigation,
  Car,
  GraduationCap,
  Hospital,
  ShoppingBag,
  Trees,
  Train,
  Building2,
  ArrowUpRight,
  ShieldCheck,
  Compass,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { NearbyFacility } from '@/lib/types/project';

export interface LocationFacilitiesSectionProps {
  location: {
    city: string;
    district: string;
    province: string;
    fullAddress: string;
    googleMapsUrl: string;
  };
  facilities: NearbyFacility[];
}

const iconMap: Record<string, React.ReactNode> = {
  Car: <Car className="size-4 text-emerald-700" />,
  GraduationCap: <GraduationCap className="size-4 text-emerald-700" />,
  Hospital: <Hospital className="size-4 text-rose-700" />,
  ShoppingBag: <ShoppingBag className="size-4 text-purple-700" />,
  Trees: <Trees className="size-4 text-cyan-700" />,
  Train: <Train className="size-4 text-emerald-700" />,
  Building2: <Building2 className="size-4 text-slate-700" />,
};

const categoryBadgeColors: Record<string, { dot: string; border: string; bg: string; text: string }> = {
  Pendidikan: { dot: 'bg-amber-400', border: 'border-amber-200', bg: 'bg-amber-50', text: 'text-amber-800' },
  Transportasi: { dot: 'bg-emerald-400', border: 'border-emerald-200', bg: 'bg-emerald-50', text: 'text-emerald-800' },
  Kesehatan: { dot: 'bg-rose-400', border: 'border-rose-200', bg: 'bg-rose-50', text: 'text-rose-800' },
  'Pusat Perbelanjaan': { dot: 'bg-purple-400', border: 'border-purple-200', bg: 'bg-purple-50', text: 'text-purple-800' },
  Wisata: { dot: 'bg-cyan-400', border: 'border-cyan-200', bg: 'bg-cyan-50', text: 'text-cyan-800' },
  Pemerintahan: { dot: 'bg-blue-400', border: 'border-blue-200', bg: 'bg-blue-50', text: 'text-blue-800' },
};

const defaultFacilityImages: Record<string, string> = {
  Transportasi: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop',
  Pendidikan: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop',
  'Pusat Perbelanjaan': 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=600&auto=format&fit=crop',
  Kesehatan: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=600&auto=format&fit=crop',
  Wisata: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop',
  Pemerintahan: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop',
};

export function LocationFacilitiesSection({ location, facilities }: LocationFacilitiesSectionProps) {
  // Active selected target: null = project address, string = facility name
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const badgeScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkBadgeScroll = useCallback(() => {
    const el = badgeScrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    checkBadgeScroll();
    const el = badgeScrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkBadgeScroll, { passive: true });
    window.addEventListener('resize', checkBadgeScroll);
    const t = setTimeout(checkBadgeScroll, 100);
    return () => {
      el.removeEventListener('scroll', checkBadgeScroll);
      window.removeEventListener('resize', checkBadgeScroll);
      clearTimeout(t);
    };
  }, [checkBadgeScroll, facilities]);

  const scrollBadges = (direction: 'left' | 'right') => {
    const el = badgeScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === 'left' ? -150 : 150, behavior: 'smooth' });
  };

  const activeQuery = selectedTarget
    ? `${selectedTarget}, ${location.city}`
    : location.fullAddress;

  // High-zoom specific interactive map
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    activeQuery
  )}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  const directMapsUrl = selectedTarget
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${selectedTarget}, ${location.city}`
      )}`
    : location.googleMapsUrl;

  return (
    <section className="w-full bg-white border-b border-dashed border-slate-200" id="lokasi-fasilitas">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 min-[1280px]:border-x min-[1280px]:border-dashed min-[1280px]:border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Left Column (50%): High-Precision Interactive Map with Facility Markers */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div>
              <span className="font-serif italic font-semibold text-emerald-800 text-sm tracking-wide underline underline-offset-6">
                Aksesibilitas & Mobilitas
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1.5">
                Lokasi Strategis Proyek
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Peta lokasi presisi tinggi. Pilih fasilitas umum di bawah untuk melihat titik lokasinya di peta.
              </p>
            </div>

            {/* Quick Facility Pin Switcher with Slide Indicators */}
            <div className="relative w-full group/pins">
              {/* Left Slide Button */}
              {canScrollLeft && (
                <div className="absolute left-0 inset-y-0 z-10 flex items-center pr-4 bg-linear-to-r from-white via-white/90 to-transparent">
                  <button
                    type="button"
                    onClick={() => scrollBadges('left')}
                    className="size-6 sm:size-7 rounded-full bg-white shadow-md border border-slate-200 text-emerald-800 flex items-center justify-center hover:bg-emerald-50 transition-all cursor-pointer"
                    aria-label="Slide pin left"
                  >
                    <ChevronLeft className="size-3.5 sm:size-4 stroke-[2.5]" />
                  </button>
                </div>
              )}

              {/* Scrollable Badge List */}
              <div
                ref={badgeScrollRef}
                className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none overscroll-x-contain py-1 px-0.5 scroll-smooth"
              >
                <button
                  type="button"
                  onClick={() => setSelectedTarget(null)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer border ${
                    selectedTarget === null
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs ring-2 ring-emerald-600/20'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300'
                  }`}
                >
                  <span>📍 Lokasi Proyek</span>
                </button>

                {facilities.map((fac, idx) => {
                  const isSelected = selectedTarget === fac.name;
                  const colors = categoryBadgeColors[fac.category] || {
                    dot: 'bg-emerald-400',
                    border: 'border-emerald-200',
                    bg: 'bg-emerald-50',
                    text: 'text-emerald-800',
                  };

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedTarget(fac.name)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs ring-2 ring-slate-900/20'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                      }`}
                    >
                      <span className={`size-2 rounded-full ${isSelected ? 'bg-emerald-400' : colors.dot}`} />
                      <span>{fac.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right Slide Button & Pulsing Arrow Indicator */}
              {canScrollRight && (
                <div className="absolute right-0 inset-y-0 z-10 flex items-center pl-4 bg-linear-to-l from-white via-white/90 to-transparent">
                  <button
                    type="button"
                    onClick={() => scrollBadges('right')}
                    className="size-6 sm:size-7 rounded-full bg-white shadow-md border border-slate-200 text-emerald-800 flex items-center justify-center hover:bg-emerald-50 transition-all cursor-pointer animate-pulse"
                    aria-label="Slide pin right"
                  >
                    <ChevronRight className="size-3.5 sm:size-4 stroke-[2.5]" />
                  </button>
                </div>
              )}
            </div>

            {/* Crystal-Clear Interactive Google Map with High Zoom */}
            <div className="relative h-80 sm:h-96 lg:h-100 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
              <iframe
                title={`Peta Lokasi ${activeQuery}`}
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* Floating Active Target Badge */}
              <div className="absolute top-3 left-3 right-3 sm:right-auto z-10 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200/90 shadow-md flex items-center gap-2 max-w-[calc(100%-24px)] sm:max-w-xs">
                <span className="size-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
                <span className="text-xs font-bold text-slate-900 truncate">
                  {selectedTarget ? `Fasilitas: ${selectedTarget}` : location.district + ', ' + location.city}
                </span>
              </div>
            </div>

            {/* Direct Google Maps Direction CTA */}
            <a
              href={directMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 px-5 py-3 text-xs sm:text-sm font-semibold text-white shadow-xs transition-colors cursor-pointer"
            >
              <Navigation className="size-4" />
              <span>
                {selectedTarget
                  ? `Buka Rute Menuju ${selectedTarget} di Google Maps`
                  : 'Buka Petunjuk Arah Lokasi di Google Maps'}
              </span>
              <ArrowUpRight className="size-4 opacity-80" />
            </a>
          </div>

          {/* Right Column (50%): Nearby Facilities with Photos & Interactive Selection */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div>
              <span className="font-serif italic font-semibold text-emerald-800 text-sm tracking-wide underline underline-offset-6">
                Konektivitas Kawasan
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1.5">
                Fasilitas Umum & Akses Terdekat
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Klik kartu fasilitas untuk langsung melihat penanda dan rute di peta Google Maps sebelah kiri.
              </p>
            </div>

            {/* Facility Cards with Image Thumbnails */}
            <div className="flex flex-col gap-3">
              {facilities.map((fac, idx) => {
                const isSelected = selectedTarget === fac.name;
                const photoUrl =
                  fac.imageUrl ||
                  defaultFacilityImages[fac.category] ||
                  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop';

                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedTarget(isSelected ? null : fac.name)}
                    className={`p-3 sm:p-3.5 rounded-2xl border flex items-center justify-between transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/40 shadow-sm ring-1 ring-emerald-500/30'
                        : 'border-slate-200/90 bg-white shadow-2xs hover:border-emerald-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                      {/* Facility Photo Thumbnail */}
                      <div className="relative size-14 sm:size-16 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200/80">
                        <Image
                          src={photoUrl}
                          alt={fac.name}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                          sizes="64px"
                        />
                      </div>

                      {/* Info & Category */}
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
                          {iconMap[fac.iconName] || <Navigation className="size-3.5 text-emerald-700" />}
                          <span>{fac.category}</span>
                        </div>
                        <h4 className="font-serif text-sm sm:text-base font-bold text-slate-900 truncate mt-0.5">
                          {fac.name}
                        </h4>
                        <span className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                          {isSelected ? '✓ Sedang Ditampilkan di Peta' : 'Klik untuk lihat di peta'}
                        </span>
                      </div>
                    </div>

                    {/* Distance Time Badge */}
                    <span
                      className={`text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border shrink-0 ml-2 sm:ml-3 whitespace-nowrap ${
                        isSelected
                          ? 'bg-emerald-800 text-white border-emerald-800'
                          : 'text-emerald-800 bg-emerald-50 border-emerald-200/70'
                      }`}
                    >
                      {fac.distanceTime}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Strategic Value Banner */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/70 flex items-start gap-3 text-xs text-slate-700 leading-relaxed mt-1">
              <ShieldCheck className="size-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-900 block mb-0.5">
                  Aksesibilitas Cepat & Terverifikasi:
                </span>
                Seluruh fasilitas di atas berada dalam radius waktu tempuh cepat, memudahkan mobilitas sehari-hari Anda dan keluarga.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
