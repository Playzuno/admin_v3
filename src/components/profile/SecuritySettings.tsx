import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';
import ProfileField from './ProfileField';
import Button from '../ui/Button';

import { LoggedInUser } from '@/types';

interface SecuritySettingsProps {
  editableUser: LoggedInUser;
  onUserUpdate: (user: LoggedInUser) => void;
  onFieldChange: (changed: boolean) => void;
  refreshUser: () => void;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  editableUser,
  onUserUpdate,
  onFieldChange,
}) => {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
  });
  const [passwordData, setPasswordData] = useState({
    current: 'MyCurrentPass123!',
    new: '',
    confirm: '',
  });
  const [passwordError, setPasswordError] = useState<string>('');
  const lastPasswordChange = new Date('2024-02-15').toLocaleDateString();
  const daysSinceChange = Math.floor(
    (new Date().getTime() - new Date('2024-02-15').getTime()) /
      (1000 * 60 * 60 * 24)
  );

  useEffect(() => {
    if (passwordData.new && passwordData.confirm) {
      if (passwordData.new !== passwordData.confirm) {
        setPasswordError('Passwords do not match');
        onFieldChange(false);
      } else {
        setPasswordError('');
        onFieldChange(true);
      }
    } else {
      setPasswordError('');
      onFieldChange(false);
    }
  }, [passwordData.new, passwordData.confirm, onFieldChange]);

  const generateSecurePassword = () => {
    const length = 16;
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPasswordData(prev => ({ ...prev, new: password, confirm: password }));
  };

  const handlePasswordChange = (
    field: keyof typeof passwordData,
    value: string
  ) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field: 'current' | 'new') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="space-y-8">
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600">
          Last password change: {lastPasswordChange}
          {daysSinceChange > 90 && (
            <span className="text-orange-500 ml-2">
              ⚠️ Your password is {daysSinceChange} days old. Consider updating
              it.
            </span>
          )}
        </p>
      </div>

      <div className="space-y-6">
        {/* Current Password */}
        <ProfileField
          label="Current Password"
          type={showPasswords.current ? 'text' : 'password'}
          value={passwordData.current}
          onChange={val => handlePasswordChange('current', val)}
          placeholder="Enter current password"
          endAdornment={
            <button
              type="button"
              onClick={() => togglePasswordVisibility('current')}
              className="text-gray-500 hover:text-gray-700"
            >
              {showPasswords.current ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          }
        />

        {/* New Password */}
        <ProfileField
          label="New Password"
          type={showPasswords.new ? 'text' : 'password'}
          value={passwordData.new}
          onChange={val => handlePasswordChange('new', val)}
          placeholder="Enter new password"
          endAdornment={
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="text-gray-500 hover:text-gray-700"
            >
              {showPasswords.new ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          }
        />

        {/* Confirm Password */}
        <div>
          <ProfileField
            label="Confirm Password"
            type="password"
            value={passwordData.confirm}
            onChange={val => handlePasswordChange('confirm', val)}
            placeholder="Confirm new password"
          />
          {passwordError && (
            <div className="mt-2 ml-32 text-sm text-red-500">
              {passwordError}
            </div>
          )}
        </div>

        <button
          onClick={generateSecurePassword}
          className="flex items-center space-x-2 px-4 py-2 text-primary hover:text-primary-600 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Generate Secure Password</span>
        </button>
      </div>

      <div className="pt-4">
        <h3 className="title mb-4">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
          <div>
            <p className="font-medium">Authenticator App</p>
            <p className="text-xs text-gray-500">
              Use an authenticator app to generate one-time codes
            </p>
          </div>
          <Button variant="secondary">Enable</Button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
