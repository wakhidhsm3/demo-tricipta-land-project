import './globals.css';
import { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { WhatsAppFloatingButton } from '@/components/shared/WhatsAppFloatingButton';
import { companyProfileData } from '@/lib/data/companyProfile';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-cormorant',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'TRICIPTA LAND — Developer Properti Terpercaya & Hunian Berkualitas',
  description:
    'Pengembang perumahan terpercaya dengan legalitas 100% aman, desain hunian asri, dan lokasi strategis. Temukan rumah impian keluarga Anda di sini.',
  openGraph: {
    title: 'TRICIPTA LAND — Developer Properti Terpercaya',
    description: 'Hunian asri dan berkualitas dengan legalitas resmi dan lokasi strategis.',
    siteName: 'TRICIPTA LAND',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" data-scroll-behavior="smooth" className={`${cormorant.variable} ${manrope.variable} scroll-smooth`}>
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer companyData={companyProfileData} />
        <WhatsAppFloatingButton contactData={companyProfileData.headOffice} />
      </body>
    </html>
  );
}
