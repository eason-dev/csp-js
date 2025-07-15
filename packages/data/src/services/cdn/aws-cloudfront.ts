import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const AwsCloudfront = defineService({
  id: 'aws-cloudfront',
  name: 'AWS CloudFront',
  category: ServiceCategory.CDN,
  description: 'Amazon Web Services content delivery network',
  website: 'https://aws.amazon.com/cloudfront/',
  officialDocs: [
    'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-responseheaderspolicy-contentsecuritypolicy.html',
    'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example_cloudfront_functions_add_security_headers_section.html',
  ],
  directives: {
    'script-src': ['https://*.cloudfront.net'],
    'connect-src': ['https://*.cloudfront.net'],
    'img-src': ['https://*.cloudfront.net'],
    'style-src': ['https://*.cloudfront.net'],
  },
  notes:
    'AWS CloudFront verified from official documentation. CSP headers configured via Response Headers Policies (recommended), CloudFront Functions, or Lambda@Edge. CloudFormation ContentSecurityPolicy resource available. CSP header limited to 1784 characters (can be raised via support ticket). Managed and custom response header policies supported. Multiple implementation methods: console, CLI, CloudFormation, API.',
  aliases: ['cloudfront'],
  lastUpdated: '2025-06-29T00:00:00Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
