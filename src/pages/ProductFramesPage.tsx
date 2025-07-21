import { useState, useEffect, useMemo, useRef } from 'react';
import Button from '@/components/ui/Button';
import ScanProgress from '@/components/ui/ScanProgress';
import ImageAnnotator from '@/components/ui/ImageAnnotator';
import { objectDetectionApi, organizationApi, productApi } from '@/api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { Product } from '@/types';
import { ActionContainer } from '../components/containers';
import {
  MoveRight,
  MoveLeft,
  Brush,
  Eraser,
  Clapperboard,
  Images,
  X,
  Cog,
} from 'lucide-react';
import { Dot, Frame } from '@/types';
import CustomVideoPlayer from '../components/ui/CustomVideoPlayer';

interface Label {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  class: string;
  createdAt: string;
  updatedAt: string;
}

interface FrameWithLabels extends Frame {
  labels?: Label[];
  width: number;
  height: number;
}

interface FrameGridProps {
  frames: FrameWithLabels[];
  onFrameSelect: (frame: FrameWithLabels) => void;
  deletedIds: string[];
  setDeletedIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const MIN_REQUIRED_IMAGES = 30;

const FrameGrid = ({
  frames,
  onFrameSelect,
  deletedIds,
  setDeletedIds,
}: FrameGridProps) => {
  // Filter out deleted frames from view
  const visibleFrames = frames?.filter(f => !deletedIds.includes(f.id)) || [];

  const handleDelete = (frameId: string) => {
    if (visibleFrames.length <= MIN_REQUIRED_IMAGES) {
      alert(`Minimum ${MIN_REQUIRED_IMAGES} images required.`);
      return;
    }
    setDeletedIds(prev => [...prev, frameId]);
  };

  const handleSelect = (frameId: string) => {
    setDeletedIds(prev => prev.filter(id => id !== frameId));
  };

  const drawBoundingBoxes = (
    canvas: HTMLCanvasElement,
    frame: FrameWithLabels
  ) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = frame.frameURL;

    img.onload = () => {
      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image
      ctx.drawImage(img, 0, 0);

      // Draw bounding boxes and labels
      frame.labels?.forEach(label => {
        // Draw the box
        ctx.strokeStyle = '#22C55E'; // green-500
        ctx.lineWidth = 2;
        ctx.strokeRect(label.x || 0, label.y, label.width, label.height);

        // Draw the label background and text
        ctx.font = '14px Arial';
        const padding = 4;
        let className = label.class;
        let textWidth = ctx.measureText(className).width;
        const maxWidth =
          Math.min(label.width, img.width - label.x) - padding * 2;
        // Truncate with ellipsis if too long
        if (textWidth > maxWidth) {
          while (
            className.length > 0 &&
            ctx.measureText(className + '...').width > maxWidth
          ) {
            className = className.slice(0, -1);
          }
          className += '...';
          textWidth = ctx.measureText(className).width;
        }
        // Draw background
        ctx.fillStyle = '#22C55E';
        ctx.fillRect(
          label.x,
          Math.max(label.y - 20, 0), // Prevent going above image
          textWidth + padding * 2,
          20
        );
        // Draw text
        ctx.fillStyle = 'white';
        ctx.fillText(className, label.x + padding, Math.max(label.y - 5, 12));
      });
    };
  };

  const imageOnClick = (frame: FrameWithLabels) => {
    onFrameSelect(frame);
  };

