import React from 'react';
import { X } from 'lucide-react';

interface ConfirmDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
  primaryButtonText?: string;
  primaryButtonColor?: 'brand' | 'danger';
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  isOpen,
  primaryButtonText = 'Confirm',
  primaryButtonColor = 'danger',
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{ marginTop: '0px' }}
    >
      <div className="bg-white rounded-lg w-[400px] overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="title">{title}</h2>
            <button onClick={onCancel}>
              <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            </button>
          </div>

          <p className="zuno-subtitle mb-6">{message}</p>

          <div className="flex justify-end space-x-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 rounded-md hover:bg-gray-300 transition-colors ${primaryButtonColor === 'brand' ? 'bg-brand-500 text-white' : 'bg-red-600 text-white'}`}
            >
               {primaryButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
