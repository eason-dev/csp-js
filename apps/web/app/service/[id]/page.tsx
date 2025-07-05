import { loadServices, getServiceRegistry } from '@csp-kit/generator';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import ServicePage from './service-page';

interface ServicePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { id } = await params;
  await loadServices();
  const registry = await getServiceRegistry();
  const service = registry.services[id];

  if (!service) {
    return {
      title: 'Service Not Found - CSP Kit',
      description: 'The requested service was not found in our CSP database.',
    };
  }

  return {
    title: `${service.name} CSP Configuration - CSP Kit`,
    description: `Learn how to configure Content Security Policy (CSP) for ${service.name}. Get CSP headers, documentation, and setup instructions.`,
    keywords: [
      'CSP',
      'Content Security Policy',
      service.name,
      service.category,
      'web security',
      'CSP configuration',
    ],
  };
}

export async function generateStaticParams() {
  await loadServices();
  const registry = await getServiceRegistry();

  return Object.keys(registry.services).map(id => ({
    id,
  }));
}

export default async function Page({ params }: ServicePageProps) {
  const { id } = await params;
  await loadServices();
  const registry = await getServiceRegistry();
  const service = registry.services[id];

  if (!service) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ServicePage service={service} />
      </main>
      <Footer serviceCount={Object.keys(registry.services).length} />
    </div>
  );
}
