import React, { useState, useRef } from 'react';
import { Camera, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import ConfirmDialog from '../ui/ConfirmDialog';

interface ProfilePhotoProps {
  imageUrl: string;
  onChangePhoto: (file: File) => void;
  onDeletePhoto: () => void;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({
  imageUrl,
  onChangePhoto,
  onDeletePhoto,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteConfirm = () => {
    onDeletePhoto();
    setShowDeleteConfirm(false);
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <img
            src={imageUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="space-x-3">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileSelect}
        />
        <Button
          variant="light"
          icon={Camera}
          onClick={() => fileInputRef.current?.click()}
        >
          Change Picture
        </Button>
        <Button
          variant="error"
          icon={Trash2}
          onClick={() => setShowDeleteConfirm(true)}
        >
          Delete
        </Button>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Profile Picture"
        message="Are you sure you want to delete your profile picture? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
      />

      {/* Image Cropper Modal */}
      {showCropper && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[600px] overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Adjust Profile Picture</h2>
                <button 
                  onClick={() => {
                    setShowCropper(false);
                    setSelectedImage(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="aspect-square w-full mb-6 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  variant="light"
                  onClick={() => {
                    setShowCropper(false);
                    setSelectedImage(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    // Here you would typically get the cropped image data
                    // and convert it to a File object before calling onChangePhoto
                    setShowCropper(false);
                    setSelectedImage(null);
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePhoto;