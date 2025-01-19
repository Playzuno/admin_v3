import React, { useState } from 'react';
import { X, Check, ChevronDown } from 'lucide-react';

interface InviteFormProps {
  onClose: () => void;
  onInvite: () => void;
}

const InviteForm: React.FC<InviteFormProps> = ({ onClose, onInvite }) => {
  const [formData, setFormData] = useState({
    username: 'Abhishek Rath',
    email: '',
    contact: '',
    branch: '',
    role: '',
  });
  const [showBranchDropdown, setShowBranchDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const roles = ['Admin', 'Manager', 'Staff', 'Waitron'];
  const branches = ['Branch 1', 'Branch 2', 'Branch 3']; // This should come from props in a real app

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderDropdown = (
    type: 'branch' | 'role',
    options: string[],
    show: boolean,
    setShow: (show: boolean) => void
  ) => (
    <div className="relative">
      <button
        type="button"
        className="w-full px-0 py-1 border-b border-gray-200 focus:border-purple-700 text-left text-sm flex items-center justify-between"
        onClick={() => setShow(!show)}
      >
        <span className={formData[type] ? 'text-gray-900' : 'text-gray-400'}>
          {formData[type] || `Select ${type}`}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${show ? 'rotate-180' : ''}`} />
      </button>
      
      {show && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg border py-1 z-10">
          {options.map(option => (
            <button
              key={option}
              className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 flex items-center space-x-2"
              onClick={() => {
                handleInputChange(type, option);
                setShow(false);
              }}
            >
              <div className={`w-4 h-4 rounded border ${
                formData[type] === option ? 'border-purple-700 bg-purple-700' : 'border-gray-300'
              } flex items-center justify-center`}>
                {formData[type] === option && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
              <span>{option}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b">
        <h2 className="text-sm font-medium">Invite branch team member</h2>
        <button onClick={onClose}>
          <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
        </button>
      </div>
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm text-purple-700 font-medium">Username:</label>
          <input
            type="text"
            value={formData.username}
            readOnly
            className="w-full px-0 py-1 border-b border-gray-200 focus:border-purple-700 focus:outline-none text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Email Id:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-0 py-1 border-b border-gray-200 focus:border-purple-700 focus:outline-none text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Contact no:</label>
          <input
            type="tel"
            value={formData.contact}
            onChange={(e) => handleInputChange('contact', e.target.value)}
            className="w-full px-0 py-1 border-b border-gray-200 focus:border-purple-700 focus:outline-none text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Branch:</label>
          {renderDropdown(
            'branch',
            branches,
            showBranchDropdown,
            setShowBranchDropdown
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Role:</label>
          {renderDropdown(
            'role',
            roles,
            showRoleDropdown,
            setShowRoleDropdown
          )}
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onInvite}
            className="px-6 py-2 bg-purple-700 text-white rounded-lg text-sm hover:bg-purple-800 transition-colors"
          >
            Invite Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteForm;