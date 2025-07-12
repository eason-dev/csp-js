'use client';

import { useState, useMemo } from 'react';
import { type CSPService } from '@csp-kit/data';
import * as allServices from '@csp-kit/data';
import { Search, Package, ExternalLink, Plus, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Link from 'next/link';
import { useSelectedServices } from '@/contexts/selected-services-context';

// Filter to get only service objects
const servicesList = Object.entries(allServices)
  .filter(([key, value]) => 
    typeof value === 'object' && 
    value !== null && 
    'id' in value &&
    key !== 'defineService' &&
    key !== 'isCSPService' &&
    key !== 'createConfigurableService'
  )
  .map(([, service]) => service as CSPService);

// Get unique categories
const categories = Array.from(new Set(servicesList.map(s => s.category))).sort();

// Category descriptions
const categoryDescriptions: Record<string, string> = {
  analytics: 'Analytics and tracking services for measuring user behavior',
  payment: 'Payment processors and e-commerce platforms',
  social: 'Social media platforms and sharing widgets',
  video: 'Video hosting and streaming services',
  cdn: 'Content delivery networks and asset hosting',
  fonts: 'Web font providers and typography services',
  monitoring: 'Error tracking and performance monitoring',
  chat: 'Customer support and live chat services',
  authentication: 'Identity providers and authentication services',
  maps: 'Mapping and location services',
  forms: 'Form builders and survey tools',
  marketing: 'Marketing automation and email services',
  cms: 'Content management systems',
  documentation: 'Documentation and knowledge base platforms',
  education: 'Learning management and education platforms',
  productivity: 'Productivity and collaboration tools',
  testing: 'A/B testing and experimentation platforms',
  other: 'Other services and utilities',
};

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

export default function AllServicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addService, removeService, isSelected } = useSelectedServices();

  // Filter services based on search and category
  const filteredServices = useMemo(() => {
    let filtered = servicesList;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        service =>
          service.name.toLowerCase().includes(query) ||
          service.id.toLowerCase().includes(query) ||
          service.description.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [searchQuery, selectedCategory]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: servicesList.length };
    servicesList.forEach(service => {
      counts[service.category] = (counts[service.category] || 0) + 1;
    });
    return counts;
  }, []);

  const toggleService = (service: CSPService) => {
    if (isSelected(service.id)) {
      removeService(service);
    } else {
      addService(service);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold">All Services</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Browse and search through {servicesList.length} supported services. Select services to
          generate your Content Security Policy.
        </p>
      </div>

      {/* Filters */}
      <div className="space-y-6 mb-8">
        {/* Search */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services by name or description..."
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>

        {/* Category Filter */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all" className="cursor-pointer">
                  All Services ({categoryCounts.all})
                </Label>
              </div>
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <RadioGroupItem value={category} id={category} />
                  <Label htmlFor={category} className="cursor-pointer capitalize">
                    {category} ({categoryCounts[category] || 0})
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {filteredServices.length} {filteredServices.length === 1 ? 'Service' : 'Services'}
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </h2>
          <Badge variant="secondary" className="text-sm">
            <Package className="h-3 w-3 mr-1" />
            Total: {servicesList.length}
          </Badge>
        </div>

        {selectedCategory !== 'all' && categoryDescriptions[selectedCategory] && (
          <p className="text-muted-foreground">{categoryDescriptions[selectedCategory]}</p>
        )}

        {/* Service Grid */}
        {filteredServices.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="text-center py-12">
              <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No services found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search query or category filter.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((service) => {
              const selected = isSelected(service.id);
              return (
                <Card
                  key={service.id}
                  className={`group hover:shadow-lg transition-all ${
                    selected ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="secondary"
                            className={`text-xs ${getCategoryColor(service.category)}`}
                          >
                            {service.category}
                          </Badge>
                          <code className="text-xs text-muted-foreground">{service.id}</code>
                        </div>
                      </div>
                      <Link
                        href={`/service/${service.id}`}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label={`View details for ${service.name}`}
                      >
                        <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm mb-4 line-clamp-2">
                      {service.description}
                    </CardDescription>
                    <Button
                      size="sm"
                      variant={selected ? 'secondary' : 'outline'}
                      className="w-full"
                      onClick={() => toggleService(service)}
                    >
                      {selected ? (
                        <>
                          <Check className="h-3 w-3 mr-1" />
                          Added to Policy
                        </>
                      ) : (
                        <>
                          <Plus className="h-3 w-3 mr-1" />
                          Add to Policy
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}