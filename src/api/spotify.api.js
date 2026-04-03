import api from "./api";
import API_PATHS from "./apiPaths";
import { errorHandler } from "./errorHandler";

// Get user playlists
export const getUserPlaylists = async (limit, offset) => {
    try {
        const { data } = await api.get(API_PATHS.SPOTIFY.GET_PLAYLISTS, { limit, offset });
        return data
    } catch (error) {
        errorHandler(error, "Failed to fetch playlists");
    }
};

// Get playlist items
export const getPlaylistItems = async (playlistId, limit) => {
    try {
        const { data } = await api.get(API_PATHS.SPOTIFY.GET_PLAYLIST_ITEMS(playlistId), { limit });
        return data;
    } catch (error) {
        errorHandler(error, "Failed to fetch playlist items")
    }
}