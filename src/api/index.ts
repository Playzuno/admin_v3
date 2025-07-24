import {
  Branch,
  BranchDashboardStats,
  BranchMemberResponse,
  BranchStats,
  Coupon,
  AssetV2,
  EndUserStats,
  FeedbackReport,
  FeedbackSummaryResponse,
  LoginResponse,
  OcrProcessingResponse,
  Organization,
  Plan,
  Product,
  SseMenuInternalResponse,
  SseMenuParserData,
} from '@/types';
import { ApiClient, ApiClientWithoutToken } from './client';
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
const baseURL = import.meta.env.VITE_API_URL + '/v1';
// Create and export the default API client instance
export const api = new ApiClient({
  baseURL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
  },
});

export const apiWithoutToken = new ApiClientWithoutToken({
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
      const response = await api.put(`/organizations/${id}`, data);
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
  getBranchDashboard: async (
    orgId: string
  ): Promise<{
    data: { branches: BranchDashboardStats[] };
    status: number;
    headers?: Headers;
  }> => {
    try {
      const token = getBearerToken();
      if (!token) {
        throw new ApiError('Unauthorized', 'UNAUTHORIZED');
      }
      const response = await api.get<{ branches: BranchDashboardStats[] }>(
        `/organizations/${orgId}/branches/dashboard`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  getActiveJobs: async (
    branchId: string,
    filters: {
      jobType?: string;
      entityId?: string;
      entityType?: string;
    }
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.post<any>(
        `/branches/${branchId}/jobs/active`,
        filters
      );
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
  getOrganization: async (): Promise<{
    data: Organization;
    status: number;
    headers?: Headers;
  }> => {
    try {
      const token = getBearerToken();
      if (!token) {
        throw new ApiError('Unauthorized', 'UNAUTHORIZED');
      }
      const response = await api.get<Organization>('/users/me/organization', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  forceUpdatePassword: async ({
    password,
    confirmPassword,
  }: {
    password: string;
    confirmPassword: string;
  }): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.post('/users/me/forceUpdatePassword', {
        password,
        confirmPassword,
      });
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  forgotPassword: async ({
    email,
  }: {
    email: string;
  }): Promise<{ data: any; status: number; headers?: Headers }> => {
    const response = await api.post('/resetpassword', { email });
    return response;
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
  ): Promise<{ data: Branch[]; status: number; headers?: Headers }> => {
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
      const response = await api.post(
        `/organizations/${orgId}/branches`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
        `/organizations/${orgId}/branches/${id}`,
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
        `/organizations/${orgId}/branches/${id}`,
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
  ): Promise<{
    data: BranchMemberResponse[];
    status: number;
    headers?: Headers;
  }> => {
    try {
      const response = await api.get<BranchMemberResponse[]>(
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
  getById: async (
    branchId: string,
    productId: string
  ): Promise<{ data: Product; status: number; headers?: Headers }> => {
    try {
      const response = await api.get<Product>(
        `/branches/${branchId}/products/${productId}`
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
    data: SseMenuParserData[] | undefined;
    status: number;
    headers?: Headers;
  }> => {
    try {
      const response = await api.get<SseMenuParserData[] | undefined>(
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
    data: EndUserStats[];
    status: number;
    headers?: Headers;
  }> => {
    try {
      const response = await api.get<EndUserStats[]>('/endusers');
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
  ): Promise<{ data: Coupon; status: number; headers?: Headers }> => {
    try {
      const response = await api.post<Coupon>('/coupons', data);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  get: async (
    id: string
  ): Promise<{ data: Coupon; status: number; headers?: Headers }> => {
    try {
      const response = await api.get<Coupon>(`/coupons/${id}`);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  getAll: async (): Promise<{
    data: Coupon[];
    status: number;
    headers?: Headers;
  }> => {
    try {
      const response = await api.get<Coupon[]>('/coupons');
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  update: async (
    id: string,
    data: any
  ): Promise<{ data: Partial<Coupon>; status: number; headers?: Headers }> => {
    try {
      const response = await api.put<Coupon>(`/coupons/${id}`, data);
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
    data: Plan[];
    status: number;
    headers?: Headers;
  }> => {
    try {
      const response = await api.get<Plan[]>('/plans');
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
  ): Promise<{ data: Partial<Plan>; status: number; headers?: Headers }> => {
    try {
      const response = await api.put<Plan>(`/plans/${planId}`, data);
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

// Assets V2 APIs
export const assetV2Api = {
  create: async (
    data: AssetV2
  ): Promise<{  data: any; status: number }> => {
    try {
      const response = await api.post<AssetV2>('/assets/getUploadURL', data);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  uploadAsset: async (
    endPoint: string,
    data: any
  ): Promise<{  data: any; status: number }> => {
    try {
      const response = await apiWithoutToken.put(endPoint, data, {headers: {
        'Content-Type': data.type || 'application/octet-stream',
      }});
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

export const assetsApi = {
  getUserUploadUrl: async (
    userId: string
  ): Promise<{
    data: { presignedURL: string };
    status: number;
    headers?: Headers;
  }> => {
    try {
      const response = await api.get<{ presignedURL: string }>(
        `/assets/users/${userId}/upload/profile`
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  getOrganizationLogoPresignedUrl: async (
    orgId: string
  ): Promise<{
    data: { presignedURL: string };
    status: number;
    headers?: Headers;
  }> => {
    try {
      const response = await api.get<{ presignedURL: string }>(
        `/assets/organizations/${orgId}/logo`
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  refreshOrganizationLogo: async (
    orgId: string
  ): Promise<{
    data: { presignedURL: string };
    status: number;
    headers?: Headers;
  }> => {
    try {
      const response = await api.post<{ presignedURL: string }>(
        `/assets/organizations/${orgId}/logo/refresh`
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
};

export const objectDetectionApi = {
  startSession: async (
    branchId: string
  ): Promise<{
    data: any;
    status: number;
    headers?: Headers;
  }> => {
    try {
      const response = await api.get(`/od/branches/${branchId}/sessions/start`);
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  getProductFrames: async (
    branchId: string,
    productId: string
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.get(
        `/od/branches/${branchId}/products/${productId}/frames`
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  extractFrames: async (
    branchId: string,
    productId: string
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    try {
      const response = await api.get(
        `/od/branches/${branchId}/products/${productId}/video/extractFrames`
      );
      return response;
    } catch (error) {
      throw handleRequestError(error);
    }
  },
  uploadAnnotatedImage: async (
    branchId: string,
    productId: string,
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    const response = await api.post(
      `/od/branches/${branchId}/products/${productId}/frames/sam2_process`,
      data
    );

    return response;
  },
  deleteFrames: async (
    branchId: string,
    productId: string,
    frameIds: string[]
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    const response = await api.delete(
      `/od/branches/${branchId}/products/${productId}/frames`,
      { body: JSON.stringify({ frames: frameIds }) }
    );
    return response;
  },
  saveAnnotation: async (
    branchId: string,
    productId: string,
    annotationData: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    const response = await api.post(
      `/od/branches/${branchId}/products/${productId}/frames/sam2_process`,
      JSON.stringify(annotationData)
    );
    return response;
  },
  trainModel: async (
    branchId: string,
    data: any
  ): Promise<{ data: any; status: number; headers?: Headers }> => {
    const response = await api.post(
      `/od/branches/${branchId}/model/train`,
      data
    );
    return response;
  },
};
