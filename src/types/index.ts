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
  imageVersion: number;
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

export type ExpireMode = (typeof ExpireMode)[keyof typeof ExpireMode];

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

export interface BranchDashboardStats {
  id: string;
  initial: string;
  name: string;
  branchId: string;
  isActive: boolean;
  branchName: string;
  totalUsers: number;
  totalProducts: number;
  totalFeedbacks: number;
  isDisplayed: boolean;
}

export interface EndUserStats {
  id: string;
  endUser: EndUser;
  totalUniqueBrands: number;
}

export interface EndUser {
  id: string;
  name: string;
  mobile: string;
  email: string;
  gender: string;
  address: string;
  dateOfBirth: string;
  profilePictureURL: string;
  otpVerifiedAt: string;
  totalCoinsEarned: number;
  totalCoinsRedeemed: number;
  createdAt: string;
  updatedAt: string;
}

export enum SupportLevel {
  BASIC = 1, // Basic support
  PRIORITY = 2, // Priority support
  TWENTY_FOUR_SEVEN = 3, // 24/7 support
}

export enum AnalyticsLevel {
  BASIC = 1, // Basic analytics
  PRO = 2, // Pro analytics
  ADVANCED = 3, // Advanced analytics
}

export enum ExportDataLevel {
  PREFILLED_TEMPLATES = 1, // Prefilled templates
  CUSTOM_TEMPLATES = 2, // Custom templates
  CUSTOM_TEMPLATES_WITH_AI = 3, // Custom templates with AI
}

export interface Plan {
  id: string; // Unique identifier for the plan
  name: string; // Name of the plan
  description: string; // Description of the plan
  infoText: string; // Additional information about the plan
  price: number; // Price of the plan
  status: string; // e.g., "active", "inactive"
  isPopular: boolean; // Indicates if the plan is popular
  createdAt: string; // Creation timestamp
  updatedAt: string; // Last updated timestamp
  ordinal: number;

  // Usage Limits
  maxBranches: number; // -1 indicates unlimited, 0 indicates disabled
  maxUsers: number; // -1 indicates unlimited, 0 indicates disabled
  maxProducts: number; // -1 indicates unlimited, 0 indicates disabled
  maxQRcodes: number; // -1 indicates unlimited, 0 indicates disabled
  maxStorage: number; // in GB, -1 indicates unlimited
  maxAPIRequests: number; // -1 indicates unlimited, 0 indicates disabled
  allowedFeatures: string[]; // List of features allowed in this plan
  maxFeedbacks: number; // -1 indicates unlimited, 0 indicates disabled
  maxCoupons: number; // -1 indicates unlimited, 0 indicates disabled
  maxDiscounts: number; // -1 indicates unlimited, 0 indicates disabled
  supportLevel: SupportLevel; // Support level using enum
  analyticsLevel: AnalyticsLevel; // Analytics level using enum
  exportDataLevel: ExportDataLevel; // Export data level using enum
  // Feature Flags (boolean toggles for features)
  themeCustomization: boolean; // Indicates if theme customization is enabled
  enableRewards: boolean; // Indicates if rewards are enabled
  enableOIDC: boolean; // Indicates if OIDC is enabled
  enableMultipleBranches: boolean; // Indicates if multiple branches are enabled
  enableMFASupport: boolean; // Indicates if MFA support is enabled
}

export interface Coupon {
  id: string;
  company: string;
  value: number;
  title: string;
  active: boolean;
  zunoValue: number;
  theme: {
    color: string;
    image: string;
    link: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Organization {
  id: string;
  orgId: string;
  slug: string;
  name: string;
  type: string;
  subdomain: string;
  isSingleBranch: boolean;
  noOfBranches: number;
  address: string;
  global_settings: {
    id: string;
    organizationId: string;
  };
  theme: {
    id: string;
    organizationId: string;
    logo: string;
  };
  subscription: {
    id: string;
    organizationId: string;
    planId: string;
    plan: {
      id: string;
      createdAt: string;
      updatedAt: string;
    };
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
  };
  plan_id: string;
  owner_id: string;
  gstin: string;
  tin: string;
  created_at: string;
  updated_at: string;
}
