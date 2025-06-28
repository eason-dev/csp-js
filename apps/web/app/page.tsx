'use client';

import { useState } from 'react';
import { generateCSP, ServiceCategory, services, searchServices } from 'csp-js';
import { Copy, Check, Search, Shield, AlertTriangle, Info } from 'lucide-react';
import { Button } from '@repo/ui/button';

export default function CSPGenerator() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [customRules, setCustomRules] = useState('');
  const [reportUri, setReportUri] = useState('');
  const [useNonce, setUseNonce] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<{
    header: string;
    warnings: string[];
    includedServices: string[];
    unknownServices: string[];
    nonce?: string;
  } | null>(null);

  // Generate CSP when services change
  const generateCurrentCSP = () => {
    try {
      let customRulesObj = {};
      if (customRules.trim()) {
        customRulesObj = JSON.parse(customRules);
      }

      const cspResult = generateCSP({
        services: selectedServices,
        nonce: useNonce,
        customRules: customRulesObj,
        reportUri: reportUri || undefined,
      });

      setResult(cspResult);
    } catch (error) {
      console.error('Error generating CSP:', error);
      setResult({ 
        header: 'Error: Invalid custom rules JSON',
        warnings: ['Please check your custom rules format'],
        includedServices: [],
        unknownServices: selectedServices
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

  // Filter services based on search
  const filteredServices = searchQuery 
    ? searchServices(searchQuery)
    : Object.values(services);

  // Group services by category
  const servicesByCategory = filteredServices.reduce((acc, service) => {
    const category = service.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(service);
    return acc;
  }, {} as Record<ServiceCategory, typeof services[string][]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              CSP Generator
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Generate Content Security Policy headers for popular web services and libraries.
            Secure your website with just a few clicks.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Service Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Select Services
            </h2>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Selected Services */}
            {selectedServices.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Selected ({selectedServices.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedServices.map((serviceId) => {
                    const service = services[serviceId];
                    return (
                      <span
                        key={serviceId}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                      >
                        {service?.name || serviceId}
                        <button
                          onClick={() => setSelectedServices(prev => prev.filter(id => id !== serviceId))}
                          className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Service Categories */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
                <div key={category}>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize">
                    {category.replace('_', ' ')}
                  </h3>
                  <div className="space-y-1">
                    {categoryServices.map((service) => (
                      <label
                        key={service.id}
                        className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedServices.includes(service.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedServices(prev => [...prev, service.id]);
                            } else {
                              setSelectedServices(prev => prev.filter(id => id !== service.id));
                            }
                          }}
                          className="h-4 w-4 text-blue-600"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {service.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {service.description}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Options */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Options
              </h3>
              
              <label className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  checked={useNonce}
                  onChange={(e) => setUseNonce(e.target.checked)}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Generate nonce for inline scripts
                </span>
              </label>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Report URI (optional)
                </label>
                <input
                  type="url"
                  placeholder="https://your-site.com/csp-report"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  value={reportUri}
                  onChange={(e) => setReportUri(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Custom Rules (JSON)
                </label>
                <textarea
                  placeholder='{&quot;script-src&quot;: [&quot;https://custom-domain.com&quot;]}'
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-mono"
                  rows={3}
                  value={customRules}
                  onChange={(e) => setCustomRules(e.target.value)}
                />
              </div>
            </div>

            <Button
              onClick={generateCurrentCSP}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              appName="web"
            >
              Generate CSP Header
            </Button>
          </div>

          {/* Right Panel - Results */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Generated CSP
            </h2>

            {result ? (
              <div className="space-y-4">
                {/* CSP Header */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      CSP Header
                    </label>
                    <button
                      onClick={() => copyToClipboard(result.header)}
                      className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 font-mono text-sm break-all">
                    {result.header}
                  </div>
                </div>

                {/* Nonce */}
                {result.nonce && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Generated Nonce
                    </label>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 font-mono text-sm">
                      {result.nonce}
                    </div>
                  </div>
                )}

                {/* Warnings */}
                {result.warnings?.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <label className="text-sm font-medium text-orange-700 dark:text-orange-300">
                        Warnings
                      </label>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                      {result.warnings.map((warning: string, index: number) => (
                        <div key={index} className="text-sm text-orange-700 dark:text-orange-300">
                          • {warning}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Service Info */}
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <Info className="h-4 w-4 text-blue-500" />
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Services
                    </label>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    ✓ Included: {result.includedServices?.join(', ') || 'None'}
                    {result.unknownServices?.length > 0 && (
                      <div className="text-red-600 dark:text-red-400">
                        ✗ Unknown: {result.unknownServices.join(', ')}
                      </div>
                    )}
                  </div>
                </div>

                {/* Usage Instructions */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                    How to use this CSP header:
                  </h3>
                  <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <div><strong>HTTP Header:</strong></div>
                    <div className="font-mono bg-blue-100 dark:bg-blue-900 p-2 rounded text-xs">
                      Content-Security-Policy: {result.header}
                    </div>
                    <div><strong>HTML Meta Tag:</strong></div>
                    <div className="font-mono bg-blue-100 dark:bg-blue-900 p-2 rounded text-xs break-all">
                      &lt;meta http-equiv=&quot;Content-Security-Policy&quot; content=&quot;{result.header}&quot;&gt;
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <Shield className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Select services and click &quot;Generate CSP Header&quot; to get started.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Powered by{' '}
            <a href="https://github.com/easonz/csp-js" className="text-blue-600 hover:underline">
              csp-js
            </a>
            {' • '}
            <a href="https://github.com/easonz/csp-js" className="text-blue-600 hover:underline">
              GitHub
            </a>
            {' • '}
            <a href="/docs" className="text-blue-600 hover:underline">
              Documentation
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}