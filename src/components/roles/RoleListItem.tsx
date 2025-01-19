import React from 'react';
import { Role } from '../../types/role';
import Toggle from '../ui/Toggle';

interface RoleListItemProps {
  role: Role;
  onToggleAccess: (roleId: string) => void;
  isSelected: boolean;
  onClick: () => void;
}

const RoleListItem: React.FC<RoleListItemProps> = ({
  role,
  onToggleAccess,
  isSelected,
  onClick,
}) => {
  const getBgColor = (code: string) => {
    const colors: { [key: string]: string } = {
      SB: 'bg-brand/20',
      GM: 'bg-brand/20',
      W: 'bg-brand/20',
      M: 'bg-brand/20',
      R: 'bg-brand/20',
      HK: 'bg-brand/20',
    };
    return colors[code] || 'bg-gray-100';
  };

  return (
    <div
      className={`grid grid-cols-2 p-4 items-center cursor-pointer transition-colors ${
        isSelected ? 'bg-[#400C7A]/20' : 'hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <div
          className={`w-10 h-10 rounded-full p-4 ${isSelected ? 'bg-brand' : getBgColor(role.code)} flex items-center justify-center`}
        >
          <span
            className={`text-sm font-medium ${isSelected ? 'text-white' : ''}`}
          >
            {role.code}
          </span>
        </div>
        <span className="font-medium">{role.name}</span>
      </div>
      <div>
        <Toggle
          enabled={role.isActive}
          onChange={() => onToggleAccess(role.id)}
          color="bg-brand"
        />
      </div>
    </div>
  );
};

export default RoleListItem;
