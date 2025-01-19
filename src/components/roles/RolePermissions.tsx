import React from 'react';
import { RolePermissions as IRolePermissions } from '../../types/role';
import Checkbox from '../ui/Checkbox';
import { ActionContainer } from '../containers';

interface PermissionGroup {
  id: string;
  title: string;
  permissions: {
    key: keyof IRolePermissions;
    label: string;
    disabled?: boolean;
  }[];
}

interface RolePermissionsProps {
  permissions: IRolePermissions;
  onPermissionChange: (key: keyof IRolePermissions) => void;
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
        { key: 'viewRole', label: 'View Role' },
        { key: 'modifyRole', label: 'Modify Role' },
        { key: 'deleteRole', label: 'Delete Role' },
        { key: 'addNewRole', label: 'Add New Role' },
      ],
    },
    {
      id: 'brand-product',
      title: 'Brand/Product',
      permissions: [
        { key: 'viewProduct', label: 'View Product' },
        { key: 'modifyProduct', label: 'Modify Product' },
        { key: 'deleteProduct', label: 'Delete Product' },
        { key: 'addProduct', label: 'Add Product' },
        { key: 'viewProduct', label: 'Category change option' },
        {
          key: 'modifyProduct',
          label: 'Priority change option',
          disabled: true,
        },
      ],
    },
    {
      id: 'transaction',
      title: 'Transaction Management',
      permissions: [
        { key: 'viewTransaction', label: 'View Transaction' },
        { key: 'exportTransaction', label: 'Export Transaction' },
        { key: 'deleteTransaction', label: 'Delete Transaction' },
        { key: 'managePayments', label: 'Manage Payments' },
      ],
    },
    {
      id: 'settings',
      title: 'Settings Management',
      permissions: [
        { key: 'viewSettings', label: 'View Settings' },
        { key: 'modifySettings', label: 'Modify Settings' },
        { key: 'manageIntegrations', label: 'Manage Integrations' },
        { key: 'manageNotifications', label: 'Manage Notifications' },
      ],
    },
  ];

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
                      checked={permissions[permission.key]}
                      onChange={() => onPermissionChange(permission.key)}
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
