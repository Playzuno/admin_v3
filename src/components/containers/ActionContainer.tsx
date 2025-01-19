import React from 'react';

interface ActionContainerProps {
  title: string;
  onCancel?: () => void;
  onSave?: () => void;
  saveDisabled?: boolean;
  children: React.ReactNode;
}

const ActionContainer: React.FC<ActionContainerProps> = ({
  title,
  onCancel,
  onSave,
  saveDisabled = false,
  children,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] border border-gray-200 overflow-hidden">
      <div className="flex justify-between items-center px-6 py-4 bg-[#F2F2F2] border-b border-gray-200">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex items-center space-x-4">
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          )}
          {onSave && (
            <button
              onClick={onSave}
              disabled={saveDisabled}
              className={`px-6 py-2 bg-primary text-white rounded-lg transition-colors ${
                saveDisabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-primary-600'
              }`}
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
};

export default ActionContainer;