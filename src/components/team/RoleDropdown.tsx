import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface RoleDropdownProps {
  role: string;
  roles: string[];
  onEditRoles: () => void;
}

const RoleDropdown: React.FC<RoleDropdownProps> = ({ role, roles, onEditRoles }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-secondary-50 text-secondary rounded-lg flex items-center space-x-2"
      >
        <span>{role}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1 bg-white rounded-lg shadow-lg border p-2 min-w-[200px] z-50">
          {roles.map((role, index) => (
            <div key={index} className="px-3 py-2 flex items-center space-x-2">
              <div className="w-5 h-5 rounded border border-secondary bg-secondary flex items-center justify-center">
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
              </div>
              <span className="text-gray-600">{role}</span>
            </div>
          ))}
          <button
            onClick={onEditRoles}
            className="w-full text-left px-3 py-2 text-secondary font-medium hover:bg-gray-50"
          >
            Edit roles
          </button>
        </div>
      )}
    </div>
  );
};

export default RoleDropdown;