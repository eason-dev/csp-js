import { loadServices, getServiceRegistry } from '@csp-kit/generator';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import AllServicesPage from './all-services-page';

export const metadata: Metadata = {
  title: 'All Services - CSP Kit',
  description: 'Browse all supported web services and libraries for Content Security Policy generation. Find CSP configurations for analytics, CDNs, social media, payments, and more.',
  keywords: ['CSP services', 'Content Security Policy', 'web services', 'CSP configurations', 'service directory'],
};

export default async function ServicesPage() {
  await loadServices();
  const registry = await getServiceRegistry();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading services...</div>}>
          <AllServicesPage serviceRegistry={registry} />
        </Suspense>
      </main>
      <Footer serviceCount={Object.keys(registry.services).length} />
    </div>
  );
}