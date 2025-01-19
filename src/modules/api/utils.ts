import { RequestConfig } from './types';

export function buildUrl(baseURL: string, path: string, params?: Record<string, string>): string {
  const url = new URL(path, baseURL);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value);
      }
    });
  }
  
  return url.toString();
}

export function createAbortController(timeout?: number): AbortController {
  const controller = new AbortController();
  
  if (timeout) {
    setTimeout(() => controller.abort(), timeout);
  }
  
  return controller;
}

export function mergeHeaders(
  defaultHeaders: Record<string, string> = {},
  requestHeaders: HeadersInit = {}
): Headers {
  const merged = new Headers();
  
  // Add default headers
  Object.entries(defaultHeaders).forEach(([key, value]) => {
    merged.append(key, value);
  });
  
  // Add request-specific headers
  const headers = new Headers(requestHeaders);
  headers.forEach((value, key) => {
    merged.set(key, value);
  });
  
  return merged;
}

export function parseResponse(response: Response): Promise<any> {
  const contentType = response.headers.get('content-type');
  
  if (contentType?.includes('application/json')) {
    return response.json();
  }
  
  if (contentType?.includes('text/')) {
    return response.text();
  }
  
  return response.blob();
}