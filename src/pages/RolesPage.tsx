import React, { useState, useCallback, useEffect } from 'react';
import { Role, RolePermissions } from '../types/role';
import RoleList from '../components/roles/RoleList';
import RolePermissionsComponent from '../components/roles/RolePermissions';
import AddCustomRole from '../components/roles/AddCustomRole';
import { ChevronRightIcon, LockKeyhole } from 'lucide-react';
import { initialRoles } from '../data/initialRoles';
import Button from '../components/ui/Button';
import { useOrg } from '@/context/OrgContext';
import { roleApi } from '@/api';
import { RolePermission } from '@/types';
import { NewCustomRole } from '@/api/types';
import { ErrorToast } from '@/components/ui/toast';

const RolesPage: React.FC = () => {
  const { branch } = useOrg();
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  useEffect(() => {
    if (branch) {
      roleApi.getAll(branch.id).then(res => {
        // console.log('roles', res);
        setRoles(res.data);
        res.data.length > 0 && setSelectedRole(res.data[0]);
      });
    }
  }, [branch]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [modifiedPermissions, setModifiedPermissions] = useState<
    string[] | null
  >(null);
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (selectedRole) {
      setModifiedPermissions(selectedRole.permissions);
    }
  }, [selectedRole]);

  const handleToggleAccess = (roleId: string) => {
    if (!branch?.id) return;
    const role = roles.find(role => role.id === roleId);
    if (!role) return;
    roleApi
      .update(branch.id, roleId, {
        status: role.status == 'active' ? 'inactive' : 'active',
      })
      .then(() => {
        setRoles(
          roles.map(role =>
            role.id === roleId
              ? {
                  ...role,
                  status: role.status == 'active' ? 'inactive' : 'active',
                }
              : role
          )
        );
      })
      .catch(error => {
        console.error('Failed to update role status:', error);
      });
  };

  const handlePermissionChange = useCallback((permission: RolePermission) => {
    setModifiedPermissions(prev => {
      // console.log('target permission', permission, prev);
      if (!prev) return [permission.code];
      if (prev.includes(permission.code)) {
        return prev.filter(p => p !== permission.code);
      } else {
        return [...prev, permission.code];
      }
    });
  }, []);

  const hasChanges = useCallback(() => {
    if (
      !selectedRole ||
      !modifiedPermissions ||
      !selectedRole.permissions ||
      !modifiedPermissions
    )
      return false;
    const a = selectedRole.permissions.sort();
    const b = modifiedPermissions.sort();
    return (
      a.length !== b.length || a.some((value, index) => value !== b[index])
    );
  }, [selectedRole, modifiedPermissions]);

  const handleCancel = useCallback(() => {
    if (selectedRole) {
      setModifiedPermissions(selectedRole.permissions);
    }
  }, [selectedRole]);

  const handleSaveChanges = async () => {
    if (!selectedRole || !modifiedPermissions) return;
    if (!branch?.id) return;
    try {
      setIsSaving(true);
      if (!selectedRole.id) return;
      await roleApi.update(branch.id, selectedRole.id, {
        permissions: modifiedPermissions,
      });

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

  const handleAddCustomRole = async (roleData: NewCustomRole) => {
    if (roleData.name.length === 0) {
      ErrorToast('Role name is required');
      return;
    }
    if (roleData.status !== 'active' && roleData.status !== 'inactive') {
      ErrorToast('Invalid status');
      return;
    }
    const newRole: Role = {
      // id: (roles.length + 1).toString(),
      name: roleData.name,
      permissions: [],
      description: roleData.notes,
      status: roleData.status,
    };
    if (!branch?.id) return;
    setIsAddingRole(true);
    try {
      await roleApi.create(branch.id, newRole);
      setRoles([...roles, newRole]);
    } catch (error) {
      console.error('Failed to create role:', error);
    } finally {
      setIsAddingRole(false);
    }
  };

  const handleRoleSelect = (role: Role) => {
    console.log('role', role);
    setSelectedRole(role);
    setModifiedPermissions(role.permissions);
  };

  return (
    <div className="layout-main">
      <div className="banner-info w-3/4 mx-auto bg-[#EDEAFE]">
        <div className="banner-icon">
          <LockKeyhole className="w-6 h-6 text-secondary" />
        </div>
        <div>
          <h2 className="text-sm">Fasten up your access role</h2>
          <p className="text-sm text-brand-purple-darker">
            Integrate more tools and save time
          </p>
        </div>
        <div className="flex-1"></div>
        <Button variant="primary">
          View full access
          <ChevronRightIcon className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <div className="layout-split">
        <div className="layout-sidebar">
          <div className="section-header">
            <h2 className="container-title">Manage Access</h2>
            <button className="text-xs btn-link">View all</button>
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
            <h2 className="container-title">User Role Manager</h2>
            <button
              className="text-xs btn-link"
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
