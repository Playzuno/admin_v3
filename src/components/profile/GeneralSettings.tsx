import React, { useState } from 'react';
import ProfilePhoto from './ProfilePhoto';
import ProfileField from './ProfileField';

import { LoggedInUser } from '@/types';

interface GeneralSettingsProps {
  editableUser: LoggedInUser;
  onUserUpdate: (user: LoggedInUser) => void;
  onFieldChange: (changed: boolean) => void;
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({
  editableUser,
  onUserUpdate,
  onFieldChange,
}) => {
  const [formData, setFormData] = useState(editableUser.user);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      onFieldChange(true);
      onUserUpdate({ ...editableUser, user: newData });
      return newData;
    });
  };
  console.log(formData);
  return (
    <div className="space-y-8">
      <ProfileField
        label="Profile photo"
        customField={
          <ProfilePhoto
            imageUrl={formData?.metadata?.profilePictureURL}
            onChangePhoto={() => onFieldChange(true)}
            onDeletePhoto={() => onFieldChange(true)}
            initial={formData?.fullName?.charAt(0)}
          />
        }
      />

      <ProfileField
        label="Full name"
        value={formData?.fullName}
        onChange={value => handleInputChange('fullName', value)}
      />

      <ProfileField
        label="Username"
        value={formData?.username}
        onChange={value => handleInputChange('username', value)}
      />

      <ProfileField
        label="Email"
        type="email"
        value={formData?.email}
        onChange={value => handleInputChange('email', value)}
      />

      <ProfileField
        label="Phone number"
        type="tel"
        value={formData?.mobile}
        countryCode="+91"
        onChange={value => handleInputChange('mobile', value)}
      />

      <ProfileField
        label="Designation"
        value={formData?.metadata?.designation}
        readOnly
        className="bg-gray-50"
      />

      <ProfileField
        label="Default branch"
        value={editableUser.memberships[0].branchName}
        readOnly
        className="bg-gray-50"
      />
    </div>
  );
};

export default GeneralSettings;
