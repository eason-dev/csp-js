import { config } from "@repo/eslint-config/base";

export default [
  ...config,
  {
    ignores: ["src/services-bundle.ts"]
  }
];