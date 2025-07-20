---
"@csp-kit/generator": minor
"web": minor
---

Simplify CSP API with direct boolean flags

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
  includeUnsafeEval: false 
});
```