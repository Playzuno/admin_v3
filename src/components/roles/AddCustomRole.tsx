import React, { useState } from 'react';
import Toggle from '../ui/Toggle';

interface AddCustomRoleProps {
  onCancel: () => void;
  onSave: (roleData: {
    name: string;
    tags: string;
    createdBy: string;
    notes: string;
    isActive: boolean;
  }) => void;
}

const AddCustomRole: React.FC<AddCustomRoleProps> = ({ onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    tags: '',
    createdBy: '',
    notes: '',
    isActive: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">New Custom Role</h2>
          <div className="flex items-center space-x-3">
            <span className="text-gray-600">Status:</span>
            <Toggle
              enabled={formData.isActive}
              onChange={() => setFormData(prev => ({ ...prev, isActive: !prev.isActive }))}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-[120px,1fr] items-center gap-4">
            <label className="text-primary font-medium">Role Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Brand/Product"
              className="w-full px-3 py-2 border-b border-gray-300 focus:border-primary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-[120px,1fr] items-center gap-4">
            <label className="text-gray-400 font-medium">Tags:</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-b border-gray-300 focus:border-primary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-[120px,1fr] items-center gap-4">
            <label className="text-gray-400 font-medium">Created by:</label>
            <input
              type="text"
              name="createdBy"
              value={formData.createdBy}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-b border-gray-300 focus:border-primary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-[120px,1fr] items-start gap-4">
            <label className="text-gray-400 font-medium pt-2">Notes:</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border-b border-gray-300 focus:border-primary focus:outline-none resize-none"
            />
          </div>
        </form>
      </div>

      <div className="flex justify-end space-x-4 p-4 bg-gray-50 mt-6">
        <button
          onClick={onCancel}
          className="px-6 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-secondary text-white rounded-md hover:bg-secondary-600 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AddCustomRole;