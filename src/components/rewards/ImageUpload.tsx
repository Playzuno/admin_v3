import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import Button from '../ui/Button';

interface ImageUploadProps {
  onFileSelect: (file: File) => void;
  previewImage: string | null;
  uploadProgress: number;
  onClear: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onFileSelect,
  previewImage,
  uploadProgress,
  onClear,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState({});

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
      setSelectedFile(file);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="container-title-2 text-center">UPLOAD COUPON IMAGE</h2>
      <p className="subtitle text-center">Upload your choice of image.</p>

      <div
        className={`border-2 border-dashed border-brand rounded-lg px-[15px] py-[25px] ${
          dragActive ? 'bg-brand-50' : 'bg-white'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 mb-6">
            <svg
              viewBox="0 0 24 24"
              className="w-full h-full text-brand fill-current"
            >
              <path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
            </svg>
          </div>
          <p className="zuno-text mb-4">Drag & Drop your files here</p>
          <p className="text-lg text-gray-500 mb-6">OR</p>
          <Button
            variant="primary"
            className="bg-brand hover:bg-brand-dark text-white px-8 py-3 rounded-full shadow-lg"
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.onchange = e => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                  onFileSelect(file);
                  setSelectedFile(file);
                }
              };
              input.click();
            }}
          >
            Browse Files
          </Button>
        </div>
      </div>

      {previewImage && (
        <div className="mt-6">
          <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-center space-x-4  w-full">
              <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs font-medium">
                  {(() => {
                    const mime = selectedFile?.type || '';
                    const ext = mime.split('/')[1] || '';

                    const map: Record<string, string> = {
                      jpeg: 'jpeg',
                      jpg: 'jpeg',
                      png: 'png',
                      webp: 'webp',
                      'svg+xml': 'svg',
                      gif: 'gif',
                      bmp: 'bmp',
                      tiff: 'tif',
                    };

                    return map[ext] || ext.slice(0, 4);
                  })()}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700 inline-block max-w-[200px] truncate">
                    {selectedFile?.name || ''}
                  </span>
                  <span className="ml-3 text-gray-500">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div
                    className="bg-brand h-1 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={onClear}
              className="ml-4 p-2 text-brand hover:text-brand-dark rounded-full hover:bg-brand-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
