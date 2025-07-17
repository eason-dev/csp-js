---
"@csp-kit/generator": minor
"@csp-kit/data": minor
---

feat: minimal defineService API with variable names as identifiers

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
  directives: { 'script-src': ['https://api.example.com'] }
});

// After
const myService = defineService({
  directives: { 'script-src': ['https://api.example.com'] }
});
```

This change makes the library significantly easier to use while maintaining full TypeScript support and compatibility with the existing generator.
