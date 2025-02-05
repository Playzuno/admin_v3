import {
  Branch,
  BranchMember,
  BranchStats,
  FeedbackReport,
  FeedbackSummaryResponse,
  LoggedInUser,
  LoginResponse,
  OcrProcessingResponse,
  Product,
  SseMenuInternalResponse,
  SseMenuParserData,
} from '@/types';
import { ApiClient } from './client';
import { Role } from '@/types/role';

export interface ApiErrorType extends Error {
  status?: number;
  code?: string;
  data?: any;
}

export class ApiError implements ApiErrorType {
  name = 'ApiError';
  message: string;
  status?: number;
  code?: string;
  data?: any;

  constructor(message: string, code?: string, status?: number, data?: any) {
    this.message = message;
    this.code = code;
    this.status = status;
    this.data = data;
  }
}

const getBearerToken = (): string | null => {
  return localStorage.getItem('token');
};
const baseURL = 'http://localhost:8080/api/v1';
// Create and export the default API client instance
export const api = new ApiClient({
  baseURL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
  },
});

const handleRequestError = (error: any): ApiError => {
  if (error.name === 'AbortError') {
    return new ApiError('Request timeout', 'TIMEOUT');
  }
  if (error instanceof ApiError) {
    return error;
  }
  if (error.response && error.response.data && error.response.data.error) {
    return new ApiError(
      error.response.data.error,
      error.response.status.toString()
    );
  }
  return new ApiError(
    error.message || 'Network request failed',
    'NETWORK_ERROR'
  );
};

