import { NextRequest, NextResponse } from 'next/server';
import { generateCSP } from '@csp-kit/generator';
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { services: serviceIds, nonce, additionalRules, reportUri } = body;

    // Convert service IDs to service objects
    const services = serviceIds.map((id: string) => servicesMap.get(id)).filter(Boolean) as CSPService[];

    const result = generateCSP({
      services,
      nonce,
      additionalRules,
      reportUri,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error generating CSP:', error);
    return NextResponse.json({ error: 'Failed to generate CSP' }, { status: 500 });
  }
}
