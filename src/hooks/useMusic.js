import { useState, useEffect } from 'react';
import { fetchFeaturedPlaylists, fetchGenres } from '../api/music';

export const useMusic = () => {
  const [playlists, setPlaylists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [playlistsData, genresData] = await Promise.all([
        fetchFeaturedPlaylists(),
        fetchGenres()
      ]);
      setPlaylists(playlistsData);
      setGenres(genresData);
    } catch (err) {
      setError(err.message || 'Failed to load music data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return { playlists, genres, loading, error, refresh: loadData };
};