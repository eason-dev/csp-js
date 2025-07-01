'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { type ServiceRegistry, type ServiceDefinition } from '@csp-kit/generator';
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { EnhancedSearch } from '@/components/search/enhanced-search';
import { ColorCodedHeader } from '@/components/csp/color-coded-header';
import { 
  CSPState, 
  DEFAULT_STATE, 
  encodeStateToURL, 
  decodeStateFromURL, 
  saveStateToSession, 
  loadStateFromSession,
  addToRecentServices 
} from '@/lib/url-state';

interface HomepageProps {
  serviceRegistry: ServiceRegistry;
}

// Categories with descriptions for better UX
const CATEGORY_CARDS = [
  {
    id: 'analytics',
    title: 'Analytics & Tracking',
    description: 'Google Analytics, Mixpanel, Hotjar',
    icon: TrendingUp,
    color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800'
  },
  {
    id: 'payment',
    title: 'Payment Processing',
    description: 'Stripe, PayPal, Square',
    icon: Shield,
    color: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800'
  },
  {
    id: 'social',
    title: 'Social Media',
    description: 'Facebook, Twitter, LinkedIn',
    icon: Users,
    color: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800'
  },
  {
    id: 'cdn',
    title: 'CDN & Assets',
    description: 'Cloudflare, jsDelivr, Google Fonts',
    icon: Layers,
    color: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800'
  }
];

