import { Metadata } from 'next';
import { ContactHeader } from '@/features/contact/ContactHeader';
import { ContactInfoGrid } from '@/features/contact/ContactInfoGrid';
import { ContactForm } from '@/features/contact/ContactForm';
import { OfficeMap } from '@/features/contact/OfficeMap';
import { companyProfileData } from '@/lib/data/companyProfile';

export const metadata: Metadata = {
  title: 'Contact Us — TRICIPTA LAND',
  description:
    'Hubungi tim sales dan customer service resmi TRICIPTA LAND untuk konsultasi perumahan, jadwal survey lokasi, dan informasi legalitas.',
  openGraph: {
    title: 'Contact Us — TRICIPTA LAND',
    description: 'Hubungi tim sales resmi TRICIPTA LAND.',
    images: ['/images/og-contact.jpg'],
  },
};

export default function ContactPage() {
  const { headOffice } = companyProfileData;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: companyProfileData.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: headOffice.address,
      addressLocality: headOffice.city,
      addressRegion: headOffice.province,
    },
    telephone: headOffice.phone,
    email: headOffice.email,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactHeader />
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ContactInfoGrid headOffice={headOffice} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6">
            <ContactForm />
            <OfficeMap headOffice={headOffice} />
          </div>
        </div>
      </section>
    </>
  );
}
