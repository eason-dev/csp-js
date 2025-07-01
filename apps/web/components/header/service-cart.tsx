'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, X, Plus, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {selectedServices.length > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {selectedServices.length}
            </Badge>
          )}
          <span className="ml-2 hidden sm:inline">
            My Services
          </span>
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
                <Trash2 className="h-4 w-4 mr-1" />
                Clear all
              </Button>
            )}
          </div>

          {selectedServices.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <ShoppingCart className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm mb-3">No services selected</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleAddMore}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Browse Services
              </Button>
            </div>
          ) : (
            <>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {selectedServices.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center justify-between p-2 rounded border bg-card"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{service.name}</p>
                      {service.version && (
                        <p className="text-xs text-muted-foreground">v{service.version}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveService(service.id)}
                      className="h-6 w-6 p-0 hover:bg-destructive/20 text-destructive ml-2"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex gap-2">
                <Button 
                  variant="default" 
                  className="flex-1" 
                  onClick={handleViewCSP}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View CSP
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleAddMore}
                >
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