import React, { useState } from 'react';
import { TabContainer, HeaderContainer, ActionContainer } from '../components/containers';
import Button from '../components/ui/Button';
import { Edit, Save, Trash2, Plus } from 'lucide-react';

const ExamplePage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [hasChanges, setHasChanges] = useState(false);
  const [loading, setLoading] = useState(false);

  // Example tabs
  const tabs = [
    { key: 'general', label: 'General' },
    { key: 'security', label: 'Security' },
  ];

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setHasChanges(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Button Examples</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="danger">Danger Button</Button>
              <Button variant="light">Light Button</Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small Button</Button>
              <Button size="md">Medium Button</Button>
              <Button size="lg">Large Button</Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">With Icons</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" icon={Edit}>Change Picture</Button>
              <Button variant="secondary" icon={Save}>Save Changes</Button>
              <Button variant="danger" icon={Trash2}>Delete</Button>
              <Button variant="light" icon={Plus} iconPosition="right">
                Add New
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">States</h3>
            <div className="flex flex-wrap gap-4">
              <Button disabled>Disabled Button</Button>
              <Button loading>Loading Button</Button>
              <Button variant="primary" fullWidth>Full Width Button</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Example with TabContainer */}
      <TabContainer
        title="Settings"
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        <div className="space-y-4">
          <p>Content for {activeTab} tab</p>
          <div className="flex gap-4">
            <Button variant="light" onClick={() => setHasChanges(true)}>
              Make Changes
            </Button>
            <Button
              variant="primary"
              loading={loading}
              disabled={!hasChanges}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </TabContainer>
    </div>
  );
};

export default ExamplePage;