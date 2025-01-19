import React from 'react';

interface ToggleProps {
  enabled: boolean;
  onChange: () => void;
  color?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  enabled,
  onChange,
  color = 'bg-primary',
}) => {
  return (
    <button
      type="button"
      className={`${
        enabled ? color : 'bg-gray-200'
      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
      role="switch"
      aria-checked={enabled}
      onClick={e => {
        e.stopPropagation();
        onChange();
      }}
    >
      <span
        className={`${
          enabled ? 'translate-x-5' : 'translate-x-0'
        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
      />
    </button>
  );
};

export default Toggle;
