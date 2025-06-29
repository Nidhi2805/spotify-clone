import { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { searchTracks, searchAlbums, searchArtists, searchPlaylists } from '../../api/music';
import SearchBar from '../../components/music/SearchBar';
import MusicItem from '../../components/music/MusicItem';
import './Search.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({
    tracks: [],
    albums: [],
    artists: [],
    playlists: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults({ tracks: [], albums: [], artists: [], playlists: [] });
      return;
    }
    
    const performSearch = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [tracks, albums, artists, playlists] = await Promise.all([
          searchTracks(debouncedQuery),
          searchAlbums(debouncedQuery),
          searchArtists(debouncedQuery),
          searchPlaylists(debouncedQuery)
        ]);
        
        setResults({ tracks, albums, artists, playlists });
      } catch (err) {
        setError(err.message || 'Failed to perform search');
      } finally {
        setLoading(false);
      }
    };
    
    performSearch();
  }, [debouncedQuery]);

  return (
    <div className="search-page">
      <SearchBar 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-page-bar"
      />
      
      {loading && <div className="loading-indicator">Searching...</div>}
      {error && <div className="error-message">{error}</div>}
      
      {debouncedQuery && !loading && !error && (
        <div className="search-results">
          {results.tracks.length > 0 && (
            <section>
              <h2>Songs</h2>
              <div className="tracks-grid">
                {results.tracks.map(track => (
                  <MusicItem key={track.id} item={track} type="track" />
                ))}
              </div>
            </section>
          )}
          
          {results.albums.length > 0 && (
            <section>
              <h2>Albums</h2>
              <div className="albums-grid">
                {results.albums.map(album => (
                  <MusicItem key={album.id} item={album} type="album" />
                ))}
              </div>
            </section>
          )}
          
          {results.artists.length > 0 && (
            <section>
              <h2>Artists</h2>
              <div className="artists-grid">
                {results.artists.map(artist => (
                  <MusicItem key={artist.id} item={artist} type="artist" />
                ))}
              </div>
            </section>
          )}
          
          {results.playlists.length > 0 && (
            <section>
              <h2>Playlists</h2>
              <div className="playlists-grid">
                {results.playlists.map(playlist => (
                  <MusicItem key={playlist.id} item={playlist} type="playlist" />
                ))}
              </div>
            </section>
          )}
          
          {Object.values(results).every(arr => arr.length === 0) && (
            <div className="no-results">
              No results found for "{debouncedQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;