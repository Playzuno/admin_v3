import React from 'react';
import { Role } from '../../types/role';
import RoleListItem from './RoleListItem';

interface RoleListProps {
  roles: Role[];
  onToggleAccess: (roleId: string) => void;
  selectedRole: Role | null;
  onRoleSelect: (role: Role) => void;
}

const RoleList: React.FC<RoleListProps> = ({ 
  roles, 
  onToggleAccess, 
  selectedRole,
  onRoleSelect 
}) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="grid grid-cols-2 p-4 border-b bg-gray-50">
        <div className="font-medium text-gray-700">Role</div>
        <div className="font-medium text-gray-700">Admin Access</div>
      </div>
      <div className="divide-y">
        {roles.map(role => (
          <RoleListItem
            key={role.id}
            role={role}
            onToggleAccess={onToggleAccess}
            isSelected={selectedRole?.id === role.id}
            onClick={() => onRoleSelect(role)}
          />
        ))}
      </div>
    </div>
  );
};

export default RoleList;