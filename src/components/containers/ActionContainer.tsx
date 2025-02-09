import React from 'react';
import Button from '../ui/Button';

interface ActionContainerProps {
  title: string | React.ReactNode;
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
    <div className="bg-white rounded-[32px] zuno-border-dark overflow-hidden">
      <div className="flex justify-between items-center px-6 py-4 bg-[#F2F2F2] border-b-[0.5px] border-[#BBBBBB]">
        {typeof title === 'string' ? (
          <h2 className="container-title-2">{title}</h2>
        ) : (
          title
        )}
        <div className="flex items-center space-x-4">
          {onCancel && (
            <Button variant="light" onClick={onCancel}>
              Cancel
            </Button>
          )}
          {onSave && (
            <Button variant="primary" onClick={onSave} disabled={saveDisabled}>
              Save Changes
            </Button>
          )}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
};

export default ActionContainer;
