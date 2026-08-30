'use client';

import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { LegalDocCard } from './legal-doc-card';
import { LegalDocModalViewer } from './legal-doc-modal-viewer';
import { LegalCollection, LegalDocument } from '@/lib/types/company.type';
import { siteConfig } from '@/lib/config/site.config';
import { SectionEyebrow } from '@/components/shared';

export interface LegalityTabContentProps {
  legalDocs: LegalCollection;
}

export function LegalityTabContent({ legalDocs }: LegalityTabContentProps) {
  const [selectedDoc, setSelectedDoc] = useState<LegalDocument | null>(null);

  return (
    <div className="flex flex-col gap-12 sm:gap-16 animate-in fade-in duration-300">
      {/* 1. Guarantee Summary Banner */}
      <div className="rounded-2xl bg-white border border-dashed border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="size-14 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="size-8" />
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              Komitmen Transparansi 100% Legalitas Aman
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
              Setiap proyek perumahan {siteConfig.name} dipasarkan setelah seluruh akta PT, SK Kemenkumham RI, NIB, NPWP, dan PBG/IMB terbit dan terverifikasi secara sah.
            </p>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200 shrink-0">
          <ShieldCheck className="size-4" />
          <span>Clear & Clean BPN</span>
        </div>
      </div>

      {/* 2. Corporate Legal Deeds */}
      <div className="flex flex-col gap-6">
        <div>
          <SectionEyebrow>
            Badan Hukum Resmi
          </SectionEyebrow>
          <h3 className="font-serif text-2xl font-bold text-slate-900 tracking-tight mt-1">
            1. Legalitas Perusahaan & Pengesahan Kemenkumham
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Dokumen resmi legalitas pendirian {siteConfig.legalName} yang terdaftar di Kemenkumham RI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {legalDocs.corporate.map((doc) => (
            <LegalDocCard
              key={doc.id}
              doc={doc}
              onPreview={setSelectedDoc}
            />
          ))}
        </div>
      </div>

      {/* 3. Project Permits & Certificate */}
      <div className="flex flex-col gap-6 pt-4 border-t border-dashed border-slate-200">
        <div>
          <SectionEyebrow>
            Izin Konstruksi & Sertifikat
          </SectionEyebrow>
          <h3 className="font-serif text-2xl font-bold text-slate-900 tracking-tight mt-1">
            2. Perizinan Kawasan & Sertifikat (PBG & SHM)
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Dokumen kepatuhan tata ruang kota, izin lingkungan, dan Sertifikat Hak Milik (SHM) resmi BPN.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {legalDocs.permits.map((doc) => (
            <LegalDocCard
              key={doc.id}
              doc={doc}
              onPreview={setSelectedDoc}
              showIcon
            />
          ))}
        </div>
      </div>

      <LegalDocModalViewer selectedDoc={selectedDoc} onClose={() => setSelectedDoc(null)} />
    </div>
  );
}

