import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Checkbox: React.FC<CheckboxProps> = ({ 
  label, 
  checked, 
  onChange, 
  disabled = false,
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4'
  };

  return (
    <label className={`flex items-center space-x-3 cursor-pointer ${disabled ? 'opacity-50' : ''} ${className}`}>
      <div 
        className={`${sizeClasses[size]} rounded border ${
          checked 
            ? 'bg-primary border-primary' 
            : 'border-gray-300 bg-white'
        } flex items-center justify-center transition-colors`}
        onClick={() => !disabled && onChange()}
      >
        {checked && <Check className={`${iconSizeClasses[size]} text-white`} />}
      </div>
      <span className={`text-base ${checked ? 'text-gray-900' : 'text-gray-500'}`}>
        {label}
      </span>
    </label>
  );
};

export default Checkbox;