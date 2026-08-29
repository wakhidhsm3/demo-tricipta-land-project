'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, ArrowUpRight, ShieldCheck, FileText, CalendarCheck2, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { projectInquirySchema } from '@/lib/schemas/inquiry.schema';
import { Project } from '@/lib/types/project';
import { companyProfileData } from '@/lib/data/companyProfile';

export interface ProjectInquiryFormProps {
  project: Project;
}

export function ProjectInquiryForm({ project }: ProjectInquiryFormProps) {
  const [name, setName] = useState('');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [unitTypeId, setUnitTypeId] = useState(project.unitTypes[0]?.id || '');
  const [message, setMessage] = useState(
    `Halo TRICIPTA LAND, saya berminat dengan proyek perumahan ${project.name}. Mohon info pricelist resmi dan jadwal survey lokasi.`
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const unitTypeOptions = project.unitTypes.map((u) => ({
    label: u.name,
    value: u.id,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = projectInquirySchema.safeParse({
      name,
      phoneOrEmail,
      projectSlug: project.slug,
      unitTypeId,
      message,
    });

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSuccess(true);

    const selectedUnitName = project.unitTypes.find((u) => u.id === unitTypeId)?.name || '';

    const waText = `Halo TRICIPTA LAND, nama saya ${name} (${phoneOrEmail}). Saya berminat dengan ${selectedUnitName} di perumahan ${project.name}.\n\nPesan: ${message}`;
    const waUrl = `https://wa.me/${companyProfileData.headOffice.whatsapp}?text=${encodeURIComponent(
      waText
    )}`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 500);
  };

  const consultationBenefits = [
    {
      icon: <FileText className="size-4.5 text-emerald-700" />,
      title: 'Pricelist Resmi & E-Brosur Lengkap',
      desc: 'Dapatkan daftar harga tipe unit terkini beserta rincian spesifikasi teknis.',
    },
    {
      icon: <CalendarCheck2 className="size-4.5 text-emerald-700" />,
      title: 'Simulasi KPR & Jadwal Survey',
      desc: 'Bebas konsultasi skema cicilan KPR dan pendampingan survey langsung ke lokasi.',
    },
    {
      icon: <ShieldCheck className="size-4.5 text-emerald-700" />,
      title: 'Jaminan Kepastian Hukum (SHM & PBG)',
      desc: 'Informasi legalitas sertifikat pecah per unit siap balik nama di hadapan Notaris/PPAT.',
    },
  ];

  return (
    <section className="w-full bg-slate-50/40 border-b border-dashed border-slate-200" id="inquiry-form">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-18 min-[1280px]:border-x min-[1280px]:border-dashed min-[1280px]:border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-start">
          {/* Left Column: Heading & Consultation Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <span className="font-serif italic font-semibold text-emerald-800 text-sm tracking-wide underline underline-offset-6">
                Konsultasi & Survey Gratis
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight mt-2">
                Tertarik dengan <span className="text-emerald-800">{project.name}</span>?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3">
                Isi formulir di samping untuk mendapatkan e-brosur resmi, simulasi cicilan KPR, dan panduan survey lokasi langsung bersama tim konsultan kami.
              </p>
            </div>

            {/* Benefits Checklist Cards */}
            <div className="flex flex-col gap-3.5 pt-2">
              {consultationBenefits.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex items-start gap-3.5"
                >
                  <div className="size-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Inquiry Form Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-6 sm:p-9 lg:p-10 shadow-xs">
              <div className="border-b border-dashed border-slate-200 pb-4 mb-6">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                  Formulir Permintaan Informasi & Survey
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Lengkapi data diri Anda, tim representatif kami akan menghubungi Anda sesegera mungkin.
                </p>
              </div>

              {isSuccess ? (
                <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-200 text-center flex flex-col items-center gap-3 animate-in fade-in">
                  <div className="size-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <CheckCircle2 className="size-7" />
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                    Formulir Berhasil Terkirim!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md">
                    Terima kasih, Anda akan dialihkan otomatis ke WhatsApp resmi TRICIPTA LAND untuk terhubung langsung dengan konsultan properti kami.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Nama Lengkap *
                      </label>
                      <Input
                        type="text"
                        placeholder="Contoh: Budi Santoso"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={errors.name}
                        className="h-11 rounded-xl bg-slate-50 border-slate-200 focus-visible:bg-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Nomor WhatsApp / Email *
                      </label>
                      <Input
                        type="text"
                        placeholder="Contoh: 081234567890"
                        value={phoneOrEmail}
                        onChange={(e) => setPhoneOrEmail(e.target.value)}
                        error={errors.phoneOrEmail}
                        className="h-11 rounded-xl bg-slate-50 border-slate-200 focus-visible:bg-white text-sm"
                      />
                    </div>
                  </div>

                  {unitTypeOptions.length > 0 && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Tipe Unit yang Diminati
                      </label>
                      <Select value={unitTypeId} onValueChange={setUnitTypeId}>
                        <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-slate-200 text-sm">
                          <SelectValue placeholder="Pilih Tipe Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {unitTypeOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Pesan atau Pertanyaan Khusus *
                    </label>
                    <Textarea
                      placeholder="Tuliskan pertanyaan atau rencana survey lokasi Anda..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      error={errors.message}
                      className="rounded-xl bg-slate-50 border-slate-200 focus-visible:bg-white text-sm min-h-24"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 h-12 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm inline-flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-md shadow-emerald-900/10"
                  >
                    <Send className="size-4" />
                    <span>Kirim & Terhubung via WhatsApp Resmi</span>
                    <ArrowUpRight className="size-4 opacity-80" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
