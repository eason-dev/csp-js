import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { headers } from 'next/headers';
import Script from 'next/script';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { SelectedServicesProvider } from '@/contexts/selected-services-context';
import { TooltipProvider } from '@/components/ui/tooltip';
import { GoogleAnalytics } from '@/components/analytics/google-analytics';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'CSP Kit - Content Security Policy Generator',
  description:
    'Generate Content Security Policy headers for popular web services and libraries. Secure your website with CSP Kit - the easiest way to create CSP headers.',
  keywords: [
    'CSP',
    'Content Security Policy',
    'web security',
    'headers',
    'XSS protection',
    'CSP Kit',
    'CSP generator',
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get('x-nonce');

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Add Google Analytics with nonce support */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics
            measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
            nonce={nonce || undefined}
          />
        )}
        {/* Make nonce available to inline scripts and styles */}
        {nonce && (
          <Script
            id="nonce-setter"
            nonce={nonce}
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.__webpack_nonce__ = ${JSON.stringify(nonce)};`,
            }}
          />
        )}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <SelectedServicesProvider>{children}</SelectedServicesProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
