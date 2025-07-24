import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { ApiClientConfig, RequestConfig, ApiResponse } from './types';
import { NetworkError, TimeoutError, ValidationError } from './errors';

interface ApiError extends Error {
  status?: number;
  code?: string;
  data?: any;
}

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('orgId');
  if (window.location.pathname !== '/login') {
    window.location.href = '/login';
  }
};

// shared handler
const handleError = (error: AxiosError): ApiError => {
  if (error.code === 'ECONNABORTED') {
    return new TimeoutError();
  }

  const response = error.response;
  if (response) {
    const data = response.data;
    switch (response.status) {
      case 400:
        return new ValidationError('Invalid request', data);
      case 401:
        logout();
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
        return new NetworkError(data?.message || 'An unexpected error occurred', response.status);
    }
  } else {
    return new NetworkError(error.message || 'Network request failed');
  }
};

// shared request
const makeRequest = async <T>(
  instance: AxiosInstance,
  path: string,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> => {
  try {
    const axiosConfig: AxiosRequestConfig = {
      method: config.method || 'GET',
      url: path,
      params: config.params,
      data: config.body,
      timeout: config.timeout,
      headers: config.headers,
    };

    const response: AxiosResponse<T> = await instance.request(axiosConfig);

    return {
      data: response.data,
      status: response.status,
      headers: response.headers,
    };
  } catch (error: any) {
    throw handleError(error);
  }
};

export class ApiClient {
  private instance: AxiosInstance;

  constructor(config: ApiClientConfig) {
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 30000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    this.instance.interceptors.request.use(config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });
  }

  async request<T>(path: string, config: RequestConfig = {}): Promise<ApiResponse<T>> {
    return makeRequest<T>(this.instance, path, config);
  }

  async get<T>(path: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...config, method: 'GET' });
  }

  async post<T>(path: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...config, method: 'POST', body: data });
  }

  async put<T>(path: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...config, method: 'PUT', body: data });
  }

  async patch<T>(path: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...config, method: 'PATCH', body: data });
  }

  async delete<T>(path: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...config, method: 'DELETE' });
  }
}

export class ApiClientWithoutToken {
  private instanceWithoutToken: AxiosInstance;

  constructor(config: ApiClientConfig) {
    this.instanceWithoutToken = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 30000,
      withCredentials: false,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });
  }

  async request<T>(path: string, config: RequestConfig = {}): Promise<ApiResponse<T>> {
    return makeRequest<T>(this.instanceWithoutToken, path, config);
  }

  async put<T>(path: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...config, method: 'PUT', body: data });
  }
}
