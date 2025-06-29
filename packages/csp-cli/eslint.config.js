import { config } from '@repo/eslint-config/base.js';

export default [
  ...config,
  {
    ignores: ['dist/**'],
  },
];