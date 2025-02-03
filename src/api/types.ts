export interface ApiError extends Error {
  status?: number;
  code?: string;
  data?: any;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  headers?: Headers;
}

export interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
  timeout?: number;
}

export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}