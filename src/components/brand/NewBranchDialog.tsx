import React, { useState } from 'react';
import { X } from 'lucide-react';

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
    <div className="fixed top-20 right-8 z-50">
      <div className="relative rounded-3xl w-[500px] p-8" style={{
        background: 'linear-gradient(180deg, rgba(64, 12, 122, 0.2) 0%, rgba(255, 255, 255, 0.8) 100%), #FFFFFF'
      }}>
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">New branch details</h2>
          <p className="text-gray-600">Enter the details to create your new branch</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-base font-medium mb-2">Branch name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-orange-300 focus:outline-none focus:border-orange-500"
              placeholder="Enter branch name"
            />
          </div>

          <div>
            <label className="block text-base font-medium mb-2">Contact number</label>
            <input
              type="text"
              value={formData.contact}
              onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-orange-300 focus:outline-none focus:border-orange-500"
              placeholder="Enter contact number"
            />
          </div>

          <div>
            <label className="block text-base font-medium mb-2">Branch address</label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-orange-300 focus:outline-none focus:border-orange-500 resize-none"
              rows={3}
              placeholder="Enter branch address"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-purple-700 text-white rounded-full hover:bg-purple-800 transition-colors mt-4"
          >
            Add new branch
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewBranchDialog;