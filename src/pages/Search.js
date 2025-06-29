import { useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import SearchBar from '../components/music/SearchBar';
import './Search.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState({
    tracks: [],
    albums: [],
    artists: [],
    playlists: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const debouncedQuery = useDebounce(query, 500);

  const handleSearch = (query) => {
    // Mock search results
    if (query) {
      setSearchResults({
        tracks: [
          { id: '1', name: 'Blinding Lights', artists: [{ name: 'The Weeknd' }], album: { images: [{ url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228' }] } }
        ],
        albums: [
          { id: '1', name: 'After Hours', artists: [{ name: 'The Weeknd' }], images: [{ url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228' }] }
        ],
        artists: [
          { id: '1', name: 'The Weeknd', images: [{ url: 'https://i.scdn.co/image/ab67616100005174a3ef9951cbf6c8b5c5e5e1e1' }] }
        ],
        playlists: [
          { id: '1', name: 'Today\'s Top Hits', description: 'The most popular songs right now', images: [{ url: 'https://i.scdn.co/image/ab67706f00000002a76a9c1293b5c376a397d30c' }] }
        ]
      });
    } else {
      setSearchResults({ tracks: [], albums: [], artists: [], playlists: [] });
    }
  };

  useEffect(() => {
    handleSearch(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div className="search-page">
      <SearchBar 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-page-bar"
      />
      
      <div className="search-results">
        {searchResults.tracks.length > 0 && (
          <section>
            <h2>Songs</h2>
            <div className="tracks-grid">
              {searchResults.tracks.map(track => (
                <div key={track.id} className="track-item">
                  <img src={track.album.images[0].url} alt={track.name} />
                  <div>
                    <h4>{track.name}</h4>
                    <p>{track.artists.map(a => a.name).join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Search;