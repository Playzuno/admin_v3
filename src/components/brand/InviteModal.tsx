import React from 'react';
import { X } from 'lucide-react';
import { Branch } from '../../types/brand';
import { InviteFormData } from '../../types/brand';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: InviteFormData;
  branches: Branch[];
  onInputChange: (field: keyof InviteFormData, value: string) => void;
  onInvite: () => void;
}

const InviteModal: React.FC<InviteModalProps> = ({
  isOpen,
  onClose,
  formData,
  branches,
  onInputChange,
  onInvite,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="mt-0 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{ marginTop: '0px' }}
    >
      <div className="bg-white rounded-2xl w-[500px]">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-lg font-semibold">Invite branch team member</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username:
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={e => onInputChange('username', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Id:
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={e => onInputChange('email', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact no:
            </label>
            <input
              type="tel"
              value={formData.contact}
              onChange={e => onInputChange('contact', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Branch:
            </label>
            <select
              value={formData.branch}
              onChange={e => onInputChange('branch', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">Select branch</option>
              {branches.map(branch => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role:
            </label>
            <select
              value={formData.role}
              onChange={e => onInputChange('role', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="staff">Staff</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-4 p-6 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onInvite}
            className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800"
          >
            Invite Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
