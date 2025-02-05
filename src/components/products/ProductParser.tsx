import React, { useState, useCallback, useEffect } from 'react';
import { Upload, X, Check, FileIcon, Loader2 } from 'lucide-react';
import { Product, SseMenuInternalResponse, SseMenuParserData } from '@/types';
import { useOrg } from '@/context/OrgContext';
import { productApi } from '@/api';
import Button from '../ui/Button';
interface FileUpload {
  id: string;
  name: string;
  progress: number;
  status: 'uploading' | 'completed' | 'processing' | 'failed';
  isExpanded: boolean;
  file: File;
  sent: boolean;
  batchId?: string;
}
interface ProductParserProps {
  parseNewProducts: (newProducts: Product[]) => Promise<void>;
  onClose: () => void;
  setParserBatchId: (batchId: string) => void;
}

function ProductParser({
  parseNewProducts,
  onClose,
  setParserBatchId,
}: ProductParserProps) {
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const { branch } = useOrg();
  const [queues, setQueues] = useState<SseMenuParserData[]>([]);
  //   const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (branch) {
      productApi.getMenuParserQueues(branch.orgId, branch.id).then(res => {
        setQueues(res.data);
        const queues = res.data;
        for (const queue of queues) {
          if (queue.status == '100') {
            connectSSE(queue.batchId);
          }
          const formQueues: FileUpload[] = [];
          queues.forEach(queue => {
            formQueues.push({
              id: queue.batchId,
              name: queue.batchId,
              progress: queue.status == '100' ? 100 : 100,
              status: queue.status == '100' ? 'processing' : 'completed',
              isExpanded: false,
              file: new File([], queue.batchId),
              sent: true,
              batchId: queue.batchId,
            });
          });
          setFiles(formQueues);
        }
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

  const sendFile = async (file: FileUpload) => {
    console.log(file);
    const formData = new FormData();
    formData.append('input_file', file.file);
    formData.append('branchId', branch?.id || '');
    // console.log('formData', file);

    try {
      const response = await productApi.parseMenuUsingAI(formData);
      setFiles(prev =>
        prev.map(f =>
          f.id === file.id
            ? { ...f, sent: true, batchId: response.data.batch_id }
            : f
        )
      );
      connectSSE(response.data.batch_id);
      return response.data;
    } catch (error: any) {
      console.log('error', error);
      if (!error.response) {
        throw new Error('Network error. Please check your connection.');
      }
      throw error.response;
    }
  };
  const connectSSE = (batchId: string) => {
    productApi.getMenuParserStatus(
      batchId,
      (data: SseMenuParserData | SseMenuInternalResponse) => {
        // console.log('sse message', data);
        if (data.batchId) {
          setQueues(prev => {
            const exist = prev.find(q => q.batchId === batchId);
            if (exist) {
              return prev.map(q =>
                q.batchId === batchId ? { ...q, status: data.status } : q
              );
            } else {
              return [...prev, { ...data }];
            }
          });
        }
        if (data.Response) {
          const resp = JSON.parse(data.Response);
          const products = resp.products;
          //   console.log('products', products);
          setQueues(prev =>
            prev.map(q =>
              q.batchId === batchId
                ? { ...q, status: resp.status, response: resp }
                : q
            )
          );
          setFiles(prev =>
            prev.map(f =>
              f.batchId === batchId ? { ...f, status: 'completed' } : f
            )
          );
        }
      },
      error => {
        console.log('sse error', error);
      }
    );
  };

  const handleFiles = (newFiles: File[]) => {
    const fileUploads: FileUpload[] = newFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      progress: 0,
      status: 'uploading',
      isExpanded: false,
      file: file,
      sent: false,
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
                ? { ...f, progress: 100, status: 'processing' }
                : f
            )
          );
          sendFile(fileUpload);
        } else {
          setFiles(prev =>
            prev.map(f => (f.id === fileUpload.id ? { ...f, progress } : f))
          );
        }
      }, 500);
    });
  };

  const removeFile = (id: string) => {
    const file = files.find(f => f.id === id);
    const queue = queues.find(q => q.batchId === file?.batchId);
    if (branch?.orgId && branch?.id && queue) {
      productApi
        .cancelQueue(branch?.orgId, branch?.id, queue.batchId)
        .then(() => {
          setFiles(prev => prev.filter(f => f.id !== id));
        })
        .catch(err => {
          console.log('error', err);
        });
    }
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

  const handleApply = (file: FileUpload) => {
    // Handle apply action here
    // console.log('Applied:', file);
    const queue = queues.find(q => q.batchId === file.batchId);
    if (queue) {
      const resp = JSON.parse(queue.response.Response);
      const products = resp.products;
      setParserBatchId(queue.batchId);
      parseNewProducts(products);
    }
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
                        {file.status === 'completed' && (
                          <Check className="w-6 h-6 text-green-500 flex-none" />
                        )}
                        {file.status === 'processing' && (
                          <Loader2 className="w-6 h-6 text-brand-500 flex-none animate-spin" />
                        )}
                        {file.status === 'failed' && (
                          <X className="w-6 h-6 text-red-500 flex-none" />
                        )}
                        {file.status === 'uploading' && (
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
                            onClick={() => handleApply(file)}
                            variant="primary"
                            disabled={file.status !== 'completed'}
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
