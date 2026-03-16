import api from "./config/axios";
import API_PATHS from "./utils/apiPaths";

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
        if (playerErrorCodes.includes(error?.code)) throw error;
        throw new Error("Failed to fetch player state");
    }
}

// resume player
export const resumePlayer = async (roomId) => {
    try {
        await api.post(API_PATHS.PLAYER.RESUME(roomId));
    } catch (error) {
        if (playerErrorCodes.includes(error?.code)) throw error;
        throw new Error("Failed to execute command");
    }
}

// pause player
export const pausePlayer = async (roomId) => {
    try {
        await api.post(API_PATHS.PLAYER.PAUSE(roomId));
    } catch (error) {
        if (playerErrorCodes.includes(error?.code)) throw error;
        throw new Error("Failed to execute command");
    }
}

// play next song from queue
export const playNext = async (roomId) => {
    try {
        await api.post(API_PATHS.PLAYER.NEXT(roomId));
    } catch (error) {
        if (playerErrorCodes.includes(error?.code)) throw error;
        throw new Error("Failed to execute command");
    }
}

// play previous song from recently played set
export const playPrevious = async (roomId) => {
    try {
        await api.post(API_PATHS.PLAYER.PREVIOUS(roomId));
    } catch (error) {
        if (playerErrorCodes.includes(error?.code)) throw error;
        throw new Error("Failed to execute command");
    }
}

// seek to position
export const seekToPosition = async (roomId) => {
    try {
        await api.post(API_PATHS.PLAYER.SEEK(roomId));
    } catch (error) {
        if (playerErrorCodes.includes(error?.code)) throw error;
        throw new Error("Failed to execute command");
    }
}