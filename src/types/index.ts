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
