import React from 'react';
import { RolePermissions as IRolePermissions } from '../../types/role';
import Checkbox from '../ui/Checkbox';

interface RolePermissionsProps {
  permissions: IRolePermissions;
  onPermissionChange: (key: keyof IRolePermissions) => void;
}

const RolePermissions: React.FC<RolePermissionsProps> = ({
  permissions,
  onPermissionChange,
}) => {
  return (
    <div className="space-y-8">
      <div className="px-6">
        <h3 className="text-xl font-semibold mb-6">Roles</h3>
      </div>

      <div className="space-y-8">
        {/* Super Admin Access Section */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold px-6">Super Admin Access</h4>
          <div className="grid grid-cols-4 gap-x-4 gap-y-6 px-6">
            <Checkbox
              label="View Role"
              checked={permissions.viewRole}
              onChange={() => onPermissionChange('viewRole')}
            />
            <Checkbox
              label="Modify Role"
              checked={permissions.modifyRole}
              onChange={() => onPermissionChange('modifyRole')}
            />
            <Checkbox
              label="Delete Role"
              checked={permissions.deleteRole}
              onChange={() => onPermissionChange('deleteRole')}
            />
            <Checkbox
              label="Add New Role"
              checked={permissions.addNewRole}
              onChange={() => onPermissionChange('addNewRole')}
            />
          </div>
        </div>

        {/* Brand/Product Section */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold px-6">Brand/Product</h4>
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-x-4 px-6">
              <div className="space-y-6">
                <Checkbox
                  label="View Product"
                  checked={permissions.viewProduct}
                  onChange={() => onPermissionChange('viewProduct')}
                />
                <Checkbox
                  label="Category change option"
                  checked={permissions.viewProduct}
                  onChange={() => onPermissionChange('viewProduct')}
                  className="ml-6"
                />
                <Checkbox
                  label="Priority change option"
                  checked={false}
                  onChange={() => {}}
                  className="ml-6 opacity-50"
                  disabled
                />
              </div>
              <div className="space-y-6">
                <Checkbox
                  label="Modify Product"
                  checked={false}
                  onChange={() => {}}
                  disabled
                />
                <Checkbox
                  label="Priority change option"
                  checked={false}
                  onChange={() => {}}
                  className="ml-6 opacity-50"
                  disabled
                />
              </div>
              <div className="space-y-6">
                <Checkbox
                  label="Delete Product"
                  checked={false}
                  onChange={() => {}}
                  disabled
                />
              </div>
              <div className="space-y-6">
                <Checkbox
                  label="Add Product"
                  checked={false}
                  onChange={() => {}}
                  disabled
                />
                <Checkbox
                  label="Category change option"
                  checked={false}
                  onChange={() => {}}
                  className="ml-6 opacity-50"
                  disabled
                />
                <Checkbox
                  label="Priority change option"
                  checked={false}
                  onChange={() => {}}
                  className="ml-6 opacity-50"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolePermissions;