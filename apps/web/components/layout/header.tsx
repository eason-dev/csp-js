'use client';

import { usePathname } from 'next/navigation';
import { Shield, Package, BookOpen, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { ServiceCart } from '@/components/header/service-cart';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();

  const isActivePage = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">CSP Kit</h1>
          </Link>
          
          <nav className="hidden md:flex items-center gap-2">
            <Link href="/">
              <Button 
                variant={isActivePage('/') ? 'default' : 'ghost'} 
                size="sm"
                className={cn(
                  isActivePage('/') && 'bg-primary text-primary-foreground'
                )}
              >
                <Zap className="h-4 w-4 mr-2" />
                Generator
              </Button>
            </Link>
            <Link href="/services">
              <Button 
                variant={isActivePage('/services') ? 'default' : 'ghost'} 
                size="sm"
                className={cn(
                  isActivePage('/services') && 'bg-primary text-primary-foreground'
                )}
              >
                <Package className="h-4 w-4 mr-2" />
                All Services
              </Button>
            </Link>
            <Link href="/docs" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Docs
              </Button>
            </Link>
            <ServiceCart />
            <ThemeToggle />
          </nav>
          
          <div className="md:hidden flex items-center gap-2">
            <ServiceCart />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}