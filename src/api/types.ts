export interface ApiError extends Error {
  status?: number;
  code?: string;
  data?: any;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  headers?: Headers;
}

export interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
  timeout?: number;
}

export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export const RolePermissionEnum = {
  PermissionAdminFull: 'admin:full',
  PermissionOwnerFull: 'owner:full',

  PermissionUserView: 'user:view',
  PermissionUserRead: 'user:read',
  PermissionUserWrite: 'user:write',
  PermissionUserDelete: 'user:delete',

  PermissionRoleCreate: 'role:create',
  PermissionRoleUpdate: 'role:update',
  PermissionRoleView: 'role:view',
  PermissionRoleDelete: 'role:delete',

  PermissionBranchCreate: 'branch:create',
  PermissionBranchUpdate: 'branch:update',
  PermissionBranchView: 'branch:view',
  PermissionBranchDelete: 'branch:delete',

  PermissionOrganizationCreate: 'organization:create',
  PermissionOrganizationUpdate: 'organization:update',
  PermissionOrganizationView: 'organization:view',
  PermissionOrganizationDelete: 'organization:delete',

  PermissionPlanCreate: 'plan:create',
  PermissionPlanUpdate: 'plan:update',
  PermissionPlanView: 'plan:view',
  PermissionPlanDelete: 'plan:delete',

  PermissionSubscriptionCreate: 'subscription:create',
  PermissionSubscriptionUpdate: 'subscription:update',
  PermissionSubscriptionView: 'subscription:view',
  PermissionSubscriptionDelete: 'subscription:delete',

  PermissionRewardSetupCreate: 'rewardSetup:create',
  PermissionRewardSetupUpdate: 'rewardSetup:update',
  PermissionRewardSetupView: 'rewardSetup:view',
  PermissionRewardSetupDelete: 'rewardSetup:delete',

  PermissionCouponCreate: 'coupon:create',
  PermissionCouponUpdate: 'coupon:update',
  PermissionCouponView: 'coupon:view',
  PermissionCouponDelete: 'coupon:delete',

  PermissionRedemptionCreate: 'redemption:create',
  PermissionRedemptionUpdate: 'redemption:update',
  PermissionRedemptionView: 'redemption:view',
  PermissionRedemptionDelete: 'redemption:delete',

  PermissionMembershipCreate: 'membership:create',
  PermissionMembershipUpdate: 'membership:update',
  PermissionMembershipView: 'membership:view',
  PermissionMembershipDelete: 'membership:delete',

  PermissionMemberInviteCreate: 'memberInvite:create',
  PermissionMemberInviteUpdate: 'memberInvite:update',
  PermissionMemberInviteView: 'memberInvite:view',
  PermissionMemberInviteDelete: 'memberInvite:delete',

  PermissionProductCreate: 'product:create',
  PermissionProductUpdate: 'product:update',
  PermissionProductView: 'product:view',
  PermissionProductDelete: 'product:delete',

  PermissionDiscountCreate: 'discount:create',
  PermissionDiscountUpdate: 'discount:update',
  PermissionDiscountView: 'discount:view',
  PermissionDiscountDelete: 'discount:delete',

  PermissionProductFeedbackCreate: 'productFeedback:create',
  PermissionProductFeedbackUpdate: 'productFeedback:update',
  PermissionProductFeedbackView: 'productFeedback:view',
  PermissionProductFeedbackDelete: 'productFeedback:delete',

  PermissionFeedbackCreate: 'feedback:create',
  PermissionFeedbackUpdate: 'feedback:update',
  PermissionFeedbackView: 'feedback:view',
  PermissionFeedbackDelete: 'feedback:delete',

  PermissionEndUserCreate: 'endUser:create',
  PermissionEndUserUpdate: 'endUser:update',
  PermissionEndUserView: 'endUser:view',
  PermissionEndUserDelete: 'endUser:delete',
};

export interface NewCustomRole {
  name: string;
  tags: string;
  createdBy: string;
  notes: string;
  status: string;
}
