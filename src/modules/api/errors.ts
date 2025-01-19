import { ApiError } from './types';

export class NetworkError extends Error implements ApiError {
  status?: number;
  code: string;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'NetworkError';
    this.status = status;
    this.code = 'NETWORK_ERROR';
  }
}

export class TimeoutError extends Error implements ApiError {
  code: string;

  constructor(message: string = 'Request timeout') {
    super(message);
    this.name = 'TimeoutError';
    this.code = 'TIMEOUT';
  }
}

export class ValidationError extends Error implements ApiError {
  code: string;
  data: any;

  constructor(message: string, data?: any) {
    super(message);
    this.name = 'ValidationError';
    this.code = 'VALIDATION_ERROR';
    this.data = data;
  }
}

export function isApiError(error: any): error is ApiError {
  return error && typeof error.code === 'string';
}