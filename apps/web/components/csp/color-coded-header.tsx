'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Check, Eye, EyeOff } from 'lucide-react';

interface ColorCodedHeaderProps {
  header: string;
  directives: Record<string, string[]>;
  onCopy: () => void;
  copied: boolean;
  showBreakdown?: boolean;
}

// Accessibility-friendly color scheme with good contrast ratios
const DIRECTIVE_COLORS = {
  'script-src': 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
  'style-src': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
  'img-src': 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
  'connect-src': 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800',
  'font-src': 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800',
  'frame-src': 'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900/20 dark:text-teal-300 dark:border-teal-800',
  'media-src': 'bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-800',
  'object-src': 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800',
  'worker-src': 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800',
  'child-src': 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800',
  'manifest-src': 'bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-300 dark:border-cyan-800',
  'form-action': 'bg-lime-100 text-lime-800 border-lime-200 dark:bg-lime-900/20 dark:text-lime-300 dark:border-lime-800',
  'report-uri': 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-900/20 dark:text-slate-300 dark:border-slate-800',
  'report-to': 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-900/20 dark:text-slate-300 dark:border-slate-800',
  'default': 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800'
};

// Common CSP keywords that should be styled differently
const CSP_KEYWORDS = ["'self'", "'none'", "'unsafe-inline'", "'unsafe-eval'", "'strict-dynamic'", "'nonce-", "'sha256-", "'sha384-", "'sha512-"];

export function ColorCodedHeader({ header, directives, onCopy, copied, showBreakdown = false }: ColorCodedHeaderProps) {
  const [showColors, setShowColors] = useState(true);

  // Parse header into segments with their types
  const parseHeader = () => {
    const segments: Array<{ text: string; type: 'directive' | 'source' | 'separator' }> = [];
    const parts = header.split(';').map(part => part.trim()).filter(Boolean);
    
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
    return DIRECTIVE_COLORS[cleanDirective as keyof typeof DIRECTIVE_COLORS] || DIRECTIVE_COLORS.default;
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
        className = 'text-blue-600 dark:text-blue-400';
      }
      
      return (
        <span key={index} className={className}>
          {source}{index < sources.length - 1 ? ' ' : ''}
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
                <EyeOff className="h-3 w-3 mr-1" />
                Plain
              </>
            ) : (
              <>
                <Eye className="h-3 w-3 mr-1" />
                Colored
              </>
            )}
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onCopy}
          className="flex items-center gap-2"
        >
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
                    className={`text-xs font-mono whitespace-nowrap ${colorClass}`}
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
        <div className="space-y-3 mt-6">
          <h4 className="text-sm font-medium">Directive Breakdown</h4>
          {Object.entries(directives).map(([directive, sources]) => {
            const colorClass = getDirectiveColor(directive);
            return (
              <div key={directive} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={`font-mono text-xs ${showColors ? colorClass : ''}`}
                  >
                    {directive}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {sources.length} source{sources.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="grid gap-1 ml-4">
                  {sources.map((source, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between text-xs p-2 rounded border bg-muted/50"
                    >
                      <code className="font-mono text-xs">{source}</code>
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
          <summary className="p-3 cursor-pointer text-sm font-medium hover:bg-muted/50 rounded-lg transition-colors">
            Directive Color Guide
          </summary>
          <div className="p-4 pt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
              {Object.entries(directives || {}).map(([directive]) => {
                const colorClass = getDirectiveColor(directive);
                return (
                  <div key={directive} className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`text-xs font-mono ${colorClass} shrink-0`}
                    >
                      {directive}
                    </Badge>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-violet-700 dark:text-violet-300">Keywords</span>
                  <span>(&apos;self&apos;, &apos;none&apos;, etc.)</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-blue-600 dark:text-blue-400">URLs</span>
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