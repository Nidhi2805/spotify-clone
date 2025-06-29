import { usePlayer } from '../../context/PlayerContext';
import './PlayerControls.css';

const PlayerControls = () => {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlay,
    volume, 
    setVolume
  } = usePlayer();

  return (
    <div className="player-controls">
      {currentTrack && (
        <div className="track-info">
          <img src={currentTrack.album?.images?.[0]?.url} alt={currentTrack.name} />
          <div>
            <h4>{currentTrack.name}</h4>
            <p>{currentTrack.artists?.map(a => a.name).join(', ')}</p>
          </div>
        </div>
      )}
      
      <div className="controls">
        <button onClick={togglePlay}>
          {isPlaying ? '❚❚' : '▶'}
        </button>
      </div>
      
      <div className="volume-control">
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};

export default PlayerControls;