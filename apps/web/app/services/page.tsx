import { Metadata } from 'next';
import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import AllServicesPage from './all-services-page';
import * as services from '@csp-kit/data';

export const metadata: Metadata = {
  title: 'All Services - CSP Kit',
  description:
    'Browse all supported web services and libraries for Content Security Policy generation. Find CSP configurations for analytics, CDNs, social media, payments, and more.',
  keywords: [
    'CSP services',
    'Content Security Policy',
    'web services',
    'CSP configurations',
    'service directory',
  ],
};

export default function ServicesPage() {
  // Count the services
  const serviceCount = Object.values(services).filter(
    (value) => typeof value === 'object' && value !== null && 'id' in value
  ).length;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading services...</div>}>
          <AllServicesPage />
        </Suspense>
      </main>
      <Footer serviceCount={serviceCount} />
    </div>
  );
}
