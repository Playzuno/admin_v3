import React from 'react';
import { RolePermissions as IRolePermissions } from '../../types/role';
import Checkbox from '../ui/Checkbox';

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
        { key: 'modifyProduct', label: 'Priority change option', disabled: true },
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
    <div className="flex flex-col h-[calc(100vh-16rem)]">
      <div className="h-16 flex justify-between items-center px-6 bg-gray-50 border-b">
        <h3 className="text-xl font-semibold">Roles</h3>
        <div className={`transition-opacity duration-200 ${showActions ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center space-x-4">
            <button
              onClick={onCancel}
              className="h-9 px-6 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="h-9 px-6 bg-secondary text-white rounded-lg hover:bg-secondary-600 transition-colors flex items-center space-x-2"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-12 p-6">
          {permissionGroups.map(group => (
            <div key={group.id} className="space-y-6">
              <h4 className="text-2xl font-semibold">{group.title}</h4>
              <div className="grid grid-cols-4 gap-8">
                {group.permissions.map((permission, index) => (
                  <Checkbox
                    key={`${group.id}-${permission.key}-${index}`}
                    label={permission.label}
                    checked={permissions[permission.key]}
                    onChange={() => onPermissionChange(permission.key)}
                    disabled={permission.disabled || isSaving}
                    size="lg"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RolePermissions;