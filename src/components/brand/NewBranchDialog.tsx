import React, { useState } from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';

interface NewBranchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (branchData: {
    name: string;
    contact: string;
    address: string;
  }) => void;
}

const NewBranchDialog: React.FC<NewBranchDialogProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    address: '',
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    onAdd(formData);
    setFormData({ name: '', contact: '', address: '' });
  };

  return (
    <div className="fixed top-24 right-14 z-50">
      <div
        className="relative rounded-3xl w-[500px] p-8"
        style={{
          background:
            'linear-gradient(180deg, rgba(64, 12, 122, 0.2) 0%, rgba(255, 255, 255, 0.8) 100%), #FFFFFF',
          boxShadow:
            '0px 4px 24px -1px rgba(64, 12, 122, 0.25), 0px 2px 8px -1px rgba(255, 107, 0, 0.15)',
        }}
      >
        <button
          onClick={onClose}
          className="absolute -right-1 -top-1 hover:bg-orange/30 p-1 font-bold rounded-full bg-orange-500 text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-lg font-regular mb-2">New branch details</h2>
          <p className="text-2xs">
            Enter the details to create your new branch
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-medium mb-2">
              Branch name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={e =>
                setFormData(prev => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-4 py-3 rounded-xl border border-orange-300 focus:outline-none focus:border-orange-500"
              placeholder="Enter branch name"
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-2">
              Contact number
            </label>
            <input
              type="text"
              value={formData.contact}
              onChange={e =>
                setFormData(prev => ({ ...prev, contact: e.target.value }))
              }
              className="w-full px-4 py-3 rounded-xl border border-orange-300 focus:outline-none focus:border-orange-500"
              placeholder="Enter contact number"
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-2">
              Branch address
            </label>
            <textarea
              value={formData.address}
              onChange={e =>
                setFormData(prev => ({ ...prev, address: e.target.value }))
              }
              className="w-full px-4 py-3 rounded-xl border border-orange-300 focus:outline-none focus:border-orange-500 resize-none"
              rows={3}
              placeholder="Enter branch address"
            />
          </div>
          <div className="flex justify-center">
            <Button variant="primary" onClick={handleSubmit}>
              Add new branch
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBranchDialog;