  return (
    <div className="grid grid-cols-4 xl:grid-cols-7 2xl:grid-cols-8 overflow-y-auto max-h-96 gap-1 mt-3">
      {frames?.map(frame => (
        <div
          key={frame.id}
          className="w-[8.6rem] h-[6.8rem] relative cursor-pointer group my-2"
          // onClick={() => imageOnClick(frame)}
          onClick={e => {
            e.stopPropagation();
            handleSelect(frame.id);
          }}
          title={frame.labels?.map(l => l.class).join(', ')}
        >
          <canvas
            ref={canvas => canvas && drawBoundingBoxes(canvas, frame)}
            className="w-full h-full object-cover hover:opacity-60"
          />
          {!deletedIds?.includes(frame.id) && (
            <div onClick={e => e.stopPropagation()}>
              <div className="absolute w-[9.1rem] h-[7.3rem] cursor-default border-[4px] border-stroke-dark/40 -top-[4px] -left-[4px]"></div>
              <div
                onClick={e => {
                  e.stopPropagation();
                  handleDelete(frame.id);
                }}
                className="absolute -top-2 -right-2 bg-[#F44336] cursor-pointer h-[1rem] w-[1rem] p-1 rounded-full"
              >
                <X className="font-bold h-2 w-2 text-white" />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const ProductFramesPage = () => {
  const [showAnnotator, setShowAnnotator] = useState(false);
  const [mode, setMode] = useState<'scan' | 'ignore'>('scan');
  const [eraseTrigger, setEraseTrigger] = useState(0);
  const [dots, setDots] = useState<Dot>({ red: [], green: [] });
  const [selectedFrame, setselectedFrame] = useState<Frame | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { branchId, productId } = useParams();
  const [frames, setFrames] = useState<Frame[]>([]);
  const [currentJobs, setCurrentJobs] = useState({});
  const [product, setProduct] = useState<Product | null>(null);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showClearAllFramesConfirm, setShowClearAllFramesConfirm] =
    useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPlayVideo, setShowPlayVideo] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (branchId && productId) {
      fetchTrainingImages(branchId, productId);
      getProduct(branchId, productId);
    }
  }, [productId, branchId]);

  useEffect(() => {
    if (branchId) {
      getCurrentJobs(branchId);
    }
  }, [branchId]);

  const fetchTrainingImages = async (branchId: string, productId: string) => {
    try {
      setIsLoading(true);
      const response = await objectDetectionApi.getProductFrames(
        branchId,
        productId
      );
      setFrames(response.data as Frame[]);
    } catch (error) {
      console.error('Error fetching training images:', error);
      // Handle error - show error message to user
    } finally {
      setIsLoading(false);
    }
  };

  const getProduct = async (branchId: string, productId: string) => {
    try {
      setLoading(true);
      const { data, status } = await productApi.getById(branchId, productId);
      if (status === 200) {
        setProduct(data);
      } else {
        console.error('Error fetching product');
      }
    } catch (err) {
      console.error('Please contact support:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentJobs = async (branchId: string, jobType: string) => {
    try {
      const { data, status } = await organizationApi.getActiveJobs(branchId, {
        jobType,
        entityId: productId,
        entityType: 'product',
      });
      if (status === 200) {
        setCurrentJobs(data);
      }

      if (status === 204) {
        setCurrentJobs({});
      }
    } catch (error) {
      console.error('Error fetching training images:', error);
    }
  };

  const handleFrameSelect = async (frame: Frame) => {
    // Remove below comments if you want to show the marking page.
    // setselectedFrame(frame);
    // setShowAnnotator(true);
  };

  const deleteFrames = async (
    branchId: string,
    productId: string,
    frames: any
  ) => {
    const { data, status } = await objectDetectionApi.deleteFrames(
      branchId,
      productId,
      frames
    );
    if (status === 200) {
      fetchTrainingImages(branchId, productId);
    }
  };
  const extractFrames = async () => {
    if (!branchId || !productId) return;
    const { data, status } = await objectDetectionApi.extractFrames(
      branchId,
      productId
    );
    if (status === 200 && data.success) {
      alert(
        'The frames are currently extracted from the provided video please wait pateintly'
      );
      getCurrentJobs(branchId, 'extract_frames');
    }
  };

  const saveAnnotation = async () => {
    if (
      (dots.green.length === 0 && dots.red.length === 0) ||
      !selectedFrame ||
      !branchId ||
      !productId
    )
      return;
    const annotationData = {
      frames: frames.map(({ frameName }) => frameName),
      product_id: productId,
      main_frame: selectedFrame.frameName,
      positive_points: dots.green,
      negative_points: dots.red,
    };
    const response = await objectDetectionApi.saveAnnotation(
      branchId,
      productId,
      annotationData
    );
    if (response.status === 200) {
      getCurrentJobs(branchId, 'sam2_process_frames');
      setShowAnnotator(false);
    }
  };

  useEffect(() => {
    const checkJobs = () => {
      if (frames.length === 0 && branchId) {
        getCurrentJobs(branchId, 'extract_frames');
      }

      if (frames.length > 0 && !frames[0].labels && branchId) {
        getCurrentJobs(branchId, 'sam2_process_frames');
      }
    };

    // Initial check
    checkJobs();

    // Set up polling every 10 seconds
    const intervalId = setInterval(checkJobs, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [frames, branchId]);

  if (!branchId || !productId) {
    return navigate('/products');
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleCancel = () => {
    setDeletedIds([]);
  };

  const handleSave = () => {
    setShowSaveConfirm(true);
  };

  const confirmSave = async () => {
    try {
      setIsSaving(true);
      setShowSaveConfirm(false);

      if (frames.length - deletedIds.length < 50) {
        toast.error(
          'Needs miminum of 50 images to train, Please select more images'
        );
      } else {
        deleteFrames(branchId, productId, deletedIds);
        setDeletedIds([]);
        toast.success('Deleted unselected images successfully');
      }
    } catch (error) {
      toast.error('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const confirmClearAllFrames = () => {
    setShowClearAllFramesConfirm(false);
    deleteFrames(
      branchId,
      productId,
      frames.map(({ id }) => id)
    );
  };

  return (
    <>
      <ActionContainer
        title="Train Model"
        onCancel={deletedIds?.length > 0 ? handleCancel : undefined}
        onSave={deletedIds?.length > 0 ? handleSave : undefined}
        saveDisabled={!deletedIds?.length || isSaving}
      >
        <div className="flex flex-row gap-4 mt-5 justify-between mx-16">
          <div className="flex gap-6 relative">
            <Button
              size="hmd"
              icon={Clapperboard}
              onClick={() => setShowPlayVideo(!showPlayVideo)}
              variant={`${showPlayVideo ? 'secondary' : 'zuno-light'}`}
            >
              View video
            </Button>
            <Button
              size="hmd"
              onClick={() => {
                setShowPlayVideo(false);
              }}
              icon={Images}
              variant="secondary"
            >
              Images
            </Button>
            {showPlayVideo && (
              <div className="absolute p-12 top-[68px] -left-16 bg-black/30 backdrop-blur-md rounded-2xl shadow-lg z-10 w-[40vw]">
                <CustomVideoPlayer product={product || {}} />
              </div>
            )}
          </div>
          <div className="w-1/3">
            <ScanProgress
              label="Images Selected"
              progress={
                frames.length - deletedIds.length > 50
                  ? 100
                  : isNaN(
                        Math.trunc(
                          ((frames?.length - deletedIds?.length) / 50) * 100
                        )
                      )
                    ? 0
                    : Math.trunc(
                        ((frames?.length - deletedIds?.length) / 50) * 100
                      )
              }
            />
          </div>
        </div>
        {showAnnotator && selectedFrame ? (
          <div className="flex flex-row justify-center items-center mt-8 gap-12 w-full min-h-[600px]">
            {/* Left: Annotator */}
            <div className="flex-[1] min-w-[500px] flex justify-end">
              <ImageAnnotator
                src={selectedFrame.frameURL ?? '/assets/images/dosa.png'}
                alt="Dosa"
                mode={mode}
                eraseTrigger={eraseTrigger}
                className="w-full h-auto rounded-xl"
                onDotsChange={setDots}
              />
            </div>

            {/* Right: Info and Controls */}
            <div className="flex-1 w-[340px] flex flex-col justify-center items-start">
              <div className="mb-4">
                <div className="text-xl mb-1">Category: 1</div>
                <div className="text-lg font-semibold">
                  Masala Dosa with Ghee
                </div>
              </div>
              <div className="flex flex-col gap-6 mb-6 w-full">
                <div
                  className={`flex items-center gap-6 cursor-pointer select-none ${mode === 'scan' ? 'font-bold' : ''}`}
                  onClick={() => setMode('scan')}
                >
                  <span
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border ${mode === 'scan' ? 'border-2 border-green-500 shadow-md' : 'border-green-300'}`}
                  >
                    <Brush className="text-green-500" />
                  </span>
                  <span className="text-black text-sm">
                    Mark area to be scanned
                  </span>
                </div>
                <div
                  className={`flex items-center gap-6 cursor-pointer select-none ${mode === 'ignore' ? 'font-bold' : ''}`}
                  onClick={() => setMode('ignore')}
                >
                  <span
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border ${mode === 'ignore' ? 'border-2 border-red-500 shadow-md' : 'border-red-300'}`}
                  >
                    <Brush className="text-red-500" />
                  </span>
                  <span className="text-black text-sm">
                    Mark area to be ignored
                  </span>
                </div>
                <div
                  className="flex items-center gap-6 cursor-pointer select-none"
                  onClick={() => setEraseTrigger(e => e + 1)}
                >
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border border-2 border-purple-400">
                    {/* Purple eraser SVG */}
                    <Eraser className="text-purple-400" />
                  </span>
                  <span className="text-black text-sm">
                    Erase all points marked
                  </span>
                </div>
              </div>
              <div className="flex gap-3 mt-4 w-full">
                <button
                  className="flex items-center justify-center gap-2 px-0 py-2 rounded-lg border border-[#D1B6F3] text-[#4B2994] font-medium bg-white hover:bg-[#F3EFFF] transition w-1/3"
                  onClick={() => {
                    setShowAnnotator(false);
                  }}
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path
                      d="M13 15l-5-5 5-5"
                      stroke="#4B2994"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  All Photos
                </button>
                <button
                  className="flex items-center justify-center gap-2 px-0 py-2 rounded-lg bg-[#4B2994] text-white font-semibold hover:bg-[#3a186d] transition w-1/3"
                  onClick={saveAnnotation}
                >
                  Save annotation
                </button>
                <button className="flex items-center justify-center gap-2 px-0 py-2 rounded-lg border border-[#4B2994] text-[#4B2994] font-medium bg-white hover:bg-[#F3EFFF] transition w-1/3">
                  Next in Menu
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path
                      d="M7 5l5 5-5 5"
                      stroke="#4B2994"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-10 border-dashed border-2 zuno-border-dark  bg-[#FBFBFB] rounded-2xl p-6">
            <div className="text-base mb-4">
              Exclude unqualified images from the training model
            </div>
            <div className="flex flex-col gap-4">
              {isLoading ? (
                <div className="text-center py-8">Loading images...</div>
              ) : (
                <>
                  {frames.length > 0 ? (
                    <>
                      {currentJobs?.status === 'pending' &&
                      currentJobs?.jobType === 'sam2_process_frames' ? (
                        <div className="flex flex-col items-center justify-center p-4 text-center">
                          <div className="flex items-center space-x-2">
                            <svg
                              className="animate-spin h-5 w-5 text-blue-500"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                              ></path>
                            </svg>
                            <span className="text-sm text-gray-700">
                              Hang tight! We’re working on your image...
                            </span>
                          </div>
                          <p className="mt-2 text-xs text-gray-500">
                            This process may take a few moments depending on the
                            image size and complexity.
                          </p>
                        </div>
                      ) : (
                        <FrameGrid
                          frames={frames}
                          deletedIds={deletedIds}
                          setDeletedIds={setDeletedIds}
                          onFrameSelect={handleFrameSelect}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      {product && (
                        <ExtractFrames
                          product={product}
                          branchId={branchId}
                          currentJob={currentJobs}
                          extractFrames={extractFrames}
                        />
                      )}
                    </>
                  )}
                </>
              )}
              {/* Navigation buttons */}
              <div className="flex justify-center gap-4 mt-6">
                {frames?.length > 0 && (
                  <button
                    className="flex items-center gap-2 px-6 py-2 rounded-lg border border-[#EDEDED] text-[#4B2994] font-medium bg-white hover:bg-[#F3EFFF] transition"
                    onClick={() =>
                      setShowClearAllFramesConfirm(true)
                    }
                  >
                    Clear all frames
                  </button>
                )}
                <button
                  className="flex items-center gap-2 px-6 py-2 rounded-lg border border-[#EDEDED] text-[#4B2994] font-medium bg-white hover:bg-[#F3EFFF] transition"
                  onClick={() => navigate('/products')}
                >
                  <MoveLeft />
                  Back to Category
                </button>
                {/* <button
                  className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[#4B2994] text-white font-medium hover:bg-[#3a186d] transition"
                  onClick={() => setShowAnnotator(true)}
                >
                  Next
                  <MoveRight />
                </button> */}
              </div>
            </div>
          </div>
        )}
      </ActionContainer>
      <ConfirmDialog
        isOpen={showSaveConfirm}
        title="Save Changes"
        message="Are you sure you want to delete unselected images? This action cannot be undone."
        onConfirm={confirmSave}
        primaryButtonText="Save"
        primaryButtonColor="brand"
        onCancel={() => setShowSaveConfirm(false)}
      />
      <ConfirmDialog
        isOpen={showClearAllFramesConfirm}
        title="Save Changes"
        message="Are you sure you want to clear all frames? This action cannot be undone."
        onConfirm={confirmClearAllFrames}
        primaryButtonText="Sure"
        primaryButtonColor="brand"
        onCancel={() => setShowClearAllFramesConfirm(false)}
      />
    </>
  );
};

const ExtractFrames = ({
  product,
  extractFrames,
  currentJob,
}: {
  product: Product;
  branchId: string;
  extractFrames: () => Promise<void>;
  currentJob: any;
}) => {
  console.log('rr', currentJob);
  if (
    currentJob.status === 'pending' &&
    currentJob.jobType === 'extract_frames'
  ) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-center">
        <div className="flex items-center space-x-2">
          <svg
            className="animate-spin h-5 w-5 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <span className="text-sm text-gray-700">
            Hang tight! We’re working on your image
          </span>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          This process may take a few moments depending on the image size and
          complexity.
        </p>
      </div>
    );
  }

  return product.videoURL ? (
    <div className="flex">
      <Button variant="secondary" onClick={extractFrames}>
        Extract frames from video
      </Button>
    </div>
  ) : (
    <div className="text-brand-500">Please upload a video for this product</div>
  );
};

export default ProductFramesPage;
