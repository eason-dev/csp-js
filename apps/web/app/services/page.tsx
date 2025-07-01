import { loadServices, getServiceRegistry } from '@csp-kit/generator';
import { Metadata } from 'next';
import AllServicesPage from './all-services-page';

export const metadata: Metadata = {
  title: 'All Services - CSP Kit',
  description: 'Browse all supported web services and libraries for Content Security Policy generation. Find CSP configurations for analytics, CDNs, social media, payments, and more.',
  keywords: ['CSP services', 'Content Security Policy', 'web services', 'CSP configurations', 'service directory'],
};

export default async function ServicesPage() {
  await loadServices();
  const registry = await getServiceRegistry();

  return <AllServicesPage serviceRegistry={registry} />;
}