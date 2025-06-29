import './PlaylistCard.css';

const PlaylistCard = ({ playlist, onPlay }) => {
  return (
    <div className="playlist-card" onClick={() => onPlay()}>
      <img 
        src={playlist.images[0]?.url} 
        alt={playlist.name} 
        className="playlist-image"
      />
      <h3 className="playlist-title">{playlist.name}</h3>
      <p className="playlist-description">{playlist.description}</p>
    </div>
  );
};

export default PlaylistCard;