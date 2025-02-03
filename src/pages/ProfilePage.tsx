import React, { useEffect, useState } from 'react';
import { TabContainer } from '../components/containers';
import Button from '../components/ui/Button';
import GeneralSettings from '../components/profile/GeneralSettings';
import SecuritySettings from '../components/profile/SecuritySettings';
import { LogOut, Save } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { LoggedInUser, User } from '@/types';
import { userApi } from '@/api';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'security'>('general');
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editableUser, setEditableUser] = useState<LoggedInUser | null>(null);
  const { user, updateUser } = useAuth();
  useEffect(() => {
    if (user) {
      console.log('user', user);
      setEditableUser(user);
    }
  }, [user]);

  const tabs = [
    { key: 'general', label: 'General' },
    { key: 'security', label: 'Security' },
  ];

  const handleChange = (changed: boolean) => {
    setHasChanges(changed);
  };

  const handleSave = async () => {
    console.log('editableUser', editableUser);
    setIsSaving(true);
    if (!editableUser) {
      return;
    }
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
      console.log('response', response);
      updateUser();
    } catch (error) {
      console.error('Error saving user', error);
    } finally {
      setIsSaving(false);
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
            />
          ) : (
            <SecuritySettings
              editableUser={editableUser}
              onUserUpdate={setEditableUser}
              onFieldChange={handleChange}
            />
          )}
        </TabContainer>
      )}
    </div>
  );
};

export default ProfilePage;
