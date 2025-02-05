import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  bgColor?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  className = '',
  size = 'md',
  bgColor = 'bg-primary',
}) => {
  const sizeClasses = {
    sm: 'w-[20px] h-[20px]',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const iconSizeClasses = {
    sm: 'w-[16px] h-[16px]',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  return (
    <label
      className={`flex items-center space-x-3 cursor-pointer ${disabled ? 'opacity-50' : ''} ${className}`}
    >
      <div className={`w-8`}>
        <div
          className={`${sizeClasses[size]} rounded border ${
            checked
              ? `${bgColor} border-${bgColor}`
              : 'border-gray-300 bg-white'
          } flex items-center justify-center transition-colors mr-2 box-content`}
          onClick={() => !disabled && onChange()}
        >
          {checked && (
            <Check className={`${iconSizeClasses[size]} text-white`} />
          )}
        </div>
      </div>
      <span
        className={`!ml-0 text-xs ${checked ? 'text-gray-900' : 'text-gray-500'}`}
        onClick={() => !disabled && onChange()}
      >
        {label}
      </span>
    </label>
  );
};

export default Checkbox;
