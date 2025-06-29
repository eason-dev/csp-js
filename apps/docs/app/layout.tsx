import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'CSP-JS Documentation',
  description:
    'Comprehensive documentation for CSP-JS - Generate Content Security Policy headers for popular web services',
  keywords: ['CSP', 'Content Security Policy', 'Web Security', 'JavaScript', 'TypeScript'],
  authors: [{ name: 'Eason Chang' }],
  openGraph: {
    title: 'CSP-JS Documentation',
    description: 'Generate Content Security Policy headers for popular web services',
    type: 'website',
    siteName: 'CSP-JS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CSP-JS Documentation',
    description: 'Generate Content Security Policy headers for popular web services',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
