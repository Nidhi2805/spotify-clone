import { useEffect, useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import PlaylistCard from '../components/music/PlaylistCard';
import './Home.css';

const Home = () => {
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const { play } = usePlayer();

  useEffect(() => {
    const mockPlaylists = [
      {
        id: '1',
        name: 'Today\'s Top Hits',
        description: 'The most popular songs right now',
        images: [{ url: 'https://i.scdn.co/image/ab67706f00000002a76a9c1293b5c376a397d30c' }],
        tracks: {
          items: [
            {
              id: 'track1',
              name: 'Blinding Lights',
              artists: [{ name: 'The Weeknd' }],
              album: {
                images: [{ url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228' }]
              },
              duration_ms: 200000,
              preview_url: 'https://p.scdn.co/mp3-preview/1d1a2b3c4d5e6f7g8h9i0j'
            }
          ]
        }
      },
      {
        id: '2',
        name: 'Chill Hits',
        description: 'Kick back to the best new and recent chill hits',
        images: [{ url: 'https://i.scdn.co/image/ab67706f00000002a76a9c1293b5c376a397d30c' }],
        tracks: {
          items: [
            {
              id: 'track2',
              name: 'Watermelon Sugar',
              artists: [{ name: 'Harry Styles' }],
              album: {
                images: [{ url: 'https://i.scdn.co/image/ab67616d00001e026a9f3b0e8c936a3f772988e4' }]
              },
              duration_ms: 174000,
              preview_url: 'https://p.scdn.co/mp3-preview/9d1a2b3c4d5e6f7g8h9i0j'
            }
          ]
        }
      }
    ];
    setFeaturedPlaylists(mockPlaylists);
  }, []);

  return (
    <div className="home-container">
      <h1>Good afternoon</h1>
      <div className="playlists-grid">
        {featuredPlaylists.map(playlist => (
          <PlaylistCard 
            key={playlist.id} 
            playlist={playlist} 
            onPlay={() => play(playlist.tracks.items[0])}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;