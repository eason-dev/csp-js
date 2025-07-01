/* eslint-disable react/prop-types */
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { type ServiceRegistry, type ServiceDefinition } from '@csp-kit/generator';
import Fuse from 'fuse.js';
import {
  Search,
  ExternalLink,
  Filter,
  Grid3X3,
  List,
  Plus,
  ExternalLinkIcon,
  Check,
  Minus,
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
import Link from 'next/link';

interface AllServicesPageProps {
  serviceRegistry: ServiceRegistry;
}

export default function AllServicesPage({ serviceRegistry }: AllServicesPageProps) {
  const services = serviceRegistry.services;
  const searchParams = useSearchParams();
  const { addService, removeService, isSelected } = useSelectedServices();
  
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

  const handleToggleService = (service: ServiceDefinition) => {
    if (isSelected(service.id)) {
      removeService(service.id);
    } else {
      addService({
        id: service.id,
        name: service.name,
        version: service.defaultVersion,
      });
    }
  };

  const ServiceCard: React.FC<{ service: ServiceDefinition }> = ({ service }) => {
    const categoryDisplayName = formatCategoryName(service.category);
    const versionCount = Object.keys(service.versions).length;
    const serviceSelected = isSelected(service.id);

    if (viewMode === 'list') {
      return (
        <div className="flex items-center justify-between border-b border-border p-4 hover:bg-muted/50">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-medium text-lg truncate">{service.name}</h3>
              <Badge variant="outline" className="text-xs shrink-0">
                {categoryDisplayName}
              </Badge>
              {serviceSelected && (
                <Badge variant="default" className="text-xs shrink-0">
                  <Check className="h-3 w-3 mr-1" />
                  Added
                </Badge>
              )}
              <span className="text-xs text-muted-foreground shrink-0">
                {versionCount} version{versionCount !== 1 ? 's' : ''}
              </span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {service.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Updated {new Date(service.lastUpdated).toLocaleDateString()}</span>
              {service.aliases && service.aliases.length > 0 && (
                <>
                  <span>•</span>
                  <span>Also known as: {service.aliases.slice(0, 2).join(', ')}</span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant={serviceSelected ? "outline" : "default"}
              size="sm"
              onClick={() => handleToggleService(service)}
              className="flex items-center gap-1"
            >
              {serviceSelected ? (
                <>
                  <Minus className="h-3 w-3" />
                  Remove
                </>
              ) : (
                <>
                  <Plus className="h-3 w-3" />
                  Add
                </>
              )}
            </Button>
            <Link href={`/service/${service.id}`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
            <a
              href={service.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      );
    }

    return (
      <Card className="group hover:shadow-md transition-all">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg mb-1 truncate">{service.name}</CardTitle>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  {categoryDisplayName}
                </Badge>
                {serviceSelected && (
                  <Badge variant="default" className="text-xs">
                    <Check className="h-3 w-3 mr-1" />
                    Added
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground">
                  {versionCount} version{versionCount !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
            <a
              href={service.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <CardDescription className="line-clamp-2">{service.description}</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="text-xs text-muted-foreground">
              Updated {new Date(service.lastUpdated).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={serviceSelected ? "outline" : "default"}
                size="sm"
                onClick={() => handleToggleService(service)}
                className="flex items-center gap-1"
              >
                {serviceSelected ? (
                  <>
                    <Minus className="h-3 w-3" />
                    Remove
                  </>
                ) : (
                  <>
                    <Plus className="h-3 w-3" />
                    Add
                  </>
                )}
              </Button>
              <Link href={`/service/${service.id}`} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
          {service.aliases && service.aliases.length > 0 && (
            <div className="mt-2 pt-2 border-t border-border">
              <div className="flex flex-wrap gap-1">
                {service.aliases.slice(0, 3).map(alias => (
                  <Badge key={alias} variant="secondary" className="text-xs">
                    {alias}
                  </Badge>
                ))}
                {service.aliases.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{service.aliases.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">All Supported Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse our complete database of {Object.keys(services).length} web services and libraries with
            pre-configured CSP rules. Find the perfect security configuration for your project.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search services (e.g., Google Analytics, Stripe, React)..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
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
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Showing {filteredServices.length} of {Object.keys(services).length} services
              {selectedCategory !== 'all' && ` in ${formatCategoryName(selectedCategory)}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
          </div>
        </div>

        {/* Services Grid/List */}
        {filteredServices.length > 0 ? (
          <div className={
            viewMode === 'grid'
              ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'border border-border rounded-lg overflow-hidden'
          }>
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium mb-2">No services found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? `No services match "${searchQuery}"`
                : 'No services in this category'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
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
            <Card className="max-w-md mx-auto">
              <CardContent className="p-6">
                <Plus className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
                <h3 className="font-medium mb-2">Missing a service?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Can&apos;t find the service you&apos;re using? Request support and we&apos;ll add it to our database.
                </p>
                <a
                  href="https://github.com/eason-dev/csp-kit/issues/new?assignees=&labels=service-request&template=service-request.md&title=Request%20Support%20for%20%5BService%20Name%5D"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="flex items-center gap-2 mx-auto">
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