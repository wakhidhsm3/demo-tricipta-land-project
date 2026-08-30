import React from 'react';
import { Eye, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LegalDocument } from '@/lib/types/company.type';

export interface LegalDocCardProps {
  doc: LegalDocument;
  onPreview: (doc: LegalDocument) => void;
  showIcon?: boolean;
}

export function LegalDocCard({ doc, onPreview, showIcon = false }: LegalDocCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between gap-5">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {doc.statusBadge}
          </span>
          {showIcon ? (
            <FileText className="size-4.5 text-amber-600" />
          ) : (
            <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200 truncate max-w-45">
              {doc.documentNumber}
            </span>
          )}
        </div>
        <h4 className="font-serif text-base sm:text-lg font-bold text-slate-900">{doc.title}</h4>
        <p className="text-xs text-slate-500 leading-relaxed mt-2">{doc.description}</p>
      </div>

      <div className="pt-3 border-t border-dashed border-slate-200 flex flex-col gap-3">
        {showIcon ? (
          <div className="text-xs text-slate-500">
            <span className="font-mono text-slate-800 font-bold block">{doc.documentNumber}</span>
            <span className="block mt-0.5 text-slate-500">Penerbit: {doc.issuedBy}</span>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Diterbitkan: {doc.issuedDate}</span>
            <span className="font-medium text-slate-800">{doc.issuedBy}</span>
          </div>
        )}
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => onPreview(doc)}
          className="w-full font-semibold"
        >
          <Eye className="size-3.5" />
          <span>Pratinjau Dokumen</span>
        </Button>
      </div>
    </div>
  );
}
