import React, { useState } from 'react';
import { TabContainer } from '../components/containers';
import { Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';

interface FormData {
  gstNo: string;
  address: string;
}

const BrandProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const initialFormData: FormData = {
    gstNo: '08 ABCDE9999F1Z8 3',
    address:
      '172/173, Velachery - Tambaram Main Rd, Aarthi Nagar, Selaiyur, Chennai, Tamil Nadu 600059',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const tabs = [
    { key: 'general', label: 'General' },
    { key: 'security', label: 'Security' },
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
      toast.success('Changes saved successfully');
    } catch (error) {
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <h1 className="container-title">Account Settings</h1>
          {isEditing && (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 bg-secondary text-white rounded-2xl disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          )}
        </div>
      </div>

      <TabContainer
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        <div className="divide-y">
          <div className="py-6">
            <div className="grid grid-cols-[160px,1fr] gap-8">
              <label className="subtitle-2">Brand logo</label>
              <div className="flex items-center justify-between">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center">
                  <img
                    src="https://example.com/logo.png"
                    alt="Brand Logo"
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="flex space-x-3">
                  {!isEditing && (
                    <Button
                      variant="zuno-dark"
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-2 bg-purple-100 text-secondary rounded-2xl hover:bg-purple-200 transition-colors"
                    >
                      Edit
                    </Button>
                  )}
                  {isEditing && (
                    <Button variant="light" onClick={handleCancel}>
                      Cancel
                    </Button>
                  )}
                  <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="py-6">
            <div className="grid grid-cols-[160px,1fr] items-center gap-8">
              <label className="subtitle-2">Company name</label>
              <div className="flex items-center justify-between w-[250px]">
                <input
                  type="text"
                  value="Adayar Anandha Bhavan"
                  className="w-full px-4 py-2 bg-gray-100 rounded-2xl"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="py-6">
            <div className="grid grid-cols-[160px,1fr] items-center gap-8">
              <label className="subtitle-2">No. of branches</label>
              <div className="flex items-center justify-between w-[250px]">
                <input
                  type="text"
                  value="30"
                  className="w-full px-4 py-2 bg-gray-100 rounded-2xl"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="py-6">
            <div className="grid grid-cols-[160px,1fr] items-center gap-8">
              <label className="subtitle-2">Company GST No.</label>
              <div className="flex items-center justify-between w-[250px]">
                <input
                  type="text"
                  value={formData.gstNo}
                  onChange={e => handleInputChange('gstNo', e.target.value)}
                  className={`w-full px-4 py-2 rounded-2xl ${
                    isEditing ? 'bg-white border' : 'bg-gray-100'
                  }`}
                  readOnly={!isEditing}
                />
              </div>
            </div>
          </div>

          <div className="py-6">
            <div className="grid grid-cols-[160px,1fr] items-center gap-8">
              <label className="subtitle-2">Company address</label>
              <div className="flex items-center justify-between w-1/2">
                <input
                  type="text"
                  value={formData.address}
                  onChange={e => handleInputChange('address', e.target.value)}
                  className={`w-full px-4 py-2 rounded-2xl ${
                    isEditing ? 'bg-white border' : 'bg-gray-100'
                  }`}
                  readOnly={!isEditing}
                />
              </div>
            </div>
          </div>
        </div>
      </TabContainer>
    </div>
  );
};

export default BrandProfilePage;
