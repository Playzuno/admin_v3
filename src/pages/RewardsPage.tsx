import React, { useState } from 'react';
import { ActionContainer } from '../components/containers';
import CouponForm from '../components/rewards/CouponForm';
import ImageUpload from '../components/rewards/ImageUpload';
import CouponPreview from '../components/rewards/CouponPreview';
import ConfirmDialog from '../components/ui/ConfirmDialog';

interface CouponFormData {
  company: string;
  name: string;
  value: string;
  zunoValue: string;
  color: string;
  status: boolean;
  image?: File;
}

interface FormErrors {
  value?: string;
  zunoValue?: string;
}

const RewardsPage: React.FC = () => {
  const [formData, setFormData] = useState<CouponFormData>({
    company: '',
    name: '',
    value: '',
    zunoValue: '',
    color: '#FFFFFF',
    status: true,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const validateField = (field: string, value: string) => {
    if (field === 'value' || field === 'zunoValue') {
      if (value === '') {
        setErrors(prev => ({ ...prev, [field]: undefined }));
        return;
      }

      const num = Number(value);
      if (isNaN(num)) {
        setErrors(prev => ({
          ...prev,
          [field]: 'Please enter a valid number',
        }));
      } else if (num < 0) {
        setErrors(prev => ({ ...prev, [field]: 'Value cannot be negative' }));
      } else {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);

    // Clear error when user starts typing
    if (
      typeof value === 'string' &&
      (field === 'value' || field === 'zunoValue')
    ) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    setFormData(prev => ({ ...prev, image: file }));
    setHasChanges(true);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 200);
  };

  const handleClearImage = () => {
    setPreviewImage(null);
    setFormData(prev => ({ ...prev, image: undefined }));
    setUploadProgress(0);
    setHasChanges(true);
  };

  const handleCancel = () => {
    if (hasChanges) {
      setShowConfirmDialog(true);
    } else {
      // Navigate back or close form
    }
  };

  const handleSave = () => {
    // Validate all fields before saving
    validateField('value', formData.value);
    validateField('zunoValue', formData.zunoValue);

    // Check if there are any errors
    if (!errors.value && !errors.zunoValue) {
      console.log('Saving form data:', formData);
      setHasChanges(false);
    }
  };

  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="container-title">Rewards setup</h1>
          </div>
        </div>

        <ActionContainer
          title="New coupon"
          onCancel={handleCancel}
          onSave={handleSave}
          saveDisabled={!hasChanges || Object.keys(errors).length > 0}
        >
          <div className="grid grid-cols-2 gap-12">
            <CouponForm
              formData={formData}
              errors={errors}
              onInputChange={handleInputChange}
              onValidate={validateField}
            />
            <ImageUpload
              onFileSelect={handleFileSelect}
              previewImage={previewImage}
              uploadProgress={uploadProgress}
              onClear={handleClearImage}
            />
          </div>
        </ActionContainer>

        <ConfirmDialog
          isOpen={showConfirmDialog}
          title="Discard Changes"
          message="Are you sure you want to discard your changes? This action cannot be undone."
          onConfirm={() => {
            setShowConfirmDialog(false);
            // Navigate back or close form
          }}
          onCancel={() => setShowConfirmDialog(false)}
        />
      </div>

      <div className="w-[400px] flex-shrink-0 ">
      <div className="space-y-1">
            <h1 className="container-title">Rewards setup</h1>
          </div>
        <CouponPreview
          company={formData.company}
          name={formData.name}
          value={formData.value}
          zunoValue={formData.zunoValue}
          image={previewImage}
        />
      </div>
    </div>
  );
};

export default RewardsPage;
