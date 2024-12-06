import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ 
  label, 
  checked, 
  onChange, 
  disabled = false,
  className = ''
}) => {
  return (
    <label className={`flex items-center space-x-3 cursor-pointer ${disabled ? 'opacity-50' : ''} ${className}`}>
      <div 
        className={`w-5 h-5 rounded border ${
          checked 
            ? 'bg-primary border-primary' 
            : 'border-gray-300 bg-white'
        } flex items-center justify-center transition-colors`}
        onClick={() => !disabled && onChange()}
      >
        {checked && <Check className="w-3.5 h-3.5 text-white" />}
      </div>
      <span className={`text-base ${checked ? 'text-gray-900' : 'text-gray-500'}`}>
        {label}
      </span>
    </label>
  );
};

export default Checkbox;