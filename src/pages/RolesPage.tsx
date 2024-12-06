import React, { useState } from 'react';
import { Role, RolePermissions } from '../types/role';
import RoleList from '../components/roles/RoleList';
import RolePermissionsComponent from '../components/roles/RolePermissions';
import AddCustomRole from '../components/roles/AddCustomRole';
import { LockKeyhole } from 'lucide-react';
import { initialRoles } from '../data/initialRoles';

const RolesPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [selectedRole, setSelectedRole] = useState<Role | null>(initialRoles[0]);
  const [permissions, setPermissions] = useState<RolePermissions>(initialRoles[0].permissions);
  const [isAddingRole, setIsAddingRole] = useState(false);

  const handleToggleAccess = (roleId: string) => {
    setRoles(roles.map(role => 
      role.id === roleId ? { ...role, isActive: !role.isActive } : role
    ));
  };

  const handlePermissionChange = (key: keyof RolePermissions) => {
    setPermissions(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSaveChanges = () => {
    if (selectedRole) {
      setRoles(roles.map(role =>
        role.id === selectedRole.id ? { ...role, permissions } : role
      ));
    }
  };

  const handleAddCustomRole = (roleData: {
    name: string;
    tags: string;
    createdBy: string;
    notes: string;
    isActive: boolean;
  }) => {
    const newRole: Role = {
      id: (roles.length + 1).toString(),
      code: roleData.name.substring(0, 2).toUpperCase(),
      name: roleData.name,
      isActive: roleData.isActive,
      permissions: {
        viewRole: false,
        modifyRole: false,
        deleteRole: false,
        addNewRole: false,
        viewProduct: false,
        modifyProduct: false,
        deleteProduct: false,
        addProduct: false,
      },
    };
    setRoles([...roles, newRole]);
    setIsAddingRole(false);
  };

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setPermissions(role.permissions);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Role/Access Control</h1>
        <button className="btn btn-primary">View full access</button>
      </div>

      <div className="bg-secondary-50 p-6 rounded-lg">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-white rounded-lg">
            <LockKeyhole className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Fasten up your access role</h2>
            <p className="text-gray-600">Integrate more tools and save time</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Manage Access</h2>
            <button className="text-primary hover:text-primary-600">View all</button>
          </div>
          <RoleList 
            roles={roles} 
            onToggleAccess={handleToggleAccess}
            selectedRole={selectedRole}
            onRoleSelect={handleRoleSelect}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">User Role Manager</h2>
            <button 
              className="text-primary hover:text-primary-600"
              onClick={() => setIsAddingRole(true)}
            >
              Add Custom Role
            </button>
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {isAddingRole ? (
              <AddCustomRole
                onCancel={() => setIsAddingRole(false)}
                onSave={handleAddCustomRole}
              />
            ) : (
              <>
                <RolePermissionsComponent
                  permissions={permissions}
                  onPermissionChange={handlePermissionChange}
                />
                <div className="flex justify-end space-x-4 p-4 bg-gray-50">
                  <button className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                    Cancel
                  </button>
                  <button 
                    className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-600"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolesPage;