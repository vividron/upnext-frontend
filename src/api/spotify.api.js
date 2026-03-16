import api from "./config/axios";
import API_PATHS from "./utils/apiPaths";

// Get user playlists
export const getUserPlaylists = async (limit, offset) => {
    try {
        const { data } = await api.get(API_PATHS.SPOTIFY.GET_PLAYLISTS, { limit, offset });
        return data
    } catch (error) {
        throw new Error("Failed to fetch playlists")
    }
};

// Get playlist items
export const getPlaylistItems = async (playlistId, limit) => {
    try {
        const { data } = await api.get(API_PATHS.SPOTIFY.GET_PLAYLIST_ITEMS(playlistId), { limit });
        return data;
    } catch (error) {
        throw new Error("Failed to fetch playlist items")
    }
}