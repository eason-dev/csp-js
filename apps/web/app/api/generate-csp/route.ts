import { NextRequest, NextResponse } from 'next/server';
import { generateCSPAsync, getServiceRegistry } from '@csp-kit/generator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { services: serviceIds, nonce, customRules, reportUri } = body;

    // Get the service registry to map IDs to service objects
    const registry = await getServiceRegistry();
    
    // Map service IDs to CSPService objects
    const services = serviceIds.map((id: string) => {
      const service = registry.services[id];
      if (!service) {
        console.warn(`Service not found: ${id}`);
      }
      return service;
    }).filter(Boolean);

    const result = await generateCSPAsync({
      services,
      nonce,
      additionalRules: customRules,
      reportUri,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error generating CSP:', error);
    return NextResponse.json({ error: 'Failed to generate CSP' }, { status: 500 });
  }
}
