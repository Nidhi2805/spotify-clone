import { useState, useEffect } from 'react';
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
  
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      setSearchResults({
        tracks: [
          { 
            id: '1', 
            name: 'Blinding Lights', 
            artists: [{ name: 'The Weeknd' }], 
            album: { 
              images: [{ url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228' }] 
            } 
          }
        ],
        albums: [
          { 
            id: '1', 
            name: 'After Hours', 
            artists: [{ name: 'The Weeknd' }], 
            images: [{ url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228' }] 
          }
        ],
        artists: [
          { 
            id: '1', 
            name: 'The Weeknd', 
            images: [{ url: 'https://i.scdn.co/image/ab67616100005174a3ef9951cbf6c8b5c5e5e1e1' }] 
          }
        ],
        playlists: [
          { 
            id: '1', 
            name: 'Today\'s Top Hits', 
            description: 'The most popular songs right now', 
            images: [{ url: 'https://i.scdn.co/image/ab67706f00000002a76a9c1293b5c376a397d30c' }] 
          }
        ]
      });
    } else {
      setSearchResults({ tracks: [], albums: [], artists: [], playlists: [] });
    }
  }, [debouncedQuery]);

  return (
    <div className="search-page">
      <SearchBar 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      <div className="search-results">
        {Object.entries(searchResults).map(([type, items]) => (
          items.length > 0 && (
            <section key={type}>
              <h2>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
              <div className={`${type}-grid`}>
                {items.map(item => (
                  <div key={item.id} className="search-item">
                    <img 
                      src={item.images?.[0]?.url || item.album?.images?.[0]?.url} 
                      alt={item.name} 
                    />
                    <div>
                      <h4>{item.name}</h4>
                      {item.artists && <p>{item.artists.map(a => a.name).join(', ')}</p>}
                      {item.description && <p className="description">{item.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        ))}
      </div>
    </div>
  );
};

export default Search;