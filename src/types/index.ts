export interface UserMetadata {
  lastLoginAt: string;
  profilePictureURL: string;
  designation: string;
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  mobile: string;
  otp: string;
  otpVerified: boolean;
  otpVerifiedAt: string;
  metadata: UserMetadata;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface LoggedInUser {
  memberships: Membership[];
  user: User;
}

export interface Membership {
  branchId: string;
  branchName: string;
  roleId: string;
  roleName: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: LoggedInUser;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  isMain: boolean;
  orgId: string;
  active: boolean;
  managerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrgContextType {
  branch: Branch | null;
  setBranch: (branch: Branch | null) => void;
  branches: Branch[];
  refreshBranches: () => Promise<void>;
  orgId: string;
}

export interface BranchStats {
  totalFeedbacks: number;
  rewardedEndUsers: number;
  totalCoinsGiven: number;
  averageFeedback: number;
  positiveFeedback: number;
  negativeFeedback: number;
}

export interface FeedbackReport {
  productId: string;
  avgRating: number;
  productName: string;
}
export interface FeedbackReportData extends FeedbackReport {
  label: string;
  value: number;
}

export interface FeedbackSummaryResponse {
  totalFeedbacks: number;
  averageRating: number;
  positiveRate: number;
  negativeRate: number;
  positiveFeedbacks: number;
  negativeFeedbacks: number;
}

export interface Product {
  id: string;
  name: string;
  categoryId: number;
  branchId: string;
  originalCategory: string;
}

export interface OcrProcessingResponse {
  message: string;
  status: string;
  batch_id: string;
}

export interface SseMenuParserData {
  batchId: string;
  orgId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  batchEndedAt: string;
  response: SseMenuInternalResponse;
}

export interface SseMenuInternalResponse {
  Response: string;
  BatchID: string;
}

export interface SseHeartbeatData {
  data: string; // "keep-alive"
}

export interface SseMenuParserResponse {
  Response: string; // JSON string of products
  BatchID: string;
}

export interface RolePermission {
  key: string;
  label: string;
  disabled?: boolean;
  code: string;
}

export interface PermissionGroup {
  id: string;
  title: string;
  permissions: RolePermission[];
}

export interface BranchMember {
  id: string;
  userId: string;
  orgId: string;
  branchId: string;
  role: string;
  roleExpiresAt: string;
  expireMode: ExpireMode;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const ExpireMode = {
  INFINITE: 'infinite',
  FINITE: 'finite',
} as const;

export type ExpireMode = typeof ExpireMode[keyof typeof ExpireMode];

export interface BranchMemberResponse {
  id: string;
  userId: string;
  orgId: string;
  branchId: string;
  roleId: string;
  roleExpiresAt: string;
  expireMode: ExpireMode;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
  role: Role;
}

export interface Role {
  id?: string;
  description: string;
  name: string;
  permissions: string[];
  status: string;
}

export interface InviteFormData {
  username: string;
  email: string;
  contact: string;
  branch: string;
  role: string;
}