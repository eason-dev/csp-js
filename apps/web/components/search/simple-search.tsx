'use client';

import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { type ServiceDefinition } from '@csp-kit/generator';
import Fuse from 'fuse.js';
import { Search, ExternalLink, Sparkles, Plus, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSelectedServices } from '@/contexts/selected-services-context';
import Link from 'next/link';

interface SimpleSearchProps {
  services: ServiceDefinition[];
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
  'google-tag-manager',
];

export function SimpleSearch({
  services,
  placeholder = 'Search services (e.g., Google Analytics, Stripe, Sentry)...',
  className = '',
}: SimpleSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const { addService, removeService, isSelected } = useSelectedServices();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Fuzzy search setup
  const fuse = useMemo(() => {
    const fuseOptions = {
      keys: [
        { name: 'name', weight: 0.4 },
        { name: 'id', weight: 0.3 },
        { name: 'description', weight: 0.2 },
        { name: 'category', weight: 0.1 },
      ],
      threshold: 0.3,
      includeScore: true,
      ignoreLocation: true,
    };
    return new Fuse(services, fuseOptions);
  }, [services]);

  // Get search results
  const searchResults = useMemo(() => {
    if (searchQuery.trim() === '') {
      // Show popular services when no search query
      return services
        .filter(service => POPULAR_SERVICES.includes(service.id))
        .sort((a, b) => POPULAR_SERVICES.indexOf(a.id) - POPULAR_SERVICES.indexOf(b.id));
    }

    const results = fuse.search(searchQuery);
    return results.map(result => result.item).slice(0, 8);
  }, [searchQuery, fuse, services]);

  // Toggle service selection
  const toggleService = useCallback(
    (service: ServiceDefinition) => {
      if (isSelected(service.id)) {
        removeService(service.id);
      } else {
        addService({
          id: service.id,
          name: service.name,
        });
      }
      // Don't close results on selection
    },
    [addService, removeService, isSelected]
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex(prev => Math.min(prev + 1, searchResults.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex(prev => Math.max(prev - 1, -1));
      } else if (e.key === 'Enter' && focusedIndex >= 0 && focusedIndex < searchResults.length) {
        e.preventDefault();
        const service = searchResults[focusedIndex];
        if (service) {
          toggleService(service);
        }
      } else if (e.key === 'Escape') {
        setShowResults(false);
        inputRef.current?.blur();
      }
    },
    [focusedIndex, searchResults, toggleService]
  );

  // Handle clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll focused item into view
  useEffect(() => {
    if (focusedIndex >= 0 && resultsRef.current) {
      const items = resultsRef.current.getElementsByClassName('search-result-item');
      if (items[focusedIndex]) {
        items[focusedIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [focusedIndex]);

  // Category colors
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      analytics: 'bg-blue-100 text-blue-800 dark:bg-zinc-900/30 dark:text-sky-300',
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

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform" />
        <Input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onFocus={() => setShowResults(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="h-12 pr-4 pl-10 text-base"
          aria-label="Search services"
          aria-expanded={showResults}
          aria-controls="search-results"
          autoComplete="off"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              inputRef.current?.focus();
            }}
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transform"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results */}
      {showResults && (
        <Card
          id="search-results"
          ref={resultsRef}
          className="absolute top-full z-50 mt-2 max-h-[400px] w-full overflow-y-auto shadow-lg"
        >
          <CardContent className="p-2">
            {searchResults.length === 0 ? (
              <div className="text-muted-foreground p-4 text-center">
                <p className="font-medium">No services found</p>
                <p className="mt-1 text-sm">Try searching with different keywords</p>
              </div>
            ) : (
              <div className="space-y-1">
                {searchQuery === '' && (
                  <div className="text-muted-foreground px-3 py-2 text-sm font-medium">
                    <Sparkles className="mr-1 inline h-3 w-3" />
                    Popular services
                  </div>
                )}
                {searchResults.map((service, index) => {
                  const selected = isSelected(service.id);
                  return (
                    <div
                      key={service.id}
                      className={`search-result-item group flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors ${
                        focusedIndex === index ? 'bg-accent' : 'hover:bg-accent/50'
                      } ${selected ? 'bg-accent/30' : ''}`}
                      onClick={() => toggleService(service)}
                      onMouseEnter={() => setFocusedIndex(index)}
                      role="option"
                      aria-selected={selected}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="font-medium">{service.name}</span>
                          <Badge
                            variant="secondary"
                            className={`text-xs ${getCategoryColor(service.category)}`}
                          >
                            {service.category}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground truncate text-left text-sm">
                          {service.description}
                        </p>
                      </div>
                      <div className="ml-4 flex items-center gap-2">
                        <Link
                          href={`/service/${service.id}`}
                          onClick={e => e.stopPropagation()}
                          className="opacity-0 transition-opacity group-hover:opacity-100"
                          aria-label={`View details for ${service.name}`}
                        >
                          <ExternalLink className="text-muted-foreground hover:text-foreground h-4 w-4" />
                        </Link>
                        <Button
                          size="sm"
                          variant={selected ? 'secondary' : 'outline'}
                          className="min-w-[70px]"
                          aria-label={selected ? `Remove ${service.name}` : `Add ${service.name}`}
                        >
                          {selected ? (
                            <>
                              <Check className="mr-1 h-3 w-3" />
                              Added
                            </>
                          ) : (
                            <>
                              <Plus className="mr-1 h-3 w-3" />
                              Add
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
