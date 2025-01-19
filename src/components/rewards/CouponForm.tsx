import React from 'react';
import FormField from './FormField';

interface CouponFormProps {
  formData: {
    company: string;
    name: string;
    value: string;
    zunoValue: string;
    color: string;
    status: boolean;
  };
  errors: {
    value?: string;
    zunoValue?: string;
  };
  onInputChange: (field: string, value: string | boolean) => void;
  onValidate: (field: string, value: string) => void;
}

const CouponForm: React.FC<CouponFormProps> = ({ 
  formData, 
  errors,
  onInputChange,
  onValidate,
}) => {
  const validateNumber = (value: string) => {
    if (value === '') return undefined;
    const num = Number(value);
    if (isNaN(num)) return 'Please enter a valid number';
    if (num < 0) return 'Value cannot be negative';
    return undefined;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-gray-500">Status:</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={formData.status}
            onChange={(e) => onInputChange('status', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      </div>

      <FormField
        label="Company:"
        value={formData.company}
        onChange={(value) => onInputChange('company', value)}
        placeholder="Enter company name"
        labelColor="orange"
      />

      <FormField
        label="Coupon name:"
        value={formData.name}
        onChange={(value) => onInputChange('name', value)}
        placeholder="Enter coupon name"
      />

      <FormField
        label="Coupon value:"
        value={formData.value}
        onChange={(value) => onInputChange('value', value)}
        onValidate={(value) => onValidate('value', value)}
        error={errors.value}
        placeholder="Enter coupon value"
        type="number"
      />

      <FormField
        label="Zuno value:"
        value={formData.zunoValue}
        onChange={(value) => onInputChange('zunoValue', value)}
        onValidate={(value) => onValidate('zunoValue', value)}
        error={errors.zunoValue}
        placeholder="Enter Zuno coin value"
        type="number"
      />

      <div className="flex items-center space-x-8">
        <label className="w-32 text-gray-500">Colour:</label>
        <div className="flex-1 flex items-center space-x-2">
          <FormField
            label=""
            value={formData.color}
            onChange={(value) => onInputChange('color', value)}
            placeholder="#FFFFFF"
          />
          <input
            type="color"
            value={formData.color}
            onChange={(e) => onInputChange('color', e.target.value)}
            className="w-10 h-10 rounded cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default CouponForm;