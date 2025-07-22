'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Check, Eye, EyeOff } from 'lucide-react';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import type { CSPDirectives } from '@csp-kit/generator';

interface ColorCodedHeaderProps {
  header: string;
  directives: Record<string, string[]>;
  onCopy: () => void;
  copied: boolean;
  showBreakdown?: boolean;
  serviceTags?: {
    serviceId: string;
    serviceName: string;
  }[];
  serviceDetails?: {
    serviceId: string;
    serviceName: string;
    cspDirectives: CSPDirectives;
  }[];
}

// Accessibility-friendly color scheme with good contrast ratios
const DIRECTIVE_COLORS = {
  'script-src':
    'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
  'style-src':
    'bg-blue-100 text-blue-800 border-blue-200 dark:bg-zinc-900/20 dark:text-sky-300 dark:border-zinc-800',
  'img-src':
    'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
  'connect-src':
    'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800',
  'font-src':
    'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800',
  'frame-src':
    'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900/20 dark:text-teal-300 dark:border-teal-800',
  'media-src':
    'bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-800',
  'object-src':
    'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800',
  'worker-src':
    'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800',
  'child-src':
    'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800',
  'manifest-src':
    'bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-300 dark:border-cyan-800',
  'form-action':
    'bg-lime-100 text-lime-800 border-lime-200 dark:bg-lime-900/20 dark:text-lime-300 dark:border-lime-800',
  'report-uri':
    'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-900/20 dark:text-slate-300 dark:border-slate-800',
  'report-to':
    'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-900/20 dark:text-slate-300 dark:border-slate-800',
  default:
    'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800',
};

// Common CSP keywords that should be styled differently
const CSP_KEYWORDS = [
  "'self'",
  "'none'",
  "'unsafe-inline'",
  "'unsafe-eval'",
  "'strict-dynamic'",
  "'nonce-",
  "'sha256-",
  "'sha384-",
  "'sha512-",
];

// Service URL patterns for matching URLs to their source services
const SERVICE_URL_PATTERNS: Record<string, string[]> = {
  'google-analytics': ['google-analytics.com', 'googletagmanager.com'],
  'google-fonts': ['fonts.googleapis.com', 'fonts.gstatic.com'],
  auth0: ['cdn.auth0.com', 'auth0.com'],
  'apple-pay': ['applepay.cdn-apple.com'],
  'azure-cdn': ['azureedge.net', 'azure.com'],
  cloudflare: ['cloudflare.com', 'cf-assets.com'],
  stripe: ['stripe.com', 'stripe.network'],
  paypal: ['paypal.com', 'paypalobjects.com'],
  facebook: ['facebook.com', 'fbcdn.net', 'connect.facebook.net'],
  twitter: ['twitter.com', 'twimg.com'],
  linkedin: ['linkedin.com', 'licdn.com'],
  youtube: ['youtube.com', 'ytimg.com', 'googlevideo.com'],
  jsdelivr: ['jsdelivr.net', 'cdn.jsdelivr.net'],
  unpkg: ['unpkg.com'],
  cdnjs: ['cdnjs.cloudflare.com'],
  bootstrap: ['bootstrapcdn.com', 'getbootstrap.com'],
  jquery: ['jquery.com', 'code.jquery.com'],
  algolia: ['algolia.net', 'algolianet.com'],
};

// CSP directive descriptions and documentation links
const DIRECTIVE_INFO = {
  'script-src': {
    description:
      'Controls which scripts can be executed. Protects against XSS attacks by preventing unauthorized JavaScript execution.',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src',
  },
  'style-src': {
    description:
      'Controls which stylesheets can be loaded. Prevents CSS injection attacks and unauthorized styling.',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src',
  },
  'img-src': {
    description:
      'Controls which images can be loaded. Prevents data exfiltration through malicious images.',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/img-src',
  },
  'connect-src': {
    description:
      'Controls which URLs can be loaded using script interfaces (fetch, XMLHttpRequest, WebSocket). Prevents unauthorized API calls.',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/connect-src',
  },
  'font-src': {
    description:
      'Controls which fonts can be loaded. Prevents unauthorized font downloads that could be used for tracking.',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/font-src',
  },
  'frame-src': {
    description:
      'Controls which URLs can be embedded as frames. Prevents clickjacking and unauthorized iframe embedding.',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-src',
  },
  'media-src': {
    description:
      'Controls which audio and video sources can be loaded. Prevents unauthorized media content.',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/media-src',
  },
  'object-src': {
    description:
      'Controls which plugins can be loaded (Flash, Java). Generally recommended to set to "none" for security.',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/object-src',
  },
  'worker-src': {
    description:
      'Controls which URLs can be loaded as Web Workers, Shared Workers, or Service Workers.',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/worker-src',
  },
  'child-src': {
    description:
      'Controls which URLs can be loaded as nested browsing contexts (frames) and worker execution contexts.',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/child-src',
  },
  'manifest-src': {
    description:
      'Controls which manifest files can be loaded. Used for Progressive Web App manifests.',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/manifest-src',
  },
  'form-action': {
    description:
      'Controls which URLs can be used as form submission targets. Prevents malicious form redirects.',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/form-action',
  },
  'report-uri': {
    description:
      'Specifies a URL where CSP violation reports should be sent. Essential for monitoring security issues.',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/report-uri',
  },
  'report-to': {
    description:
      'Modern replacement for report-uri. Uses the Reporting API to send CSP violation reports.',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/report-to',
  },
};

