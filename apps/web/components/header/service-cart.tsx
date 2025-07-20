'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, X, Plus, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useSelectedServices } from '@/contexts/selected-services-context';

export function ServiceCart() {
  const { selectedServices, removeService, clearServices } = useSelectedServices();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleViewCSP = () => {
    setIsOpen(false);
    router.push('/');
  };

  const handleAddMore = () => {
    setIsOpen(false);
    router.push('/services');
  };

  const handleRemoveService = (serviceId: string) => {
    removeService(serviceId);
  };

  const handleClearAll = () => {
    clearServices();
    setIsOpen(false);
  };

  const handleServiceClick = (serviceId: string) => {
    setIsOpen(false);
    router.push(`/service/${serviceId}`);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {selectedServices.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center p-0 text-xs"
            >
              {selectedServices.length}
            </Badge>
          )}
          <span className="ml-2 hidden sm:inline">My Services</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Selected Services</h4>
            {selectedServices.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="mr-1 h-4 w-4" />
                Clear all
              </Button>
            )}
          </div>

          {selectedServices.length === 0 ? (
            <div className="text-muted-foreground py-8 text-center">
              <ShoppingCart className="mx-auto mb-2 h-8 w-8 opacity-50" />
              <p className="mb-3 text-sm">No services selected</p>
              <Button variant="outline" size="sm" onClick={handleAddMore} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Browse Services
              </Button>
            </div>
          ) : (
            <>
              <div className="max-h-60 space-y-2 overflow-y-auto">
                {selectedServices.map(service => (
                  <div
                    key={service.id}
                    className="bg-card hover:bg-muted/50 flex cursor-pointer items-center justify-between rounded-sm border p-2 transition-colors"
                    onClick={() => handleServiceClick(service.id)}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{service.name}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={e => {
                        e.stopPropagation();
                        handleRemoveService(service.id);
                      }}
                      className="hover:bg-destructive/20 text-destructive ml-2 h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex gap-2">
                <Button variant="default" className="flex-1" onClick={handleViewCSP}>
                  <Eye className="mr-2 h-4 w-4" />
                  View CSP
                </Button>
                <Button variant="outline" onClick={handleAddMore}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
