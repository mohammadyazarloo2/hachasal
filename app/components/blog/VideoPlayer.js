import { useState } from 'react';
import { HiPlay, HiPause, HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

export default function VideoPlayer({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden bg-black group">
      <video
        src={video.url}
        className="w-full h-full object-cover"
        playsInline
        autoPlay={false}
        muted={isMuted}
        controls={false}
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={togglePlay}
              className="text-white hover:text-amber-500 transition-colors"
            >
              {isPlaying ? (
                <HiPause className="w-8 h-8" />
              ) : (
                <HiPlay className="w-8 h-8" />
              )}
            </button>
            
            <button 
              onClick={toggleMute}
              className="text-white hover:text-amber-500 transition-colors"
            >
              {isMuted ? (
                <HiVolumeOff className="w-6 h-6" />
              ) : (
                <HiVolumeUp className="w-6 h-6" />
              )}
            </button>
          </div>
          
          <div className="text-white text-sm">
            {video.title}
          </div>
        </div>
      </div>
    </div>
  );
}
