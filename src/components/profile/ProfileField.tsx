import React from 'react';

interface ProfileFieldProps {
  label: string;
  value?: string;
  type?: 'text' | 'password' | 'tel' | 'email';
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  customField?: React.ReactNode;
  onChange?: (value: string) => void;
  countryCode?: string;
  endAdornment?: React.ReactNode;
}

const ProfileField: React.FC<ProfileFieldProps> = ({
  label,
  value = '',
  type = 'text',
  placeholder,
  readOnly,
  className = '',
  customField,
  onChange,
  countryCode,
  endAdornment,
}) => {
  return (
    <div className="flex items-start">
      <label className="w-48 flex-shrink-0 text-gray-500">{label}</label>
      <div className="flex-grow max-w-md">
        {customField || (
          <div className="flex relative">
            {countryCode && (
              <div className="flex-shrink-0 px-3 py-2 bg-gray-50 border border-r-0 rounded-l-lg text-gray-600">
                {countryCode}
              </div>
            )}
            <input
              type={type}
              value={value}
              placeholder={placeholder}
              readOnly={readOnly}
              onChange={(e) => onChange?.(e.target.value)}
              className={`w-full px-4 py-2 ${countryCode ? 'rounded-r-lg' : 'rounded-lg'} ${className} ${
                readOnly ? 'bg-gray-50' : 'border'
              } ${endAdornment ? 'pr-12' : ''}`}
            />
            {endAdornment && (
              <div className="absolute right-3 top-1/2 pt-1 -translate-y-1/2">
                {endAdornment}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileField;