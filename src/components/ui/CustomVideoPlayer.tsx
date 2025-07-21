import { useState, useEffect, useRef } from 'react';
import { Cog } from 'lucide-react';
import Button from '@/components/ui/Button';


export default function CustomVideoPlayer({ product, extractFrames }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTryingToPlay, setIsTryingToPlay] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const isValidVideoURL = (url: string | undefined): boolean =>
    typeof url === 'string' &&
    url.trim() !== '' &&
    /\.(mp4|webm|ogg)(\?.*)?$/.test(url);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video || isTryingToPlay) return;

    if (video.paused) {
      setIsTryingToPlay(true);
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error('Video play error:', err);
          setIsPlaying(false);
        })
        .finally(() => setIsTryingToPlay(false));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60).toString().padStart(2, '0');
    const secs = Math.floor(time % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) setCurrentTime(video.currentTime);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) setDuration(video.duration);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || duration === 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    video.currentTime = newTime;
  };

  const handleWaiting = () => setIsBuffering(true);
  const handlePlaying = () => setIsBuffering(false);

  // ✅ NEW: Handle video end
  const handleEnded = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0; // Rewind to beginning
    }
  };

  useEffect(() => {
    return () => {
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest('[aria-label="Settings"]') &&
        !target.closest('.settings-menu')
      ) {
        setShowSettings(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="rounded overflow-hidden border border-white/20">
      <div className="bg-black text-white flex flex-row justify-between p-[0.5rem]">
        <p className="font-regular text-xs truncate max-w-[300px]">
          {product?.name || ''}
        </p>
        <p className="font-light text-xs">Cloud Video</p>
      </div>

      <div className="relative w-full bg-black overflow-hidden">
        {isValidVideoURL(product?.videoURL) ? (
          <>
            <video
              ref={videoRef}
              src={product!.videoURL}
              className="w-full min-h-[32px]"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onWaiting={handleWaiting}
              onPlaying={handlePlaying}
              onEnded={handleEnded} // ✅ Handle end event
              muted
              playsInline
              playbackRate={playbackRate}
            />

            {/* Center Play Button (shown when not playing or at end) */}
            {!isPlaying && (
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Play Video"
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-16 h-16 bg-[#400C7A] text-white text-[55px] pl-[10px] rounded-full flex items-center justify-center border-2 border-white">
                  ▶
                </div>
              </button>
            )}

            {/* Buffering Spinner */}
            {isBuffering && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-6 h-6 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-xs">
              <div className="flex items-center justify-between w-full gap-2">
                {/* Play Button & Current Time */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    className="text-[12px]"
                  >
                    {isPlaying ? '⏸' : '▶'}
                  </button>
                  <span className="inline-block text-[7px]">
                    {formatTime(currentTime)}
                  </span>
                </div>

                {/* Progress Bar */}
                <div
                  className="flex-1 h-1 bg-white/20 rounded cursor-pointer mx-2 relative"
                  onClick={handleProgressClick}
                >
                  <div
                    className="absolute top-0 left-0 h-1 bg-blue-500 rounded"
                    style={{
                      width: `${(currentTime / duration) * 100 || 0}%`,
                    }}
                  />
                </div>

                {/* Duration */}
                <span className="inline-block text-[7px]">
                  {formatTime(duration)}
                </span>

                {/* Settings Icon + Speed Menu */}
                <div className="relative">
                  <button
                    type="button"
                    className="ml-2"
                    aria-label="Settings"
                    onClick={() => setShowSettings((prev) => !prev)}
                  >
                    <Cog size={14} />
                  </button>

                  {showSettings && (
                    <div className="absolute bottom-8 right-0 bg-black text-white text-[10px] rounded border border-white/10 p-1 shadow-md z-50 min-w-[60px] settings-menu">
                      {[0.5, 1, 1.25, 1.5, 2].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => {
                            const video = videoRef.current;
                            if (video) video.playbackRate = rate;
                            setPlaybackRate(rate);
                            setShowSettings(false);
                          }}
                          className={`block w-full text-left px-2 py-1 hover:bg-white/10 rounded ${
                            rate === playbackRate ? 'bg-white/10 font-bold' : ''
                          }`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {product.videoURL ? (
                  <div className="flex">
                    <Button variant="secondary" onClick={extractFrames}>
                      Extract frames from video
                    </Button>
                  </div>
                ) : (
                  <div className="text-brand-500">Please upload a video for this product</div>
                )}
            </div>
          </>
        ) : (
          <div className="text-white p-4 text-center text-xs">
            No supported video source available.
          </div>
        )}
      </div>
    </div>
  );
}
