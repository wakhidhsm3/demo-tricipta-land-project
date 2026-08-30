import { Metadata } from 'next';
import {
  ContactHeader,
  ContactInfoGrid,
  ContactForm,
  OfficeMap,
} from '@/features/contact';
import { getCompanyProfile } from '@/features/about';
import { buildContactPageJsonLd } from '@/lib/seo/jsonld';
import { SafeJsonLd } from '@/lib/seo/safe-jsonld';
import { generatePageMetadata } from '@/lib/seo/metadata';

import { SectionContainer } from '@/components/shared';

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact Us',
  description:
    'Hubungi tim sales dan customer service resmi untuk konsultasi perumahan, jadwal survey lokasi, dan informasi legalitas.',
  ogImages: ['/images/og-contact.jpg'],
  ogDescription: 'Hubungi tim sales resmi untuk konsultasi perumahan.',
});

export default async function ContactPage() {
  const companyProfile = await getCompanyProfile();
  const { headOffice } = companyProfile;

  const jsonLd = buildContactPageJsonLd(companyProfile);

  return (
    <>
      <SafeJsonLd data={jsonLd} />
      <ContactHeader />
      <section className="w-full bg-white border-b border-dashed border-slate-200">
        <SectionContainer className="py-12 sm:py-16">
          <ContactInfoGrid headOffice={headOffice} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-stretch mt-10 sm:mt-12">
            <div className="lg:col-span-6 h-full flex flex-col">
              <ContactForm />
            </div>
            <div className="lg:col-span-6 h-full flex flex-col">
              <OfficeMap headOffice={headOffice} />
            </div>
          </div>
        </SectionContainer>
      </section>
    </>
  );
}
