import axios from './index';

export const fetchFeaturedPlaylists = async () => {
  try {
    const response = await axios.get('/playlists/featured');
    return response.data;
  } catch (error) {
    console.error('Error fetching featured playlists:', error);
    throw error;
  }
};

export const fetchAlbumDetails = async (albumId) => {
  try {
    const response = await axios.get(`/albums/${albumId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching album details:', error);
    throw error;
  }
};