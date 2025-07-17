import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const FirebaseAuth = defineServiceInternal({
  id: 'firebase-auth',
  name: 'Firebase Authentication',
  category: ServiceCategory.OTHER,
  description: "Google's authentication service for web and mobile apps",
  website: 'https://firebase.google.com/products/auth',
  officialDocs: [
    'https://firebase.google.com/docs/auth/web/start',
    'https://firebase.google.com/docs/hosting/content-security-policy',
  ],
  directives: {
    'script-src': ['https://firebase.googleapis.com', 'https://www.gstatic.com'],
    'connect-src': ['https://identitytoolkit.googleapis.com', 'https://securetoken.googleapis.com'],
  },
  notes:
    'Firebase Authentication service by Google. Social providers may require additional domains. FirebaseUI requires additional script sources. Custom domains need separate configuration.',
  aliases: ['firebase-authentication', 'google-firebase-auth'],
  lastUpdated: '2024-06-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
