import React, { useEffect, useMemo, useState } from 'react';
import { X, Check, ChevronDown } from 'lucide-react';
import ActionContainer from '../containers/ActionContainer';
import { HeaderContainer } from '../containers';
import Button from '../ui/Button';
import { Branch, InviteFormData, Role } from '@/types';
import { useOrg } from '@/context/OrgContext';
import { branchApi, organizationApi, roleApi } from '@/api';

interface InviteFormProps {
  onClose: () => void;
  onInvite: (formData: InviteFormData) => void;
}

const InviteForm: React.FC<InviteFormProps> = ({ onClose, onInvite }) => {
  const {orgId} = useOrg();
  const {branch: currentBranch} = useOrg();
  const [branches, setBranches] = useState<Branch[]>([]); 
  const [roles, setRoles] = useState<Role[]>([]); 
  const [formValid, setFormValid] = useState(false);
  useEffect(() => {
    const fetchBranches = async () => {
      const res = await branchApi.getAll(orgId);
      // console.log('branches', res);
      setBranches(res.data); // Store the fetched branches in state
      if (res.data.length > 0) {
        setFormData(prev => ({ ...prev, branch: res.data[0].name }));
      }
    };

    const fetchRoles = async () => {
      if (!currentBranch) {
        return;
      }
      const res = await roleApi.getAll(currentBranch?.id);
      // console.log('roles', res);
      setRoles(res.data); // Store the fetched roles in state
      if (res.data.length > 0) {
        setFormData(prev => ({ ...prev, role: res.data[0].name }));
      }
    };

    fetchBranches();
    fetchRoles();
  }, [orgId]);
  const [formData, setFormData] = useState<InviteFormData>({
    username: '',
    email: '',
    contact: '',
    branch: '',
    role: '',
  });
  const [showBranchDropdown, setShowBranchDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);


  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    let valid = false;
    if (formData.email.length > 0 && formData.username.length > 0 && formData.contact.length > 0 && formData.branch.length > 0 && formData.role.length > 0) {
      valid = true;
    }
    setFormValid(valid);
  }, [formData]);

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

  const sendInvite = () => {
    // console.log('send invite', formData);
    onInvite({
      username: formData.username,
      email: formData.email,
      contact: formData.contact,
      branch: branches.find(branch => branch.name === formData.branch)?.id || '',
      role: roles.find(role => role.name === formData.role)?.id || '',
    });
  };

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
            onChange={(e) => handleInputChange('username', e.target.value)}
            value={formData.username}
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
            branches?.map(branch => branch.name) || [],
            showBranchDropdown,
            setShowBranchDropdown
          )}
        </div>
        <div className="flex items-center space-x-4">
          <label className="text-sm text-brand font-light w-[130px] text-right">
            Role:
          </label>
          {renderDropdown('role', roles?.map(role => role.name) || [], showRoleDropdown, setShowRoleDropdown)}
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <Button onClick={onClose} variant="light">
            Cancel
          </Button>
          <Button onClick={sendInvite} variant="primary" disabled={!formValid}>
            Invite Now
          </Button>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default InviteForm;
