import React, { useState } from 'react';

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'number' | 'color';
  labelColor?: string;
  error?: string;
  onValidate?: (value: string) => string | undefined;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  labelColor = '#6B21A8',
  error,
  onValidate,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onValidate) {
      onValidate(value);
    }
  };

  return (
    <div className="flex items-start space-x-8">
      <label 
        className={`w-32 transition-colors ${
          isFocused ? `text-[${labelColor}]` : 'text-gray-500'
        }`}
      >
        {label}
      </label>
      <div className="flex-1">
        <input
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`w-full px-4 py-2 transition-all border-b ${
            error 
              ? 'border-red-500' 
              : isFocused 
                ? `border-[#FF6E01]` 
                : 'border-gray-200'
          } focus:outline-none border-b-[1px]`}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
};

export default FormField;