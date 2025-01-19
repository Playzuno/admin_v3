import { ApiClient } from './client';

// Create and export the default API client instance
export const api = new ApiClient({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 30000,
  headers: {
    'Accept': 'application/json',
  },
});

// Re-export types and utilities
export * from './types';
export * from './errors';
export * from './utils';
export { ApiClient };