// Organization APIs
export const organizationApi = {
  getAll: async (): Promise<{
    data: any[];
    status: number;
    headers?: Headers;
  }> => {
    try {
      const response = await api.get('/organizations');
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  create: async (
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.post('/organizations', data);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  update: async (
    id: string,
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.put(`/organization/${id}`, data);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  delete: async (
    id: string
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.delete(`/organization/${id}`);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  get: async (
    id: string
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.get(`/organizations/${id}`);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  getActiveSubscription: async (
    id: string
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.get(`/organizations/${id}/subscription`);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  getSubscriptionHistory: async (
    id: string
  ): Promise<{ data: any[]; status: number; headers?: Headers }> => {
    try {
      const response = await api.get(
        `/organizations/${id}/subscription/history`
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  resetSubscription: async (
    id: string
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.post(
        `/organizations/${id}/subscription/reset`
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  switchPlan: async (
    id: string,
    planId: string
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.put(`/organizations/${id}/subscription`, {
        planId,
      });
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
};

// User APIs
export const userApi = {
  getAll: async (): Promise<{
    data: any[];
    status: number;
    headers?: Headers;
  }> => {
    try {
      const response = await api.get('/users');
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  create: async (
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.post('/users', data);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  update: async (
    id: string,
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.put(`/users/${id}`, data);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  delete: async (
    id: string
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  get: async (): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.get<LoginResponse>(`/users/me/memberships`);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
};

// Roles APIs
export const roleApi = {
  getAll: async (
    branchId: string
  ): Promise<{ data: Role[]; status: number; headers?: Headers }> => {
    try {
      const token = getBearerToken();
      if (!token) {
        throw new ApiError('Unauthorized', 'UNAUTHORIZED');
      }
      const response = await api.get<Role[]>(`/branches/${branchId}/roles`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  populate: async (
    orgId: string,
    branchId: string
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.post(
        `/organizations/${orgId}/branches/${branchId}/init/roles`
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  create: async (
    branchId: string,
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const token = getBearerToken();
      if (!token) {
        throw new ApiError('Unauthorized', 'UNAUTHORIZED');
      }
      const response = await api.post(`/branches/${branchId}/roles`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  update: async (
    branchId: string,
    id: string,
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const token = getBearerToken();
      if (!token) {
        throw new ApiError('Unauthorized', 'UNAUTHORIZED');
      }
      const response = await api.put(
        `/branches/${branchId}/roles/${id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  getAllPermissions: async (
    branchId: string
  ): Promise<{ data: any[]; status: number; headers?: Headers }> => {
    try {
      const response = await api.get(`/branches/${branchId}/roles/permissions`);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
};

// Auth APIs
export const authApi = {
  signIn: async (
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', data, {
        credentials: 'include',
      });
      // Store token in localStorage after successful login
      if (response.status === 200 && response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  resetPassword: async (
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.post('/resetpassword', data);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  requestPasswordChange: async (
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.post('/requestpasswordchange', data);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  changePassword: async (
    data: any,
    token: string
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.post('/changepassword', data, {
        headers: { resettoken: token },
      });
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  verifyOtp: async (
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.post('/verifyotp', data);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
};

// Branch APIs
export const branchApi = {
  getAll: async (
    orgId: string
  ): Promise<{ data: any[]; status: number; headers?: Headers }> => {
    try {
      const response = await api.get<Branch[]>(
        `/organizations/${orgId}/branches`
      );
      console.log(response.data);
      return {
        data: response.data,
        status: response.status,
        headers: response.headers,
      };
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  create: async (
    orgId: string,
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const token = getBearerToken();
      if (!token) {
        throw new ApiError('Unauthorized', 'UNAUTHORIZED');
      }
      const response = await api.post(`/organization/${orgId}/branches`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  delete: async (
    orgId: string,
    id: string
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const token = getBearerToken();
      if (!token) {
        throw new ApiError('Unauthorized', 'UNAUTHORIZED');
      }
      const response = await api.delete(
        `/organization/${orgId}/branches/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  update: async (
    orgId: string,
    id: string,
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const token = getBearerToken();
      if (!token) {
        throw new ApiError('Unauthorized', 'UNAUTHORIZED');
      }
      const response = await api.put(
        `/organization/${orgId}/branches/${id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
};

// Member APIs
export const memberApi = {
  getAll: async (
    orgId: string,
    branchId: string
  ): Promise<{ data: BranchMember[]; status: number; headers?: Headers }> => {
    try {
      const response = await api.get<BranchMember[]>(
        `/organizations/${orgId}/branches/${branchId}/members`
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  addToBranch: async (
    branchId: string,
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const token = getBearerToken();
      if (!token) {
        throw new ApiError('Unauthorized', 'UNAUTHORIZED');
      }
      const response = await api.post(`/branches/${branchId}/members`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  removeFromBranch: async (
    branchId: string,
    userId: string
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const token = getBearerToken();
      if (!token) {
        throw new ApiError('Unauthorized', 'UNAUTHORIZED');
      }
      const response = await api.delete(
        `/branches/${branchId}/members/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  update: async (
    branchId: string,
    userId: string,
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const token = getBearerToken();
      if (!token) {
        throw new ApiError('Unauthorized', 'UNAUTHORIZED');
      }
      const response = await api.put(
        `/branches/${branchId}/members/${userId}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
};

// Invite APIs
export const inviteApi = {
  inviteUser: async (
    orgId: string,
    branchId: string,
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const token = getBearerToken();
      if (!token) {
        throw new ApiError('Unauthorized', 'UNAUTHORIZED');
      }
      const response = await api.post(
        `/organizations/${orgId}/branches/${branchId}/invite`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  verifyInvite: async (
    branchId: string,
    token: string
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.get(`/branches/${branchId}/invite/${token}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  registerUserByInvite: async (
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.post('/register/invite', data);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  addUserByInvite: async (
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.post('/add/invite', data);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
};

// Product APIs
export const productApi = {
  getAll: async (
    branchId: string
  ): Promise<{ data: Product[]; status: number; headers?: Headers }> => {
    try {
      const response = await api.get<Product[]>(
        `/branches/${branchId}/products`
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  create: async (
    branchId: string,
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.post(`/branches/${branchId}/products`, data);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  update: async (
    branchId: string,
    productId: string,
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.put(
        `/branches/${branchId}/products/${productId}`,
        data
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  delete: async (
    branchId: string,
    productId: string
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.delete(
        `/branches/${branchId}/products/${productId}`
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  bulkInsert: async (
    branchId: string,
    data: any
  ): Promise<{ data: any[]; status: number; headers?: Headers }> => {
    try {
      const token = getBearerToken();
      if (!token) {
        throw new ApiError('Unauthorized', 'UNAUTHORIZED');
      }
      const response = await api.post(
        `/branches/${branchId}/products/bulk`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  bulkUpdate: async (
    branchId: string,
    data: any
  ): Promise<{ data: any[]; status: number; headers?: Headers }> => {
    try {
      const token = getBearerToken();
      if (!token) {
        throw new ApiError('Unauthorized', 'UNAUTHORIZED');
      }
      const response = await api.put(
        `/branches/${branchId}/products/bulk`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  bulkDelete: async (
    branchId: string,
    data: any
  ): Promise<{ data: any[]; status: number; headers?: Headers }> => {
    try {
      const token = getBearerToken();
      if (!token) {
        throw new ApiError('Unauthorized', 'UNAUTHORIZED');
      }
      const response = await api.delete(`/branches/${branchId}/products/bulk`, {
        body: JSON.stringify(data),
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  parseMenuUsingAI: async (
    data: any
  ): Promise<{
    data: OcrProcessingResponse;
    status: number;
    headers?: Headers;
  }> => {
    try {
      const response = await api.post<OcrProcessingResponse>(
        '/ai/menu/parse',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 400000,
        }
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
    // const eventSource = new EventSource(`${baseURL}/ai/menu/parse`, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    //   timeout: 400000,
    // });

    // eventSource.onmessage = event => {
    //   console.log('New message:', event.data);
    //   // Handle the incoming data
    // };

    // eventSource.onerror = error => {
    //   console.error('EventSource failed:', error);
    //   eventSource.close();
    // };

    // return eventSource;
  },
  getMenuParserStatus: async (
    batchId: string,
    onMessage: (data: SseMenuParserData | SseMenuInternalResponse) => void,
    onError: (error: any) => void
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const eventSource = new EventSource(
        `${baseURL}/ai/menu/parse/${batchId}/status`
      );

      eventSource.onmessage = event => {
        const data = JSON.parse(event.data);
        onMessage(data);
      };

      eventSource.onerror = error => {
        onError(error);
        eventSource.close();
      };

      return { data: null, status: 200 };
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  cancelQueue: async (
    orgId: string,
    branchId: string,
    batchId: string
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.post(
        `/organizations/${orgId}/branches/${branchId}/parser/${batchId}/cancel`
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  cancelAllQueues: async (
    orgId: string,
    branchId: string
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.post(
        `/organizations/${orgId}/branches/${branchId}/parser/cancelAll`
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  getMenuParserQueues: async (
    orgId: string,
    branchId: string
  ): Promise<{
    data: SseMenuParserData[];
    status: number;
    headers?: Headers;
  }> => {
    try {
      const response = await api.get<SseMenuParserData[]>(
        `/organizations/${orgId}/branches/${branchId}/parser/list`
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  markQueueAsProcessed: async (
    orgId: string,
    branchId: string,
    batchId: string
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const token = getBearerToken();
      if (!token) {
        throw new ApiError('Unauthorized', 'UNAUTHORIZED');
      }
      const response = await api.post(
        `/organizations/${orgId}/branches/${branchId}/parser/${batchId}/markProcessed`,
        {}, // Assuming no body is needed, adjust if necessary
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
};

// End User APIs
export const endUserApi = {
  getAll: async (): Promise<{
    data: any[];
    status: number;
    headers?: Headers;
  }> => {
    try {
      const response = await api.get('/endusers');
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  create: async (
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.post('/endusers', data);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  get: async (
    id: string
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.get(`/endusers/${id}`);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  update: async (
    id: string,
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.put(`/endusers/${id}`, data);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  delete: async (
    id: string
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.delete(`/endusers/${id}`);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  register: async (
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.post('/endusers/register', data);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  verifyOtp: async (
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.post('/endusers/verify', data);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
};

// Feedback APIs
export const feedbackApi = {
  getProductFeedbacksForBranch: async (
    branchId: string
  ): Promise<{ data: any[]; status: number; headers?: Headers }> => {
    try {
      const response = await api.get(`/productFeedbacks/branch/${branchId}`);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  createProductFeedback: async (
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.post('/productFeedbacks', data);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  deleteProductFeedback: async (
    id: string
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.delete(`/productFeedbacks/${id}`);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  getAllFeedbacksForBranch: async (
    branchId: string
  ): Promise<{ data: any[]; status: number; headers?: Headers }> => {
    try {
      const response = await api.get(`/feedbacks/branch/${branchId}`);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  createFeedback: async (
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.post('/feedbacks', data);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  getFeedback: async (
    id: string
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.get(`/feedbacks/${id}`);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  deleteFeedback: async (
    id: string
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.delete(`/feedbacks/${id}`);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
};

// Redemption APIs
export const redemptionApi = {
  getAll: async (): Promise<{
    data: any[];
    status: number;
    headers?: Headers;
  }> => {
    try {
      const response = await api.get('/redemptions');
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  create: async (
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.post('/redemptions', data);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  getByUser: async (
    userId: string
  ): Promise<{ data: any[]; status: number; headers?: Headers }> => {
    try {
      const response = await api.get(`/redemptions/${userId}`);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
};

// Coupon APIs
export const couponApi = {
  create: async (
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.post('/coupons', data);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  get: async (
    id: string
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.get(`/coupons/${id}`);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  getAll: async (): Promise<{
    data: any[];
    status: number;
    headers?: Headers;
  }> => {
    try {
      const response = await api.get('/coupons');
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  update: async (
    id: string,
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.put(`/coupons/${id}`, data);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  delete: async (
    id: string
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.delete(`/coupons/${id}`);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
};

// Rewards and Plans APIs
export const rewardsAndPlansApi = {
  getRewardSetup: async (
    branchId: string
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.get(`/rewardSetups/${branchId}`);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  createRewardSetup: async (
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.post('/rewardSetups', data);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  updateRewardSetup: async (
    id: string,
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.put(`/rewardSetups/${id}`, data);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  deleteRewardSetup: async (
    id: string
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.delete(`/rewardSetups/${id}`);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  getPlan: async (
    planId: string
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.get(`/plans/${planId}`);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  getAllPlans: async (): Promise<{
    data: any[];
    status: number;
    headers?: Headers;
  }> => {
    try {
      const response = await api.get('/plans');
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  createPlan: async (
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.post('/plans', data);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  updatePlan: async (
    planId: string,
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.put(`/plans/${planId}`, data);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  deletePlan: async (
    id: string
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.delete(`/plans/${id}`);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
};

// Analytics APIs
export const analyticsApi = {
  getFeedbackReport: async (
    branchId: string,
    period: string,
    type: string
  ): Promise<{ data: FeedbackReport[]; status: number; headers?: Headers }> => {
    try {
      const response = await api.get<FeedbackReport[]>(
        `/analytics/branches/${branchId}/feedbacks/report`,
        {
          params: { period, type },
        }
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  getFeedbackSummary: async (
    branchId: string
  ): Promise<{
    data: FeedbackSummaryResponse;
    status: number;
    headers?: Headers;
  }> => {
    try {
      const response = await api.get<FeedbackSummaryResponse>(
        `/analytics/branches/${branchId}/feedbacks/summary`
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  getActiveBranches: async (
    orgId: string
  ): Promise<{ data: any[]; status: number; headers?: Headers }> => {
    try {
      const response = await api.get(
        `/analytics/organization/${orgId}/activeBranches`
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  getBranchStats: async (
    branchId: string
  ): Promise<{ data: BranchStats; status: number; headers?: Headers }> => {
    try {
      const response = await api.get<BranchStats>(
        `/analytics/branches/${branchId}`
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
};
