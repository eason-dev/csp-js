'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface UsageMethodsProps {
  cspHeader: string;
  serviceIds?: string[];
  useNonce?: boolean;
  reportUri?: string;
  customRules?: Record<string, string[]>;
}

// Usage method options
const USAGE_METHODS = [
  {
    id: 'npm-package',
    title: '@csp-kit/generator',
    description: 'NPM package for programmatic use',
    language: 'javascript',
    default: true
  },
  {
    id: 'http-header',
    title: 'HTTP Header',
    description: 'Configure in your web server',
    language: 'text'
  },
  {
    id: 'meta-tag',
    title: 'HTML Meta Tag',
    description: 'Add directly to your HTML',
    language: 'html'
  },
  {
    id: 'nginx',
    title: 'Nginx Configuration',
    description: 'Server block configuration',
    language: 'nginx'
  },
  {
    id: 'apache',
    title: 'Apache Configuration',
    description: '.htaccess or virtual host',
    language: 'apache'
  }
];

export function UsageMethods({ 
  cspHeader, 
  serviceIds = [], 
  useNonce = false, 
  reportUri = '', 
  customRules = {} 
}: UsageMethodsProps) {
  const [selectedUsageMethod, setSelectedUsageMethod] = useState('npm-package');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getUsageContent = () => {
    switch (selectedUsageMethod) {
      case 'npm-package':
        return `// Install CSP Kit
npm install @csp-kit/generator

// Generate CSP
import { generateCSP } from '@csp-kit/generator';

const result = await generateCSP({
  services: [${serviceIds.map(s => `'${s}'`).join(', ')}],
  nonce: ${useNonce},${Object.keys(customRules).length > 0 ? '\n  customRules: {\n' + Object.entries(customRules).map(([k,v]) => `    '${k}': [${v.map(s => `'${s}'`).join(', ')}]`).join(',\n') + '\n  },' : ''}${reportUri ? `\n  reportUri: '${reportUri}',` : ''}
});

console.log(result.header);
// Output: "${cspHeader}"`;
      
      case 'http-header':
        return `Content-Security-Policy: ${cspHeader}`;
      
      case 'meta-tag':
        return `<meta http-equiv="Content-Security-Policy" content="${cspHeader}">`;
      
      case 'nginx':
        return `# Add to your server block
add_header Content-Security-Policy "${cspHeader}" always;`;
      
      case 'apache':
        return `# Add to .htaccess or virtual host
Header always set Content-Security-Policy "${cspHeader}"`;
      
      default:
        return cspHeader;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <Label htmlFor="usage-method" className="text-sm whitespace-nowrap mt-2">Usage:</Label>
          <Select value={selectedUsageMethod} onValueChange={setSelectedUsageMethod}>
            <SelectTrigger className="w-full h-auto min-h-[2.5rem] py-2 [&>span]:line-clamp-none [&>span]:whitespace-normal">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-w-none">
              {USAGE_METHODS.map(method => (
                <SelectItem key={method.id} value={method.id}>
                  <div className="text-left max-w-none">
                    <div className="font-medium">{method.title}</div>
                    <div className="text-xs text-muted-foreground whitespace-normal">{method.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => copyToClipboard(getUsageContent())}
          className="flex items-center gap-2 shrink-0"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
      
      <div className="rounded-lg overflow-hidden">
        <SyntaxHighlighter
          language={USAGE_METHODS.find(m => m.id === selectedUsageMethod)?.language || 'text'}
          style={oneDark}
          customStyle={{
            margin: 0,
            fontSize: '14px',
            borderRadius: '8px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}
          showLineNumbers={false}
          wrapLines={true}
          wrapLongLines={true}
          codeTagProps={{
            style: {
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }
          }}
          preTagProps={{
            style: {
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              overflowX: 'visible',
            }
          }}
        >
          {getUsageContent()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}