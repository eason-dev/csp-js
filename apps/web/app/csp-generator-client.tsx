'use client';

import { useState } from 'react';
import { type ServiceRegistry, type ServiceDefinition } from '@csp-kit/generator';
import {
  Copy,
  Check,
  Search,
  Shield,
  AlertTriangle,
  Settings,
  FileText,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CSPGeneratorClientProps {
  serviceRegistry: ServiceRegistry;
}

export default function CSPGeneratorClient({ serviceRegistry }: CSPGeneratorClientProps) {
  const services = serviceRegistry.services;
  
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [serviceVersions, setServiceVersions] = useState<Record<string, string>>({});
  const [customRules, setCustomRules] = useState('');
  const [reportUri, setReportUri] = useState('');
  const [useNonce, setUseNonce] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedServiceForDocs, setSelectedServiceForDocs] = useState<string | null>(null);
  const [result, setResult] = useState<{
    header: string;
    warnings: string[];
    includedServices: string[];
    unknownServices: string[];
    nonce?: string;
  } | null>(null);

  const steps = [
    { id: 'services', title: 'Select Services', icon: Shield },
    { id: 'configure', title: 'Configure Options', icon: Settings },
    { id: 'generate', title: 'Generate & Use', icon: FileText },
  ];

  // Client-side search implementation
  const searchServices = (query: string): ServiceDefinition[] => {
    const lowercaseQuery = query.toLowerCase();
    return Object.values(services).filter(
      service =>
        service.name.toLowerCase().includes(lowercaseQuery) ||
        service.description.toLowerCase().includes(lowercaseQuery) ||
        service.aliases?.some(alias => alias.toLowerCase().includes(lowercaseQuery))
    );
  };

  // Get service versions implementation
  const getServiceVersions = (serviceId: string): string[] => {
    const service = services[serviceId];
    return service ? Object.keys(service.versions) : [];
  };

  // Generate CSP when services change
  const generateCurrentCSP = async () => {
    try {
      let customRulesObj = {};
      if (customRules.trim()) {
        customRulesObj = JSON.parse(customRules);
      }

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
      setResult(cspResult);
    } catch (error) {
      console.error('Error generating CSP:', error);
      setResult({
        header: 'Error: Invalid custom rules JSON',
        warnings: ['Please check your custom rules format'],
        includedServices: [],
        unknownServices: selectedServices,
      });
    }
  };

  // Copy to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Handle service selection with version management
  const handleServiceSelection = (serviceId: string, checked: boolean) => {
    if (checked) {
      setSelectedServices(prev => [...prev, serviceId]);
      // Set default version when service is selected
      const service = services[serviceId];
      if (service?.defaultVersion) {
        setServiceVersions(prev => ({
          ...prev,
          [serviceId]: service.defaultVersion,
        }));
      }
    } else {
      setSelectedServices(prev => prev.filter(id => id !== serviceId));
      // Remove version when service is deselected
      setServiceVersions(prev => {
        const newVersions = { ...prev };
        delete newVersions[serviceId];
        return newVersions;
      });
    }
  };

  // Handle version change for a service
  const handleVersionChange = (serviceId: string, version: string) => {
    setServiceVersions(prev => ({
      ...prev,
      [serviceId]: version,
    }));
  };

  // Filter services based on search
  const filteredServices = searchQuery ? searchServices(searchQuery) : Object.values(services);

  const renderServiceDocs = (service: ServiceDefinition) => (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          {service.name} Documentation
        </CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {service.officialDocs?.length > 0 && (
          <div>
            <Label className="text-sm font-medium">Official Documentation</Label>
            <div className="mt-1 space-y-1">
              {service.officialDocs.map(docUrl => (
                <a
                  key={docUrl}
                  href={docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                >
                  View Docs <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>
        )}

        <div>
          <Label className="text-sm font-medium">CSP Requirements</Label>
          <div className="mt-2 space-y-2">
            {Object.entries(service.versions[service.defaultVersion]?.csp || {}).map(
              ([directive, sources]) => (
                <div key={directive} className="text-sm">
                  <span className="text-primary font-mono">{directive}:</span>
                  <div className="text-muted-foreground ml-4">
                    {(sources as string[]).map((source: string) => (
                      <div key={source} className="font-mono">
                        • {source}
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Shield className="text-primary h-8 w-8" />
            <h1 className="text-4xl font-bold">CSP Generator</h1>
          </div>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Generate Content Security Policy headers for popular web services and libraries. Secure
            your website with just a few clicks.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8 flex items-center justify-center">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : isCompleted
                          ? 'bg-secondary text-secondary-foreground'
                          : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight className="text-muted-foreground mx-2 h-5 w-5" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-4xl">
          {currentStep === 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Select Services</CardTitle>
                <CardDescription>
                  Choose the web services and libraries you&apos;re using on your website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="relative">
                  <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                  <Input
                    placeholder="Search services..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSearchQuery(e.target.value)
                    }
                  />
                </div>

                {/* Selected Services */}
                {selectedServices.length > 0 && (
                  <div>
                    <Label className="mb-2 block text-sm font-medium">
                      Selected Services ({selectedServices.length})
                    </Label>
                    <div className="space-y-2">
                      {selectedServices.map(serviceId => {
                        const service = services[serviceId];
                        const availableVersions = getServiceVersions(serviceId);
                        const currentVersion =
                          serviceVersions[serviceId] || service?.defaultVersion;

                        return (
                          <div
                            key={serviceId}
                            className="bg-muted/50 flex items-center justify-between gap-3 rounded-lg border p-3"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">
                                {service?.name || serviceId}
                              </span>
                              <span className="text-muted-foreground text-xs">
                                v{currentVersion}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {availableVersions.length > 1 && (
                                <Select
                                  value={currentVersion}
                                  onValueChange={version => handleVersionChange(serviceId, version)}
                                >
                                  <SelectTrigger className="h-6 w-24 text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {availableVersions.map(version => (
                                      <SelectItem key={version} value={version} className="text-xs">
                                        {version}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-destructive/20 text-destructive h-6 w-6 p-0"
                                onClick={() => handleServiceSelection(serviceId, false)}
                              >
                                ×
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* All Services */}
                <div className="space-y-3">
                  {filteredServices.map(service => (
                    <div
                      key={service.id}
                      className="hover:bg-muted/50 flex items-start gap-3 rounded-lg border p-4"
                    >
                      <Checkbox
                        checked={selectedServices.includes(service.id)}
                        onCheckedChange={(checked: boolean) =>
                          handleServiceSelection(service.id, checked)
                        }
                      />
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <div className="font-medium">{service.name}</div>
                          <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                            {service.category.replace('_', ' ')}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10">
                            {getServiceVersions(service.id).length} version
                            {getServiceVersions(service.id).length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <div className="text-muted-foreground mb-2 text-sm">
                          {service.description}
                        </div>
                        <div className="text-muted-foreground mb-2 text-xs">
                          Default: v{service.defaultVersion} • Available:{' '}
                          {getServiceVersions(service.id).join(', ')}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary h-auto p-0 text-xs hover:bg-transparent"
                          onClick={() =>
                            setSelectedServiceForDocs(
                              selectedServiceForDocs === service.id ? null : service.id
                            )
                          }
                        >
                          {selectedServiceForDocs === service.id ? 'Hide' : 'Show'} Documentation
                        </Button>
                        {selectedServiceForDocs === service.id && renderServiceDocs(service)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => setCurrentStep(1)}
                    disabled={selectedServices.length === 0}
                    className="flex items-center gap-2"
                  >
                    Next: Configure Options
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Configure Options</CardTitle>
                <CardDescription>
                  Customize your CSP with additional security options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Switch checked={useNonce} onCheckedChange={setUseNonce} />
                  <Label>Generate nonce for inline scripts</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="report-uri">Report URI (optional)</Label>
                  <Input
                    id="report-uri"
                    type="url"
                    placeholder="https://your-site.com/csp-report"
                    value={reportUri}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setReportUri(e.target.value)
                    }
                  />
                  <div className="text-muted-foreground text-xs">
                    CSP violations will be reported to this endpoint
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-rules">Custom Rules (JSON)</Label>
                  <textarea
                    id="custom-rules"
                    placeholder='{"script-src": ["https://custom-domain.com"]}'
                    className="border-input bg-background min-h-[100px] w-full rounded-md border px-3 py-2 font-mono text-sm"
                    value={customRules}
                    onChange={e => setCustomRules(e.target.value)}
                  />
                  <div className="text-muted-foreground text-xs">
                    Add custom CSP directives in JSON format
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(0)}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    onClick={async () => {
                      await generateCurrentCSP();
                      setCurrentStep(2);
                    }}
                    className="flex items-center gap-2"
                  >
                    Generate CSP
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Generated CSP</CardTitle>
                <CardDescription>Your Content Security Policy is ready to use</CardDescription>
              </CardHeader>
              <CardContent>
                {result ? (
                  <Tabs defaultValue="header" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="header">CSP Header</TabsTrigger>
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="usage">How to Use</TabsTrigger>
                    </TabsList>

                    <TabsContent value="header" className="space-y-4">
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <Label>CSP Header</Label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(result.header)}
                            className="flex items-center gap-1"
                          >
                            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            {copied ? 'Copied' : 'Copy'}
                          </Button>
                        </div>
                        <div className="bg-muted break-all rounded-lg p-3 font-mono text-sm">
                          {result.header}
                        </div>
                      </div>

                      {result.nonce && (
                        <div>
                          <Label className="mb-2 block">Generated Nonce</Label>
                          <div className="bg-muted rounded-lg p-3 font-mono text-sm">
                            {result.nonce}
                          </div>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="details" className="space-y-4">
                      {result.warnings?.length > 0 && (
                        <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 dark:bg-orange-950">
                          <div className="mb-2 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-orange-600" />
                            <Label className="text-orange-800 dark:text-orange-200">Warnings</Label>
                          </div>
                          {result.warnings.map((warning: string) => (
                            <div
                              key={warning}
                              className="text-sm text-orange-700 dark:text-orange-300"
                            >
                              • {warning}
                            </div>
                          ))}
                        </div>
                      )}

                      <div>
                        <Label className="mb-2 block">Services</Label>
                        <div className="space-y-1 text-sm">
                          <div className="text-green-600 dark:text-green-400">
                            ✓ Included: {result.includedServices?.join(', ') || 'None'}
                          </div>
                          {result.unknownServices?.length > 0 && (
                            <div className="text-red-600 dark:text-red-400">
                              ✗ Unknown: {result.unknownServices.join(', ')}
                            </div>
                          )}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="usage" className="space-y-4">
                      <div>
                        <Label className="mb-2 block font-medium">HTTP Header</Label>
                        <div className="bg-muted rounded-lg p-3">
                          <code className="text-sm">Content-Security-Policy: {result.header}</code>
                        </div>
                      </div>

                      <div>
                        <Label className="mb-2 block font-medium">HTML Meta Tag</Label>
                        <div className="bg-muted rounded-lg p-3">
                          <code className="break-all text-sm">
                            &lt;meta http-equiv=&quot;Content-Security-Policy&quot; content=&quot;
                            {result.header}&quot;&gt;
                          </code>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="text-muted-foreground py-12 text-center">
                    <Shield className="mx-auto mb-3 h-12 w-12 opacity-50" />
                    <p>Generating your CSP header...</p>
                  </div>
                )}

                <Separator className="my-6" />

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back to Options
                  </Button>
                  <Button
                    onClick={() => {
                      setCurrentStep(0);
                      setResult(null);
                    }}
                    variant="outline"
                  >
                    Start Over
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer */}
        <footer className="text-muted-foreground mt-12 text-center text-sm">
          <p>
            Powered by{' '}
            <a href="https://github.com/eason-dev/csp-kit" className="text-primary hover:underline">
              csp-kit
            </a>
            {' • '}
            <a href="https://github.com/eason-dev/csp-kit" className="text-primary hover:underline">
              GitHub
            </a>
            {' • '}
            <a href="/docs" className="text-primary hover:underline">
              Documentation
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}