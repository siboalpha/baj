import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Providers from './Providers';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import './globals.css';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BAJ Ltd — Waste Collection Fee Management System',
  description:
    'Leading sustainable waste management in Rwanda. Manage collection fees, zones, routes, and recycling programs.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
