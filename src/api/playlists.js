import api from './index';

export const createPlaylist = async (userId, playlistData) => {
  try {
    const response = await api.post(`/users/${userId}/playlists`, playlistData);
    return response.data;
  } catch (error) {
    console.error('Error creating playlist:', error);
    throw error;
  }
};

export const updatePlaylist = async (playlistId, updates) => {
  try {
    const response = await api.put(`/playlists/${playlistId}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating playlist:', error);
    throw error;
  }
};

export const deletePlaylist = async (playlistId) => {
  try {
    await api.delete(`/playlists/${playlistId}`);
  } catch (error) {
    console.error('Error deleting playlist:', error);
    throw error;
  }
};

export const addTrackToPlaylist = async (playlistId, trackId) => {
  try {
    const response = await api.post(`/playlists/${playlistId}/tracks`, { trackId });
    return response.data;
  } catch (error) {
    console.error('Error adding track to playlist:', error);
    throw error;
  }
};