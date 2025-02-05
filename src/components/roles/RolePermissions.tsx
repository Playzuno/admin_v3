import React from 'react';
import Checkbox from '../ui/Checkbox';
import { ActionContainer } from '../containers';
import { RolePermissionEnum } from '@/api/types';
import { PermissionGroup, RolePermission } from '@/types';

interface RolePermissionsProps {
  permissions: string[];
  onPermissionChange: (permission: RolePermission) => void;
  onCancel: () => void;
  onSave: () => void;
  showActions: boolean;
  isSaving: boolean;
}

const RolePermissions: React.FC<RolePermissionsProps> = ({
  permissions,
  onPermissionChange,
  onCancel,
  onSave,
  showActions,
  isSaving,
}) => {
  const permissionGroups: PermissionGroup[] = [
    {
      id: 'super-admin',
      title: 'Super Admin Access',
      permissions: [
        {
          key: 'viewRole',
          label: 'View Role',
          code: RolePermissionEnum.PermissionRoleView,
        },
        {
          key: 'modifyRole',
          label: 'Modify Role',
          code: RolePermissionEnum.PermissionRoleUpdate,
        },
        {
          key: 'deleteRole',
          label: 'Delete Role',
          code: RolePermissionEnum.PermissionRoleDelete,
        },
        {
          key: 'addNewRole',
          label: 'Add New Role',
          code: RolePermissionEnum.PermissionRoleCreate,
        },
      ],
    },
    {
      id: 'brand-product',
      title: 'Brand/Product',
      permissions: [
        {
          key: 'viewProduct',
          label: 'View Product',
          code: RolePermissionEnum.PermissionProductView,
        },
        {
          key: 'modifyProduct',
          label: 'Modify Product',
          code: RolePermissionEnum.PermissionProductUpdate,
        },
        {
          key: 'deleteProduct',
          label: 'Delete Product',
          code: RolePermissionEnum.PermissionProductDelete,
        },
        {
          key: 'addProduct',
          label: 'Add Product',
          code: RolePermissionEnum.PermissionProductCreate,
        },
        {
          key: 'viewProduct',
          label: 'Category change option',
          code: RolePermissionEnum.PermissionProductView,
        },
        {
          key: 'modifyProduct',
          label: 'Priority change option',
          disabled: true,
          code: RolePermissionEnum.PermissionProductUpdate,
        },
      ],
    },
    {
      id: 'feedback',
      title: 'Feedback Management',
      permissions: [
        {
          key: 'viewFeedback',
          label: 'View Feedback',
          code: RolePermissionEnum.PermissionFeedbackView,
        },
        {
          key: 'updateFeedback',
          label: 'Update Feedback',
          code: RolePermissionEnum.PermissionFeedbackUpdate,
        },
        {
          key: 'deleteFeedback',
          label: 'Delete Feedback',
          code: RolePermissionEnum.PermissionFeedbackDelete,
        },
      ],
    },
    {
      id: 'settings',
      title: 'Settings Management',
      permissions: [
        {
          key: 'viewSettings',
          label: 'View Settings',
          code: RolePermissionEnum.PermissionOrganizationView,
        },
        {
          key: 'modifySettings',
          label: 'Modify Settings',
          code: RolePermissionEnum.PermissionOrganizationUpdate,
        },
        {
          key: 'manageIntegrations',
          label: 'Manage Integrations',
          code: RolePermissionEnum.PermissionOrganizationView,
        },
        {
          key: 'manageNotifications',
          label: 'Manage Notifications',
          code: RolePermissionEnum.PermissionOrganizationView,
        },
      ],
    },
    {
      id: 'user',
      title: 'User Management',
      permissions: [
        {
          key: 'viewUser',
          label: 'View User',
          code: RolePermissionEnum.PermissionUserView,
        },
        {
          key: 'createUser',
          label: 'Create User',
          code: RolePermissionEnum.PermissionUserWrite,
        },
        // {
        //   key: 'updateUser',
        //   label: 'Update User',
        //   code: RolePermissionEnum.PermissionUserWrite,
        // },
        {
          key: 'deleteUser',
          label: 'Delete User',
          code: RolePermissionEnum.PermissionUserDelete,
        },
      ],
    },
    {
      id: 'branch',
      title: 'Branch Management',
      permissions: [
        {
          key: 'createBranch',
          label: 'Create Branch',
          code: RolePermissionEnum.PermissionBranchCreate,
        },
        {
          key: 'updateBranch',
          label: 'Update Branch',
          code: RolePermissionEnum.PermissionBranchUpdate,
        },
        {
          key: 'viewBranch',
          label: 'View Branch',
          code: RolePermissionEnum.PermissionBranchView,
        },
        {
          key: 'deleteBranch',
          label: 'Delete Branch',
          code: RolePermissionEnum.PermissionBranchDelete,
        },
      ],
    },
    {
      id: 'organization',
      title: 'Organization Management',
      permissions: [
        {
          key: 'createOrganization',
          label: 'Create Organization',
          code: RolePermissionEnum.PermissionOrganizationCreate,
        },
        {
          key: 'updateOrganization',
          label: 'Update Organization',
          code: RolePermissionEnum.PermissionOrganizationUpdate,
        },
        {
          key: 'viewOrganization',
          label: 'View Organization',
          code: RolePermissionEnum.PermissionOrganizationView,
        },
        {
          key: 'deleteOrganization',
          label: 'Delete Organization',
          code: RolePermissionEnum.PermissionOrganizationDelete,
        },
      ],
    },
    {
      id: 'subscription',
      title: 'Subscription Management',
      permissions: [
        {
          key: 'createSubscription',
          label: 'Create Subscription',
          code: RolePermissionEnum.PermissionSubscriptionCreate,
        },
        {
          key: 'updateSubscription',
          label: 'Update Subscription',
          code: RolePermissionEnum.PermissionSubscriptionUpdate,
        },
        {
          key: 'viewSubscription',
          label: 'View Subscription',
          code: RolePermissionEnum.PermissionSubscriptionView,
        },
        {
          key: 'deleteSubscription',
          label: 'Delete Subscription',
          code: RolePermissionEnum.PermissionSubscriptionDelete,
        },
      ],
    },
    {
      id: 'coupon',
      title: 'Coupon Management',
      permissions: [
        {
          key: 'createCoupon',
          label: 'Create Coupon',
          code: RolePermissionEnum.PermissionCouponCreate,
        },
        {
          key: 'updateCoupon',
          label: 'Update Coupon',
          code: RolePermissionEnum.PermissionCouponUpdate,
        },
        {
          key: 'viewCoupon',
          label: 'View Coupon',
          code: RolePermissionEnum.PermissionCouponView,
        },
        {
          key: 'deleteCoupon',
          label: 'Delete Coupon',
          code: RolePermissionEnum.PermissionCouponDelete,
        },
      ],
    },
    {
      id: 'rewardSetup',
      title: 'Reward Setup Management',
      permissions: [
        {
          key: 'createRewardSetup',
          label: 'Create Reward Setup',
          code: RolePermissionEnum.PermissionRewardSetupCreate,
        },
        {
          key: 'updateRewardSetup',
          label: 'Update Reward Setup',
          code: RolePermissionEnum.PermissionRewardSetupUpdate,
        },
        {
          key: 'viewRewardSetup',
          label: 'View Reward Setup',
          code: RolePermissionEnum.PermissionRewardSetupView,
        },
        {
          key: 'deleteRewardSetup',
          label: 'Delete Reward Setup',
          code: RolePermissionEnum.PermissionRewardSetupDelete,
        },
      ],
    },
    {
      id: 'memberInvite',
      title: 'Member Invite Management',
      permissions: [
        {
          key: 'createMemberInvite',
          label: 'Create Member Invite',
          code: RolePermissionEnum.PermissionMemberInviteCreate,
        },
        {
          key: 'updateMemberInvite',
          label: 'Update Member Invite',
          code: RolePermissionEnum.PermissionMemberInviteUpdate,
        },
        {
          key: 'viewMemberInvite',
          label: 'View Member Invite',
          code: RolePermissionEnum.PermissionMemberInviteView,
        },
        {
          key: 'deleteMemberInvite',
          label: 'Delete Member Invite',
          code: RolePermissionEnum.PermissionMemberInviteDelete,
        },
      ],
    },
    {
      id: 'discount',
      title: 'Discount Management',
      permissions: [
        {
          key: 'createDiscount',
          label: 'Create Discount',
          code: RolePermissionEnum.PermissionDiscountCreate,
        },
        {
          key: 'updateDiscount',
          label: 'Update Discount',
          code: RolePermissionEnum.PermissionDiscountUpdate,
        },
        {
          key: 'viewDiscount',
          label: 'View Discount',
          code: RolePermissionEnum.PermissionDiscountView,
        },
        {
          key: 'deleteDiscount',
          label: 'Delete Discount',
          code: RolePermissionEnum.PermissionDiscountDelete,
        },
      ],
    },
    {
      id: 'endUser',
      title: 'End User Management',
      permissions: [
        {
          key: 'createEndUser',
          label: 'Create End User',
          code: RolePermissionEnum.PermissionEndUserCreate,
        },
        {
          key: 'updateEndUser',
          label: 'Update End User',
          code: RolePermissionEnum.PermissionEndUserUpdate,
        },
        {
          key: 'viewEndUser',
          label: 'View End User',
          code: RolePermissionEnum.PermissionEndUserView,
        },
        {
          key: 'deleteEndUser',
          label: 'Delete End User',
          code: RolePermissionEnum.PermissionEndUserDelete,
        },
      ],
    },
  ];
  const permissionMap: Record<string, boolean> = permissionGroups.reduce(
    (acc, group) => {
      group.permissions.forEach(permission => {
        acc[permission.key] = permissions.includes(permission.code);
      });
      return acc;
    },
    {} as Record<string, boolean>
  );

  return (
    <ActionContainer
      title={<div className="text-xs">Roles</div>}
      onCancel={showActions ? onCancel : undefined}
      onSave={showActions ? onSave : undefined}
    >
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-12 p-6">
            {permissionGroups.map(group => (
              <div key={group.id} className="space-y-6">
                <h4 className="text-base">{group.title}</h4>
                <div className="grid grid-cols-4 gap-8">
                  {group.permissions.map((permission, index) => (
                    <Checkbox
                      key={`${group.id}-${permission.key}-${index}`}
                      label={permission.label}
                      checked={permissionMap[permission.key]}
                      onChange={() => onPermissionChange(permission)}
                      disabled={permission.disabled || isSaving}
                      size="sm"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ActionContainer>
  );
};

export default RolePermissions;
