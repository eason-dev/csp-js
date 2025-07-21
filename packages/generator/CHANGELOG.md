# @csp-kit/generator

## 0.5.0

### Minor Changes

- Remove warnings system from CSP generation

  The `warnings` property has been removed from the `CSPResult` interface. The CSP generator now focuses purely on generating working CSP headers without educational warnings.
  - Remove warnings property from CSPResult interface
  - Remove warnings generation logic from generateCSP function
  - Remove validateDirectives function
  - Simplify service processing by removing conflict/deprecation warnings
  - Remove security warnings for unsafe directives

  This change simplifies the API and improves developer experience by eliminating distracting warnings that interrupted the workflow.

## 0.4.0

### Minor Changes

- [#100](https://github.com/eason-dev/csp-kit/pull/100) [`74ade57`](https://github.com/eason-dev/csp-kit/commit/74ade573a16f807d7303473e4876352d4494abb0) Thanks [@eason-dev](https://github.com/eason-dev)! - Simplify CSP API with direct boolean flags

  Replace abstract security levels with intuitive boolean flags for better control over CSP generation:
  - Add `includeSelf`, `includeUnsafeInline`, and `includeUnsafeEval` boolean options
  - Change default behavior: `includeSelf` now defaults to `false` for more secure CSP generation
  - Add UI toggles in web app Advanced Configuration section
  - Remove `securityLevel` option (breaking change)

  **Breaking Changes:**
  - Removed `securityLevel` option, replaced with direct boolean flags
  - `includeSelf` now defaults to `false` instead of `true`

  **Migration:**

  ```typescript
  // Before
  generateCSP({ services: [GoogleAnalytics], securityLevel: 'strict' });

  // After
  generateCSP({
    services: [GoogleAnalytics],
    includeSelf: false,
    includeUnsafeInline: false,
    includeUnsafeEval: false,
  });
  ```

## 0.3.0

### Minor Changes

- [#80](https://github.com/eason-dev/csp-kit/pull/80) [`466f7ab`](https://github.com/eason-dev/csp-kit/commit/466f7abe21ecbea122deb960a76c9da0ed2de64e) Thanks [@eason-dev](https://github.com/eason-dev)! - feat: minimal defineService API with variable names as identifiers

  Dramatically simplified the public `defineService` API to focus on essential CSP generation with only the `directives` field required. Variable names now serve as service identifiers, eliminating redundancy and cognitive overhead.

  **Breaking Changes:**
  - `defineService` now only requires `directives` field
  - Variable names become service identifiers (use camelCase)
  - Removed need for `id`, `name`, `category`, and other metadata fields in custom services

  **Migration Guide:**

  ```typescript
  // Before
  const MyService = defineService({
    id: 'my-service',
    name: 'My Service',
    category: ServiceCategory.API,
    directives: { 'script-src': ['https://api.example.com'] },
  });

  // After
  const myService = defineService({
    directives: { 'script-src': ['https://api.example.com'] },
  });
  ```

  This change makes the library significantly easier to use while maintaining full TypeScript support and compatibility with the existing generator.

### Patch Changes

- Updated dependencies [[`466f7ab`](https://github.com/eason-dev/csp-kit/commit/466f7abe21ecbea122deb960a76c9da0ed2de64e)]:
  - @csp-kit/data@0.3.0
