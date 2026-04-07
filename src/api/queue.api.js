import api from "./api";
import API_PATHS from "./apiPaths";
import { errorHandler } from "./errorHandler";

const queueErrorCodes = [
    "INVALID_SONGS_INPUT",
    "QUEUE_LIMIT_EXCEEDED",
    "DUPLICATE_SONG_ADD",
    "SONG_UPVOTE_DUPLICATE"
]

export const addPlaylistToQueue = async (roomId, songs) => {
    try {
        const { data } = await api.post(API_PATHS.QUEUE.ADD_PLAYLIST(roomId), { songs });
        return data
    } catch (error) {
        errorHandler(error, "Failed to add playlist to the queue", queueErrorCodes);
    }
}

export const upvoteMatchedSongs = async (roomId, songIds) => {
    try {
        const { data } = await api.post(API_PATHS.QUEUE.UPVOTE_MATCHES(roomId), { songIds });
        return data
    } catch (error) {
        errorHandler(error, "Failed to upvote matched songs", queueErrorCodes);
    }
}

export const clearQueue = async (roomId) => {
    try {
        const { data } = await api.delete(API_PATHS.QUEUE.CLEAR(roomId));
        return data
    } catch (error) {
        errorHandler(error, "Failed to clear queue", queueErrorCodes);
    }
}