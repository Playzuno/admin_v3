import React, { useEffect, useState } from 'react';
import { ActionContainer } from '../components/containers';
import CouponForm from '../components/rewards/CouponForm';
import ImageUpload from '../components/rewards/ImageUpload';
import CouponPreview from '../components/rewards/CouponPreview';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { CouponList } from '../components/rewards/CouponList';
import { Plus } from 'lucide-react';
import { couponApi, assetV2Api } from '../api';
import { Coupon } from '../types';
import { SuccessToast } from '@/components/ui/toast';
import Button from '@/components/ui/Button';
import { useOrg } from '@/context/OrgContext';
import toast from 'react-hot-toast';

interface CouponFormData {
  company: string;
  name: string;
  value: number;
  zunoValue: number;
  color: string;
  status: boolean;
  image?: File;
}

interface FormErrors {
  value?: string;
  zunoValue?: string;
}

const RewardsPage: React.FC = () => {
  const [showNewCouponForm, setShowNewCouponForm] = useState(false);
  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null);
  const [formData, setFormData] = useState<CouponFormData>({
    company: '',
    name: '',
    value: 0,
    zunoValue: 0,
    color: '#FFFFFF',
    status: true,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const { branch } = useOrg();

  const fetchCoupons = async () => {
    const response = await couponApi.getAll();
    const formattedCoupons = response.data.map(coupon => ({
      ...coupon,
      value: coupon.value || 0,
      zunoValue: coupon.zunoValue || 0,
    }));
    setCoupons(formattedCoupons);
    if (formattedCoupons.length > 0) {
      handleCouponSelect(formattedCoupons[0]);
    }
  };
  useEffect(() => {
    fetchCoupons();
  }, []);

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
      } else if (num > 1000000) {
        setErrors(prev => ({
          ...prev,
          [field]: 'Value cannot be greater than 1000000',
        }));
      }
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field === 'value' || field === 'zunoValue') {
      setFormData(prev => ({ ...prev, [field]: Number(value) }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    setHasChanges(true);
    validateField(field, value.toString());
    setErrors({});
    // if (
    //   typeof value === 'string' &&
    //   (field === 'value' || field === 'zunoValue')
    // ) {
    //   setErrors(prev => ({ ...prev, [field]: undefined }));
    // }
  };

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    setFormData(prev => ({ ...prev, image: file }));
    setHasChanges(true);

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
      setShowNewCouponForm(false);
    }
  };

  const handleSave = () => {
    validateField('value', formData.value.toString());
    validateField('zunoValue', formData.zunoValue.toString());

    if (!errors.value && !errors.zunoValue) {
      setHasChanges(false);
      setShowNewCouponForm(false);
    }
    setIsEditing(false);

    const coupon = {
      ...formData,
      title: formData.name,
      company: formData.company,
      value: Number(formData.value),
      zunoValue: Number(formData.zunoValue),
      theme: {
        color: formData.color,
        image: previewImage,
        link: previewImage,
      },
      active: formData.status,
    };

    try {
      let assetUploadURL = '';

      if (
        branch &&
        branch?.isMain &&
        branch?.active &&
        branch?.id &&
        formData?.image
      ) {
        assetV2Api
          .create({
            entityId: branch?.id,
            entityType: 'branch',
            contentType: formData?.image?.type,
          })
          .then(res => {
            console.log('res asset>>>>>>>>', res);
            if (res?.data && res?.status === 200) {
              coupon['assetId'] = res?.data?.assetId || '';
              assetUploadURL = res?.data?.uploadURL || '';

              console.log('formData?.image >>>', formData?.image, formData?.image?.type);

              if (assetUploadURL && formData?.image) {
                assetV2Api
                  .uploadAsset(assetUploadURL, formData?.image)
                  .then(res => {
                    console.log('res asset url >>>>>>>>', res);
                    if (res?.status === 200) {
                      console.log('Image uploaded successfully!');
                    }
                  })
                  .catch(err => {
                    console.log('Got error when uploading asset in url, ', err);
                  });
              } else {
                console.log('Got issues in asset upload!');
              }

              console.log('coupon >>>>>>', coupon);
            }
          });
      } else {
        console.log('Got issues in asset upload!');
      }
    } catch (e) {
      console.log('Got issues in asset upload!, ', e);
      toast.error('Got issues in asset upload!');
    }

    if (!selectedCouponId) {
      couponApi.create(coupon).then(() => {
        SuccessToast('Coupon created successfully');
        setShowNewCouponForm(false);
        fetchCoupons();
      });
    } else {
      couponApi.update(selectedCouponId, coupon).then(() => {
        setShowNewCouponForm(false);
        SuccessToast('Coupon updated successfully');
        fetchCoupons();
      });
    }
  };

  const handleCouponSelect = (coupon: Coupon) => {
    setSelectedCouponId(coupon.id);
    // Update preview data
    setFormData({
      company: coupon.company,
      name: coupon.title,
      value: coupon.value,
      zunoValue: coupon.zunoValue,
      color: coupon.theme.color,
      status: coupon.active,
    });
    setPreviewImage(coupon.theme.image);
  };

  const handleUpdateCoupon = (coupon: Coupon) => {
    setShowNewCouponForm(true);
    setIsEditing(true);
    setSelectedCouponId(coupon.id);
    setFormData({
      company: coupon.company,
      name: coupon.title,
      value: coupon.value,
      zunoValue: coupon.zunoValue,
      color: coupon.theme.color,
      status: coupon.active,
    });
    setPreviewImage(coupon.theme.image);
  };

  const handleDeleteCoupon = (couponId: string) => {
    // console.log('Deleting coupon with ID:', couponId);
    couponApi.delete(couponId).then(() => {
      SuccessToast('Coupon deleted successfully');
      fetchCoupons();
    });
  };

  const displayNewCouponForm = () => {
    setSelectedCouponId(null);
    setFormData({
      company: '',
      name: '',
      value: 0,
      zunoValue: 0,
      color: '#FFFFFF',
      status: true,
    });
    setShowNewCouponForm(true);
  };

  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="container-title">Rewards setup</h1>
          </div>
          <Button onClick={() => displayNewCouponForm()} variant="primary">
            <Plus className="mr-2 h-4 w-4" />
            New Coupon
          </Button>
        </div>

        {showNewCouponForm ? (
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
        ) : (
          <CouponList
            coupons={coupons}
            selectedCouponId={selectedCouponId}
            onCouponSelect={handleCouponSelect}
            onUpdateCoupon={handleUpdateCoupon}
            onDeleteCoupon={handleDeleteCoupon}
          />
        )}

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

      <div className="w-[350px] flex-shrink-0 ">
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
