import { NextRequest, NextResponse } from 'next/server';
import { generateCSPAsync } from '@csp-kit/generator';
import * as allServices from '@csp-kit/data';
import type { CSPService } from '@csp-kit/data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { services: serviceIds, nonce, customRules, reportUri } = body;

    // Convert service IDs to CSPService objects
    const services: CSPService[] = [];

    for (const id of serviceIds) {
      // Convert id from kebab-case to PascalCase for the export name
      const serviceName = id
        .split('-')
        .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');

      // Get the service from the exports
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const service = (allServices as any)[serviceName];

      if (service && typeof service === 'object' && 'id' in service && 'directives' in service) {
        services.push(service as CSPService);
      } else {
        console.warn(`Service not found: ${id} (looked for ${serviceName})`);
      }
    }

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