// Function to find which services match a given URL using actual CSP data
const getServicesForUrl = (
  url: string,
  availableServices: Array<{ serviceId: string; serviceName: string }>,
  serviceDetails?: Array<{ serviceId: string; serviceName: string; cspDirectives: CSPDirectives }>
): Array<{ serviceId: string; serviceName: string }> => {
  const matchingServices: Array<{ serviceId: string; serviceName: string }> = [];

  // First try to match using actual CSP directive data if available
  if (serviceDetails) {
    for (const service of serviceDetails) {
      const { cspDirectives } = service;
      let matches = false;

      // Check all CSP directives for URL matches
      for (const [, sources] of Object.entries(cspDirectives)) {
        if (sources && Array.isArray(sources)) {
          for (const source of sources) {
            // Normalize the source URL for comparison
            const normalizedSource = source.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
            const normalizedUrl = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');

            if (
              normalizedUrl.includes(normalizedSource) ||
              normalizedSource.includes(normalizedUrl)
            ) {
              matches = true;
              break;
            }
          }
        }
        if (matches) break;
      }

      if (matches) {
        matchingServices.push({
          serviceId: service.serviceId,
          serviceName: service.serviceName,
        });
      }
    }
  }

  // Fallback to hardcoded patterns if no matches found with CSP data
  if (matchingServices.length === 0) {
    for (const service of availableServices) {
      const patterns = SERVICE_URL_PATTERNS[service.serviceId];
      if (patterns) {
        const matches = patterns.some(pattern => url.includes(pattern));
        if (matches) {
          matchingServices.push(service);
        }
      }
    }
  }

  return matchingServices;
};

// Function to find which services require a specific special directive (like 'unsafe-inline', 'self', etc.)
const getServicesForSpecialDirective = (
  specialDirective: string,
  currentDirective: string,
  serviceDetails?: Array<{ serviceId: string; serviceName: string; cspDirectives: CSPDirectives }>
): Array<{ serviceId: string; serviceName: string }> => {
  const matchingServices: Array<{ serviceId: string; serviceName: string }> = [];

  if (!serviceDetails) return matchingServices;

  for (const service of serviceDetails) {
    const { cspDirectives } = service;

    // Check if this service requires the special directive for the current CSP directive
    const directiveSources = cspDirectives[currentDirective as keyof CSPDirectives];
    if (directiveSources && Array.isArray(directiveSources)) {
      if (directiveSources.includes(specialDirective)) {
        matchingServices.push({
          serviceId: service.serviceId,
          serviceName: service.serviceName,
        });
      }
    }
  }

  return matchingServices;
};

