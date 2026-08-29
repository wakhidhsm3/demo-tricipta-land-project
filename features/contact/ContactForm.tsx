'use client';

import * as React from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
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
import { contactFormSchema } from '@/lib/schemas/contact.schema';
import { ContactTopic } from '@/lib/types/contact';
import { companyProfileData } from '@/lib/data/companyProfile';

export function ContactForm() {
  const [name, setName] = React.useState('');
  const [phoneOrEmail, setPhoneOrEmail] = React.useState('');
  const [topic, setTopic] = React.useState<ContactTopic>('KONSULTASI_HUNIAN');
  const [message, setMessage] = React.useState('');

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = React.useState(false);

  const topicOptions = [
    { label: 'Konsultasi Hunian & Perumahan', value: 'KONSULTASI_HUNIAN' },
    { label: 'Kemitraan & Investasi Business', value: 'KEMITRAAN' },
    { label: 'Informasi Legalitas & Sertifikat', value: 'LEGALITAS' },
    { label: 'Pertanyaan Lainnya', value: 'LAINNYA' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = contactFormSchema.safeParse({
      name,
      phoneOrEmail,
      topic,
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

    const waText = `Halo TRICIPTA LAND, nama saya ${name} (${phoneOrEmail}).\nTopik: ${topic}\n\nPesan: ${message}`;
    const waUrl = `https://wa.me/${companyProfileData.headOffice.whatsapp}?text=${encodeURIComponent(
      waText
    )}`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 500);
  };

  return (
    <div className="bg-white p-8 sm:p-10 rounded-2xl border border-border shadow-md">
      <h3 className="font-serif text-2xl font-bold text-brand-forest mb-2">Kirim Pesan Pertanyaan</h3>
      <p className="text-xs text-muted-foreground mb-6">
        Silakan lengkapi formulir di bawah ini. Tim kami akan segera merespons via WhatsApp atau Email.
      </p>

      {isSuccess ? (
        <div className="bg-emerald-50 border border-emerald-300 p-6 rounded-xl text-center flex flex-col items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          <h4 className="font-serif text-xl font-bold text-emerald-900">Pesan Berhasil Terkirim!</h4>
          <p className="text-xs text-emerald-700">
            Anda akan diarahkan langsung ke WhatsApp resmi TRICIPTA LAND.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-foreground mb-1">Nama Lengkap *</label>
            <Input
              type="text"
              placeholder="Masukkan nama lengkap Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-foreground mb-1">Nomor WhatsApp / Email *</label>
            <Input
              type="text"
              placeholder="Contoh: 08123456789 / nama@email.com"
              value={phoneOrEmail}
              onChange={(e) => setPhoneOrEmail(e.target.value)}
              error={errors.phoneOrEmail}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-foreground mb-1">Topik Pertanyaan *</label>
            <Select value={topic} onValueChange={(val) => setTopic(val as ContactTopic)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Topik Pertanyaan" />
              </SelectTrigger>
              <SelectContent>
                {topicOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-xs font-bold text-foreground mb-1">Detail Pesan *</label>
            <Textarea
              placeholder="Tuliskan pertanyaan atau informasi yang Anda butuhkan secara lengkap..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              error={errors.message}
            />
          </div>

          <Button type="submit" variant="default" size="lg" className="mt-2 w-full justify-center">
            <Send className="h-4 w-4" />
            <span>Kirim Pesan via WhatsApp</span>
          </Button>
        </form>
      )}
    </div>
  );
}
