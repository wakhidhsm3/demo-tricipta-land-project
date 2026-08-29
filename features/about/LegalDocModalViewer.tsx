'use client';

import { FileCheck } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { LegalDocument } from '@/lib/types/legal';

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
          <span className="text-xs font-mono font-bold text-brand-forest bg-brand-forest/10 px-3 py-1 rounded-full">
            {selectedDoc.documentNumber}
          </span>
        </div>

        <div className="flex flex-col gap-2 text-sm text-muted-foreground bg-brand-sage/10 p-4 rounded-xl border border-border">
          <div className="flex justify-between">
            <span className="font-semibold text-foreground">Tanggal Penerbitan:</span>
            <span>{selectedDoc.issuedDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-foreground">Instansi Penerbit:</span>
            <span>{selectedDoc.issuedBy}</span>
          </div>
        </div>

        <p className="text-sm text-foreground leading-relaxed">
          {selectedDoc.description}
        </p>

        {/* Mock Official Stamp Certificate Preview */}
        <div className="relative h-64 w-full rounded-xl bg-slate-900 border-2 border-brand-gold/40 flex flex-col items-center justify-center p-6 text-center text-white overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-tr from-brand-forest-dark/90 via-slate-900 to-brand-forest/80" />
          <FileCheck className="h-16 w-16 text-brand-gold relative z-10 mb-3" />
          <span className="font-serif text-lg font-bold relative z-10 text-brand-gold">
            DOKUMEN RESMI TERVERIFIKASI
          </span>
          <span className="text-xs text-white/80 relative z-10 max-w-md mt-1">
            Salinan Akta & SK Kemenkumham Resmi PT TRICIPTA LAND INDONESIA Terdaftar di BPN & Kemenkumham RI
          </span>
          <div className="absolute bottom-3 right-3 text-[10px] text-white/40 font-mono">
            WATERMARK VERIFIED 100% CLEAN
          </div>
        </div>
      </div>
    </Dialog>
  );
}
