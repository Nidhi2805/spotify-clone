import { createContext, useContext, useState, useRef, useEffect } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const play = (track) => {
    if (track) setCurrentTrack(track);
    setIsPlaying(true);
  };

  const pause = () => setIsPlaying(false);

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play(currentTrack);
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(e => console.error('Playback failed:', e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <PlayerContext.Provider value={{
      currentTrack,
      isPlaying,
      play,
      pause,
      togglePlay,
      volume,
      setVolume,
      progress,
      setProgress
    }}>
      {children}
      <audio
        ref={audioRef}
        src={currentTrack?.preview_url}
        onTimeUpdate={(e) => {
          if (e.target.duration) {
            setProgress((e.target.currentTime / e.target.duration) * 100);
          }
        }}
        onEnded={() => pause()}
      />
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);