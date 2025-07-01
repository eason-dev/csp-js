'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
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
  Settings,
  Package,
  Github,
  Zap,
  Users,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ThemeToggle } from '@/components/theme-toggle';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';

interface CSPGeneratorClientProps {
  serviceRegistry: ServiceRegistry;
}

// Popular services to show initially (reduced to 6)
const POPULAR_SERVICES = [
  'google-analytics',
  'google-fonts',
  'stripe',
  'youtube',
  'facebook',
  'twitter'
];

export default function CSPGeneratorClient({ serviceRegistry }: CSPGeneratorClientProps) {
  const services = serviceRegistry.services;
  
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [serviceVersions, setServiceVersions] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
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

  const searchRef = useRef<HTMLDivElement>(null);

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

  // Search results for popup
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const results = fuse.search(searchQuery, { limit: 20 });
    return results.map(result => result.item);
  }, [searchQuery, fuse]);

  // Popular services list
  const popularServices = useMemo(() => {
    return POPULAR_SERVICES
      .map(id => services[id])
      .filter((service): service is ServiceDefinition => Boolean(service));
  }, [services]);

  // Generate CSP automatically when services change
  useEffect(() => {
    if (selectedServices.length > 0) {
      generateCurrentCSP();
    } else {
      setResult(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedServices, serviceVersions, useNonce, reportUri, customRules]);

  // Close search popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    
    // Close search popup after selection
    setShowSearchResults(false);
    setSearchQuery('');
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
    <div className="min-h-screen bg-background">
      {/* Header with Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">CSP Kit</h1>
            </div>
            <nav className="hidden md:flex items-center gap-4">
              <Link href="/services">
                <Button variant="ghost" size="sm">
                  <Package className="h-4 w-4 mr-2" />
                  All Services
                </Button>
              </Link>
              <Link href="/docs" target="_blank">
                <Button variant="ghost" size="sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Docs
                </Button>
              </Link>
              <ThemeToggle />
            </nav>
            <div className="md:hidden">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section with Prominent Search */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Generate CSP Headers Instantly
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Select services, get production-ready Content Security Policy headers. 
            Protect your website from XSS attacks with zero configuration.
          </p>

          {/* Prominent Search Bar */}
          <div className="max-w-2xl mx-auto relative" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search services (e.g., Google Analytics, Stripe, React)..."
                className="pl-12 pr-4 py-6 text-lg rounded-xl border-2 shadow-lg"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(e.target.value.trim().length > 0);
                }}
                onFocus={() => searchQuery.trim().length > 0 && setShowSearchResults(true)}
              />
            </div>

            {/* Search Results Popup */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto">
                <div className="p-2">
                  <div className="text-xs text-muted-foreground px-3 py-2">
                    {searchResults.length} service{searchResults.length !== 1 ? 's' : ''} found
                  </div>
                  {searchResults.map(service => {
                    const isSelected = selectedServices.includes(service.id);
                    const categoryDisplayName = service.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
                    
                    return (
                      <div
                        key={service.id}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                          isSelected 
                            ? 'bg-primary/10 border border-primary/20' 
                            : 'hover:bg-muted/50'
                        }`}
                        onClick={() => handleServiceSelection(service.id)}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium truncate">{service.name}</span>
                            <Badge variant="outline" className="text-xs shrink-0">
                              {categoryDisplayName}
                            </Badge>
                            {isSelected && (
                              <Badge variant="default" className="text-xs shrink-0">
                                Selected
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {service.description}
                          </p>
                        </div>
                        <div className="ml-3">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/service/${service.id}`} onClick={(e) => e.stopPropagation()}>
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Service Selection & Options */}
          <div className="space-y-6">
            {/* Popular Services */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      Popular Services
                    </CardTitle>
                    <CardDescription>
                      Quick start with commonly used services
                    </CardDescription>
                  </div>
                  <Link href="/services">
                    <Button variant="outline" size="sm">
                      <Package className="h-4 w-4 mr-2" />
                      View All {Object.keys(services).length}
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {popularServices.map(service => {
                    const isSelected = selectedServices.includes(service.id);
                    const categoryDisplayName = service.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
                    
                    return (
                      <div
                        key={service.id}
                        className={`group cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md ${
                          isSelected 
                            ? 'border-primary bg-primary/5 shadow-sm' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => handleServiceSelection(service.id)}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-sm truncate mb-1">
                              {service.name}
                            </div>
                            <Badge variant="outline" className="text-xs mb-2">
                              {categoryDisplayName}
                            </Badge>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {service.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {isSelected && (
                              <div className="h-2 w-2 rounded-full bg-primary" />
                            )}
                            <Link
                              href={`/service/${service.id}`}
                              onClick={(e) => e.stopPropagation()}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
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
                
                <div className="mt-4 pt-4 border-t text-center">
                  <Link href="/services">
                    <Button variant="ghost" size="sm" className="text-primary">
                      Browse all {Object.keys(services).length} services →
                    </Button>
                  </Link>
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
                        {Object.entries(customRules).map(([directive, value]) => (
                          <div key={directive} className="space-y-2">
                            <Label htmlFor={directive} className="text-sm font-mono">
                              {directive}
                            </Label>
                            <Input
                              id={directive}
                              placeholder="https://example.com, &apos;self&apos;"
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
                          <Switch checked={useNonce} onCheckedChange={setUseNonce} />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="report-uri">Report URI (optional)</Label>
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
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Selected Services & Results */}
          <div className="space-y-6">
            {/* Selected Services */}
            {selectedServices.length > 0 && (
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
                      onClick={() => {
                        setSelectedServices([]);
                        setServiceVersions({});
                      }}
                    >
                      Clear all
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedServices.map(serviceId => {
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
                              v{serviceVersions[serviceId] || service.defaultVersion}
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
                {/* CSP Header */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        Your CSP Header
                      </CardTitle>
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
                    <CardDescription>
                      Ready to use in your HTTP headers or meta tag
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted rounded-lg p-4 font-mono text-sm break-all">
                      {result.header}
                    </div>
                    
                    {result.nonce && (
                      <div>
                        <Label className="mb-2 block">Generated Nonce</Label>
                        <div className="bg-muted rounded-lg p-3 font-mono text-sm">
                          {result.nonce}
                        </div>
                      </div>
                    )}

                    {/* Usage Instructions */}
                    <Accordion type="single" collapsible>
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
                    Search for services above or select from popular options to get started.
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

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">CSP Kit</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The easiest way to generate Content Security Policy headers for your web applications.
              </p>
              <div className="flex gap-2">
                <a
                  href="https://github.com/eason-dev/csp-kit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Tools */}
            <div className="space-y-4">
              <h3 className="font-semibold">Tools</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground">
                    CSP Generator
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-muted-foreground hover:text-foreground">
                    All Services
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://www.npmjs.com/package/@csp-kit/generator" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    NPM Package
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h3 className="font-semibold">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/docs" className="text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <a
                    href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    CSP Reference
                  </a>
                </li>
                <li>
                  <a
                    href="https://content-security-policy.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    CSP Guide
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h3 className="font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://github.com/eason-dev/csp-kit/blob/main/LICENSE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    MIT License
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/eason-dev/csp-kit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Source Code
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 CSP Kit. Made with ❤️ for web security.
            </p>
            <p className="text-sm text-muted-foreground">
              Supporting {Object.keys(services).length} services and counting.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}