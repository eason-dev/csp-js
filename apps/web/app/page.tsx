import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import ProgressiveHomepage from '@/components/pages/progressive-homepage';
// Import all services to get the count
import * as services from '@csp-kit/data';

export default function CSPGenerator() {
  // Count the services
  const serviceCount = Object.values(services).filter(
    (value) => typeof value === 'object' && value !== null && 'id' in value
  ).length;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
          <ProgressiveHomepage />
        </Suspense>
      </main>
      <Footer serviceCount={serviceCount} />
    </div>
  );
}
