import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

interface ProductUploadModalProps {
  onClose: () => void;
}

const ProductUploadModal: React.FC<ProductUploadModalProps> = ({ onClose }) => {
  const [files, setFiles] = useState<UploadedFile[]>([
    { 
      id: '1', 
      name: 'A2B- Menu-101.pdf', 
      progress: 79, 
      status: 'uploading' 
    },
    { 
      id: '2', 
      name: 'A2B- Menu-10.pdf', 
      progress: 100, 
      status: 'completed' 
    },
    { 
      id: '3', 
      name: 'A2B- Menu-102.pdf', 
      progress: 100, 
      status: 'completed' 
    },
  ]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    // Handle file drop logic here
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[500px] max-h-[90vh] overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">UPLOAD FILES</h2>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            </button>
          </div>
          
          <p className="text-gray-600 mb-6">
            Upload your choice of files and get them categorized.
          </p>

          <div 
            className="border-2 border-dashed border-secondary border-opacity-20 rounded-lg p-8 mb-6"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="flex flex-col items-center text-center">
              <Upload className="w-12 h-12 text-secondary mb-4" />
              <p className="text-gray-600 mb-2">Drag & Drop your files here</p>
              <p className="text-gray-500 mb-4">OR</p>
              <button className="btn btn-secondary text-sm px-4 py-2">
                Browse Files
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-700">Uploaded files</h3>
            {files.map(file => (
              <div key={file.id} className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                  <span className="text-red-600 text-xs font-medium">PDF</span>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{file.name}</span>
                    <span className="text-sm text-gray-500">{file.progress}%</span>
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        file.status === 'completed' ? 'bg-green-500' : 'bg-primary'
                      }`}
                      style={{ width: `${file.progress}%` }}
                    />
                  </div>
                </div>
                <button>
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUploadModal;