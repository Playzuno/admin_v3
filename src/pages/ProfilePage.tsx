import React, { useState } from 'react';
import { TabContainer } from '../components/containers';
import Button from '../components/ui/Button';
import GeneralSettings from '../components/profile/GeneralSettings';
import SecuritySettings from '../components/profile/SecuritySettings';
import { LogOut, Save } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'security'>('general');
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { key: 'general', label: 'General' },
    { key: 'security', label: 'Security' },
  ];

  const handleChange = (changed: boolean) => {
    setHasChanges(changed);
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setHasChanges(false);
    }, 1000);
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

      <TabContainer
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={key => setActiveTab(key as 'general' | 'security')}
      >
        {activeTab === 'general' ? (
          <GeneralSettings onFieldChange={handleChange} />
        ) : (
          <SecuritySettings onFieldChange={handleChange} />
        )}
      </TabContainer>
    </div>
  );
};

export default ProfilePage;
