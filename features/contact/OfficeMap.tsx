import { MapPin, Navigation } from 'lucide-react';
import { CompanyHeadOffice } from '@/lib/types/company';

export interface OfficeMapProps {
  headOffice: CompanyHeadOffice;
}

export function OfficeMap({ headOffice }: OfficeMapProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-border shadow-md flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-brand-gold" />
          <h3 className="font-serif text-xl font-bold text-brand-forest">Peta Lokasi Kantor Pusat</h3>
        </div>
        <a
          href={headOffice.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-brand-forest hover:underline flex items-center gap-1"
        >
          <Navigation className="h-3.5 w-3.5" /> Buka Google Maps
        </a>
      </div>

      <div className="relative h-80 w-full rounded-xl overflow-hidden border border-border">
        <iframe
          src={headOffice.googleMapsEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lokasi Kantor Pusat TRICIPTA LAND"
        />
      </div>
    </div>
  );
}
