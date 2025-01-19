import { ApiClientConfig, RequestConfig, ApiResponse, ApiError } from './types';
import { NetworkError, TimeoutError, ValidationError } from './errors';
import { buildUrl, createAbortController, mergeHeaders, parseResponse } from './utils';

export class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private defaultTimeout: number;

  constructor(config: ApiClientConfig) {
    this.baseURL = config.baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...config.headers,
    };
    this.defaultTimeout = config.timeout || 30000;
  }

  async request<T>(path: string, config: RequestConfig = {}): Promise<ApiResponse<T>> {
    try {
      const url = buildUrl(this.baseURL, path, config.params);
      const controller = createAbortController(config.timeout || this.defaultTimeout);
      
      const response = await fetch(url, {
        ...config,
        headers: mergeHeaders(this.defaultHeaders, config.headers),
        signal: controller.signal,
      });

      const data = await parseResponse(response);

      if (!response.ok) {
        throw this.handleErrorResponse(response, data);
      }

      return {
        data,
        status: response.status,
        headers: response.headers,
      };
    } catch (error: any) {
      throw this.handleRequestError(error);
    }
  }

  async get<T>(path: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...config, method: 'GET' });
  }

  async post<T>(path: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(path, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(path: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(path, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async patch<T>(path: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(path, {
      ...config,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(path: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...config, method: 'DELETE' });
  }

  private handleErrorResponse(response: Response, data: any): ApiError {
    switch (response.status) {
      case 400:
        return new ValidationError('Invalid request', data);
      case 401:
        return new NetworkError('Unauthorized', 401);
      case 403:
        return new NetworkError('Forbidden', 403);
      case 404:
        return new NetworkError('Not found', 404);
      case 422:
        return new ValidationError('Validation failed', data);
      case 429:
        return new NetworkError('Too many requests', 429);
      default:
        return new NetworkError(
          data?.message || 'An unexpected error occurred',
          response.status
        );
    }
  }

  private handleRequestError(error: any): ApiError {
    if (error.name === 'AbortError') {
      return new TimeoutError();
    }
    
    if (error instanceof ApiError) {
      return error;
    }

    return new NetworkError(
      error.message || 'Network request failed'
    );
  }
}