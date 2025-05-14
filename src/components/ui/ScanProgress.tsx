import React from 'react';

interface ScanProgressProps {
  label?: string;
  progress: number; // 0-100
}

const ScanProgress: React.FC<ScanProgressProps> = ({
  label = 'Images Scanned',
  progress,
}) => {
  return (
    <div className="w-full max-w-[400px]">
      <div className="flex justify-between items-end mb-1">
        <span className="text-[#4B2994] text-sm">{label}</span>
        <span className="text-[#888] font-light text-xs">{progress}%</span>
      </div>
      <div className="relative h-[18px] bg-[#E5E5E5] rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 bottom-0 rounded-full transition-all duration-300 z-[1]"
          style={{ width: `${progress}%`, background: '#F37A1F' }}
        />
        <div
          className="absolute z-[2] flex items-center justify-center"
          style={{
            left: `calc(${progress}% - 12px)`,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: 'transparent',
            boxSizing: 'border-box',
          }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              border: '4px solid #fff',
              background: 'transparent',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#F37A1F',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanProgress;
