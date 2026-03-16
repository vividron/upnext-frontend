import api from "./config/axios";
import API_PATHS from "./utils/apiPaths";

const queueErrorCodes = [
    "INVALID_SONGS_INPUT",
    "QUEUE_LIMIT_EXCEEDED",
    "DUPLICATE_SONG_ADD",
    "SONG_UPVOTE_DUPLICATE"
]

export const addPlaylistToQueue = async (roomId, songs) => {
    try {
        const { data } = await api.get(API_PATHS.QUEUE.ADD_PLAYLIST(roomId), { songs });
        return data
    } catch (error) {
        if (queueErrorCodes.includes(error?.code)) throw error;
        throw new Error("Failed to add playlist to the queue");
    }
}

export const upvoteMatchedSongs = async (roomId, songIds) => {
    try {
        const { data } = await api.get(API_PATHS.QUEUE.UPVOTE_MATCHES(roomId), { songIds });
        return data
    } catch (error) {
        if (queueErrorCodes.includes(error?.code)) throw error;
        throw new Error("Failed to upvote matched songs");
    }
}

export const clearQueue = async (roomId) => {
    try {
        const { data } = await api.get(API_PATHS.QUEUE.CLEAR(roomId));
        return data
    } catch (error) {
        throw new Error("Failed to clear queue");
    }
}