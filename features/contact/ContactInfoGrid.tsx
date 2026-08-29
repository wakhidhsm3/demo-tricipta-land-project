import { MapPin, Phone, Clock, MessageSquare } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CompanyHeadOffice } from '@/lib/types/company';

export interface ContactInfoGridProps {
  headOffice: CompanyHeadOffice;
}

export function ContactInfoGrid({ headOffice }: ContactInfoGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <Card className="border border-border">
        <CardHeader className="p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-forest/10 mb-3 text-brand-forest">
            <MapPin className="h-6 w-6 text-brand-gold" />
          </div>
          <CardTitle className="text-base font-bold text-brand-forest">Alamat Kantor Pusat</CardTitle>
          <CardDescription className="text-xs text-muted-foreground mt-2 leading-relaxed">
            {headOffice.address}, {headOffice.city}, {headOffice.province} {headOffice.postalCode}
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="border border-border">
        <CardHeader className="p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-forest/10 mb-3 text-brand-forest">
            <Phone className="h-6 w-6 text-brand-gold" />
          </div>
          <CardTitle className="text-base font-bold text-brand-forest">Telepon Resmi</CardTitle>
          <CardDescription className="text-xs font-semibold text-foreground mt-2 leading-relaxed">
            {headOffice.phone}
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="border border-border">
        <CardHeader className="p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-forest/10 mb-3 text-brand-forest">
            <MessageSquare className="h-6 w-6 text-brand-gold" />
          </div>
          <CardTitle className="text-base font-bold text-brand-forest">WhatsApp Sales</CardTitle>
          <CardDescription className="text-xs font-semibold text-foreground mt-2 leading-relaxed">
            +{headOffice.whatsapp}
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="border border-border">
        <CardHeader className="p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-forest/10 mb-3 text-brand-forest">
            <Clock className="h-6 w-6 text-brand-gold" />
          </div>
          <CardTitle className="text-base font-bold text-brand-forest">Jam Operasional</CardTitle>
          <CardDescription className="text-xs text-muted-foreground mt-2 leading-relaxed">
            {headOffice.operatingHours}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
