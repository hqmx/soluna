import type { Metadata } from 'next';
import { Geist, Geist_Mono, Montserrat } from 'next/font/google';
import './globals.css';
import 'flag-icons/css/flag-icons.min.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'SOLUNA - 요가 스튜디오',
  description: '마음과 몸의 균형을 찾는 프라이빗 요가 스튜디오',
  keywords: ['요가', 'yoga', '프라이빗 요가', '개인 레슨', 'SOLUNA'],
  authors: [{ name: 'SOLUNA' }],
  openGraph: {
    title: 'SOLUNA - 요가 스튜디오',
    description: '마음과 몸의 균형을 찾는 프라이빗 요가 스튜디오',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
          <LanguageSwitcher />
        </LanguageProvider>
      </body>
    </html>
  );
}
