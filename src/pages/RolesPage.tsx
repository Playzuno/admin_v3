import React, { useState, useCallback, useEffect } from 'react';
import { Role, RolePermissions } from '../types/role';
import RoleList from '../components/roles/RoleList';
import RolePermissionsComponent from '../components/roles/RolePermissions';
import AddCustomRole from '../components/roles/AddCustomRole';
import { LockKeyhole } from 'lucide-react';
import { initialRoles } from '../data/initialRoles';

const mockUpdateRolePermissions = async (roleId: string, permissions: RolePermissions): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Permissions updated for role:', roleId, permissions);
      resolve();
    }, 1000);
  });
};

const RolesPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [selectedRole, setSelectedRole] = useState<Role | null>(initialRoles[0]);
  const [modifiedPermissions, setModifiedPermissions] = useState<RolePermissions | null>(null);
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (selectedRole) {
      setModifiedPermissions(selectedRole.permissions);
    }
  }, [selectedRole]);

  const handleToggleAccess = (roleId: string) => {
    setRoles(roles.map(role => 
      role.id === roleId ? { ...role, isActive: !role.isActive } : role
    ));
  };

  const handlePermissionChange = useCallback((key: keyof RolePermissions) => {
    setModifiedPermissions(prev => 
      prev ? { ...prev, [key]: !prev[key] } : null
    );
  }, []);

  const hasChanges = useCallback(() => {
    if (!selectedRole || !modifiedPermissions) return false;
    return Object.keys(selectedRole.permissions).some(
      key => selectedRole.permissions[key as keyof RolePermissions] !== 
             modifiedPermissions[key as keyof RolePermissions]
    );
  }, [selectedRole, modifiedPermissions]);

  const handleCancel = useCallback(() => {
    if (selectedRole) {
      setModifiedPermissions(selectedRole.permissions);
    }
  }, [selectedRole]);

  const handleSaveChanges = async () => {
    if (!selectedRole || !modifiedPermissions) return;

    try {
      setIsSaving(true);
      await mockUpdateRolePermissions(selectedRole.id, modifiedPermissions);
      
      setRoles(prevRoles => 
        prevRoles.map(role => 
          role.id === selectedRole.id 
            ? { ...role, permissions: modifiedPermissions }
            : role
        )
      );
      
      setSelectedRole(prev => 
        prev ? { ...prev, permissions: modifiedPermissions } : null
      );
    } catch (error) {
      console.error('Failed to update permissions:', error);
    } finally {
      setIsSaving(false);
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
        viewTransaction: false,
        exportTransaction: false,
        deleteTransaction: false,
        managePayments: false,
        viewSettings: false,
        modifySettings: false,
        manageIntegrations: false,
        manageNotifications: false,
      },
    };
    setRoles([...roles, newRole]);
    setIsAddingRole(false);
  };

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setModifiedPermissions(role.permissions);
  };

  return (
    <div className="layout-main">
      <div className="flex-between">
        <h1 className="heading-1">Role/Access Control</h1>
        <button className="btn btn-primary">View full access</button>
      </div>

      <div className="banner-info">
        <div className="banner-icon">
          <LockKeyhole className="w-6 h-6 text-secondary" />
        </div>
        <div>
          <h2 className="heading-2">Fasten up your access role</h2>
          <p className="text-subtle">Integrate more tools and save time</p>
        </div>
      </div>

      <div className="layout-split">
        <div className="layout-sidebar">
          <div className="section-header">
            <h2 className="section-title">Manage Access</h2>
            <button className="btn-link">View all</button>
          </div>
          <RoleList 
            roles={roles} 
            onToggleAccess={handleToggleAccess}
            selectedRole={selectedRole}
            onRoleSelect={handleRoleSelect}
          />
        </div>

        <div className="layout-content">
          <div className="section-header">
            <h2 className="section-title">User Role Manager</h2>
            <button 
              className="btn-link"
              onClick={() => setIsAddingRole(true)}
            >
              Add Custom Role
            </button>
          </div>
          <div className="container-card">
            {isAddingRole ? (
              <AddCustomRole
                onCancel={() => setIsAddingRole(false)}
                onSave={handleAddCustomRole}
              />
            ) : (
              modifiedPermissions && (
                <RolePermissionsComponent
                  permissions={modifiedPermissions}
                  onPermissionChange={handlePermissionChange}
                  onCancel={handleCancel}
                  onSave={handleSaveChanges}
                  showActions={hasChanges()}
                  isSaving={isSaving}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolesPage;