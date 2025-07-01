import { Shield, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface FooterProps {
  serviceCount?: number;
}

export function Footer({ serviceCount }: FooterProps) {
  return (
    <footer className="border-t bg-muted/30 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">CSP Kit</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The easiest way to generate Content Security Policy headers for your web applications.
            </p>
            <div className="flex gap-2">
              <a
                href="https://github.com/eason-dev/csp-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
                aria-label="GitHub Repository"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Tools */}
          <div className="space-y-4">
            <h3 className="font-semibold">Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  CSP Generator
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-foreground">
                  All Services
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.npmjs.com/package/@csp-kit/generator" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  NPM Package
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                  Documentation
                </Link>
              </li>
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  CSP Reference
                </a>
              </li>
              <li>
                <a
                  href="https://content-security-policy.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  CSP Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/eason-dev/csp-kit/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  MIT License
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/eason-dev/csp-kit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Source Code
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/eason-dev/csp-kit/issues/new?assignees=&labels=service-request&template=service-request.md&title=Request%20Support%20for%20%5BService%20Name%5D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Request Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 CSP Kit. Made with ❤️ for web security.
          </p>
          {serviceCount && (
            <p className="text-sm text-muted-foreground">
              Supporting {serviceCount} services and counting.
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}