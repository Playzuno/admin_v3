import React from 'react';
import { Role } from '../../types/role';
import RoleListItem from './RoleListItem';
import { HeaderContainer } from '../containers';

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
  onRoleSelect,
}) => {
  return (
    <HeaderContainer
      title={
        <div className="grid grid-cols-2 w-full">
          <div className="">Role</div>
          <div className="">Admin Access</div>
        </div>
      }
    >
      <div className="bg-white rounded-lg shadow">
        <div className="divide-y text-md">
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
    </HeaderContainer>
  );
};

export default RoleList;
