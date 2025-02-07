import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Role } from '@/types';

interface RoleDropdownProps {
  role: string;
  roles: Role[];
  onRoleChange: (newRole: string) => void;
  disabled?: boolean;
}

const RoleDropdown: React.FC<RoleDropdownProps> = ({
  role,
  roles,
  onRoleChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleRoleSelect = (selectedRole: string | undefined) => {
    if (selectedRole) {
      onRoleChange(selectedRole);
      setIsOpen(false);
    }
  };
  const roleName = roles.find(r => r.id === role)?.name;

  return (
    <div className="relative">
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`px-4 py-2 bg-[#EEE9FD] text-brand rounded-lg flex items-center justify-between space-x-3 ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-secondary-100'
        }`}
        disabled={disabled}
      >
        <span>{roleName}</span>
        <ChevronDown className="w-4 h-4 mt-1" />
      </button>

      {isOpen && !disabled && (
        <div className="absolute left-0 mt-1 bg-white rounded-lg shadow-lg border p-2 min-w-[200px] z-50">
          {roles && roles.map(roleOption => (
            <button
              key={roleOption.id}
              className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded-md flex items-center space-x-2"
              onClick={() => handleRoleSelect(roleOption.id)}
            >
              <div
                className={`w-5 h-5 rounded border ${
                  role === roleOption.id
                    ? 'border-secondary bg-secondary'
                    : 'border-gray-300'
                } flex items-center justify-center`}
              >
                {role === roleOption.id && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-gray-600">{roleOption.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoleDropdown;
