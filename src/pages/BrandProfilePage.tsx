import React, { useEffect, useState } from 'react';
import { TabContainer } from '../components/containers';
import { Edit2, Rss, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import { assetsApi, branchApi, organizationApi, userApi } from '@/api';
import { Branch, Organization } from '@/types';
import ProfileField from '@/components/profile/ProfileField';
import ProfilePhoto from '@/components/profile/ProfilePhoto';
import { SuccessToast, ErrorToast } from '@/components/ui/toast';

interface FormData {
  gstNo: string;
  address: string;
  logo: string;
}

const BrandProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [logoVersion, setLogoVersion] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    gstNo: '',
    address: '',
    logo: '',
  });

  useEffect(() => {
    const fetchOrganization = async () => {
      const response = await userApi.getOrganization();
      const org = response.data;
      setOrganization(org);
      setFormData({
        gstNo: org.gstin || '',
        address: org.address || '',
        logo: org.theme?.logo || '',
      });
    };
    fetchOrganization();
  }, []);
  const fetchBranches = async () => {
    if (!organization?.id) {
      return;
    }
    const response = await branchApi.getAll(organization.id);
    if (
      response.status === 200 &&
      response.data &&
      response.data.length > 0
    ) {
      const branches = response.data;
      setBranches(branches);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, [organization?.id]);

  const tabs = [
    { key: 'general', label: 'General' },
    { key: 'security', label: 'Security' },
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setFormData({
      gstNo: organization?.gstin || '',
      address: organization?.address || '',
      logo: organization?.theme?.logo || '',
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      // console.log(formData);
      setIsEditing(false);
      organizationApi.update(organization?.id || '', {
        gstin: formData.gstNo,
        address: formData.address,
        theme: {
          logo: formData.logo,
        },
      }).then(response => {
        if (response.status === 200) {
          toast.success('Changes saved successfully');
        } else {
          toast.error('Failed to save changes');
        }
      });
      
    } catch (error) {
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const uploadProfilePicture = async (file: File) => {
    // console.log('Uploading profile picture', file);
    const { data } = await assetsApi.getOrganizationLogoPresignedUrl(organization?.id || '');
    // console.log(data);

    const response = await fetch(data.presignedURL, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (response.ok) {
      SuccessToast('Upload successful!');
      const {data: {presignedURL}} = await assetsApi.refreshOrganizationLogo(organization?.id || '');
      setFormData(prev => ({ ...prev, logo: presignedURL }));
      setLogoVersion(prev => prev + 1);
    } else {
      ErrorToast('Upload failed!');
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
              {/* <label className="subtitle-2">Brand logo</label> */}
              <div className="flex items-center justify-between">
                {/* <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center">
                  <img
                    src="https://example.com/logo.png"
                    alt="Brand Logo"
                    className="w-16 h-16 object-contain"
                  />
                </div> */}
                <ProfileField
                  label="Brand logo"
                  customField={
                    <ProfilePhoto
                      hideActions={true}
                      imageUrl={organization?.theme?.logo || ''}
                      onChangePhoto={uploadProfilePicture}
                      onDeletePhoto={() => {}}
                      initial={organization?.name?.charAt(0)}
                      imageVersionKey={logoVersion}
                    />
                  }
                />
                <div className="ml-6 flex space-x-3">
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
                  value={organization?.name}
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
                  value={branches.length || 0}
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
