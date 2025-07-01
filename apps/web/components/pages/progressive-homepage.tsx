'use client';

import { useState, useEffect } from 'react';
import { type ServiceRegistry } from '@csp-kit/generator';
import {
  Shield,
  AlertTriangle,
  X,
  Info,
  Settings,
  Zap,
  Users,
  TrendingUp,
  Layers,
  Bookmark,
  Copy,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SimpleSearch } from '@/components/search/simple-search';
import { ColorCodedHeader } from '@/components/csp/color-coded-header';
import { useSelectedServices } from '@/contexts/selected-services-context';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProgressiveHomepageProps {
  serviceRegistry: ServiceRegistry;
}

// Categories with descriptions for better UX
const CATEGORY_CARDS = [
  {
    id: 'analytics',
    title: 'Analytics & Tracking',
    description: 'Google Analytics, Mixpanel, Hotjar',
    icon: TrendingUp,
    color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
    services: ['google-analytics', 'google-tag-manager', 'mixpanel', 'hotjar', 'amplitude']
  },
  {
    id: 'payment',
    title: 'Payment Processing',
    description: 'Stripe, PayPal, Square',
    icon: Shield,
    color: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
    services: ['stripe', 'paypal', 'square', 'adyen']
  },
  {
    id: 'social',
    title: 'Social Media',
    description: 'Facebook, Twitter, LinkedIn',
    icon: Users,
    color: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800',
    services: ['facebook-pixel', 'twitter-widgets', 'linkedin-insights', 'pinterest']
  },
  {
    id: 'cdn',
    title: 'CDN & Assets',
    description: 'Cloudflare, jsDelivr, Google Fonts',
    icon: Layers,
    color: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800',
    services: ['google-fonts', 'cloudflare-cdnjs', 'jsdelivr', 'unpkg']
  }
];

// Usage method options
const USAGE_METHODS = [
  {
    id: 'npm-package',
    title: '@csp-kit/generator',
    description: 'NPM package for programmatic use',
    default: true
  },
  {
    id: 'http-header',
    title: 'HTTP Header',
    description: 'Configure in your web server'
  },
  {
    id: 'meta-tag',
    title: 'HTML Meta Tag',
    description: 'Add directly to your HTML'
  },
  {
    id: 'nginx',
    title: 'Nginx Configuration',
    description: 'Server block configuration'
  },
  {
    id: 'apache',
    title: 'Apache Configuration',
    description: '.htaccess or virtual host'
  }
];