export default function Homepage({ serviceRegistry }: HomepageProps) {
  const services = serviceRegistry.services;
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State management
  const [state, setState] = useState<CSPState>(DEFAULT_STATE);
  const [copied, setCopied] = useState(false);
  const [hoveredDirective, setHoveredDirective] = useState<string | null>(null);
  const [result, setResult] = useState<{
    header: string;
    warnings: string[];
    includedServices: string[];
    unknownServices: string[];
    nonce?: string;
    directives: Record<string, string[]>;
  } | null>(null);

  // Initialize state from URL and session storage
  useEffect(() => {
    const urlState = decodeStateFromURL(searchParams);
    const sessionState = loadStateFromSession();
    
    // Merge states with URL taking precedence
    const mergedState = {
      ...DEFAULT_STATE,
      ...sessionState,
      ...urlState,
    };
    
    setState(mergedState);
  }, [searchParams]);

  // Save state to session storage and URL
  const updateState = useCallback((newState: Partial<CSPState>) => {
    const updatedState = { ...state, ...newState };
    setState(updatedState);
    
    // Save to session storage
    saveStateToSession(updatedState);
    
    // Update URL
    const params = encodeStateToURL(updatedState);
    const newUrl = params.toString() ? `?${params.toString()}` : '/';
    router.replace(newUrl, { scroll: false });
  }, [state, router]);

  // Generate CSP automatically when state changes
  useEffect(() => {
    if (state.selectedServices.length > 0) {
      generateCurrentCSP();
    } else {
      setResult(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedServices, state.serviceVersions, state.useNonce, state.reportUri, state.customRules]);

  const generateCurrentCSP = async () => {
    try {
      // Build custom rules object, filtering out empty values
      const customRulesObj: Record<string, string[]> = {};
      Object.entries(state.customRules).forEach(([directive, value]) => {
        if (value.trim()) {
          customRulesObj[directive] = value.split(',').map(v => v.trim()).filter(Boolean);
        }
      });

      // Build service array with versions
      const servicesWithVersions = state.selectedServices.map(serviceId => {
        const version = state.serviceVersions[serviceId];
        return version ? `${serviceId}@${version}` : serviceId;
      });

      const response = await fetch('/api/generate-csp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          services: servicesWithVersions,
          nonce: state.useNonce,
          customRules: customRulesObj,
          reportUri: state.reportUri || undefined,
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
        unknownServices: state.selectedServices,
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
    const isSelected = state.selectedServices.includes(serviceId);
    
    if (isSelected) {
      updateState({
        selectedServices: state.selectedServices.filter(id => id !== serviceId),
        serviceVersions: Object.fromEntries(
          Object.entries(state.serviceVersions).filter(([id]) => id !== serviceId)
        )
      });
    } else {
      const service = services[serviceId];
      addToRecentServices(serviceId);
      
      updateState({
        selectedServices: [...state.selectedServices, serviceId],
        serviceVersions: service && service.defaultVersion 
          ? { ...state.serviceVersions, [serviceId]: service.defaultVersion }
          : state.serviceVersions
      });
    }
  };

  const getServiceForDirective = (directive: string, source: string): string | null => {
    for (const serviceId of state.selectedServices) {
      const service = services[serviceId];
      if (!service) return null;
      const version = state.serviceVersions[serviceId] || service.defaultVersion;
      const csp = service.versions[version]?.csp;
      
      if (csp && csp[directive as keyof typeof csp]?.includes(source)) {
        return serviceId;
      }
    }
    return null;
  };

  // Get services by category for quick access
  const servicesByCategory = useMemo(() => {
    const categorized: Record<string, ServiceDefinition[]> = {};
    Object.values(services).forEach(service => {
      if (!categorized[service.category]) {
        categorized[service.category] = [];
      }
      categorized[service.category]?.push(service);
    });
    return categorized;
  }, [services]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section with Enhanced Search */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Generate CSP Headers Instantly
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Select services, get production-ready Content Security Policy headers. 
          Protect your website from XSS attacks with zero configuration.
        </p>

        {/* Enhanced Search Bar */}
        <EnhancedSearch
          services={services}
          selectedServices={state.selectedServices}
          onServiceSelect={handleServiceSelection}
          className="max-w-2xl mx-auto"
          showRecentServices={true}
        />
      </div>

      {/* Main Layout */}
      <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Left Column - Quick Access & Options */}
        <div className="space-y-6">
          {/* Category Quick Access (replacing Popular Services) */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Bookmark className="h-5 w-5 text-primary" />
                    Quick Start by Category
                  </CardTitle>
                  <CardDescription>
                    Browse services by type to get started faster
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CATEGORY_CARDS.map(category => {
                  const Icon = category.icon;
                  const categoryServices = servicesByCategory[category.id] || [];
                  
                  return (
                    <div
                      key={category.id}
                      className={`group cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md ${category.color}`}
                      onClick={() => {
                        // Navigate to services page with category filter
                        router.push(`/services?category=${category.id}`);
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="h-5 w-5 mt-0.5 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm mb-1">
                            {category.title}
                          </div>
                          <p className="text-xs opacity-80 mb-2">
                            {category.description}
                          </p>
                          <div className="text-xs opacity-70">
                            {categoryServices.length} service{categoryServices.length !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Advanced Options in Accordions */}
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
                {/* Custom CSP Rules */}
                <AccordionItem value="custom-rules">
                  <AccordionTrigger>Custom CSP Rules</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Add custom domains and rules for each CSP directive
                      </p>
                      {Object.entries(state.customRules).map(([directive, value]) => (
                        <div key={directive} className="space-y-2">
                          <Label htmlFor={directive} className="text-sm font-mono">
                            {directive}
                          </Label>
                          <Input
                            id={directive}
                            placeholder="https://example.com, 'self'"
                            value={value}
                            onChange={(e) => updateState({
                              customRules: {
                                ...state.customRules,
                                [directive]: e.target.value
                              }
                            })}
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

                {/* Security Options */}
                <AccordionItem value="security-options">
                  <AccordionTrigger>Security Options</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Generate Nonce</Label>
                          <p className="text-xs text-muted-foreground">
                            Generate a unique nonce for inline scripts
                          </p>
                        </div>
                        <Switch 
                          checked={state.useNonce} 
                          onCheckedChange={(checked) => updateState({ useNonce: checked })} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="report-uri">Report URI (optional)</Label>
                        <Input
                          id="report-uri"
                          type="url"
                          placeholder="https://your-site.com/csp-report"
                          value={state.reportUri}
                          onChange={(e) => updateState({ reportUri: e.target.value })}
                        />
                        <p className="text-xs text-muted-foreground">
                          CSP violations will be reported to this endpoint
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Selected Services & Results */}
        <div className="space-y-6">
          {/* Selected Services */}
          {state.selectedServices.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Selected Services ({state.selectedServices.length})
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateState({ 
                      selectedServices: [], 
                      serviceVersions: {} 
                    })}
                  >
                    Clear all
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {state.selectedServices.map(serviceId => {
                    const service = services[serviceId];
                    if (!service) return null;
                    
                    return (
                      <div
                        key={serviceId}
                        className="flex items-center justify-between gap-3 rounded-lg border p-3 bg-primary/5"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                          <span className="font-medium text-sm truncate">
                            {service.name}
                          </span>
                          <Badge variant="outline" className="text-xs shrink-0">
                            v{state.serviceVersions[serviceId] || service.defaultVersion}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-destructive/20 text-destructive"
                          onClick={() => handleServiceSelection(serviceId)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* CSP Results */}
          {result ? (
            <>
              {/* CSP Header with Color Coding */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Your CSP Header
                  </CardTitle>
                  <CardDescription>
                    Ready to use in your HTTP headers or meta tag
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ColorCodedHeader
                    header={result.header}
                    directives={result.directives}
                    onCopy={() => copyToClipboard(result.header)}
                    copied={copied}
                  />
                  
                  {result.nonce && (
                    <div className="mt-4 pt-4 border-t">
                      <Label className="mb-2 block">Generated Nonce</Label>
                      <div className="bg-muted rounded-lg p-3 font-mono text-sm">
                        {result.nonce}
                      </div>
                    </div>
                  )}

                  {/* Usage Instructions */}
                  <Accordion type="single" collapsible className="mt-4">
                    <AccordionItem value="usage">
                      <AccordionTrigger>How to Use</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div>
                            <Label className="font-medium">HTTP Header</Label>
                            <div className="bg-muted rounded-lg p-3 mt-1">
                              <code className="text-sm">Content-Security-Policy: {result.header}</code>
                            </div>
                          </div>
                          
                          <div>
                            <Label className="font-medium">HTML Meta Tag</Label>
                            <div className="bg-muted rounded-lg p-3 mt-1">
                              <code className="text-sm break-all">
                                &lt;meta http-equiv=&quot;Content-Security-Policy&quot; content=&quot;{result.header}&quot;&gt;
                              </code>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
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
                  <div className="space-y-3">
                    {Object.entries(result.directives).map(([directive, sources]) => (
                      <div key={directive} className="space-y-2">
                        <div
                          className="flex items-center gap-2 cursor-pointer"
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
                          <span className="text-xs text-muted-foreground">
                            {sources.length} source{sources.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <div className="grid gap-1 ml-4">
                          {sources.map((source, index) => {
                            const serviceId = getServiceForDirective(directive, source);
                            const service = serviceId ? services[serviceId] : null;
                            
                            return (
                              <div 
                                key={index} 
                                className={`flex items-center justify-between text-xs p-2 rounded border transition-colors ${
                                  hoveredDirective === directive && service
                                    ? 'bg-primary/5 border-primary/20'
                                    : 'bg-muted/50'
                                }`}
                              >
                                <code className="font-mono text-xs">{source}</code>
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
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Shield className="mx-auto mb-4 h-16 w-16 text-muted-foreground/50" />
                <h3 className="text-lg font-medium mb-2">Ready to Generate CSP</h3>
                <p className="text-muted-foreground mb-4">
                  Search for services above or browse by category to get started.
                </p>
                <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <Info className="h-4 w-4" />
                  <span>Your CSP will update automatically as you select services</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}