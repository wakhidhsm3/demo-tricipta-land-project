'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Navigation,
  ArrowUpRight,
  ShieldCheck,
  Car,
  GraduationCap,
  Hospital,
  ShoppingBag,
  Trees,
  Train,
  Building2,
} from 'lucide-react';
import { NearbyFacility } from '../types/project.type';
import { SectionContainer, SectionEyebrow } from '@/components/shared';
import { GOOGLE_MAPS_CONFIG } from '@/lib/config/ui.constants';
import {
  FACILITY_CATEGORY_COLORS as categoryBadgeColors,
  DEFAULT_FACILITY_IMAGES as defaultFacilityImages,
  DEFAULT_FALLBACK_FACILITY_IMAGE,
} from '../config/facilities.config';

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

function FacilityIcon({ name }: { name: string }) {
  switch (name) {
    case 'Car':
      return <Car className="size-3.5 text-emerald-700" />;
    case 'GraduationCap':
      return <GraduationCap className="size-3.5 text-emerald-700" />;
    case 'Hospital':
      return <Hospital className="size-3.5 text-rose-700" />;
    case 'ShoppingBag':
      return <ShoppingBag className="size-3.5 text-purple-700" />;
    case 'Trees':
      return <Trees className="size-3.5 text-cyan-700" />;
    case 'Train':
      return <Train className="size-3.5 text-emerald-700" />;
    case 'Building2':
      return <Building2 className="size-3.5 text-slate-700" />;
    case 'Navigation':
    default:
      return <Navigation className="size-3.5 text-emerald-700" />;
  }
}

export function LocationFacilitiesSection({ location, facilities }: LocationFacilitiesSectionProps) {
  // Active selected target: null = project address, string = facility name
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);

  const activeQuery = selectedTarget
    ? `${selectedTarget}, ${location.city}`
    : location.fullAddress;

  // High-zoom specific interactive map
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    activeQuery
  )}${GOOGLE_MAPS_CONFIG.EMBED_QUERY_FLAGS}`;

  const directMapsUrl = selectedTarget
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${selectedTarget}, ${location.city}`
      )}`
    : location.googleMapsUrl;

  return (
    <section className="w-full bg-white border-b border-dashed border-slate-200" id="lokasi-fasilitas">
      <SectionContainer className="py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-stretch">
          {/* Left Column (50%): High-Precision Interactive Map with Facility Markers */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4 h-full">
            <div className="flex flex-col gap-4 flex-1">
              <div>
                <SectionEyebrow>
                  Aksesibilitas & Mobilitas
                </SectionEyebrow>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1.5">
                  Lokasi Strategis Proyek
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Peta lokasi presisi tinggi. Pilih fasilitas umum di bawah untuk melihat titik lokasinya di peta.
                </p>
              </div>

              {/* Quick Facility Pin Switcher */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTarget(null)}
                  className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer border ${
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
                      className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer border ${
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

              {/* Crystal-Clear Interactive Google Map with High Zoom - Responsive Equal Height */}
              <div className="relative min-h-72 sm:min-h-80 lg:min-h-0 flex-1 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                <iframe
                  title={`Peta Lokasi ${activeQuery}`}
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                  className="w-full h-full absolute inset-0"
                />

                {/* Floating Active Target Badge */}
                <div className="absolute top-3 left-3 right-3 sm:right-auto z-10 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200/90 shadow-md flex items-center gap-2 max-w-[calc(100%-24px)] sm:max-w-xs">
                  <span className="size-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {selectedTarget ? `Fasilitas: ${selectedTarget}` : location.district + ', ' + location.city}
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Google Maps Direction CTA */}
            <a
              href={directMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 px-5 py-3 text-xs sm:text-sm font-semibold text-white shadow-xs transition-colors cursor-pointer shrink-0 mt-auto"
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
          <div className="lg:col-span-6 flex flex-col justify-between gap-4 h-full">
            <div className="flex flex-col gap-4">
              <div>
                <SectionEyebrow>
                  Konektivitas Kawasan
                </SectionEyebrow>
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
                    DEFAULT_FALLBACK_FACILITY_IMAGE;

                  return (
                    <div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedTarget(isSelected ? null : fac.name)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedTarget(isSelected ? null : fac.name);
                        }
                      }}
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
                            <FacilityIcon name={fac.iconName} />
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
            </div>

            {/* Strategic Value Banner */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/70 flex items-start gap-3 text-xs text-slate-700 leading-relaxed mt-auto shrink-0">
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
      </SectionContainer>
    </section>
  );
}
