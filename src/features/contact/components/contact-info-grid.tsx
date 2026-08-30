import { MapPin, Phone, Clock, MessageSquare } from 'lucide-react';
import { CompanyHeadOffice } from '@/lib/types/company.type';

export interface ContactInfoGridProps {
  headOffice: CompanyHeadOffice;
}

export function ContactInfoGrid({ headOffice }: ContactInfoGridProps) {
  const contactCards = [
    {
      id: 'address',
      title: 'Alamat Kantor Pusat',
      description: `${headOffice.address}, ${headOffice.city}, ${headOffice.province} ${headOffice.postalCode}`,
      icon: <MapPin className="size-5 text-emerald-700" />,
      descClassName: 'text-xs text-slate-500 mt-2 leading-relaxed',
    },
    {
      id: 'phone',
      title: 'Telepon Resmi',
      description: headOffice.phone,
      icon: <Phone className="size-5 text-emerald-700" />,
      descClassName: 'text-xs font-semibold text-slate-800 mt-2 leading-relaxed',
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Sales',
      description: `+${headOffice.whatsapp}`,
      icon: <MessageSquare className="size-5 text-emerald-700" />,
      descClassName: 'text-xs font-semibold text-slate-800 mt-2 leading-relaxed',
    },
    {
      id: 'hours',
      title: 'Jam Operasional',
      description: headOffice.operatingHours,
      icon: <Clock className="size-5 text-emerald-700" />,
      descClassName: 'text-xs text-slate-500 mt-2 leading-relaxed',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {contactCards.map((card) => (
        <div
          key={card.id}
          className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-emerald-300 hover:shadow-xs transition-all hover-card-lift flex flex-col justify-between"
        >
          <div>
            <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100/80 mb-3.5 text-emerald-800">
              {card.icon}
            </div>
            <h4 className="text-sm font-bold text-slate-900">{card.title}</h4>
            <p className={card.descClassName}>{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
