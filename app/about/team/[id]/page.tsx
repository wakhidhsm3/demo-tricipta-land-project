import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ChevronRight,
  Home,
  Briefcase,
  GraduationCap,
  Award,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  Building2,
  Calendar,
} from 'lucide-react';
import { getOrgMemberById, getAllOrgMembers } from '@/lib/data/organization';
import { companyProfileData } from '@/lib/data/companyProfile';

interface TeamMemberDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const members = getAllOrgMembers();
  return members.map((member) => ({ id: member.id }));
}

export async function generateMetadata({
  params,
}: TeamMemberDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const member = getOrgMemberById(id);

  if (!member) {
    return { title: 'Profil Tim Tidak Ditemukan — TRICIPTA LAND' };
  }

  return {
    title: `${member.name} — ${member.position} | TRICIPTA LAND`,
    description: member.roleDescription,
    openGraph: {
      title: `${member.name} — ${member.position}`,
      description: member.roleDescription,
      images: [member.photoUrl],
    },
  };
}

export default async function TeamMemberDetailPage({
  params,
}: TeamMemberDetailPageProps) {
  const { id } = await params;
  const member = getOrgMemberById(id);

  if (!member) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.position,
    worksFor: {
      '@type': 'Organization',
      name: companyProfileData.legalName,
    },
    image: member.photoUrl,
    description: member.roleDescription,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Sticky Breadcrumb Bar */}
      <div className="sticky top-16 z-40 w-full bg-white/95 backdrop-blur-md border-b border-dashed border-slate-200 shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 min-[1280px]:border-x min-[1280px]:border-dashed min-[1280px]:border-slate-200">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:text-emerald-800 transition-colors font-medium"
            >
              <Home className="size-3.5 text-slate-400" />
              <span>Beranda</span>
            </Link>
            <ChevronRight className="size-3.5 text-slate-300" />
            <Link
              href="/about"
              className="hover:text-emerald-800 transition-colors font-medium"
            >
              Tentang Kami
            </Link>
            <ChevronRight className="size-3.5 text-slate-300" />
            <Link
              href="/about?tab=organization"
              className="hover:text-emerald-800 transition-colors font-medium"
            >
              Struktur Organisasi
            </Link>
            <ChevronRight className="size-3.5 text-slate-300" />
            <span className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-md">
              {member.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Profile Section */}
      <section className="w-full bg-white border-b border-dashed border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 min-[1280px]:border-x min-[1280px]:border-dashed min-[1280px]:border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Photo Portrait & Key Facts */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="relative h-95 sm:h-120 w-full rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-md">
                <Image
                  src={member.photoUrl}
                  alt={member.name}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />

                {/* Floating Bottom Badge */}
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="text-xs font-bold text-emerald-800 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-white/60 inline-block">
                    {member.position}
                  </span>
                </div>
              </div>

              {/* Quick Credentials Info Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/80 border border-dashed border-slate-200 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="size-4 text-emerald-700" />
                  Kredensial Profesional
                </h4>

                {member.education && (
                  <div className="flex items-start gap-3 text-xs sm:text-sm">
                    <GraduationCap className="size-4.5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 font-medium block">Pendidikan:</span>
                      <span className="font-semibold text-slate-800">{member.education}</span>
                    </div>
                  </div>
                )}

                {member.experienceYears && (
                  <div className="flex items-start gap-3 text-xs sm:text-sm">
                    <Calendar className="size-4.5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 font-medium block">Pengalaman Kerja:</span>
                      <span className="font-semibold text-slate-800">{member.experienceYears}</span>
                    </div>
                  </div>
                )}

                {member.departmentName && (
                  <div className="flex items-start gap-3 text-xs sm:text-sm">
                    <Building2 className="size-4.5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 font-medium block">Departemen:</span>
                      <span className="font-semibold text-slate-800">{member.departmentName}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Bio, Responsibilities & Certifications */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              {/* Header Title */}
              <div className="space-y-3">
                <span className="font-serif italic font-semibold text-emerald-800 text-sm tracking-wide underline underline-offset-6">
                  Profil Kepemimpinan & Pengelola
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                  {member.name}
                </h1>
                <p className="text-base sm:text-lg font-medium text-emerald-800">
                  {member.position} — TRICIPTA LAND
                </p>
              </div>

              {/* Bio Narrative */}
              <div className="space-y-3 pt-4 border-t border-dashed border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Ringkasan Profil & Dedikasi
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-justify sm:text-left">
                  {member.bio || member.roleDescription}
                </p>
              </div>

              {/* Responsibilities Checklist */}
              {member.responsibilities && member.responsibilities.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-dashed border-slate-200">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <Briefcase className="size-4 text-emerald-700" />
                    Tanggung Jawab & Fokus Utama
                  </h3>
                  <div className="flex flex-col gap-2.5">
                    {member.responsibilities.map((resp, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-200/70"
                      >
                        <div className="size-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="size-3.5" />
                        </div>
                        <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                          {resp}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications if available */}
              {member.certifications && member.certifications.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-dashed border-slate-200">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <Award className="size-4 text-emerald-700" />
                    Sertifikasi & Lisensi Keahlian
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {member.certifications.map((cert, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200/60 text-xs font-semibold text-emerald-900"
                      >
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Back */}
              <div className="pt-6 border-t border-dashed border-slate-200 flex items-center justify-end">
                <Link
                  href="/about?tab=organization"
                  className="h-11 px-5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm inline-flex items-center gap-2 transition-colors shadow-2xs"
                >
                  <ArrowLeft className="size-4" />
                  <span>Kembali ke Struktur Organisasi</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
