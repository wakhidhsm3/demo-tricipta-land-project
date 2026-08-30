'use client';

import React from 'react';
import { Send, CheckCircle2, ArrowUpRight, ShieldCheck, FileText, CalendarCheck2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { HoneypotField, SectionContainer, SectionEyebrow, FormField } from '@/components/shared';
import { projectInquirySchema } from '../validations/inquiry.validation';
import { Project } from '../types/project.type';
import { consultationBenefitsData } from '../data/inquiry-benefits.data';
import { siteConfig } from '@/lib/config/site.config';
import { buildProjectInquiryMessage, sanitizeWhatsAppNumber } from '@/lib/whatsapp';
import { submitProjectInquiryAction } from '@/lib/actions/lead.action';
import { useWhatsAppForm } from '@/hooks';

const BENEFIT_ICONS = {
  FileText: <FileText className="size-4.5 text-emerald-700" />,
  CalendarCheck2: <CalendarCheck2 className="size-4.5 text-emerald-700" />,
  ShieldCheck: <ShieldCheck className="size-4.5 text-emerald-700" />,
};

export interface ProjectInquiryFormProps {
  project: Project;
}

export function ProjectInquiryForm({ project }: ProjectInquiryFormProps) {
  const defaultUnit = project.unitTypes[0];
  const unitTypeOptions = project.unitTypes.map((u) => ({
    label: u.name,
    value: u.id,
  }));

  const {
    values,
    setValue,
    honeypot,
    setHoneypot,
    errors,
    isSuccess,
    isSubmitting,
    setIsSuccess,
    handleSubmit,
  } = useWhatsAppForm({
    initialValues: {
      name: '',
      phoneOrEmail: '',
      unitTypeId: defaultUnit?.id || '',
      message: buildProjectInquiryMessage({
        projectName: project.name,
        unitTypeName: defaultUnit?.name,
      }),
    },
    schema: projectInquirySchema,
    phone: siteConfig.headOffice.whatsapp,
    transformValues: (val) => {
      const normalizedContact = val.phoneOrEmail.includes('@')
        ? val.phoneOrEmail.trim()
        : sanitizeWhatsAppNumber(val.phoneOrEmail);
      return {
        ...val,
        phoneOrEmail: normalizedContact || val.phoneOrEmail,
        projectSlug: project.slug,
      };
    },
    serverAction: async (data) => {
      const selectedUnitName = project.unitTypes.find((u) => u.id === data.unitTypeId)?.name;
      return submitProjectInquiryAction(data, {
        projectName: project.name,
        unitTypeName: selectedUnitName,
      });
    },
    buildMessage: (data) => {
      const selectedUnitName = project.unitTypes.find((u) => u.id === data.unitTypeId)?.name;
      return buildProjectInquiryMessage({
        projectName: project.name,
        unitTypeName: selectedUnitName,
        senderName: data.name,
        senderContact: data.phoneOrEmail,
        customMessage: data.message,
      });
    },
  });

  return (
    <section id="inquiry-form" className="w-full bg-white border-b border-dashed border-slate-200">
      <SectionContainer className="py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-stretch">
          {/* Left Column: Context, Benefits & Direct Contact CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 h-full">
            <div className="flex flex-col gap-6">
              <div>
                <SectionEyebrow>
                  Layanan Informasi & Konsultasi
                </SectionEyebrow>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1.5">
                  Konsultasi & Jadwalkan Survey {project.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Dapatkan informasi ketersediaan unit, simulasi angsuran KPR bank rekanan, dan pendampingan survey lokasi gratis bersama konsultan properti kami.
                </p>
              </div>

              {/* Benefits Checklist Cards */}
              <div className="flex flex-col gap-3.5">
                {consultationBenefitsData.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl border border-slate-200/90 bg-slate-50/70"
                  >
                    <div className="size-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      {BENEFIT_ICONS[item.iconName]}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Operating Hour Note */}
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/60 text-xs text-emerald-950 flex flex-col gap-1 mt-auto">
              <strong className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-700" />
                Respon Cepat Tim Sales
              </strong>
              <span>
                Pesan Anda langsung diteruskan ke WhatsApp resmi kantor pusat {siteConfig.name} ({siteConfig.headOffice.operatingHours}).
              </span>
            </div>
          </div>

          {/* Right Column: Inquiry Form Card */}
          <div className="lg:col-span-7 h-full flex flex-col">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm h-full flex flex-col justify-between">
              <div className="border-b border-dashed border-slate-200 pb-4 mb-6">
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Formulir Minat & Booking Jadwal
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Isi data di bawah ini untuk menerima respon personal dari tim marketing perumahan.
                </p>
              </div>

              {isSuccess ? (
                <div className="py-8 flex flex-col items-center justify-center text-center gap-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="size-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-bold text-slate-900">
                      Terima Kasih, {values.name}!
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mt-1 leading-relaxed">
                      Permintaan informasi unit untuk <strong>{project.name}</strong> telah diarahkan ke WhatsApp resmi {siteConfig.name}.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    onClick={() => setIsSuccess(false)}
                    className="mt-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    Kirim Formulir Baru
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Anti-bot silent honeypot field */}
                  <HoneypotField value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />

                  <FormField label="Nama Lengkap Anda" required>
                    <Input
                      type="text"
                      placeholder="Masukkan nama lengkap"
                      value={values.name}
                      onChange={(e) => setValue('name', e.target.value)}
                      error={errors.name}
                      className="h-11 rounded-xl bg-slate-50 border-slate-200 focus-visible:bg-white text-sm"
                    />
                  </FormField>

                  <FormField label="Nomor WhatsApp Aktif / Email" required>
                    <Input
                      type="text"
                      placeholder="Contoh: 08123456789 atau nama@email.com"
                      value={values.phoneOrEmail}
                      onChange={(e) => setValue('phoneOrEmail', e.target.value)}
                      error={errors.phoneOrEmail}
                      className="h-11 rounded-xl bg-slate-50 border-slate-200 focus-visible:bg-white text-sm"
                    />
                  </FormField>

                  {project.unitTypes.length > 0 && (
                    <FormField label="Tipe Unit yang Diminati" error={errors.unitTypeId}>
                      <Select
                        value={values.unitTypeId}
                        onValueChange={(val) => setValue('unitTypeId', val)}
                      >
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
                    </FormField>
                  )}

                  <FormField label="Pesan atau Pertanyaan Khusus" required>
                    <Textarea
                      placeholder="Tuliskan pertanyaan atau rencana survey lokasi Anda..."
                      value={values.message}
                      onChange={(e) => setValue('message', e.target.value)}
                      error={errors.message}
                      className="rounded-xl bg-slate-50 border-slate-200 focus-visible:bg-white text-sm min-h-24"
                    />
                  </FormField>

                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    disabled={isSubmitting}
                    className="mt-2 w-full justify-center"
                  >
                    <Send className="size-4" />
                    <span>{isSubmitting ? 'Memproses Reservasi Unit...' : 'Kirim & Terhubung via WhatsApp Resmi'}</span>
                    <ArrowUpRight className="size-4 opacity-80" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

