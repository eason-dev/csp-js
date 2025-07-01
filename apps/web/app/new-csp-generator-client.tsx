'use client';

import { useState, useEffect, useMemo } from 'react';
import { type ServiceRegistry, type ServiceDefinition } from '@csp-kit/generator';
import Fuse from 'fuse.js';
import {
  Copy,
  Check,
  Search,
  Shield,
  AlertTriangle,
  ExternalLink,
  BookOpen,
  X,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';

interface CSPGeneratorClientProps {
  serviceRegistry: ServiceRegistry;
}

// Popular services to show initially (most commonly used ones)
const POPULAR_SERVICES = [
  'google-analytics',
  'google-fonts',
  'google-tag-manager',
  'facebook',
  'twitter',
  'youtube',
  'stripe',
  'paypal',
  'hotjar',
  'intercom',
];

export default function CSPGeneratorClient({ serviceRegistry }: CSPGeneratorClientProps) {
  const services = serviceRegistry.services;

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [serviceVersions, setServiceVersions] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [useNonce, setUseNonce] = useState(false);
  const [reportUri, setReportUri] = useState('');
  const [hoveredDirective, setHoveredDirective] = useState<string | null>(null);
  const [customRules, setCustomRules] = useState({
    'script-src': '',
    'style-src': '',
    'img-src': '',
    'connect-src': '',
    'font-src': '',
    'frame-src': '',
    'media-src': '',
    'object-src': '',
  });
  const [result, setResult] = useState<{
    header: string;
    warnings: string[];
    includedServices: string[];
    unknownServices: string[];
    nonce?: string;
    directives: Record<string, string[]>;
  } | null>(null);

  // Fuzzy search setup
  const fuse = useMemo(() => {
    const fuseOptions = {
      keys: [
        { name: 'name', weight: 0.4 },
        { name: 'description', weight: 0.3 },
        { name: 'aliases', weight: 0.2 },
        { name: 'category', weight: 0.1 },
      ],
      threshold: 0.3,
      includeScore: true,
    };
    return new Fuse(Object.values(services), fuseOptions);
  }, [services]);

  // Get services to display
  const servicesToShow = useMemo(() => {
    if (searchQuery.trim()) {
      const results = fuse.search(searchQuery);
      return results.map(result => result.item);
    }

    // Show popular services if no search
    const popularServicesList = POPULAR_SERVICES.map(id => services[id]).filter(
      (service): service is ServiceDefinition => Boolean(service)
    );

    return popularServicesList;
  }, [searchQuery, fuse, services]);

  // Generate CSP automatically when services change
  useEffect(() => {
    if (selectedServices.length > 0) {
      generateCurrentCSP();
    } else {
      setResult(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedServices, serviceVersions, useNonce, reportUri, customRules]);

  const generateCurrentCSP = async () => {
    try {
      // Build custom rules object, filtering out empty values
      const customRulesObj: Record<string, string[]> = {};
      Object.entries(customRules).forEach(([directive, value]) => {
        if (value.trim()) {
          customRulesObj[directive] = value
            .split(',')
            .map(v => v.trim())
            .filter(Boolean);
        }
      });

      // Build service array with versions
      const servicesWithVersions = selectedServices.map(serviceId => {
        const version = serviceVersions[serviceId];
        return version ? `${serviceId}@${version}` : serviceId;
      });

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
        unknownServices: selectedServices,
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

  const handleServiceSelection = (serviceId: string) => {
    const isSelected = selectedServices.includes(serviceId);

    if (isSelected) {
      setSelectedServices(prev => prev.filter(id => id !== serviceId));
      setServiceVersions(prev => {
        const newVersions = { ...prev };
        delete newVersions[serviceId];
        return newVersions;
      });
    } else {
      setSelectedServices(prev => [...prev, serviceId]);
      const service = services[serviceId];
      if (service?.defaultVersion) {
        setServiceVersions(prev => ({
          ...prev,
          [serviceId]: service.defaultVersion,
        }));
      }
    }
  };

  const getServiceForDirective = (directive: string, source: string): string | null => {
    for (const serviceId of selectedServices) {
      const service = services[serviceId];
      if (!service) return null;
      const version = serviceVersions[serviceId] || service.defaultVersion;
      const csp = service.versions[version]?.csp;

      if (csp && csp[directive as keyof typeof csp]?.includes(source)) {
        return serviceId;
      }
    }
    return null;
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Header with Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="text-primary h-8 w-8" />
              <h1 className="text-2xl font-bold">CSP Kit</h1>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/docs" target="_blank">
                <Button variant="outline" size="sm">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Docs
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-4xl font-bold">Generate Content Security Policy Headers</h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
            Select the services you&apos;re using, customize your security settings, and get
            production-ready CSP headers instantly. Protect your website from XSS attacks with zero
            configuration.
          </p>
        </div>

        {/* Main 2-Column Layout */}
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          {/* Left Column - Service Selection */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Services</CardTitle>
                <CardDescription>
                  Choose the web services and libraries you&apos;re using
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                  <Input
                    placeholder="Search services (e.g., Google Analytics, Stripe)..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Selected Services Count */}
                {selectedServices.length > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {selectedServices.length} service{selectedServices.length !== 1 ? 's' : ''}{' '}
                      selected
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedServices([]);
                        setServiceVersions({});
                      }}
                    >
                      Clear all
                    </Button>
                  </div>
                )}

                {/* Services Grid */}
                <div className="grid gap-3 sm:grid-cols-2">
                  {servicesToShow.filter(Boolean).map(service => {
                    const isSelected = selectedServices.includes(service.id);
                    const categoryDisplayName = service.category
                      .replace('_', ' ')
                      .replace(/\b\w/g, l => l.toUpperCase());

                    return (
                      <div
                        key={service.id}
                        className={`group relative cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md ${
                          isSelected
                            ? 'border-primary bg-primary/5 shadow-sm'
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => handleServiceSelection(service.id)}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="mb-1 truncate text-sm font-medium">{service.name}</div>
                            <Badge variant="outline" className="mb-2 text-xs">
                              {categoryDisplayName}
                            </Badge>
                            <p className="text-muted-foreground line-clamp-2 text-xs">
                              {service.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {isSelected && <div className="bg-primary h-2 w-2 rounded-full" />}
                            <Link
                              href={`/service/${service.id}`}
                              onClick={e => e.stopPropagation()}
                              className="opacity-0 transition-opacity group-hover:opacity-100"
                            >
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Show more hint when searching */}
                {!searchQuery && (
                  <div className="py-4 text-center">
                    <p className="text-muted-foreground mb-2 text-sm">
                      Showing popular services. Search to find more.
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {Object.keys(services).length - POPULAR_SERVICES.length}+ more services
                      available
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Custom Rules */}
            <Card>
              <CardHeader>
                <CardTitle>Custom CSP Rules</CardTitle>
                <CardDescription>
                  Add custom domains and rules for each CSP directive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(customRules).map(([directive, value]) => (
                  <div key={directive} className="space-y-2">
                    <Label htmlFor={directive} className="font-mono text-sm">
                      {directive}
                    </Label>
                    <Input
                      id={directive}
                      placeholder="https://example.com, &apos;self&apos;"
                      value={value}
                      onChange={e =>
                        setCustomRules(prev => ({
                          ...prev,
                          [directive]: e.target.value,
                        }))
                      }
                      className="font-mono text-xs"
                    />
                  </div>
                ))}
                <p className="text-muted-foreground text-xs">
                  Separate multiple values with commas. Use quotes for keywords like &apos;self&apos;,
                  &apos;unsafe-inline&apos;.
                </p>
              </CardContent>
            </Card>

            {/* Additional Options */}
            <Card>
              <CardHeader>
                <CardTitle>Security Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Generate Nonce</Label>
                    <p className="text-muted-foreground text-xs">
                      Generate a unique nonce for inline scripts
                    </p>
                  </div>
                  <Switch checked={useNonce} onCheckedChange={setUseNonce} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="report-uri">Report URI (optional)</Label>
                  <Input
                    id="report-uri"
                    type="url"
                    placeholder="https://your-site.com/csp-report"
                    value={reportUri}
                    onChange={e => setReportUri(e.target.value)}
                  />
                  <p className="text-muted-foreground text-xs">
                    CSP violations will be reported to this endpoint
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {result ? (
              <>
                {/* CSP Header */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Your CSP Header</CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(result.header)}
                        className="flex items-center gap-2"
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? 'Copied' : 'Copy'}
                      </Button>
                    </div>
                    <CardDescription>Ready to use in your HTTP headers or meta tag</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted break-all rounded-lg p-4 font-mono text-sm">
                      {result.header}
                    </div>

                    {result.nonce && (
                      <div className="mt-4">
                        <Label className="mb-2 block">Generated Nonce</Label>
                        <div className="bg-muted rounded-lg p-3 font-mono text-sm">
                          {result.nonce}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* CSP Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>CSP Breakdown</CardTitle>
                    <CardDescription>
                      Hover over directives to see which services require them
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(result.directives).map(([directive, sources]) => (
                        <div key={directive} className="space-y-2">
                          <div
                            className="flex cursor-pointer items-center gap-2"
                            onMouseEnter={() => setHoveredDirective(directive)}
                            onMouseLeave={() => setHoveredDirective(null)}
                          >
                            <Badge
                              variant="outline"
                              className={`font-mono text-xs ${
                                hoveredDirective === directive ? 'bg-primary/10 border-primary' : ''
                              }`}
                            >
                              {directive}
                            </Badge>
                            <span className="text-muted-foreground text-xs">
                              {sources.length} source{sources.length !== 1 ? 's' : ''}
                            </span>
                          </div>
                          <div className="ml-4 grid gap-1">
                            {sources.map((source, index) => {
                              const serviceId = getServiceForDirective(directive, source);
                              const service = serviceId ? services[serviceId] : null;

                              return (
                                <div
                                  key={index}
                                  className={`flex items-center justify-between rounded border p-2 text-xs transition-colors ${
                                    hoveredDirective === directive && service
                                      ? 'bg-primary/5 border-primary/20'
                                      : 'bg-muted/50'
                                  }`}
                                >
                                  <code className="font-mono">{source}</code>
                                  {service && (
                                    <Badge variant="secondary" className="text-xs">
                                      {service.name}
                                    </Badge>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Warnings and Info */}
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
                          <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-500" />
                          <span>{warning}</span>
                        </div>
                      ))}
                      {result.unknownServices?.length > 0 && (
                        <div className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400">
                          <X className="mt-0.5 h-4 w-4" />
                          <span>Unknown services: {result.unknownServices.join(', ')}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Usage Instructions */}
                <Card>
                  <CardHeader>
                    <CardTitle>How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="font-medium">HTTP Header</Label>
                      <div className="bg-muted mt-1 rounded-lg p-3">
                        <code className="text-sm">Content-Security-Policy: {result.header}</code>
                      </div>
                    </div>

                    <div>
                      <Label className="font-medium">HTML Meta Tag</Label>
                      <div className="bg-muted mt-1 rounded-lg p-3">
                        <code className="break-all text-sm">
                          &lt;meta http-equiv=&quot;Content-Security-Policy&quot; content=&quot;{result.header}
                          &quot;&gt;
                        </code>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Shield className="text-muted-foreground/50 mx-auto mb-4 h-16 w-16" />
                  <h3 className="mb-2 text-lg font-medium">Select Services to Get Started</h3>
                  <p className="text-muted-foreground mb-4">
                    Choose the services you&apos;re using from the left panel to generate your CSP
                    header.
                  </p>
                  <div className="text-muted-foreground inline-flex items-center gap-2 text-sm">
                    <Info className="h-4 w-4" />
                    <span>Your CSP will update automatically as you select services</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
