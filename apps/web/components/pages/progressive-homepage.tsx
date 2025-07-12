'use client';

import { useState, useEffect } from 'react';
import { type CSPService } from '@csp-kit/data';
import * as allServices from '@csp-kit/data';
import { generateCSP } from '@csp-kit/generator';
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SimpleSearch } from '@/components/search/simple-search';
import { ColorCodedHeader } from '@/components/csp/color-coded-header';
import { UsageMethods } from '@/components/csp/usage-methods';
import { useSelectedServices } from '@/contexts/selected-services-context';
import { InfoTooltip } from '@/components/ui/info-tooltip';

// Filter to get only service objects
const servicesList = Object.entries(allServices)
  .filter(([key, value]) => 
    typeof value === 'object' && 
    value !== null && 
    'id' in value &&
    key !== 'defineService' &&
    key !== 'isCSPService' &&
    key !== 'createConfigurableService'
  )
  .map(([, service]) => service as CSPService);

// Common use-case scenarios for better UX
const SCENARIO_CARDS = [
  {
    id: 'blog-analytics',
    title: 'Blog with Analytics',
    description: 'Personal blog with Google Analytics tracking',
    icon: TrendingUp,
    color:
      'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
    services: ['google-analytics', 'google-fonts'],
  },
  {
    id: 'ecommerce-store',
    title: 'E-commerce Store',
    description: 'Online store with payments and tracking',
    icon: Shield,
    color:
      'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
    services: ['stripe', 'google-analytics', 'google-tag-manager', 'facebook-pixel'],
  },
  {
    id: 'marketing-landing',
    title: 'Marketing Landing Page',
    description: 'High-converting page with social tracking',
    icon: Users,
    color:
      'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800',
    services: ['facebook-pixel', 'google-analytics', 'hotjar', 'linkedin-insights'],
  },
  {
    id: 'saas-dashboard',
    title: 'SaaS Dashboard',
    description: 'Web app with user analytics and CDN',
    icon: Layers,
    color:
      'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800',
    services: ['mixpanel', 'amplitude', 'google-fonts'],
  },
];

