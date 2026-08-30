'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { Bed, Bath, Car, Maximize, CheckCircle2, Home } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SectionHeader, SectionContainer } from '@/components/shared';
import { ProjectUnitType } from '../types/project.type';

export interface UnitTypesSectionProps {
  unitTypes: ProjectUnitType[];
}

export function UnitTypesSection({ unitTypes }: UnitTypesSectionProps) {
  const [activeUnitId, setActiveUnitId] = useState(unitTypes[0]?.id || '');

  const activeUnit = unitTypes.find((u) => u.id === activeUnitId) || unitTypes[0];

  if (!activeUnit) return null;

  return (
    <section className="w-full bg-slate-50/40 border-b border-dashed border-slate-200">
      <SectionContainer className="py-12 sm:py-16">
        <SectionHeader
          badgeText="Pilihan Desain Denah"
          title="Pilihan Tipe Unit Rumahan"
          description="Pilih tipe rumah di bawah ini untuk melihat denah lantai (floor plan), luas area, dan fitur unggulan."
          borderBottom={false}
          className="pt-0 sm:pt-0 pb-6 sm:pb-8 px-0 sm:px-0"
        />


        {/* Tab Selection */}
        <div className="mb-8">
          <Tabs
            value={activeUnitId}
            onValueChange={setActiveUnitId}
            variant="segmented"
            className="w-full max-w-2xl mx-auto"
          >
            <TabsList className="w-full">
              {unitTypes.map((unit) => (
                <TabsTrigger
                  key={unit.id}
                  value={unit.id}
                  icon={<Home className="size-4" />}
                >
                  {unit.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Active Unit Card Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center bg-white p-6 sm:p-9 rounded-2xl border border-slate-200/90 shadow-xs">
          {/* Floor Plan Image */}
          <div className="lg:col-span-6 relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80">
            <Image
              src={activeUnit.floorPlanUrl}
              alt={activeUnit.name}
              fill
              quality={85}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Details & Specs */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 inline-block">
                {activeUnit.name}
              </span>
              <div className="mt-2">
                <span className="text-xs text-slate-400 block font-medium">Harga Unit Mulai Dari</span>
                <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-emerald-800 tracking-tight">
                  {activeUnit.priceFormatted}
                </h3>
              </div>
            </div>

            {/* Quick Specs 4 Columns */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-center">
              <div className="space-y-1">
                <span className="text-[11px] text-slate-500 font-medium block">Kamar Tidur</span>
                <span className="font-sans text-lg font-extrabold text-slate-900 flex items-center justify-center gap-1">
                  <Bed className="size-4 text-emerald-700" /> {activeUnit.bedrooms}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] text-slate-500 font-medium block">Kamar Mandi</span>
                <span className="font-sans text-lg font-extrabold text-slate-900 flex items-center justify-center gap-1">
                  <Bath className="size-4 text-emerald-700" /> {activeUnit.bathrooms}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] text-slate-500 font-medium block">Carport</span>
                <span className="font-sans text-lg font-extrabold text-slate-900 flex items-center justify-center gap-1">
                  <Car className="size-4 text-emerald-700" /> {activeUnit.carport}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] text-slate-500 font-medium block">Luas LB/LT</span>
                <span className="font-sans text-lg font-extrabold text-slate-900 flex items-center justify-center gap-1">
                  <Maximize className="size-4 text-emerald-700" /> {activeUnit.buildingArea}/{activeUnit.landArea}m²
                </span>
              </div>
            </div>

            {/* Feature Checklist */}
            <div className="pt-2 border-t border-dashed border-slate-200">
              <h4 className="font-serif text-sm sm:text-base font-bold text-slate-900 mb-3">
                Keunggulan Spesifikasi Tipe Ini:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-600">
                {activeUnit.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-emerald-700 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
