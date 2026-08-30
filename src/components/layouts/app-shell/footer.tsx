import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { SectionContainer } from '@/components/shared';
import { siteConfig } from '@/lib/config/site.config';
import { PROJECT_CATEGORY_OPTIONS } from '@/features/projects';

export function Footer() {
  const { headOffice, navigation } = siteConfig;

  return (
    <footer className="w-full border-t border-dashed border-slate-200 bg-white text-slate-700">
      <SectionContainer className="py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Column 1: Brand, Mission & Guarantee (2 Columns on large) */}
          <div className="flex flex-col items-start gap-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/images/logo.png"
                alt={siteConfig.name}
                width={160}
                height={52}
                className="h-9 w-auto object-contain transition-opacity group-hover:opacity-80"
              />
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              {siteConfig.description}
            </p>

            {/* Guarantee / Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50">
              <ShieldCheck className="size-4 text-emerald-700 shrink-0" />
              <span>Garansi Sertifikat SHM & PBG Resmi</span>
            </div>

            <p className="text-xs text-slate-400">
              {siteConfig.legalName} berizin resmi dan mematuhi regulasi perumahan nasional.
            </p>
          </div>

          {/* Right Navigation Columns (3 Columns on large) */}
          <div className="grid grid-cols-1 gap-8 min-[450px]:grid-cols-2 sm:grid-cols-3 lg:col-span-3">
            {/* Column 2: Kawasan Hunian */}
            <div className="flex flex-col gap-4">
              <div className="text-sm sm:text-base font-bold text-slate-900">Kawasan Hunian</div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                <li>
                  <Link href="/projects" className="hover:text-emerald-700 transition-colors font-medium">
                    Semua Kawasan Proyek
                  </Link>
                </li>
                {PROJECT_CATEGORY_OPTIONS.filter((c) => c.value !== 'ALL').map((cat) => (
                  <li key={cat.value}>
                    <Link
                      href={`/projects?category=${cat.value}`}
                      className="hover:text-emerald-700 transition-colors"
                    >
                      {cat.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>


            {/* Column 3: Informasi & Edukasi */}
            <div className="flex flex-col gap-4">
              <div className="text-sm sm:text-base font-bold text-slate-900">Informasi & Edukasi</div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-emerald-700 transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/about" className="hover:text-emerald-700 transition-colors">
                    Legalitas & Perizinan
                  </Link>
                </li>
                <li>
                  <Link href="/articles" className="hover:text-emerald-700 transition-colors">
                    Tips KPR & Berita
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Kantor Pusat */}
            <div className="flex flex-col gap-4">
              <div className="text-sm sm:text-base font-bold text-slate-900">Kantor Pusat</div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <MapPin className="size-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{headOffice.address}, {headOffice.city}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="size-4 text-emerald-700 shrink-0" />
                  <span>{headOffice.phone}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="size-4 text-emerald-700 shrink-0" />
                  <span>{headOffice.email}</span>
                </li>
                <li className="flex items-center gap-2 text-slate-500">
                  <Clock className="size-4 text-emerald-700 shrink-0" />
                  <span>{headOffice.operatingHours}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Bottom Copyright Strip matching shadcn-studio */}
      <div className="w-full border-t border-dashed border-slate-200 bg-slate-50/50">
        <SectionContainer className="flex items-center justify-between gap-4 py-6 text-xs text-slate-500 max-md:flex-col max-md:text-center">
          <p>
            © {new Date().getFullYear()} <strong className="font-semibold text-slate-800">{siteConfig.legalName}</strong>. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <p className="text-slate-500">
            Developer Properti Terpercaya & Hunian Berkualitas Indonesia
          </p>
        </SectionContainer>
      </div>
    </footer>
  );
}
