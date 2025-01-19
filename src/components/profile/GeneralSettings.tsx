import React, { useState } from 'react';
import ProfilePhoto from './ProfilePhoto';
import ProfileField from './ProfileField';

interface GeneralSettingsProps {
  onFieldChange: (changed: boolean) => void;
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({ onFieldChange }) => {
  const [formData, setFormData] = useState({
    fullName: 'Abhijith Sharma',
    username: '@Abhijith.S',
    email: 'abhijith.sharma@email.com',
    phone: '9182019283',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      onFieldChange(true);
      return newData;
    });
  };

  return (
    <div className="space-y-8">
      <ProfileField
        label="Profile photo"
        customField={
          <ProfilePhoto
            imageUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            onChangePhoto={() => onFieldChange(true)}
            onDeletePhoto={() => onFieldChange(true)}
          />
        }
      />

      <ProfileField
        label="Full name"
        value={formData.fullName}
        onChange={(value) => handleInputChange('fullName', value)}
      />

      <ProfileField
        label="Username"
        value={formData.username}
        onChange={(value) => handleInputChange('username', value)}
      />

      <ProfileField
        label="Email"
        type="email"
        value={formData.email}
        onChange={(value) => handleInputChange('email', value)}
      />

      <ProfileField
        label="Phone number"
        type="tel"
        value={formData.phone}
        countryCode="+91"
        onChange={(value) => handleInputChange('phone', value)}
      />

      <ProfileField
        label="Designation"
        value="General Manager"
        readOnly
        className="bg-gray-50"
      />

      <ProfileField
        label="Default branch"
        value="Chrompet - Main branch"
        readOnly
        className="bg-gray-50"
      />
    </div>
  );
};

export default GeneralSettings;