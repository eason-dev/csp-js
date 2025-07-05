'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface SelectedService {
  id: string;
  name: string;
}

interface SelectedServicesContextType {
  selectedServices: SelectedService[];
  addService: (service: SelectedService) => void;
  removeService: (serviceId: string) => void;
  clearServices: () => void;
  isSelected: (serviceId: string) => boolean;
  getSelectedServiceIds: () => string[];
}

const SelectedServicesContext = createContext<SelectedServicesContextType | undefined>(undefined);

const STORAGE_KEY = 'csp-kit-selected-services';

interface SelectedServicesProviderProps {
  children: ReactNode;
}

export function SelectedServicesProvider({ children }: SelectedServicesProviderProps) {
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSelectedServices(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error('Error loading selected services from storage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever selectedServices changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedServices));
      } catch (error) {
        console.error('Error saving selected services to storage:', error);
      }
    }
  }, [selectedServices, isLoaded]);

  const addService = (service: SelectedService) => {
    setSelectedServices(prev => {
      const exists = prev.find(s => s.id === service.id);
      if (exists) return prev; // Don't add duplicates
      return [...prev, service];
    });
  };

  const removeService = (serviceId: string) => {
    setSelectedServices(prev => prev.filter(s => s.id !== serviceId));
  };

  const clearServices = () => {
    setSelectedServices([]);
  };

  const isSelected = (serviceId: string) => {
    return selectedServices.some(s => s.id === serviceId);
  };

  const getSelectedServiceIds = () => {
    return selectedServices.map(s => s.id);
  };

  const value: SelectedServicesContextType = {
    selectedServices,
    addService,
    removeService,
    clearServices,
    isSelected,
    getSelectedServiceIds,
  };

  // Don't render children until we've loaded from localStorage
  if (!isLoaded) {
    return null;
  }

  return (
    <SelectedServicesContext.Provider value={value}>{children}</SelectedServicesContext.Provider>
  );
}

export function useSelectedServices() {
  const context = useContext(SelectedServicesContext);
  if (context === undefined) {
    throw new Error('useSelectedServices must be used within a SelectedServicesProvider');
  }
  return context;
}
