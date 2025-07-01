'use client';

import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { type ServiceDefinition } from '@csp-kit/generator';
import Fuse from 'fuse.js';
import {
  Search,
  ExternalLink,
  Sparkles,
  Plus,
  Check,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSelectedServices } from '@/contexts/selected-services-context';
import Link from 'next/link';

interface SimpleSearchProps {
  services: Record<string, ServiceDefinition>;
  placeholder?: string;
  className?: string;
}

// Popular services for initial display
const POPULAR_SERVICES = [
  'google-analytics',
  'google-fonts', 
  'stripe',
  'youtube',
  'sentry',
  'cloudflare-analytics',
  'facebook-pixel',
  'google-tag-manager'
];

export function SimpleSearch({
  services,
  placeholder = 'Search services (e.g., Google Analytics, Stripe, Sentry)...',
  className = '',
}: SimpleSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  
  const { addService, isSelected } = useSelectedServices();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

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

  // Get display services
  const displayServices = useMemo(() => {
    if (searchQuery.trim()) {
      // Show search results
      const results = fuse.search(searchQuery, { limit: 15 });
      return results.map(result => result.item);
    }
    
    // Show popular services by default
    return POPULAR_SERVICES
      .map(id => services[id])
      .filter((service): service is ServiceDefinition => Boolean(service))
      .slice(0, 8);
  }, [searchQuery, fuse, services]);

  const handleServiceSelect = (serviceId: string) => {
    const service = services[serviceId];
    if (service && !isSelected(serviceId)) {
      addService({
        id: service.id,
        name: service.name,
        version: service.defaultVersion,
      });
    }
    setShowResults(false);
    setSearchQuery('');
    setFocusedIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!showResults) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev < displayServices.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < displayServices.length) {
          const service = displayServices[focusedIndex];
          if (service) {
            handleServiceSelect(service.id);
          }
        }
        break;
      case 'Escape':
        setShowResults(false);
        setFocusedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  }, [showResults, displayServices, focusedIndex, handleServiceSelect]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll focused item into view
  useEffect(() => {
    if (focusedIndex >= 0 && resultsRef.current) {
      const focusedElement = resultsRef.current.children[focusedIndex + 1] as HTMLElement; // +1 for header
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [focusedIndex]);

  const formatCategoryName = (category: string) => {
    return category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          placeholder={placeholder}
          className="pl-12 pr-4 py-6 text-lg rounded-xl border-2 shadow-lg"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowResults(true);
            setFocusedIndex(-1);
          }}
          onFocus={() => setShowResults(true)}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={showResults}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-activedescendant={focusedIndex >= 0 ? `search-option-${focusedIndex}` : undefined}
        />
      </div>

      {/* Search Results */}
      {showResults && (
        <Card className="absolute top-full left-0 right-0 mt-2 shadow-2xl z-50">
          <CardContent className="p-0">
            <div
              ref={resultsRef}
              className="max-h-96 overflow-y-auto"
              role="listbox"
              aria-label="Search results"
            >
              {/* Results Header */}
              <div className="p-4 border-b bg-muted/30">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {searchQuery.trim() ? (
                    <>
                      <Search className="h-4 w-4" />
                      <span className="font-medium">{displayServices.length} search result{displayServices.length !== 1 ? 's' : ''}</span>
                      <span>for &quot;{searchQuery}&quot;</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      <span className="font-medium">Popular Services</span>
                      <span>Commonly used services</span>
                    </>
                  )}
                </div>
              </div>

              {/* Service Results */}
              {displayServices.length > 0 ? (
                displayServices.map((service, index) => {
                  const isServiceSelected = isSelected(service.id);
                  const isFocused = index === focusedIndex;
                  const categoryDisplayName = formatCategoryName(service.category);
                  
                  return (
                    <div
                      key={service.id}
                      id={`search-option-${index}`}
                      className={`flex items-start justify-between p-4 cursor-pointer transition-colors border-b last:border-b-0 ${
                        isFocused
                          ? 'bg-primary/10 border-primary/20'
                          : isServiceSelected 
                            ? 'bg-primary/5 border-primary/10' 
                            : 'hover:bg-muted/50'
                      }`}
                      onClick={() => handleServiceSelect(service.id)}
                      role="option"
                      aria-selected={isFocused}
                    >
                      <div className="flex-1 min-w-0 mr-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium truncate">{service.name}</span>
                          <Badge variant="outline" className="text-xs shrink-0">
                            {categoryDisplayName}
                          </Badge>
                          {isServiceSelected && (
                            <Badge variant="default" className="text-xs shrink-0">
                              <Check className="h-3 w-3 mr-1" />
                              Added
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 text-left">
                          {service.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {!isServiceSelected && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 px-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleServiceSelect(service.id);
                            }}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add
                          </Button>
                        )}
                        <Link
                          href={`/service/${service.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="opacity-60 hover:opacity-100 transition-opacity"
                        >
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ExternalLink className="h-3 w-3" />
                            <span className="sr-only">View {service.name} details</span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No services found</p>
                  {searchQuery && (
                    <p className="text-sm mt-1">
                      Try a different search term or{' '}
                      <Link 
                        href="/services" 
                        className="text-primary hover:underline"
                        onClick={() => setShowResults(false)}
                      >
                        browse all services
                      </Link>
                    </p>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}