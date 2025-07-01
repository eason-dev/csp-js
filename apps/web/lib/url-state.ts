/**
 * URL state management utilities for CSP Generator
 */

export interface CSPState {
  selectedServices: string[];
  serviceVersions: Record<string, string>;
  useNonce: boolean;
  reportUri: string;
  customRules: Record<string, string>;
}

export const DEFAULT_STATE: CSPState = {
  selectedServices: [],
  serviceVersions: {},
  useNonce: false,
  reportUri: '',
  customRules: {
    'script-src': '',
    'style-src': '',
    'img-src': '',
    'connect-src': '',
    'font-src': '',
    'frame-src': '',
    'media-src': '',
    'object-src': '',
  },
};

/**
 * Encode state to URL search params
 */
export function encodeStateToURL(state: Partial<CSPState>): URLSearchParams {
  const params = new URLSearchParams();
  
  if (state.selectedServices?.length) {
    params.set('services', state.selectedServices.join(','));
  }
  
  if (state.serviceVersions && Object.keys(state.serviceVersions).length > 0) {
    params.set('versions', JSON.stringify(state.serviceVersions));
  }
  
  if (state.useNonce) {
    params.set('nonce', 'true');
  }
  
  if (state.reportUri) {
    params.set('reportUri', state.reportUri);
  }
  
  if (state.customRules) {
    const nonEmptyRules = Object.fromEntries(
      Object.entries(state.customRules).filter(([, value]) => value.trim())
    );
    if (Object.keys(nonEmptyRules).length > 0) {
      params.set('customRules', JSON.stringify(nonEmptyRules));
    }
  }
  
  return params;
}

/**
 * Decode state from URL search params
 */
export function decodeStateFromURL(searchParams: URLSearchParams): Partial<CSPState> {
  const state: Partial<CSPState> = {};
  
  const services = searchParams.get('services');
  if (services) {
    state.selectedServices = services.split(',').filter(Boolean);
  }
  
  const versions = searchParams.get('versions');
  if (versions) {
    try {
      state.serviceVersions = JSON.parse(versions);
    } catch (e) {
      console.warn('Failed to parse service versions from URL:', e);
    }
  }
  
  const nonce = searchParams.get('nonce');
  if (nonce === 'true') {
    state.useNonce = true;
  }
  
  const reportUri = searchParams.get('reportUri');
  if (reportUri) {
    state.reportUri = reportUri;
  }
  
  const customRules = searchParams.get('customRules');
  if (customRules) {
    try {
      state.customRules = { ...DEFAULT_STATE.customRules, ...JSON.parse(customRules) };
    } catch (e) {
      console.warn('Failed to parse custom rules from URL:', e);
    }
  }
  
  return state;
}

/**
 * Session storage utilities
 */
export const SESSION_STORAGE_KEY = 'csp-kit-state';

export function saveStateToSession(state: Partial<CSPState>): void {
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save state to session storage:', e);
  }
}

export function loadStateFromSession(): Partial<CSPState> {
  try {
    const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Failed to load state from session storage:', e);
  }
  return {};
}

/**
 * Recently used services utilities
 */
const RECENT_SERVICES_KEY = 'csp-kit-recent-services';
const MAX_RECENT_SERVICES = 8;

export function addToRecentServices(serviceId: string): void {
  try {
    const recent = getRecentServices();
    const updated = [serviceId, ...recent.filter(id => id !== serviceId)].slice(0, MAX_RECENT_SERVICES);
    sessionStorage.setItem(RECENT_SERVICES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to save recent service:', e);
  }
}

export function getRecentServices(): string[] {
  try {
    const saved = sessionStorage.getItem(RECENT_SERVICES_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Failed to load recent services:', e);
  }
  return [];
}