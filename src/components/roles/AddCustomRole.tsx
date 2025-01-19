import React, { useState, useEffect, useRef } from 'react';
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

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus the first input field
    firstInputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getLabelClass = (fieldName: string) => {
    return `${
      focusedField === fieldName ? 'text-primary' : 'text-gray-400'
    } font-medium transition-colors`;
  };

  const getInputClass = (fieldName: string) => {
    return `w-full px-3 py-2 border-b ${
      focusedField === fieldName 
        ? 'border-primary' 
        : 'border-gray-300'
    } focus:outline-none transition-colors`;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)]">
      {/* Fixed-height header with permanent action buttons */}
      <div className="h-16 flex justify-between items-center px-6 bg-gray-50 border-b">
        <h2 className="text-xl font-semibold">New Custom Role</h2>
        <div className="flex items-center space-x-3">
          <span className="text-gray-600">Status:</span>
          <Toggle
            enabled={formData.isActive}
            onChange={() => setFormData(prev => ({ ...prev, isActive: !prev.isActive }))}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <div className="grid grid-cols-[120px,1fr] items-center gap-4">
            <label className={getLabelClass('name')}>Role Name:</label>
            <input
              ref={firstInputRef}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              placeholder="Brand/Product"
              className={getInputClass('name')}
            />
          </div>

          <div className="grid grid-cols-[120px,1fr] items-center gap-4">
            <label className={getLabelClass('tags')}>Tags:</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('tags')}
              onBlur={() => setFocusedField(null)}
              className={getInputClass('tags')}
            />
          </div>

          <div className="grid grid-cols-[120px,1fr] items-center gap-4">
            <label className={getLabelClass('createdBy')}>Created by:</label>
            <input
              type="text"
              name="createdBy"
              value={formData.createdBy}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('createdBy')}
              onBlur={() => setFocusedField(null)}
              className={getInputClass('createdBy')}
            />
          </div>

          <div className="grid grid-cols-[120px,1fr] items-start gap-4">
            <label className={getLabelClass('notes')}>Notes:</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('notes')}
              onBlur={() => setFocusedField(null)}
              rows={3}
              className={`${getInputClass('notes')} resize-none`}
            />
          </div>
        </form>
      </div>

      {/* Fixed footer with action buttons */}
      <div className="flex justify-end space-x-4 p-4 bg-gray-50 border-t">
        <button
          onClick={onCancel}
          className="h-9 px-6 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="h-9 px-6 bg-secondary text-white rounded-lg hover:bg-secondary-600 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AddCustomRole;