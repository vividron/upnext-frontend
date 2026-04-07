import api from "./api";
import API_PATHS from "./apiPaths";
import { errorHandler } from "./errorHandler";

const playerErrorCodes = [
    "INVALID_SONG_ID",
    "INVALID_COMMAND",
    "EMPTY_QUEUE"
]

// Get playback current state
export const getPlayBackState = async (roomId) => {
    try {
        const { data } = await api.get(API_PATHS.PLAYER.STATE(roomId));
        return data
    } catch (error) {
        errorHandler(error, "Failed to fetch player state", playerErrorCodes);
    }
}

// resume player
export const resumePlayer = async (roomId) => {
    try {
        await api.post(API_PATHS.PLAYER.RESUME(roomId));
    } catch (error) {
        errorHandler(error, "Failed to execute command", playerErrorCodes);
    }
}

// pause player
export const pausePlayer = async (roomId, isStateSync) => {
    try {
        await api.post(API_PATHS.PLAYER.PAUSE(roomId), { isStateSync });
    } catch (error) {
        errorHandler(error, "Failed to execute command", playerErrorCodes);
    }
}

// play next song from queue
export const playNext = async (roomId) => {
    try {
        await api.post(API_PATHS.PLAYER.NEXT(roomId));
    } catch (error) {
        errorHandler(error, "Failed to execute command", playerErrorCodes);
    }
}

// play previous song from recently played set
export const playPrevious = async (roomId) => {
    try {
        await api.post(API_PATHS.PLAYER.PREVIOUS(roomId));
    } catch (error) {
        errorHandler(error, "Failed to execute command", playerErrorCodes);
    }
}

// seek to position
export const seekToPosition = async (roomId) => {
    try {
        await api.post(API_PATHS.PLAYER.SEEK(roomId));
    } catch (error) {
        errorHandler(error, "Failed to execute command", playerErrorCodes);
    }
}