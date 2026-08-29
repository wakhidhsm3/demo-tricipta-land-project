'use client';

import React, { useState } from 'react';
import { ShieldCheck, FileText, Eye } from 'lucide-react';
import { LegalDocModalViewer } from './LegalDocModalViewer';
import { LegalCollection, LegalDocument } from '@/lib/types/legal';

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
              Setiap proyek perumahan TRICIPTA LAND dipasarkan setelah seluruh akta PT, SK Kemenkumham RI, NIB, NPWP, dan PBG/IMB terbit dan terverifikasi secara sah.
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
          <span className="font-serif italic font-semibold text-emerald-800 text-sm tracking-wide underline underline-offset-6">
            Badan Hukum Resmi
          </span>
          <h3 className="font-serif text-2xl font-bold text-slate-900 tracking-tight mt-1">
            1. Legalitas Perusahaan & Pengesahan Kemenkumham
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Dokumen resmi legalitas pendirian PT TRICIPTA LAND INDONESIA yang terdaftar di Kemenkumham RI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {legalDocs.corporate.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between gap-5"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {doc.statusBadge}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                    {doc.documentNumber}
                  </span>
                </div>
                <h4 className="font-serif text-lg font-bold text-slate-900">{doc.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed mt-2">{doc.description}</p>
              </div>

              <div className="pt-3 border-t border-dashed border-slate-200 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Diterbitkan: {doc.issuedDate}</span>
                  <span className="font-medium text-slate-800">{doc.issuedBy}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedDoc(doc)}
                  className="w-full h-9 rounded-lg bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-200 text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Eye className="size-3.5" />
                  <span>Pratinjau Dokumen</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Project Permits & Certificate */}
      <div className="flex flex-col gap-6 pt-4 border-t border-dashed border-slate-200">
        <div>
          <span className="font-serif italic font-semibold text-emerald-800 text-sm tracking-wide underline underline-offset-6">
            Izin Konstruksi & Sertifikat
          </span>
          <h3 className="font-serif text-2xl font-bold text-slate-900 tracking-tight mt-1">
            2. Perizinan Kawasan & Sertifikat (PBG & SHM)
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Dokumen kepatuhan tata ruang kota, izin lingkungan, dan Sertifikat Hak Milik (SHM) resmi BPN.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {legalDocs.permits.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between gap-5"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {doc.statusBadge}
                  </span>
                  <FileText className="size-4.5 text-amber-600" />
                </div>
                <h4 className="font-serif text-base font-bold text-slate-900">{doc.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed mt-2">{doc.description}</p>
              </div>

              <div className="pt-3 border-t border-dashed border-slate-200 flex flex-col gap-3">
                <div className="text-xs text-slate-500">
                  <span className="font-mono text-slate-800 font-bold block">{doc.documentNumber}</span>
                  <span className="block mt-0.5 text-slate-500">Penerbit: {doc.issuedBy}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedDoc(doc)}
                  className="w-full h-9 rounded-lg bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-200 text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Eye className="size-3.5" />
                  <span>Pratinjau Dokumen</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <LegalDocModalViewer selectedDoc={selectedDoc} onClose={() => setSelectedDoc(null)} />
    </div>
  );
}
