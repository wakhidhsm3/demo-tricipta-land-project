'use client';

import * as React from 'react';
import { Send, CheckCircle2, ArrowUpRight } from 'lucide-react';
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
import { HoneypotField, FormField } from '@/components/shared';
import { contactFormSchema } from '../validations/contact.validation';
import { ContactTopic, CONTACT_TOPIC_OPTIONS, CONTACT_TOPICS } from '../types/contact.type';
import { siteConfig } from '@/lib/config/site.config';
import { buildContactInquiryMessage } from '@/lib/whatsapp';
import { submitContactInquiryAction } from '@/lib/actions/lead.action';
import { useWhatsAppForm } from '@/hooks';

export function ContactForm() {
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
      topic: 'KONSULTASI_HUNIAN' as ContactTopic,
      message: '',
    },
    schema: contactFormSchema,
    phone: siteConfig.headOffice.whatsapp,
    serverAction: submitContactInquiryAction,
    buildMessage: (data) =>
      buildContactInquiryMessage({
        name: data.name,
        phoneOrEmail: data.phoneOrEmail,
        topic: data.topic,
        message: data.message,
      }),
  });

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm h-full flex flex-col justify-between">
      <div className="border-b border-dashed border-slate-200 pb-4 mb-6">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
          Kirim Pesan Pertanyaan
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Silakan lengkapi formulir di bawah ini. Tim kami akan segera merespons via WhatsApp atau Email.
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
              Pesan Anda telah berhasil diarahkan ke WhatsApp resmi customer care {siteConfig.name}.
            </p>
          </div>
          <Button
            type="button"
            variant="link"
            size="sm"
            onClick={() => setIsSuccess(false)}
            className="mt-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Kirim Pesan Baru
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <HoneypotField value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />

          <FormField label="Nama Lengkap Anda" required>
            <Input
              type="text"
              placeholder="Masukkan nama lengkap Anda"
              value={values.name}
              onChange={(e) => setValue('name', e.target.value)}
              error={errors.name}
              className="h-11 rounded-xl bg-slate-50 border-slate-200 focus-visible:bg-white text-sm"
            />
          </FormField>

          <FormField label="Nomor WhatsApp / Email" required>
            <Input
              type="text"
              placeholder="Contoh: 08123456789 / nama@email.com"
              value={values.phoneOrEmail}
              onChange={(e) => setValue('phoneOrEmail', e.target.value)}
              error={errors.phoneOrEmail}
              className="h-11 rounded-xl bg-slate-50 border-slate-200 focus-visible:bg-white text-sm"
            />
          </FormField>

          <FormField label="Topik Pertanyaan" required error={errors.topic}>
            <Select
              value={values.topic}
              onValueChange={(val) => {
                const parsed = CONTACT_TOPICS.find((t) => t === val);
                if (parsed) setValue('topic', parsed);
              }}
            >
              <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-slate-200 text-sm">
                <SelectValue placeholder="Pilih Topik Pertanyaan" />
              </SelectTrigger>
              <SelectContent>
                {CONTACT_TOPIC_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Detail Pesan" required>
            <Textarea
              placeholder="Tuliskan pertanyaan atau informasi yang Anda butuhkan secara lengkap..."
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
            <span>{isSubmitting ? 'Memproses Pesan...' : 'Kirim Pesan via WhatsApp'}</span>
            <ArrowUpRight className="size-4 opacity-80" />
          </Button>
        </form>
      )}
    </div>
  );
}
