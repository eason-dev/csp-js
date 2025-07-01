'use client';

import { Shield, Package, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';

interface HeaderProps {
  showAllServicesLink?: boolean;
}

export function Header({ showAllServicesLink = true }: HeaderProps) {
  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">CSP Kit</h1>
          </Link>
          
          <nav className="hidden md:flex items-center gap-4">
            {showAllServicesLink && (
              <Link href="/services">
                <Button variant="ghost" size="sm">
                  <Package className="h-4 w-4 mr-2" />
                  All Services
                </Button>
              </Link>
            )}
            <Link href="/docs" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Docs
              </Button>
            </Link>
            <ThemeToggle />
          </nav>
          
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}