export default function ProgressiveHomepage() {
  const { selectedServices, addService, removeService, clearServices } =
    useSelectedServices();
  const [copiedHeader, setCopiedHeader] = useState(false);

  // State management
  const [useNonce, setUseNonce] = useState(false);
  const [reportUri, setReportUri] = useState('');
  const [additionalRules, setAdditionalRules] = useState<Record<string, string[]>>({
    'script-src': [],
    'style-src': [],
    'img-src': [],
    'connect-src': [],
    'font-src': [],
    'frame-src': [],
    'media-src': [],
    'object-src': [],
  });

  const [customRuleToggles, setCustomRuleToggles] = useState<Record<string, boolean>>({
    'script-src': false,
    'style-src': false,
    'img-src': false,
    'connect-src': false,
    'font-src': false,
    'frame-src': false,
    'media-src': false,
    'object-src': false,
  });

  // Generate CSP
  const [generatedCSP, setGeneratedCSP] = useState<ReturnType<typeof generateCSP> | null>(null);
  const [, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Calculate active custom rules
  const activeCustomRules = Object.entries(additionalRules).reduce(
    (acc, [key, value]) => {
      if (customRuleToggles[key] && value.length > 0) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, string[]>
  );

  // Generate CSP whenever settings change
  useEffect(() => {
    if (selectedServices.length === 0) {
      setGeneratedCSP(null);
      return;
    }

    const generateNewCSP = () => {
      setIsGenerating(true);
      setGenerationError(null);

      try {
        const result = generateCSP({
          services: selectedServices,
          nonce: useNonce,
          additionalRules: activeCustomRules,
          reportUri: reportUri || undefined,
        });
        setGeneratedCSP(result);
      } catch (error) {
        console.error('Error generating CSP:', error);
        setGenerationError(error instanceof Error ? error.message : 'Failed to generate CSP');
      } finally {
        setIsGenerating(false);
      }
    };

    generateNewCSP();
  }, [selectedServices, useNonce, activeCustomRules, reportUri]);

  // Toggle custom rule
  const toggleCustomRule = (directive: string) => {
    setCustomRuleToggles((prev) => ({ ...prev, [directive]: !prev[directive] }));
  };

  // Update custom rule
  const updateCustomRule = (directive: string, value: string) => {
    const values = value.split(/[\s,]+/).filter(Boolean);
    setAdditionalRules((prev) => ({ ...prev, [directive]: values }));
  };

  // Load scenario
  const loadScenario = (scenarioServices: string[]) => {
    clearServices();
    scenarioServices.forEach((serviceId) => {
      const service = servicesList.find((s) => s.id === serviceId);
      if (service) {
        addService(service);
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Shield className="h-12 w-12 text-primary" />
          <h1 className="text-4xl font-bold">CSP Kit Generator</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          Generate Content Security Policy headers by selecting the services you use.
          We handle the complexity so you can focus on building.
        </p>
        <Badge variant="secondary" className="text-sm py-1 px-3">
          106+ services • TypeScript-first • Tree-shakeable
        </Badge>
      </div>

      {/* Common Scenarios */}
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Quick Start Templates</h2>
          <p className="text-muted-foreground">
            Select a common scenario or search for individual services below
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SCENARIO_CARDS.map((scenario) => (
            <Card
              key={scenario.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${scenario.color}`}
              onClick={() => loadScenario(scenario.services)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <scenario.icon className="h-5 w-5" />
                  <Zap className="h-4 w-4 opacity-50" />
                </div>
                <CardTitle className="text-lg">{scenario.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">{scenario.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Service Search */}
      <SimpleSearch services={servicesList} />

      {/* Selected Services */}
      {selectedServices.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Selected Services ({selectedServices.length})
            </h3>
            <Button onClick={clearServices} variant="ghost" size="sm">
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedServices.map((service) => (
              <Badge key={service.id} variant="secondary" className="py-1 px-3">
                {service.name}
                <button
                  onClick={() => removeService(service)}
                  className="ml-2 hover:text-destructive"
                  aria-label={`Remove ${service.name}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Advanced Options */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="advanced">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Advanced Options</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-6 pt-4">
            {/* Nonce Option */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Label htmlFor="use-nonce" className="cursor-pointer">
                  Use Cryptographic Nonce
                </Label>
                <InfoTooltip content="A nonce (number used once) adds an extra layer of security by requiring inline scripts to include a matching nonce value. Recommended for enhanced security." />
              </div>
              <Switch
                id="use-nonce"
                checked={useNonce}
                onCheckedChange={setUseNonce}
                aria-label="Toggle nonce usage"
              />
            </div>

            {/* Report URI */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="report-uri">Report URI</Label>
                <InfoTooltip content="Endpoint where browsers will send CSP violation reports. Useful for monitoring policy violations in production." />
              </div>
              <Input
                id="report-uri"
                type="url"
                placeholder="https://your-site.com/csp-report"
                value={reportUri}
                onChange={(e) => setReportUri(e.target.value)}
              />
            </div>

            {/* Custom Rules */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium">Additional Rules</h4>
                <InfoTooltip content="Add custom domains to specific CSP directives. Use this for services not in our database or custom domains." />
              </div>
              {Object.entries(additionalRules).map(([directive, value]) => (
                <div key={directive} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`custom-${directive}`} className="text-sm">
                      {directive}
                    </Label>
                    <Switch
                      id={`toggle-${directive}`}
                      checked={customRuleToggles[directive] || false}
                      onCheckedChange={() => toggleCustomRule(directive)}
                      aria-label={`Toggle ${directive}`}
                    />
                  </div>
                  {customRuleToggles[directive] && (
                    <Input
                      id={`custom-${directive}`}
                      placeholder="https://example.com, https://api.example.com"
                      value={value.join(', ')}
                      onChange={(e) => updateCustomRule(directive, e.target.value)}
                      className="text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Generated CSP */}
      {generatedCSP && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Generated CSP</h2>
            {generatedCSP.warnings && generatedCSP.warnings.length > 0 && (
              <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {generatedCSP.warnings.length} Warning{generatedCSP.warnings.length > 1 ? 's' : ''}
              </Badge>
            )}
          </div>

          {/* Warnings */}
          {generatedCSP.warnings && generatedCSP.warnings.length > 0 && (
            <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <span>Security Warnings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  {generatedCSP.warnings.map((warning, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-yellow-600">•</span>
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* CSP Header */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">CSP Header</CardTitle>
              <CardDescription>
                Copy this header and add it to your server configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ColorCodedHeader 
                header={generatedCSP.header} 
                directives={generatedCSP.directives as Record<string, string[]>}
                onCopy={() => {
                  navigator.clipboard.writeText(generatedCSP.header);
                  setCopiedHeader(true);
                  setTimeout(() => setCopiedHeader(false), 2000);
                }}
                copied={copiedHeader}
              />
            </CardContent>
          </Card>

          {/* Usage Methods */}
          <UsageMethods
            header={generatedCSP.header}
            directives={generatedCSP.directives as Record<string, string[]>}
            nonce={generatedCSP.nonce}
            selectedServices={selectedServices}
          />

          {/* Report-Only Mode */}
          {reportUri && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Info className="h-5 w-5" />
                  <span>Report-Only Mode</span>
                </CardTitle>
                <CardDescription>
                  Test your CSP without blocking resources by using the report-only header
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>Content-Security-Policy-Report-Only: {generatedCSP.reportOnlyHeader}</code>
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Empty State */}
      {selectedServices.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="text-center py-12">
            <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Services Selected</h3>
            <p className="text-muted-foreground mb-4">
              Select services from the templates above or search for specific services to generate
              your CSP header.
            </p>
            <Button
              variant="outline"
              onClick={() => loadScenario(['google-analytics', 'google-fonts'])}
            >
              <Bookmark className="h-4 w-4 mr-2" />
              Try Example Configuration
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {generationError && (
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              <span>Generation Error</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{generationError}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}