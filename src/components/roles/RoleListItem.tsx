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
  onClick 
}) => {
  const getBgColor = (code: string) => {
    const colors: { [key: string]: string } = {
      SB: 'bg-orange-100',
      GM: 'bg-orange-100',
      W: 'bg-orange-100',
      M: 'bg-orange-100',
      R: 'bg-orange-100',
      HK: 'bg-orange-100',
    };
    return colors[code] || 'bg-gray-100';
  };

  return (
    <div 
      className={`grid grid-cols-2 p-4 items-center cursor-pointer transition-colors ${
        isSelected ? 'bg-orange-50' : 'hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <div className={`w-8 h-8 rounded-full ${getBgColor(role.code)} flex items-center justify-center`}>
          <span className="text-sm font-medium">{role.code}</span>
        </div>
        <span className="font-medium">{role.name}</span>
      </div>
      <div onClick={e => e.stopPropagation()}>
        <Toggle
          enabled={role.isActive}
          onChange={() => onToggleAccess(role.id)}
        />
      </div>
    </div>
  );
};

export default RoleListItem;