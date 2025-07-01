'use client';

import { ServiceDefinition } from '@csp-kit/generator';
import {
  Shield,
  ExternalLink,
  Calendar,
  Info,
  Code,
  BookOpen,
  Copy,
  Check,
  Plus,
  Minus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useSelectedServices } from '@/contexts/selected-services-context';
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
        version: service.defaultVersion,
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
  const defaultVersionData = service.versions[service.defaultVersion];

  // Generate sample code for CSP Kit usage
  const sampleCode = `// Install CSP Kit
npm install @csp-kit/generator

// Generate CSP for ${service.name}
import { generateCSP } from '@csp-kit/generator';

const result = await generateCSP({
  services: ['${service.id}'],
  nonce: true, // Optional: generate nonce for inline scripts
  customRules: {
    // Add your custom CSP rules here
  }
});

console.log(result.header);
// ${Object.entries(defaultVersionData?.csp || {})
    .map(([directive, sources]) => `${directive} ${(sources as string[]).join(' ')}`)
    .join('; ')}`;

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Service Header */}
          <div className="space-y-4 text-center">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <h1 className="text-4xl font-bold">{service.name}</h1>
              <Badge variant="secondary" className="text-sm">
                {categoryDisplayName}
              </Badge>
            </div>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">{service.description}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                onClick={handleToggleService}
                variant={serviceSelected ? "outline" : "default"}
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
              <CardContent className="space-y-4">
                {defaultVersionData &&
                  Object.entries(defaultVersionData.csp).map(([directive, sources]) => (
                    <div key={directive} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono text-xs">
                          {directive}
                        </Badge>
                      </div>
                      <div className="bg-muted space-y-1 rounded-lg p-3">
                        {(sources as string[]).map((source, index) => (
                          <div key={index} className="text-foreground font-mono text-sm">
                            {source}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* Quick Setup */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Quick Setup with CSP Kit
                </CardTitle>
                <CardDescription>Generate CSP headers automatically using CSP Kit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted relative rounded-lg p-4">
                    <pre className="overflow-x-auto text-sm">
                      <code>{sampleCode}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2"
                      onClick={() => copyToClipboard(sampleCode)}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
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

          {/* Version Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Version Information
              </CardTitle>
              <CardDescription>Available versions and their CSP requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(service.versions).map(([version, versionData]) => (
                  <div key={version} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant={version === service.defaultVersion ? 'default' : 'outline'}>
                        {version}
                        {version === service.defaultVersion && ' (Default)'}
                      </Badge>
                      <span className="text-muted-foreground text-sm">
                        Valid from {new Date(versionData.validFrom).toLocaleDateString()}
                      </span>
                      {versionData.deprecatedFrom && (
                        <span className="text-destructive text-sm">
                          Deprecated from{' '}
                          {new Date(versionData.deprecatedFrom).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    {versionData.notes && versionData.notes.length > 0 && (
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="mb-2 text-sm font-medium">Notes:</div>
                        <ul className="text-muted-foreground space-y-1 text-sm">
                          {versionData.notes.map((note, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-primary">•</span>
                              <span>{note}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {versionData.issues && versionData.issues.length > 0 && (
                      <div className="bg-destructive/5 border-destructive/20 rounded-lg border p-3">
                        <div className="text-destructive mb-2 text-sm font-medium">
                          Known Issues:
                        </div>
                        <ul className="text-muted-foreground space-y-1 text-sm">
                          {versionData.issues.map((issue, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-destructive">⚠</span>
                              <span>{issue}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {version !==
                      Object.keys(service.versions)[Object.keys(service.versions).length - 1] && (
                      <Separator />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          {(service.aliases ||
            defaultVersionData?.requiresDynamic ||
            defaultVersionData?.requiresNonce) && (
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

                {defaultVersionData?.requiresDynamic && (
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

                {defaultVersionData?.requiresNonce && (
                  <div className="flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-900/20">
                    <Info className="mt-0.5 h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <div className="text-sm">
                      <div className="font-medium text-blue-800 dark:text-blue-200">
                        Nonce Required
                      </div>
                      <div className="text-blue-700 dark:text-blue-300">
                        This service requires nonce-based CSP for inline scripts to function
                        properly.
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
