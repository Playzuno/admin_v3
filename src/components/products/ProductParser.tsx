import React, { useState, useCallback, useEffect } from 'react';
import { Upload, X, Check, FileIcon } from 'lucide-react';
import { SseMenuParserData } from '@/types';
import { useOrg } from '@/context/OrgContext';
import { productApi } from '@/api';
import Button from '../ui/Button';
interface FileUpload {
  id: string;
  name: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  isExpanded: boolean;
}
interface ProductParserProps {
  uploadProductFile: (file: File) => Promise<void>;
  onClose: () => void;
}

function ProductParser({ onClose }: ProductParserProps) {
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const { branch } = useOrg();
  const [queues, setQueues] = useState<SseMenuParserData[]>([]);
  //   const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (branch) {
      productApi.getMenuParserQueues(branch.orgId, branch.id).then(res => {
        setQueues(res.data);
      });
      //   console.log(queues);
    }
  }, [branch]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const selectedFiles = Array.from(e.target.files);
        handleFiles(selectedFiles);
      }
    },
    []
  );

  const handleFiles = (newFiles: File[]) => {
    const fileUploads: FileUpload[] = newFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      progress: 0,
      status: 'uploading',
      isExpanded: false,
    }));

    setFiles(prev => [...prev, ...fileUploads]);

    // Simulate file upload progress
    fileUploads.forEach(fileUpload => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFiles(prev =>
            prev.map(f =>
              f.id === fileUpload.id
                ? { ...f, progress: 100, status: 'completed' }
                : f
            )
          );
        } else {
          setFiles(prev =>
            prev.map(f => (f.id === fileUpload.id ? { ...f, progress } : f))
          );
        }
      }, 500);
    });
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const toggleExpand = (id: string) => {
    setFiles(prev =>
      prev.map(f =>
        f.id === id
          ? { ...f, isExpanded: !f.isExpanded }
          : { ...f, isExpanded: false }
      )
    );
  };

  const handleApply = (id: string) => {
    // Handle apply action here
    console.log('Applied:', id);
  };

  return (
    <div className="w-full h-full min-h-0 flex">
      {/* <div className="w-full h-full bg-gradient-to-br from-brand-50 to-white flex"> */}
      {/* <div className="w-full h-full max-h-full flex flex-col p-4"> */}
      <div className="bg-white overflow-hidden rounded-2xl shadow-lg p-6 flex flex-col flex-1 min-h-0 bg-gradient-to-br from-brand-50 to-white">
        <div className="absolute right-8 top-8">
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>
        <div className="flex-none ">
          <h1 className="title font-bold text-gray-900 mb-2">UPLOAD FILES</h1>
          <p className="text-gray-600 mb-6">
            Upload your choice of files and get them categorized.
          </p>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-6 mb-6 transition-colors ${
              isDragging ? 'border-brand-600 bg-brand-50' : 'border-gray-300'
            }`}
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-brand-600" />
              </div>
              <p className="text-xs font-medium text-gray-700">
                Drag & Drop your files here
              </p>
              <p className="text-gray-500 text-sm">OR</p>
              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  onChange={handleFileInput}
                  className="hidden"
                  accept=".pdf"
                />
                <span className="bg-brand text-white px-6 py-2.5 rounded-lg hover:bg-brand-600 transition-colors">
                  Browse Files
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="overflow-y-auto overflow-x-hidden max-h-[200px]">
          {files.length > 0 && (
            <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
              <h2 className="text-xs font-semibold text-gray-700 mb-4 flex-none">
                Uploaded files
              </h2>
              <div className="overflow-y-auto flex-1 space-y-4 pr-2">
                {files.map(file => (
                  <div
                    key={file.id}
                    className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                      file.isExpanded
                        ? 'border-[#ff6b2c] border-[1px]'
                        : 'border-gray-200'
                    }`}
                  >
                    <div
                      className="p-4 cursor-pointer hover:bg-gray-50 transition-colors relative"
                      onClick={() => toggleExpand(file.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center flex-none">
                          <FileIcon className="w-6 h-6 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {file.name}
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-500 ${
                                file.status === 'completed'
                                  ? 'bg-green-500'
                                  : 'bg-[#ff6b2c]'
                              }`}
                              style={{ width: `${file.progress}%` }}
                            />
                          </div>
                        </div>
                        {file.status === 'completed' ? (
                          <Check className="w-6 h-6 text-green-500 flex-none" />
                        ) : (
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              removeFile(file.id);
                            }}
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center hover:bg-brand-200 transition-colors"
                          >
                            <X className="w-4 h-4 text-brand-600" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div
                      className={`grid transition-all duration-300 ${
                        file.isExpanded
                          ? 'grid-rows-[1fr] opacity-100'
                          : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      {file.isExpanded && <div className="border-b mb-2"></div>}
                      <div className="overflow-hidden">
                        <div className="p-4 pt-0 flex justify-end gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleApply(file.id)}
                            variant="primary"
                          >
                            Apply
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => removeFile(file.id)}
                            variant="zuno-light"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </div>
  );
}

export default ProductParser;
