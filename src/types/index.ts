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
