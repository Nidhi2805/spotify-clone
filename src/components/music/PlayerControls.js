import { useState, useEffect, useRef } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { Button, Slider } from '../common';
import './PlayerControls.css';

const PlayerControls = () => {
  const {
    currentTrack,
    isPlaying,
    play,
    pause,
    nextTrack,
    prevTrack,
    volume,
    setVolume,
    progress,
    setProgress
  } = usePlayer();
  
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(e => console.error('Playback failed:', e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
      } else {
        audioRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="player-controls">
      {currentTrack && (
        <audio
          ref={audioRef}
          src={currentTrack.preview_url}
          onTimeUpdate={(e) => setProgress(e.target.currentTime / e.target.duration * 100)}
          onEnded={nextTrack}
        />
      )}
      
      <div className="track-info">
        {currentTrack && (
          <>
            <img src={currentTrack.album.images[0].url} alt={currentTrack.name} />
            <div>
              <h4>{currentTrack.name}</h4>
              <p>{currentTrack.artists.map(a => a.name).join(', ')}</p>
            </div>
          </>
        )}
      </div>
      
      <div className="controls">
        <Button icon="shuffle" onClick={() => {}} />
        <Button icon="skip_previous" onClick={prevTrack} />
        <Button 
          icon={isPlaying ? "pause" : "play_arrow"} 
          onClick={handlePlayPause} 
          className="play-button"
        />
        <Button icon="skip_next" onClick={nextTrack} />
        <Button icon="repeat" onClick={() => {}} />
      </div>
      
      <div className="progress-container">
        <span>{formatTime(progress * (currentTrack?.duration_ms || 0) / 100)}</span>
        <Slider 
          value={progress} 
          onChange={(e) => {
            const newProgress = parseFloat(e.target.value);
            setProgress(newProgress);
            if (audioRef.current) {
              audioRef.current.currentTime = newProgress * audioRef.current.duration / 100;
            }
          }}
        />
        <span>{formatTime(currentTrack?.duration_ms || 0)}</span>
      </div>
      
      <div className="volume-controls">
        <Button icon={isMuted ? "volume_off" : "volume_up"} onClick={toggleMute} />
        <Slider 
          value={volume * 100} 
          onChange={handleVolumeChange}
          className="volume-slider"
        />
      </div>
    </div>
  );
};

const formatTime = (ms) => {
  const seconds = Math.floor(ms / 1000);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export default PlayerControls;