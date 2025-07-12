import { NextRequest, NextResponse } from 'next/server';
import { generateCSPAsync } from '@csp-kit/generator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { services, nonce, customRules, reportUri } = body;

    const result = await generateCSPAsync({
      services,
      nonce,
      customRules,
      reportUri,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error generating CSP:', error);
    return NextResponse.json({ error: 'Failed to generate CSP' }, { status: 500 });
  }
}
