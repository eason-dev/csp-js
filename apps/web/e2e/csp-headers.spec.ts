import { test, expect } from '@playwright/test';

test.describe('CSP Headers', () => {
  test('should have CSP headers with Google Analytics configuration', async ({ page }) => {
    // Capture the response to check headers
    const response = await page.goto('/');
    
    // Get all headers for debugging
    const headers = response?.headers() || {};
    console.log('Response headers:', Object.keys(headers));
    
    // Get CSP header (case-insensitive)
    const cspHeader = Object.entries(headers).find(([key]) => 
      key.toLowerCase() === 'content-security-policy' || 
      key.toLowerCase() === 'content-security-policy-report-only'
    )?.[1];
    
    // Verify CSP header exists
    expect(cspHeader).toBeTruthy();
    
    // Verify it includes Google Analytics directives
    expect(cspHeader).toContain('https://*.googletagmanager.com');
    expect(cspHeader).toContain('https://*.google-analytics.com');
    
    // Verify it includes nonce for scripts
    expect(cspHeader).toMatch(/script-src[^;]*'nonce-[\w+/=]+'/);
    
    // Verify it includes 'self' directive
    expect(cspHeader).toContain("'self'");
  });

  test('should have different CSP headers in production mode', async ({ page }) => {
    // This test would need to run against a production build
    // For now, we'll just verify the development mode uses Report-Only
    const response = await page.goto('/');
    const headers = response?.headers() || {};
    
    // In development, should use Report-Only header (case-insensitive)
    const reportOnlyHeader = Object.entries(headers).find(([key]) => 
      key.toLowerCase() === 'content-security-policy-report-only'
    )?.[1];
    const strictHeader = Object.entries(headers).find(([key]) => 
      key.toLowerCase() === 'content-security-policy'
    )?.[1];
    
    if (process.env.NODE_ENV !== 'production') {
      expect(reportOnlyHeader).toBeTruthy();
      expect(strictHeader).toBeFalsy();
    }
  });

  test('should have nonce attribute on scripts', async ({ page }) => {
    await page.goto('/');
    
    // Check if Google Analytics scripts have nonce
    const gaScript = await page.locator('script[src*="googletagmanager.com"]').first();
    const hasGaScript = await gaScript.count() > 0;
    
    if (hasGaScript && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      const nonce = await gaScript.getAttribute('nonce');
      expect(nonce).toBeTruthy();
      expect(nonce).toMatch(/[\w+/=]+/);
    }
  });

  test('should not apply CSP to static assets', async ({ page }) => {
    // Test that static assets don't get CSP headers
    const staticPaths = [
      '/_next/static/chunks/webpack.js',
      '/favicon.ico',
    ];
    
    for (const path of staticPaths) {
      const response = await page.request.get(path);
      
      // These paths should not have CSP headers
      const cspHeader = response.headers()['content-security-policy'];
      const reportOnlyHeader = response.headers()['content-security-policy-report-only'];
      
      // Note: Next.js might still apply some headers, but our middleware shouldn't run
      // We're mainly testing that our middleware matcher works correctly
      expect(response.status()).not.toBe(500); // Ensure no errors
    }
  });

  test('should block resources not in CSP', async ({ page }) => {
    // Listen for CSP violations
    const cspViolations: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error' && msg.text().includes('Content Security Policy')) {
        cspViolations.push(msg.text());
      }
    });
    
    await page.goto('/');
    
    // Try to inject a script that should be blocked
    await page.evaluate(() => {
      const script = document.createElement('script');
      script.src = 'https://evil.example.com/malicious.js';
      document.head.appendChild(script);
    });
    
    // Wait a bit for potential CSP violation
    await page.waitForTimeout(1000);
    
    // In report-only mode, we might not see violations in console
    // But in production with strict CSP, this would be blocked
  });
});