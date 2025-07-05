'use client';

import { usePathname } from 'next/navigation';
import { Shield, Package, BookOpen, Zap, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { ServiceCart } from '@/components/header/service-cart';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActivePage = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    // Special case: highlight "All Services" when on individual service pages
    if (path === '/services') {
      return pathname.startsWith('/services') || pathname.startsWith('/service/');
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <Shield className="text-primary h-8 w-8" />
            <h1 className="text-2xl font-bold">CSP Kit</h1>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className={cn(
                'hover:text-primary flex items-center gap-2 text-sm font-medium transition-colors',
                isActivePage('/') ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Zap className="h-4 w-4" />
              Generator
            </Link>
            <Link
              href="/services"
              className={cn(
                'hover:text-primary flex items-center gap-2 text-sm font-medium transition-colors',
                isActivePage('/services') ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Package className="h-4 w-4" />
              All Services
            </Link>
            <Link
              href="/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              Docs
            </Link>
            <ServiceCart />
            <ThemeToggle />
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ServiceCart />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="bg-background/95 border-t backdrop-blur-sm md:hidden">
          <div className="container mx-auto space-y-2 px-4 py-4">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant={isActivePage('/') ? 'default' : 'ghost'}
                size="sm"
                className={cn(
                  'w-full justify-start',
                  isActivePage('/') && 'bg-primary text-primary-foreground'
                )}
              >
                <Zap className="mr-2 h-4 w-4" />
                Generator
              </Button>
            </Link>
            <Link href="/services" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant={isActivePage('/services') ? 'default' : 'ghost'}
                size="sm"
                className={cn(
                  'w-full justify-start',
                  isActivePage('/services') && 'bg-primary text-primary-foreground'
                )}
              >
                <Package className="mr-2 h-4 w-4" />
                All Services
              </Button>
            </Link>
            <Link
              href="/docs"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <BookOpen className="mr-2 h-4 w-4" />
                Docs
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
