import React, { useEffect, useState } from 'react';
import { TabContainer } from '../components/containers';
import Button from '../components/ui/Button';
import GeneralSettings from '../components/profile/GeneralSettings';
import SecuritySettings from '../components/profile/SecuritySettings';
import { LogOut, Save } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { LoggedInUser, User } from '@/types';
import { userApi } from '@/api';
import { SuccessToast } from '@/components/ui/toast';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'security'>('general');
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editableUser, setEditableUser] = useState<LoggedInUser | null>(null);
  const { user, updateUser } = useAuth();
  const [passwordData, setPasswordData] = useState({
    new: '',
    confirm: '',
  });
  useEffect(() => {
    if (user) {
      console.log('user', user);
      setEditableUser(user);
    }
  }, [user]);

  useEffect(() => {
    updateUser();
  }, []);

  const tabs = [
    { key: 'general', label: 'General' },
    { key: 'security', label: 'Security' },
  ];

  const handleChange = (changed: boolean) => {
    setHasChanges(changed);
  };

  const handlePasswordChange = (password: string, confirmPassword: string) => {
    setPasswordData({
      new: password,
      confirm: confirmPassword,
    });
    setHasChanges(password !== confirmPassword);
  };

  const handleSave = async () => {
    console.log('editableUser', editableUser);
    setIsSaving(true);
    if (!editableUser) {
      return;
    }
    if (activeTab == 'general') {
      try {
        const response = await userApi.update(editableUser.user.id, {
          username: editableUser.user.username,
          email: editableUser.user.email,
          fullName: editableUser.user.fullName,
          mobile: editableUser.user.mobile,
          metadata: {
            ...editableUser.user.metadata,
            profilePictureURL: editableUser.user.metadata.profilePictureURL,
            designation: editableUser.user.metadata.designation,
          },
        });
        updateUser();
      } catch (error) {
        console.error('Error saving user', error);
      } finally {
        setIsSaving(false);
      }
    } else if (activeTab == 'security') {
      try {
        const response = await userApi.forceUpdatePassword({
          password: passwordData.new,
          confirmPassword: passwordData.confirm,
        });
        SuccessToast('Password updated successfully');
        updateUser();
        setPasswordData({
          new: '',
          confirm: '',
        });
      } catch (error) {
        console.error('Error saving user', error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="container-title">Account Settings</h1>
        </div>
        <div>
          <Button
            className="mx-4"
            variant="light"
            icon={LogOut}
            onClick={handleLogout}
          >
            Logout
          </Button>
          <Button
            variant="primary"
            icon={Save}
            disabled={!hasChanges}
            loading={isSaving}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </div>
      {editableUser && (
        <TabContainer
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={key => setActiveTab(key as 'general' | 'security')}
        >
          {activeTab === 'general' ? (
            <GeneralSettings
              editableUser={editableUser}
              onUserUpdate={setEditableUser}
              onFieldChange={handleChange}
              refreshUser={updateUser}
            />
          ) : (
            <SecuritySettings
              editableUser={editableUser}
              onUserUpdate={setEditableUser}
              onFieldChange={handleChange}
              refreshUser={updateUser}
              onPasswordChange={handlePasswordChange}
            />
          )}
        </TabContainer>
      )}
    </div>
  );
};

export default ProfilePage;