export function ColorCodedHeader({
  header,
  directives,
  onCopy,
  copied,
  showBreakdown = false,
  serviceTags = [],
  serviceDetails,
}: ColorCodedHeaderProps) {
  const [showColors, setShowColors] = useState(true);

  // Parse header into segments with their types
  const parseHeader = () => {
    const segments: Array<{ text: string; type: 'directive' | 'source' | 'separator' }> = [];
    const parts = header
      .split(';')
      .map(part => part.trim())
      .filter(Boolean);

    parts.forEach((part, index) => {
      const spaceIndex = part.indexOf(' ');
      if (spaceIndex > 0) {
        // Has directive and sources
        const directive = part.substring(0, spaceIndex);
        const sources = part.substring(spaceIndex + 1);

        segments.push({ text: directive, type: 'directive' });
        segments.push({ text: ' ' + sources, type: 'source' });
      } else {
        // Directive only (like default-src 'none')
        segments.push({ text: part, type: 'directive' });
      }

      if (index < parts.length - 1) {
        segments.push({ text: '; ', type: 'separator' });
      }
    });

    return segments;
  };

  const getDirectiveColor = (directive: string): string => {
    const cleanDirective = directive.trim().replace(':', '');
    return (
      DIRECTIVE_COLORS[cleanDirective as keyof typeof DIRECTIVE_COLORS] || DIRECTIVE_COLORS.default
    );
  };

  const formatSourceText = (sourceText: string): React.ReactNode => {
    if (!showColors) return sourceText;

    // Split by spaces to handle individual sources
    const sources = sourceText.trim().split(' ');

    return sources.map((source, index) => {
      const isKeyword = CSP_KEYWORDS.some(keyword => source.includes(keyword));
      const isUrl = source.startsWith('http') || source.includes('.');

      let className = '';
      if (isKeyword) {
        className = 'font-semibold text-violet-700 dark:text-violet-300';
      } else if (isUrl) {
        className = 'text-blue-600 dark:text-sky-400';
      }

      return (
        <span key={index} className={className}>
          {source}
          {index < sources.length - 1 ? ' ' : ''}
        </span>
      );
    });
  };

  const segments = parseHeader();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">CSP Header</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowColors(!showColors)}
            className="text-xs"
          >
            {showColors ? (
              <>
                <EyeOff className="mr-1 h-3 w-3" />
                Plain
              </>
            ) : (
              <>
                <Eye className="mr-1 h-3 w-3" />
                Colored
              </>
            )}
          </Button>
        </div>
        <Button variant="outline" size="sm" onClick={onCopy} className="flex items-center gap-2">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>

      <div className="bg-muted rounded-lg p-4 font-mono text-sm break-all">
        {showColors ? (
          <div className="flex flex-wrap items-baseline gap-1">
            {segments.map((segment, index) => {
              if (segment.type === 'directive') {
                const directiveName = segment.text.split(' ')[0]?.replace(':', '') || '';
                const colorClass = getDirectiveColor(directiveName);

                return (
                  <Badge
                    key={index}
                    variant="outline"
                    className={`font-mono text-xs whitespace-nowrap ${colorClass}`}
                  >
                    {segment.text}
                  </Badge>
                );
              } else if (segment.type === 'source') {
                return (
                  <span key={index} className="text-foreground">
                    {formatSourceText(segment.text)}
                  </span>
                );
              } else {
                return (
                  <span key={index} className="text-muted-foreground">
                    {segment.text}
                  </span>
                );
              }
            })}
          </div>
        ) : (
          <span>{header}</span>
        )}
      </div>

      {/* Detailed Breakdown */}
      {showBreakdown && directives && Object.keys(directives).length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="text-sm font-medium">Directive Breakdown</h4>
          {Object.entries(directives).map(([directive, sources]) => {
            const colorClass = getDirectiveColor(directive);
            const directiveInfo = DIRECTIVE_INFO[directive as keyof typeof DIRECTIVE_INFO];
            return (
              <div key={directive} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`font-mono text-xs ${colorClass}`}>
                    {directive}
                  </Badge>
                  {directiveInfo && (
                    <InfoTooltip
                      content={directiveInfo.description}
                      referenceUrl={directiveInfo.url}
                      referenceText="MDN Docs"
                    />
                  )}
                  <span className="text-muted-foreground text-xs">
                    {sources.length} source{sources.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="ml-4 grid gap-1">
                  {sources.map((source, index) => (
                    <div
                      key={index}
                      className="bg-muted/50 flex items-center justify-between rounded-sm border p-2 text-xs"
                    >
                      <code className="font-mono text-xs">{source}</code>
                      {/* Show service tags for URLs and special directives */}
                      {(() => {
                        let matchingServices: Array<{ serviceId: string; serviceName: string }> =
                          [];

                        // Check if it's a special directive (like 'self', 'unsafe-inline', etc.)
                        const isSpecialDirective = CSP_KEYWORDS.some(keyword => source === keyword);

                        if (isSpecialDirective) {
                          // Get services that require this special directive for the current CSP directive
                          matchingServices = getServicesForSpecialDirective(
                            source,
                            directive,
                            serviceDetails
                          );
                        } else if (source.includes('http') || source.includes('.')) {
                          // It's a URL - get services that match this URL
                          matchingServices = getServicesForUrl(source, serviceTags, serviceDetails);
                        }

                        if (matchingServices.length === 0) {
                          return null;
                        }

                        return (
                          <div className="ml-2 flex gap-1">
                            {matchingServices.map(service => (
                              <Badge
                                key={service.serviceId}
                                variant="secondary"
                                className="text-xs"
                              >
                                {service.serviceName}
                              </Badge>
                            ))}
                          </div>
                        );
                      })()}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Color Legend - Hidden in small accordion */}
      {showColors && !showBreakdown && (
        <details className="bg-muted/30 rounded-lg">
          <summary className="hover:bg-muted/50 cursor-pointer rounded-lg p-3 text-sm font-medium transition-colors">
            Directive Color Guide
          </summary>
          <div className="p-4 pt-0">
            <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-3 md:grid-cols-4">
              {Object.entries(directives || {}).map(([directive]) => {
                const colorClass = getDirectiveColor(directive);
                return (
                  <div key={directive} className="flex items-center gap-2">
                    <Badge variant="outline" className={`font-mono text-xs ${colorClass} shrink-0`}>
                      {directive}
                    </Badge>
                  </div>
                );
              })}
            </div>
            <div className="border-border text-muted-foreground mt-3 border-t pt-3 text-xs">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-violet-700 dark:text-violet-300">
                    Keywords
                  </span>
                  <span>(&apos;self&apos;, &apos;none&apos;, etc.)</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-blue-600 dark:text-sky-400">URLs</span>
                  <span>(domains, protocols)</span>
                </div>
              </div>
            </div>
          </div>
        </details>
      )}
    </div>
  );
}
