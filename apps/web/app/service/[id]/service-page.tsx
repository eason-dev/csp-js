'use client';

import { ServiceDefinition } from '@csp-kit/generator';
import {
  Shield,
  ExternalLink,
  Calendar,
  Info,
  Code,
  BookOpen,
  Plus,
  Minus,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSelectedServices } from '@/contexts/selected-services-context';
import { ColorCodedHeader } from '@/components/csp/color-coded-header';
import { UsageMethods } from '@/components/csp/usage-methods';
import Link from 'next/link';
import { useState } from 'react';

interface ServicePageProps {
  service: ServiceDefinition;
}

export default function ServicePage({ service }: ServicePageProps) {
  const [copied, setCopied] = useState(false);
  const { addService, removeService, isSelected } = useSelectedServices();

  const serviceSelected = isSelected(service.id);

  const handleToggleService = () => {
    if (serviceSelected) {
      removeService(service.id);
    } else {
      addService({
        id: service.id,
        name: service.name,
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

  const categoryDisplayName = service.category
    .replace('_', ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
  // Generate CSP header for this service
  const generateServiceCSP = () => {
    if (!service.cspDirectives) return '';
    return Object.entries(service.cspDirectives)
      .map(([directive, sources]) => `${directive} ${(sources as string[]).join(' ')}`)
      .join('; ');
  };

  const cspHeader = generateServiceCSP();

  // Parse CSP into directives object for color coding
  const directives: Record<string, string[]> = {};
  if (service.cspDirectives) {
    Object.entries(service.cspDirectives).forEach(([directive, sources]) => {
      directives[directive] = sources as string[];
    });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Go Back Button - Aligned to left edge */}
      <Link href="/services">
        <Button variant="ghost" className="mb-8 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to All Services
        </Button>
      </Link>

      <div className="mx-auto max-w-4xl space-y-8">
        {/* Service Header */}
        <div className="space-y-4 text-center">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold">{service.name}</h1>
            <Badge variant="secondary" className="text-sm">
              {categoryDisplayName}
            </Badge>
          </div>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">{service.description}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              onClick={handleToggleService}
              variant={serviceSelected ? 'outline' : 'default'}
              size="lg"
              className="flex items-center gap-2"
            >
              {serviceSelected ? (
                <>
                  <Minus className="h-4 w-4" />
                  Remove from List
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Add to My List
                </>
              )}
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <a
              href={service.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary flex items-center gap-2 hover:underline"
            >
              Official Website <ExternalLink className="h-4 w-4" />
            </a>
            <span className="text-muted-foreground">•</span>
            <div className="text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Updated {new Date(service.lastUpdated).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* CSP Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                CSP Configuration
              </CardTitle>
              <CardDescription>
                Content Security Policy directives required for {service.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {cspHeader && (
                <ColorCodedHeader
                  header={cspHeader}
                  directives={directives}
                  onCopy={() => copyToClipboard(cspHeader)}
                  copied={copied}
                  showBreakdown={true}
                />
              )}
            </CardContent>
          </Card>

          {/* Implementation Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Implementation Methods
              </CardTitle>
              <CardDescription>Different ways to use this CSP configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <UsageMethods
                cspHeader={cspHeader}
                serviceIds={[service.id]}
                useNonce={false}
                reportUri=""
                customRules={{}}
              />
              <div className="mt-4">
                <Link href="/">
                  <Button className="w-full">Try Interactive Generator</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documentation & Resources */}
        {service.officialDocs && service.officialDocs.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Official Documentation
              </CardTitle>
              <CardDescription>
                Official CSP documentation and guides from {service.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {service.officialDocs.map((docUrl, index) => (
                  <a
                    key={index}
                    href={docUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-muted flex items-center gap-2 rounded-lg border p-3 transition-colors"
                  >
                    <ExternalLink className="text-primary h-4 w-4" />
                    <span className="text-sm font-medium">View Documentation</span>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Service Notes */}
        {service.notes && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Service Notes
              </CardTitle>
              <CardDescription>Important information about this service</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="whitespace-pre-line text-sm">{service.notes}</div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Additional Information */}
        {(service.aliases || service.requiresDynamic || service.requiresNonce) && (
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {service.aliases && service.aliases.length > 0 && (
                <div>
                  <div className="mb-2 text-sm font-medium">Alternative Names:</div>
                  <div className="flex flex-wrap gap-2">
                    {service.aliases.map(alias => (
                      <Badge key={alias} variant="outline" className="text-xs">
                        {alias}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {service.requiresDynamic && (
                <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-900/20">
                  <Info className="mt-0.5 h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <div className="text-sm">
                    <div className="font-medium text-amber-800 dark:text-amber-200">
                      Dynamic CSP Required
                    </div>
                    <div className="text-amber-700 dark:text-amber-300">
                      This service may inject scripts dynamically and require runtime CSP
                      adjustments.
                    </div>
                  </div>
                </div>
              )}

              {service.requiresNonce && (
                <div className="flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-900/20">
                  <Info className="mt-0.5 h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <div className="text-sm">
                    <div className="font-medium text-blue-800 dark:text-blue-200">
                      Nonce Required
                    </div>
                    <div className="text-blue-700 dark:text-blue-300">
                      This service requires nonce-based CSP for inline scripts to function properly.
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
