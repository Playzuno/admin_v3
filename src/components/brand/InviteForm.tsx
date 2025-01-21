import React, { useState } from 'react';
import { X, Check, ChevronDown } from 'lucide-react';
import ActionContainer from '../containers/ActionContainer';
import { HeaderContainer } from '../containers';
import Button from '../ui/Button';

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
    <div className="relative w-full">
      <button
        type="button"
        className="w-full px-0 py-1 border-b border-gray-200 focus:border-orange-500 text-left text-sm flex items-center justify-between"
        onClick={() => setShow(!show)}
      >
        <span className={formData[type] ? 'text-gray-900' : 'text-gray-400'}>
          {formData[type] || `Select ${type}`}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${show ? 'rotate-180' : ''}`}
        />
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
              <div
                className={`w-4 h-4 rounded border ${
                  formData[type] === option
                    ? 'border-orange-500 bg-orange-500'
                    : 'border-gray-300'
                } flex items-center justify-center`}
              >
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
    <HeaderContainer
      title={
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-medium">Invite branch team member</h2>
            <button
              onClick={onClose}
              className=" hover:bg-orange/30 p-1 font-bold rounded-full bg-orange-500 text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      }
    >
      <div className="p-6 space-y-6">
        <div className="flex items-center space-x-4">
          <label
            htmlFor="username"
            className="text-sm peer-focus:text-brand font-light w-[130px] text-right"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            readOnly
            className="peer w-full px-0 py-1 border-b border-gray-200 focus:border-orange-500 focus:outline-none text-sm"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label
            htmlFor="email"
            className="text-sm text-brand font-light w-[130px] text-right"
          >
            Email Id:
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={e => handleInputChange('email', e.target.value)}
            className="w-full px-0 py-1 border-b border-gray-200 focus:border-orange-500 focus:outline-none text-sm"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label
            htmlFor="contact"
            className="text-sm text-brand font-light w-[130px] text-right"
          >
            Contact no:
          </label>
          <input
            type="tel"
            id="contact"
            value={formData.contact}
            onChange={e => handleInputChange('contact', e.target.value)}
            className="w-full px-0 py-1 border-b border-gray-200 focus:border-orange-500 focus:outline-none text-sm"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label
            htmlFor="branch"
            className="text-sm text-brand font-light w-[130px] text-right"
          >
            Branch:
          </label>
          {renderDropdown(
            'branch',
            branches,
            showBranchDropdown,
            setShowBranchDropdown
          )}
        </div>
        <div className="flex items-center space-x-4">
          <label className="text-sm text-brand font-light w-[130px] text-right">
            Role:
          </label>
          {renderDropdown('role', roles, showRoleDropdown, setShowRoleDropdown)}
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <Button onClick={onClose} variant="light">
            Cancel
          </Button>
          <Button onClick={onInvite} variant="primary">
            Invite Now
          </Button>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default InviteForm;
