/* eslint-disable react/prop-types */
'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { type ServiceRegistry, type ServiceDefinition } from '@csp-kit/generator';
import Fuse from 'fuse.js';
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Plus,
  ExternalLinkIcon,
  Minus,
  ChevronRight,
  X,
} from 'lucide-react';
import { useSelectedServices } from '@/contexts/selected-services-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AllServicesPageProps {
  serviceRegistry: ServiceRegistry;
}

export default function AllServicesPage({ serviceRegistry }: AllServicesPageProps) {
  const services = serviceRegistry.services;
  const searchParams = useSearchParams();
  const router = useRouter();
  const { selectedServices, addService, removeService, isSelected, clearServices } =
    useSelectedServices();
  const scrollPositionRef = useRef<number>(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Initialize category from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

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

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(Object.values(services).map(service => service.category))];
    return cats.sort();
  }, [services]);

  // Get category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    Object.values(services).forEach(service => {
      counts[service.category] = (counts[service.category] || 0) + 1;
    });
    return counts;
  }, [services]);

  // Filter and search services
  const filteredServices = useMemo(() => {
    let filtered = Object.values(services);

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    // Search within filtered results
    if (searchQuery.trim()) {
      const results = fuse.search(searchQuery, { limit: 100 });
      const searchResults = results.map(result => result.item);

      if (selectedCategory !== 'all') {
        filtered = searchResults.filter(service => service.category === selectedCategory);
      } else {
        filtered = searchResults;
      }
    }

    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [services, selectedCategory, searchQuery, fuse]);

  const formatCategoryName = (category: string) => {
    return category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const handleToggleService = useCallback(
    (service: ServiceDefinition) => {
      // Save current scroll position
      scrollPositionRef.current = window.scrollY;

      if (isSelected(service.id)) {
        removeService(service.id);
      } else {
        addService({
          id: service.id,
          name: service.name,
        });
      }
    },
    [isSelected, removeService, addService]
  );

  // Restore scroll position after selectedServices changes
  useEffect(() => {
    if (scrollPositionRef.current > 0) {
      // Use requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPositionRef.current);
        scrollPositionRef.current = 0;
      });
    }
  }, [selectedServices.length]);

  const ServiceCard: React.FC<{ service: ServiceDefinition }> = ({ service }) => {
    const categoryDisplayName = formatCategoryName(service.category);
    const serviceSelected = isSelected(service.id);

    const handleCardClick = () => {
      router.push(`/service/${service.id}`);
    };

    if (viewMode === 'list') {
      return (
        <div
          className={`hover:bg-muted/50 relative cursor-pointer border-b p-4 transition-all ${
            serviceSelected ? 'border-l-primary bg-primary/5 border-l-4' : 'border-border'
          }`}
          onClick={handleCardClick}
        >
          <ChevronRight className="text-muted-foreground absolute top-4 right-4 h-4 w-4" />
          <div className="min-w-0 flex-1 pr-8">
            <div className="mb-2 flex items-center gap-3">
              <h3 className="truncate text-lg font-medium">{service.name}</h3>
              <Badge variant="outline" className="shrink-0 text-xs">
                {categoryDisplayName}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-2 line-clamp-2 text-sm">{service.description}</p>
            <div className="text-muted-foreground flex items-center gap-2 text-xs">
              <span>Updated {new Date(service.lastUpdated).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="absolute right-4 bottom-4">
            <Button
              variant={serviceSelected ? 'destructive' : 'default'}
              size="sm"
              onClick={e => {
                e.stopPropagation();
                handleToggleService(service);
              }}
              className="h-8 w-8 rounded-full p-0"
            >
              {serviceSelected ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      );
    }

    return (
      <Card
        className={`group relative flex h-full cursor-pointer flex-col transition-all hover:shadow-md ${
          serviceSelected ? 'border-primary border-2 shadow-xs' : 'border'
        }`}
        onClick={handleCardClick}
      >
        <ChevronRight className="text-muted-foreground absolute top-6 right-6 h-4 w-4" />
        <CardHeader className="pr-12 pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <CardTitle className="mb-1 truncate text-lg">{service.name}</CardTitle>
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {categoryDisplayName}
                </Badge>
              </div>
            </div>
          </div>
          <CardDescription className="line-clamp-2 flex-grow">
            {service.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-auto pt-0">
          <div className="flex items-center justify-between gap-2">
            <div className="text-muted-foreground text-xs">
              Updated {new Date(service.lastUpdated).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={serviceSelected ? 'destructive' : 'default'}
                size="sm"
                onClick={e => {
                  e.stopPropagation();
                  handleToggleService(service);
                }}
                className="h-8 w-8 rounded-full p-0"
              >
                {serviceSelected ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold">All Supported Services</h1>
        <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
          Browse our complete database of {Object.keys(services).length} web services and libraries
          with pre-configured CSP rules. Find the perfect security configuration for your project.
        </p>
      </div>

      {/* Controls and Selected Services - Sticky Section */}
      <div className="bg-background/95 sticky top-16 z-40 -mt-4 mb-8 space-y-4 py-4 backdrop-blur-sm">
        {/* Selected Services Section - Compact */}
        {selectedServices.length > 0 && (
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="py-3">
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium whitespace-nowrap">
                      Selected ({selectedServices.length}):
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearServices}
                      className="text-destructive hover:bg-destructive/10 h-6 px-2 text-xs"
                    >
                      Clear All
                    </Button>
                  </div>
                  <div className="flex min-w-0 flex-wrap gap-1">
                    {selectedServices.map(service => (
                      <div
                        key={service.id}
                        className="bg-background hover:bg-muted group flex cursor-pointer items-center gap-1 rounded-sm border px-2 py-1 text-xs transition-colors"
                        onClick={() => router.push(`/service/${service.id}`)}
                      >
                        <span className="font-medium">{service.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-destructive/20 text-destructive h-3 w-3 p-0"
                          onClick={e => {
                            e.stopPropagation();
                            removeService(service.id);
                          }}
                        >
                          <X className="h-2 w-2" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => router.push('/')}
                  className="shrink-0"
                >
                  View Generated CSP
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        {/* Search and Filters */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search services (e.g., Google Analytics, Stripe, Sentry)..."
              className="pl-10"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories ({Object.keys(services).length})</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {formatCategoryName(category)} ({categoryCounts[category]})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="text-muted-foreground flex items-center justify-between text-sm">
          <span>
            Showing {filteredServices.length} of {Object.keys(services).length} services
            {selectedCategory !== 'all' && ` in ${formatCategoryName(selectedCategory)}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>
        </div>
      </div>

      {/* Services Grid/List */}
      {filteredServices.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'border-border overflow-hidden rounded-lg border'
          }
        >
          {filteredServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <div className="mb-4 text-6xl">🔍</div>
          <h3 className="mb-2 text-lg font-medium">No services found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? `No services match "${searchQuery}"` : 'No services in this category'}
          </p>
          <div className="flex flex-col justify-center gap-2 sm:flex-row">
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Clear filters
            </Button>
            <a
              href="https://github.com/eason-dev/csp-kit/issues/new?assignees=&labels=service-request&template=service-request.md&title=Request%20Support%20for%20%5BService%20Name%5D"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="default" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Request Service
              </Button>
            </a>
          </div>
        </div>
      )}

      {/* Service Request Section */}
      {filteredServices.length > 0 && (
        <div className="mt-12 text-center">
          <Card className="mx-auto max-w-md">
            <CardContent className="p-6">
              <Plus className="text-muted-foreground mx-auto mb-3 h-8 w-8" />
              <h3 className="mb-2 font-medium">Missing a service?</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Can&apos;t find the service you&apos;re using? Request support and we&apos;ll add it
                to our database.
              </p>
              <a
                href="https://github.com/eason-dev/csp-kit/issues/new?assignees=&labels=service-request&template=service-request.md&title=Request%20Support%20for%20%5BService%20Name%5D"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="mx-auto flex items-center gap-2">
                  <ExternalLinkIcon className="h-4 w-4" />
                  Request Service on GitHub
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
