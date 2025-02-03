export interface UserMetadata {
  lastLoginAt: string;
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
  Metadata: UserMetadata;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}
