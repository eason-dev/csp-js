'use client';

import { useState } from 'react';
import { Copy, Check, Code, Globe, Shield, Terminal } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import typescript from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import nginx from 'react-syntax-highlighter/dist/esm/languages/hljs/nginx';
import apache from 'react-syntax-highlighter/dist/esm/languages/hljs/apache';
import xml from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import type { CSPService } from '@csp-kit/data';

SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('nginx', nginx);
SyntaxHighlighter.registerLanguage('apache', apache);
SyntaxHighlighter.registerLanguage('xml', xml);

interface UsageMethodsProps {
  header: string;
  directives: Record<string, string[]>;
  nonce?: string;
  selectedServices: CSPService[];
}

export function UsageMethods({ header, nonce, selectedServices }: UsageMethodsProps) {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const copyToClipboard = async (text: string, tab: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTab(tab);
      setTimeout(() => setCopiedTab(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Generate import statement
  const serviceImports = selectedServices.map(s => s.name.replace(/[^a-zA-Z0-9]/g, '')).join(', ');
  const hasCustomServices = selectedServices.some(s => s.id.startsWith('custom-'));

  const javascriptCode = `import { generateCSP } from '@csp-kit/generator';
import { ${serviceImports} } from '@csp-kit/data';

const result = generateCSP([${serviceImports}]${nonce ? ', { nonce: true }' : ''});

// Express.js example
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', result.header);${
    nonce ? '\n  res.locals.nonce = result.nonce;' : ''
  }
  next();
});`;

  const typescriptCode = `import { generateCSP } from '@csp-kit/generator';
import { ${serviceImports} } from '@csp-kit/data';

const result = generateCSP({
  services: [${serviceImports}],${
    nonce ? '\n  nonce: true,' : ''
  }
});

// Next.js App Router example
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={result.header} />
      </head>
      <body${nonce ? ' nonce={result.nonce}' : ''}>{children}</body>
    </html>
  );
}`;

  const htmlCode = `<meta http-equiv="Content-Security-Policy" content="${header}">`;

  const nginxCode = `# Add to your server block
add_header Content-Security-Policy "${header}";`;

  const apacheCode = `# Add to your .htaccess or Apache configuration
Header set Content-Security-Policy "${header}"`;

  const cloudflareCode = `// Cloudflare Workers
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const response = await fetch(request)
  const newHeaders = new Headers(response.headers)
  
  newHeaders.set('Content-Security-Policy', \`${header}\`)
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  })
}`;

  const tabs = [
    {
      id: 'typescript',
      label: 'TypeScript',
      icon: Code,
      code: typescriptCode,
      language: 'typescript',
    },
    {
      id: 'javascript',
      label: 'JavaScript',
      icon: Code,
      code: javascriptCode,
      language: 'javascript',
    },
    {
      id: 'html',
      label: 'HTML',
      icon: Globe,
      code: htmlCode,
      language: 'xml',
    },
    {
      id: 'nginx',
      label: 'Nginx',
      icon: Shield,
      code: nginxCode,
      language: 'nginx',
    },
    {
      id: 'apache',
      label: 'Apache',
      icon: Shield,
      code: apacheCode,
      language: 'apache',
    },
    {
      id: 'cloudflare',
      label: 'Cloudflare',
      icon: Globe,
      code: cloudflareCode,
      language: 'javascript',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center space-x-2">
          <Terminal className="h-5 w-5" />
          <span>Implementation Examples</span>
        </CardTitle>
        <CardDescription>
          Choose your framework or server to see implementation examples with the new TypeScript API
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="typescript" className="w-full">
          <TabsList className="grid grid-cols-6 w-full">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="text-xs">
                <tab.icon className="h-3 w-3 mr-1" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="relative">
              <div className="relative">
                <SyntaxHighlighter
                  language={tab.language}
                  style={atomOneDark}
                  customStyle={{
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    margin: 0,
                  }}
                >
                  {tab.code}
                </SyntaxHighlighter>
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(tab.code, tab.id)}
                >
                  {copiedTab === tab.id ? (
                    <>
                      <Check className="h-3 w-3 mr-1" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              {tab.id === 'typescript' && hasCustomServices && (
                <p className="text-sm text-muted-foreground mt-2">
                  Note: Remember to define your custom services using the `defineService` function.
                </p>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}