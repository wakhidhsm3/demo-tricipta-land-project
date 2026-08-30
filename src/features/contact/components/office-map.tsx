import { MapPin, Navigation, ArrowUpRight } from 'lucide-react';
import { CompanyHeadOffice } from '@/lib/types/company.type';
import { siteConfig } from '@/lib/config/site.config';

export interface OfficeMapProps {
  headOffice: CompanyHeadOffice;
}

export function OfficeMap({ headOffice }: OfficeMapProps) {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm h-full flex flex-col justify-between">
      <div className="flex flex-col flex-1">
        <div className="border-b border-dashed border-slate-200 pb-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
              <MapPin className="size-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                Peta Lokasi Kantor Pusat
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {headOffice.city}, {headOffice.province}
              </p>
            </div>
          </div>
        </div>

        {/* High-Precision Interactive Map Container */}
        <div className="relative min-h-72 sm:min-h-80 lg:min-h-0 flex-1 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 mb-4">
          <iframe
            src={headOffice.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            sandbox="allow-scripts allow-same-origin allow-popups"
            title={`Lokasi Kantor Pusat ${siteConfig.name}`}
            className="w-full h-full absolute inset-0"
          />

          {/* Floating Address Badge */}
          <div className="absolute top-3 left-3 right-3 sm:right-auto z-10 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200/90 shadow-md flex items-center gap-2 max-w-[calc(100%-24px)] sm:max-w-xs">
            <span className="size-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
            <span className="text-xs font-bold text-slate-900 truncate">
              {headOffice.address}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Google Maps Direct CTA Button */}
      <a
        href={headOffice.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 px-5 py-3 text-xs sm:text-sm font-semibold text-white shadow-xs transition-colors cursor-pointer shrink-0 mt-auto"
      >
        <Navigation className="size-4" />
        <span>Buka Petunjuk Arah Kantor di Google Maps</span>
        <ArrowUpRight className="size-4 opacity-80" />
      </a>
    </div>
  );
}
