import Link from 'next/link';
import { Button } from '@repo/ui/button';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>
            CSP-JS Documentation
          </h1>
          <p className={styles.description}>
            Comprehensive documentation for CSP-JS - Generate Content Security Policy headers for popular web services
          </p>
        </div>

        <div className={styles.grid}>
          <Link href="/guides" className={styles.card}>
            <h2>📚 Guides</h2>
            <p>Learn how to use CSP-JS effectively with step-by-step guides and examples.</p>
          </Link>

          <Link href="/api" className={styles.card}>
            <h2>📋 API Reference</h2>
            <p>Complete API documentation for all CSP-JS packages and methods.</p>
          </Link>

          <Link href="/services" className={styles.card}>
            <h2>🛠️ Service Definitions</h2>
            <p>Browse all supported services and their CSP requirements.</p>
          </Link>

          <Link href="/contributing" className={styles.card}>
            <h2>🤝 Contributing</h2>
            <p>Learn how to contribute service definitions and improve the library.</p>
          </Link>
        </div>

        <div className={styles.quickStart}>
          <h2>Quick Start</h2>
          <div className={styles.codeBlock}>
            <pre><code>{`npm install csp-js

import { generateCSP } from 'csp-js';

const result = generateCSP([
  'google-analytics',
  'stripe',
  'youtube'
]);

console.log(result.header);
// Content-Security-Policy: script-src 'self' https://www.googletagmanager.com...`}</code></pre>
          </div>
        </div>

        <div className={styles.links}>
          <a
            href="https://github.com/easonz/csp-js"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            🔗 GitHub Repository
          </a>
          <a
            href="https://www.npmjs.com/package/csp-js"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            📦 NPM Package
          </a>
          <a
            href="https://csp-js.dev"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            🌐 Web Interface
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Built with ❤️ for web security</p>
        <div className={styles.footerLinks}>
          <a href="/guides/architecture">Architecture</a>
          <a href="/guides/service-definitions">Service Definitions</a>
          <a href="/guides/maintainer-guide">Maintainer Guide</a>
          <a href="/guides/release-process">Release Process</a>
        </div>
      </footer>
    </div>
  );
}