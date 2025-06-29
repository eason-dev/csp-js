import type { ServiceDefinition, ServiceVersion } from '@csp-js/data';

/**
 * CLI Command options
 */
export interface AddServiceOptions {
  interactive?: boolean;
  file?: string;
}

export interface UpdateServiceOptions {
  version?: string;
  interactive?: boolean;
  file?: string;
}

export interface ValidateDataOptions {
  service?: string;
}

export interface CheckServiceOptions {
  url?: string;
  version?: string;
}

/**
 * Service check result
 */
export interface ServiceCheckResult {
  serviceId: string;
  version: string;
  success: boolean;
  errors: string[];
  warnings: string[];
  detectedCSP?: Record<string, string[]>;
  comparisonResult?: {
    missing: Record<string, string[]>;
    extra: Record<string, string[]>;
    matches: Record<string, string[]>;
  };
}

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  serviceResults?: Record<string, ServiceCheckResult>;
}

/**
 * Git operation result
 */
export interface GitOperationResult {
  success: boolean;
  message: string;
  branchName?: string;
  commitHash?: string;
  pullRequestUrl?: string;
}

/**
 * Service update data
 */
export interface ServiceUpdateData {
  service: ServiceDefinition;
  version?: string;
  reason: string;
  breaking: boolean;
  autoDetected: boolean;
}