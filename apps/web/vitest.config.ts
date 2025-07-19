import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './test/setup.ts',
    exclude: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/e2e/**',
      '**/*.e2e.spec.{js,ts,tsx}',
      '**/*.spec.{js,ts,tsx}',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '.next/',
        'dist/',
        '**/*.d.ts',
        '**/*.config.*',
        'components/ui/**', // Skip UI components as they're from Radix
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
