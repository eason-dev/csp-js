import { NextRequest, NextResponse } from 'next/server';
import { generateCSP, loadServices } from '@csp-kit/generator';

// Initialize services on first request
let servicesLoaded = false;

async function ensureServicesLoaded() {
  if (!servicesLoaded) {
    await loadServices();
    servicesLoaded = true;
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureServicesLoaded();
    
    const body = await request.json();
    const { services, nonce, customRules, reportUri } = body;

    const result = generateCSP({
      services,
      nonce,
      customRules,
      reportUri,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error generating CSP:', error);
    return NextResponse.json(
      { error: 'Failed to generate CSP' },
      { status: 500 }
    );
  }
}