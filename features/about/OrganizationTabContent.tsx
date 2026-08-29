import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { OrganizationStructure } from '@/lib/types/organization';

export interface OrganizationTabContentProps {
  orgData: OrganizationStructure;
}

export function OrganizationTabContent({ orgData }: OrganizationTabContentProps) {
  return (
    <div className="flex flex-col gap-12 sm:gap-16 animate-in fade-in duration-300">
      {/* 1. Board of Directors */}
      <div className="flex flex-col gap-6">
        <div>
          <span className="font-serif italic font-semibold text-emerald-800 text-sm tracking-wide underline underline-offset-6">
            Kepemimpinan Eksekutif
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Jajaran Direksi (Board of Directors)
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Manajemen puncak yang mengawal tata kelola perseroan, kepatuhan hukum, dan arah strategis pembangunan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {orgData.directors.map((dir) => (
            <Link
              key={dir.id}
              href={`/about/team/${dir.id}`}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={dir.photoUrl}
                  alt={dir.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[11px] font-bold text-emerald-800 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-full shadow-2xs border border-white/40 inline-block">
                    {dir.position}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-2 flex-1 justify-between">
                <div className="space-y-1">
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {dir.name}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {dir.roleDescription}
                  </p>
                </div>
                <div className="pt-3 border-t border-dashed border-slate-200 flex items-center justify-between text-xs font-semibold text-emerald-800 group-hover:text-emerald-700">
                  <span>Lihat Profil Lengkap</span>
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 2. Operational Departments - Same Styling as Directors */}
      <div className="flex flex-col gap-6 pt-6 border-t border-dashed border-slate-200">
        <div>
          <span className="font-serif italic font-semibold text-emerald-800 text-sm tracking-wide underline underline-offset-6">
            Pelaksana Operasional
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Departemen Pelaksana Bisnis
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Divisi profesional yang mengelola perencanaan teknik, legalitas pertanahan, keuangan KPR, dan pelayanan pelanggan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {orgData.departments.map((dept) => (
            <Link
              key={dept.id}
              href={`/about/team/${dept.id}`}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-60 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={dept.headPhotoUrl}
                  alt={dept.headName}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10.5px] font-bold text-emerald-800 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-full shadow-2xs border border-white/40 inline-block truncate max-w-full">
                    {dept.headPosition}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-2 flex-1 justify-between">
                <div className="space-y-1">
                  <h4 className="font-serif text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {dept.headName}
                  </h4>
                  <span className="text-[11px] font-semibold text-slate-700 block line-clamp-1">
                    {dept.name}
                  </span>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {dept.headRoleDescription}
                  </p>
                </div>
                <div className="pt-3 border-t border-dashed border-slate-200 flex items-center justify-between text-xs font-semibold text-emerald-800 group-hover:text-emerald-700">
                  <span>Lihat Profil Lengkap</span>
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. Site Teams & QC - Same Styling as Directors */}
      <div className="flex flex-col gap-6 pt-6 border-t border-dashed border-slate-200">
        <div>
          <span className="font-serif italic font-semibold text-emerald-800 text-sm tracking-wide underline underline-offset-6">
            Pengawas & Pengendali Mutu
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Site Construction & Quality Control
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Tim lapangan berdedikasi tinggi yang memastikan standar konstruksi fisik bangunan kokoh sesuai standar SNI.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl">
          {orgData.siteTeams.map((st) => (
            <Link
              key={st.id}
              href={`/about/team/${st.id}`}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={st.photoUrl}
                  alt={st.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[11px] font-bold text-emerald-800 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-full shadow-2xs border border-white/40 inline-block">
                    {st.position}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-2 flex-1 justify-between">
                <div className="space-y-1">
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {st.name}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {st.roleDescription}
                  </p>
                </div>
                <div className="pt-3 border-t border-dashed border-slate-200 flex items-center justify-between text-xs font-semibold text-emerald-800 group-hover:text-emerald-700">
                  <span>Lihat Profil Lengkap</span>
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
