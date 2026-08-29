import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { CompanyProfile } from '@/lib/types/company';

export interface FooterProps {
  companyData: CompanyProfile;
}

export function Footer({ companyData }: FooterProps) {
  const { headOffice, navigation } = companyData;

  return (
    <footer className="w-full border-t border-dashed border-slate-200 bg-white text-slate-700">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 min-[1280px]:border-x min-[1280px]:border-dashed min-[1280px]:border-slate-200">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Column 1: Brand, Mission & Guarantee (2 Columns on large) */}
          <div className="flex flex-col items-start gap-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/logo.png"
                alt="TRICIPTA LAND"
                width={160}
                height={52}
                className="h-9 w-auto object-contain transition-opacity group-hover:opacity-80"
              />
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              Pengembang perumahan terpercaya yang berdedikasi menciptakan kawasan hunian berkualitas, asri, dan berlegalitas 100% aman bagi kenyamanan investasi keluarga Indonesia.
            </p>

            {/* Guarantee / Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50">
              <ShieldCheck className="size-4 text-emerald-700 shrink-0" />
              <span>Garansi Sertifikat SHM & PBG Resmi</span>
            </div>

            <p className="text-xs text-slate-400">
              PT TRICIPTA LAND INDONESIA berizin resmi dan mematuhi regulasi perumahan nasional.
            </p>
          </div>

          {/* Right Navigation Columns (3 Columns on large) */}
          <div className="grid grid-cols-1 gap-8 min-[450px]:grid-cols-2 sm:grid-cols-3 lg:col-span-3">
            {/* Column 2: Kawasan Hunian */}
            <div className="flex flex-col gap-4">
              <div className="text-sm sm:text-base font-bold text-slate-900">Kawasan Hunian</div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                <li>
                  <Link href="/projects" className="hover:text-emerald-700 transition-colors">
                    Semua Kawasan Proyek
                  </Link>
                </li>
                <li>
                  <Link href="/projects?category=KOMERSIL" className="hover:text-emerald-700 transition-colors">
                    Hunian Komersil Modern
                  </Link>
                </li>
                <li>
                  <Link href="/projects?category=SUBSIDI" className="hover:text-emerald-700 transition-colors">
                    Perumahan Subsidi FLPP
                  </Link>
                </li>
                <li>
                  <Link href="/projects?category=CLUSTERNATURAL" className="hover:text-emerald-700 transition-colors">
                    Klaster Tropical Villa
                  </Link>
                </li>
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
      </div>

      {/* Bottom Copyright Strip matching shadcn-studio */}
      <div className="w-full border-t border-dashed border-slate-200 bg-slate-50/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-6 text-xs text-slate-500 sm:px-6 lg:px-8 max-md:flex-col max-md:text-center min-[1280px]:border-x min-[1280px]:border-dashed min-[1280px]:border-slate-200">
          <p>
            © {new Date().getFullYear()} <strong className="font-semibold text-slate-800">PT TRICIPTA LAND INDONESIA</strong>. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <p className="text-slate-500">
            Developer Properti Terpercaya & Hunian Berkualitas Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
