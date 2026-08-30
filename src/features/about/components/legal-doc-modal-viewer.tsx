'use client';

import { FileCheck } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { LegalDocument } from '@/lib/types/company.type';
import { siteConfig } from '@/lib/config/site.config';
import { LEGAL_VERIFICATION_LABELS } from '@/lib/config/ui.constants';

export interface LegalDocModalViewerProps {
  selectedDoc: LegalDocument | null;
  onClose: () => void;
}

export function LegalDocModalViewer({ selectedDoc, onClose }: LegalDocModalViewerProps) {
  if (!selectedDoc) return null;

  return (
    <Dialog isOpen={!!selectedDoc} onClose={onClose} title={selectedDoc.title}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Badge variant="gold">{selectedDoc.statusBadge}</Badge>
          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
            {selectedDoc.documentNumber}
          </span>
        </div>

        <div className="flex flex-col gap-2 text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex justify-between">
            <span className="font-semibold text-slate-900">Tanggal Penerbitan:</span>
            <span>{selectedDoc.issuedDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-slate-900">Instansi Penerbit:</span>
            <span>{selectedDoc.issuedBy}</span>
          </div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          {selectedDoc.description}
        </p>

        {/* Official Stamp Certificate Preview */}
        <div className="relative h-64 w-full rounded-xl bg-slate-900 border-2 border-amber-400/40 flex flex-col items-center justify-center p-6 text-center text-white overflow-hidden shadow-md">
          <div className="absolute inset-0 bg-linear-to-tr from-emerald-950/90 via-slate-900 to-emerald-900/80" />
          <FileCheck className="h-16 w-16 text-amber-400 relative z-10 mb-3" />
          <span className="font-serif text-lg font-bold relative z-10 text-amber-300">
            {LEGAL_VERIFICATION_LABELS.OFFICIAL_VERIFIED}
          </span>
          <span className="text-xs text-white/80 relative z-10 max-w-md mt-1">
            {LEGAL_VERIFICATION_LABELS.KEMENKUMHAM_VERIFIED} — {siteConfig.legalName}
          </span>

          <div className="absolute bottom-3 right-3 text-[10px] text-white/40 font-mono">
            {LEGAL_VERIFICATION_LABELS.WATERMARK_TEXT}
          </div>
        </div>
      </div>
    </Dialog>
  );
}
