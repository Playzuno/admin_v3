import React, { useRef, useState, useEffect } from 'react';

interface DotsByColor {
  red: { x: number; y: number }[];
  green: { x: number; y: number }[];
}

interface ImageAnnotatorProps {
  src: string;
  alt?: string;
  mode: 'scan' | 'ignore';
  eraseTrigger: number; // increment to trigger erase
  className?: string;
  onDotsChange?: (dots: DotsByColor) => void;
}

const ImageAnnotator: React.FC<ImageAnnotatorProps> = ({
  src,
  alt,
  mode,
  eraseTrigger,
  className,
  onDotsChange,
}) => {
  const [dots, setDots] = useState<DotsByColor>({ red: [], green: [] });
  const imgRef = useRef<HTMLImageElement>(null);
  const color: 'green' | 'red' = mode === 'scan' ? 'green' : 'red';

  useEffect(() => {
    setDots({ red: [], green: [] });
    onDotsChange?.({ red: [], green: [] });
  }, [eraseTrigger, onDotsChange]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newDots: DotsByColor = {
      red: [...dots.red],
      green: [...dots.green],
    };
    newDots[color].push({ x, y });
    setDots(newDots);
    onDotsChange?.(newDots);
  };

  return (
    <div
      className={`relative inline-block cursor-crosshair ${className ?? ''}`}
      onClick={handleClick}
      style={{ aspectRatio: '4/3' }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full h-auto object-cover rounded-lg"
        draggable={false}
      />
      {/* Render green dots */}
      {dots.green.map((dot, i) => (
        <div
          key={`green-${i}`}
          className="absolute flex items-center justify-center"
          style={{
            left: dot.x - 8,
            top: dot.y - 8,
            width: 16,
            height: 16,
            pointerEvents: 'none',
          }}
        >
          <div className="w-4 h-4 bg-white rounded-full z-10" />
          <div className="absolute w-4 h-4 border-2 border-green-500 rounded-full z-20" />
        </div>
      ))}
      {/* Render red dots */}
      {dots.red.map((dot, i) => (
        <div
          key={`red-${i}`}
          className="absolute flex items-center justify-center"
          style={{
            left: dot.x - 8,
            top: dot.y - 8,
            width: 16,
            height: 16,
            pointerEvents: 'none',
          }}
        >
          <div className="w-4 h-4 bg-white rounded-full z-10" />
          <div className="absolute w-4 h-4 border-2 border-red-500 rounded-full z-20" />
        </div>
      ))}
    </div>
  );
};

export default ImageAnnotator;
