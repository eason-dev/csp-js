import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import ServicePage from './service-page';
import * as allServices from '@csp-kit/data';
import { type CSPService } from '@csp-kit/data';

// Get all service objects from the exports
const servicesMap = new Map<string, CSPService>();
Object.entries(allServices).forEach(([, value]) => {
  if (typeof value === 'object' && value !== null && 'id' in value) {
    const service = value as CSPService;
    servicesMap.set(service.id, service);
  }
});

const servicesList = Array.from(servicesMap.values());

interface ServicePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { id } = await params;
  const service = servicesMap.get(id);

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
  return servicesList.map(service => ({
    id: service.id,
  }));
}

export default async function Page({ params }: ServicePageProps) {
  const { id } = await params;
  const service = servicesMap.get(id);

  if (!service) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ServicePage service={service} />
      </main>
      <Footer serviceCount={servicesList.length} />
    </div>
  );
}