export default function ProgressiveHomepage({ serviceRegistry }: ProgressiveHomepageProps) {
  const services = serviceRegistry.services;
  const { selectedServices, addService, removeService, clearServices } = useSelectedServices();
  
  // State management
  const [useNonce, setUseNonce] = useState(false);
  const [reportUri, setReportUri] = useState('');
  const [customRules, setCustomRules] = useState<Record<string, string>>({
    'script-src': '',
    'style-src': '',
    'img-src': '',
    'connect-src': '',
    'font-src': '',
    'frame-src': '',
    'media-src': '',
    'object-src': '',
  });
  const [copied, setCopied] = useState(false);
  const [selectedUsageMethod, setSelectedUsageMethod] = useState('npm-package');
  const [result, setResult] = useState<{
    header: string;
    warnings: string[];
    includedServices: string[];
    unknownServices: string[];
    nonce?: string;
    directives: Record<string, string[]>;
  } | null>(null);

  // Check if we have any selected services
  const hasSelectedServices = selectedServices.length > 0;

  // Generate CSP automatically when services change
  useEffect(() => {
    if (hasSelectedServices) {
      generateCurrentCSP();
    } else {
      setResult(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedServices, useNonce, reportUri, customRules]);

  const generateCurrentCSP = async () => {
    try {
      // Build custom rules object, filtering out empty values
      const customRulesObj: Record<string, string[]> = {};
      Object.entries(customRules).forEach(([directive, value]) => {
        if (value.trim()) {
          customRulesObj[directive] = value.split(',').map(v => v.trim()).filter(Boolean);
        }
      });

      // Build service array with versions
      const servicesWithVersions = selectedServices.map(service => service.id);

      const response = await fetch('/api/generate-csp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          services: servicesWithVersions,
          nonce: useNonce,
          customRules: customRulesObj,
          reportUri: reportUri || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate CSP');
      }

      const cspResult = await response.json();
      
      // Parse the CSP header to extract directives for better display
      const directives: Record<string, string[]> = {};
      if (cspResult.header) {
        const parts = cspResult.header.split(';').map((part: string) => part.trim());
        parts.forEach((part: string) => {
          const [directive, ...sources] = part.split(' ');
          if (directive && sources.length > 0) {
            directives[directive] = sources;
          }
        });
      }
      
      setResult({
        ...cspResult,
        directives,
      });
    } catch (error) {
      console.error('Error generating CSP:', error);
      setResult({
        header: 'Error: Failed to generate CSP',
        warnings: ['Please check your configuration'],
        includedServices: [],
        unknownServices: selectedServices.map(s => s.id),
        directives: {},
      });
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    const category = CATEGORY_CARDS.find(c => c.id === categoryId);
    if (category) {
      // Add the first service from this category that exists
      const availableService = category.services.find(serviceId => services[serviceId]);
      if (availableService) {
        const service = services[availableService];
        if (service) {
          addService({
            id: service.id,
            name: service.name,
            version: service.defaultVersion,
          });
        }
      }
    }
  };

  const getUsageContent = () => {
    if (!result) return '';
    
    switch (selectedUsageMethod) {
      case 'npm-package':
        return `// Install CSP Kit
npm install @csp-kit/generator

// Generate CSP
import { generateCSP } from '@csp-kit/generator';

const result = await generateCSP({
  services: [${selectedServices.map(s => `'${s.id}'`).join(', ')}],
  nonce: ${useNonce},${customRules && Object.values(customRules).some(v => v.trim()) ? '\n  customRules: {\n' + Object.entries(customRules).filter(([,v]) => v.trim()).map(([k,v]) => `    '${k}': [${v.split(',').map(s => `'${s.trim()}'`).join(', ')}]`).join(',\n') + '\n  },' : ''}${reportUri ? `\n  reportUri: '${reportUri}',` : ''}
});

console.log(result.header);`;
      
      case 'http-header':
        return `Content-Security-Policy: ${result.header}`;
      
      case 'meta-tag':
        return `<meta http-equiv="Content-Security-Policy" content="${result.header}">`;
      
      case 'nginx':
        return `# Add to your server block
add_header Content-Security-Policy "${result.header}" always;`;
      
      case 'apache':
        return `# Add to .htaccess or virtual host
Header always set Content-Security-Policy "${result.header}"`;
      
      default:
        return result.header;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Generate CSP Headers Instantly
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Select services, get production-ready Content Security Policy headers. 
          Protect your website from XSS attacks with zero configuration.
        </p>

        {/* Enhanced Search Bar */}
        <SimpleSearch
          services={services}
          className="max-w-2xl mx-auto"
        />
      </div>

      {/* Quick Start Categories - Always Visible */}
      <Card className="mb-8">
        <CardHeader>
          <div className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 mb-2">
              <Bookmark className="h-5 w-5 text-primary" />
              Quick Start by Category
            </CardTitle>
            <CardDescription>
              Choose a category to get started, or search for specific services above
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORY_CARDS.map(category => {
              const Icon = category.icon;
              const categoryServices = category.services.filter(id => services[id]);
              
              return (
                <div
                  key={category.id}
                  className={`group cursor-pointer rounded-lg border p-4 transition-all hover:shadow-lg ${category.color}`}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <div className="text-center">
                    <Icon className="h-8 w-8 mx-auto mb-3" />
                    <h3 className="font-medium text-sm mb-2">
                      {category.title}
                    </h3>
                    <p className="text-xs opacity-80 mb-3">
                      {category.description}
                    </p>
                    <div className="text-xs opacity-70">
                      {categoryServices.length} service{categoryServices.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Progressive Disclosure - Only show when services are selected */}
      {hasSelectedServices && (
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Selected Services & Configuration */}
          <div className="space-y-6">
            {/* Selected Services */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Selected Services ({selectedServices.length})
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearServices}
                  >
                    Clear all
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedServices.map(service => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between gap-3 rounded-lg border p-3 bg-primary/5"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                        <span className="font-medium text-sm truncate">
                          {service.name}
                        </span>
                        <Badge variant="outline" className="text-xs shrink-0">
                          v{service.version}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 hover:bg-destructive/20 text-destructive"
                        onClick={() => removeService(service.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Advanced Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Advanced Configuration
                </CardTitle>
                <CardDescription>
                  Optional settings for power users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" className="w-full">
                  {/* Security Options */}
                  <AccordionItem value="security-options">
                    <AccordionTrigger>Security Options</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <Label>Generate Nonce</Label>
                              <InfoTooltip content="A nonce (number used once) is a cryptographic token that makes inline scripts safer by allowing only scripts with the correct nonce value to execute. Essential for secure inline JavaScript and styles." />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Generate a unique nonce for inline scripts
                            </p>
                          </div>
                          <Switch 
                            checked={useNonce} 
                            onCheckedChange={setUseNonce} 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label htmlFor="report-uri">Report URI (optional)</Label>
                            <InfoTooltip content="When CSP violations occur, the browser will send a report to this URL. Essential for monitoring security issues and debugging CSP policies in production." />
                          </div>
                          <Input
                            id="report-uri"
                            type="url"
                            placeholder="https://your-site.com/csp-report"
                            value={reportUri}
                            onChange={(e) => setReportUri(e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">
                            CSP violations will be reported to this endpoint
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Custom CSP Rules */}
                  <AccordionItem value="custom-rules">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        Custom CSP Rules
                        <InfoTooltip content="CSP directives control which resources (scripts, styles, images, etc.) can be loaded by your website. Each directive protects against specific types of attacks like XSS and data injection." />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Add custom domains and rules for each CSP directive
                        </p>
                        {Object.entries(customRules).map(([directive, value]) => (
                          <div key={directive} className="space-y-2">
                            <Label htmlFor={directive} className="text-sm font-mono">
                              {directive}
                            </Label>
                            <Input
                              id={directive}
                              placeholder="https://example.com, 'self'"
                              value={value}
                              onChange={(e) => setCustomRules(prev => ({
                                ...prev,
                                [directive]: e.target.value
                              }))}
                              className="font-mono text-xs"
                            />
                          </div>
                        ))}
                        <p className="text-xs text-muted-foreground">
                          Separate multiple values with commas. Use quotes for keywords like &apos;self&apos;, &apos;unsafe-inline&apos;.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - CSP Results */}
          <div className="space-y-6">
            {result && (
              <>
                {/* CSP Header with Color Coding */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Zap className="h-5 w-5" />
                          Your CSP Header
                        </CardTitle>
                        <CardDescription>
                          Ready to use in your application
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="usage-method" className="text-sm">How to use:</Label>
                        <InfoTooltip content="Different ways to implement CSP in your application. The NPM package provides programmatic access, while HTTP headers and meta tags offer direct browser implementation." />
                        <Select value={selectedUsageMethod} onValueChange={setSelectedUsageMethod}>
                          <SelectTrigger className="w-48">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {USAGE_METHODS.map(method => (
                              <SelectItem key={method.id} value={method.id}>
                                <div className="text-left">
                                  <div className="font-medium">{method.title}</div>
                                  <div className="text-xs text-muted-foreground">{method.description}</div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-muted rounded-lg p-4 relative">
                        <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
                          <code>{getUsageContent()}</code>
                        </pre>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-2"
                          onClick={() => copyToClipboard(getUsageContent())}
                        >
                          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CSP Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>CSP Breakdown</CardTitle>
                    <CardDescription>
                      Breakdown of all CSP directives and their sources
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ColorCodedHeader
                      header={result.header}
                      directives={result.directives}
                      onCopy={() => copyToClipboard(result.header)}
                      copied={copied}
                      showBreakdown={true}
                    />
                  </CardContent>
                </Card>

                {/* Warnings */}
                {(result.warnings?.length > 0 || result.unknownServices?.length > 0) && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        Warnings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {result.warnings?.map((warning, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                          <span>{warning}</span>
                        </div>
                      ))}
                      {result.unknownServices?.length > 0 && (
                        <div className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400">
                          <X className="h-4 w-4 mt-0.5" />
                          <span>Unknown services: {result.unknownServices.join(', ')}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Call to Action when no services selected */}
      {!hasSelectedServices && (
        <Card className="max-w-2xl mx-auto">
          <CardContent className="py-12 text-center">
            <Shield className="mx-auto mb-4 h-16 w-16 text-muted-foreground/50" />
            <h3 className="text-lg font-medium mb-2">Ready to Generate CSP</h3>
            <p className="text-muted-foreground mb-4">
              Search for services above or choose a category to get started.
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Info className="h-4 w-4" />
              <span>Your CSP will update automatically as you select services</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}