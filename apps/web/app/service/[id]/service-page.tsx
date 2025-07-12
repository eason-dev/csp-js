'use client';

import { type CSPService } from '@csp-kit/data';
import { generateCSP } from '@csp-kit/generator';
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
  Copy,
  Check,
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
  service: CSPService;
}

// Category colors
const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    analytics: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    payment: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    social: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    video: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    cdn: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    fonts: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
    monitoring: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    chat: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
    other: 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300',
  };
  return colors[category] || colors.other;
};

export default function ServicePage({ service }: ServicePageProps) {
  const [copied, setCopied] = useState(false);
  const { addService, removeService, isSelected } = useSelectedServices();

  const serviceSelected = isSelected(service.id);

  const handleToggleService = () => {
    if (serviceSelected) {
      removeService(service);
    } else {
      addService(service);
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

  // Generate CSP header for this service only
  const { header, directives } = generateCSP([service]);

  // Format date
  const lastUpdated = new Date(service.lastUpdated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/services"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          All Services
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">{service.name}</h1>
            <p className="text-xl text-muted-foreground">{service.description}</p>
            <div className="flex items-center gap-4 mt-4">
              <Badge variant="secondary" className={getCategoryColor(service.category)}>
                {service.category}
              </Badge>
              <code className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                {service.id}
              </code>
              <span className="text-sm text-muted-foreground flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Updated {lastUpdated}
              </span>
            </div>
          </div>
          <Button
            size="lg"
            variant={serviceSelected ? 'secondary' : 'default'}
            onClick={handleToggleService}
          >
            {serviceSelected ? (
              <>
                <Minus className="h-4 w-4 mr-2" />
                Remove from Policy
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add to Policy
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Service Information */}
      <div className="grid gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="h-5 w-5 mr-2" />
              Service Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Website</span>
              <Link
                href={service.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center"
              >
                {service.website}
                <ExternalLink className="h-3 w-3 ml-1" />
              </Link>
            </div>
            {service.officialDocs && service.officialDocs.length > 0 && (
              <div>
                <span className="text-sm font-medium block mb-2">Official Documentation</span>
                <ul className="space-y-1">
                  {service.officialDocs.map((doc, index) => (
                    <li key={index}>
                      <Link
                        href={doc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center text-sm"
                      >
                        <BookOpen className="h-3 w-3 mr-1" />
                        {doc}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {service.notes && (
              <div>
                <span className="text-sm font-medium block mb-2">Additional Notes</span>
                <p className="text-sm text-muted-foreground">{service.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* CSP Directives */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              CSP Directives
            </CardTitle>
            <CardDescription>
              Content Security Policy directives required for {service.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(service.directives).map(([directive, values]) => (
              <div key={directive}>
                <span className="text-sm font-medium">{directive}</span>
                <div className="mt-1 space-y-1">
                  {values.map((value: string, index: number) => (
                    <code
                      key={index}
                      className="text-xs bg-muted px-2 py-1 rounded inline-block mr-2 mb-1"
                    >
                      {value}
                    </code>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Generated CSP Header */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Code className="h-5 w-5 mr-2" />
                Generated CSP Header
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(header)}
              >
                {copied ? (
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
            </CardTitle>
            <CardDescription>
              Complete CSP header for {service.name} only
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ColorCodedHeader 
              header={header} 
              directives={directives as Record<string, string[]>}
              onCopy={() => copyToClipboard(header)}
              copied={copied}
            />
          </CardContent>
        </Card>

        {/* Usage Examples */}
        <UsageMethods
          header={header}
          directives={directives as Record<string, string[]>}
          selectedServices={[service]}
        />
      </div>
    </div>
  );
}