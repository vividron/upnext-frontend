import api from "./api";
import API_PATHS from "./apiPaths";
import { errorHandler } from "./errorHandler";

const roomErrorCodes = [
    "ROOM_NOT_FOUND",
    "ROOM_INACTIVE",
    "USER_ALREADY_PRESENT",
    "USER_NOT_FOUND",
    "USER_NOT_PREMIUM",
    "ROOM_ACTIVE"
]

// Create room
export const createRoom = async (title) => {
    try {
        const { data } = await api.post(API_PATHS.ROOM.CREATE, { title });
        return data;
    } catch (error) {
        errorHandler(error, "Failed to create room", roomErrorCodes);
    }
};

// Get all the created rooms
export const getRooms = async () => {
    try {
        const { data } = await api.get(API_PATHS.ROOM.GET_ALL);
        return data;
    } catch (error) {
        errorHandler(error, "Failed to fetch rooms", roomErrorCodes);
    }
}

// Get room current state
export const getRoomState = async (roomId) => {
    try {
        const { data } = await api.get(API_PATHS.ROOM.GET_STATE(roomId));
        return data;
    } catch (error) {
        errorHandler(error, "Failed to fetch room state", roomErrorCodes);
    }
}

// join room
export const joinRoom = async (roomId) => {
    try {
        const { data } = await api.post(API_PATHS.ROOM.JOIN(roomId));
        return data;
    } catch (error) {
        errorHandler(error, "Failed to join the room", roomErrorCodes);
    }
}

// leave room
export const leaveRoom = async (roomId) => {
    try {
        await api.post(API_PATHS.ROOM.LEAVE(roomId));
    } catch (error) {
        errorHandler(error, "Failed to leave the room", roomErrorCodes);
    }
}

// delete room if not active
export const deleteRoom = async (roomId) => {
    try {
        await api.delete(API_PATHS.ROOM.DELETE(roomId));
    } catch (error) {
        errorHandler(error, "Failed to delete the room", roomErrorCodes);
    }
}
