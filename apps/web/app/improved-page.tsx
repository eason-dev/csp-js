import { loadServices, getServiceRegistry } from '@csp-kit/generator';
import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Homepage from '@/components/pages/homepage';

export default async function ImprovedPage() {
  // Load services on the server side
  await loadServices();
  const registry = await getServiceRegistry();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
          <Homepage serviceRegistry={registry} />
        </Suspense>
      </main>
      <Footer serviceCount={Object.keys(registry.services).length} />
    </div>
  );
}