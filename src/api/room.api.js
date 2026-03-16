import api from "./api";
import API_PATHS from "./apiPaths";

const roomErrorCodes = [
    "ROOM_NOT_FOUND",
    "ROOM_INACTIVE",
    "USER_ALREADY_PRESENT",
    "USER_NOT_FOUND",
    "ROOM_ACTIVE"
]

// Create room
export const createRoom = async (title) => {
    try {
        await api.post(API_PATHS.ROOM.CREATE, { title });
    } catch (error) {
        throw new Error("Failed to create room")
    }
};

// Get all the created rooms
export const getRooms = async () => {
    try {
        const { data } = await api.get(API_PATHS.ROOM.GET_ALL);
        return data;
    } catch (error) {
        throw new Error("Failed to fetch rooms")
    }
}

// Get room current state
export const getRoomState = async (roomId) => {
    try {
        const { data } = await api.get(API_PATHS.ROOM.GET_STATE(roomId));
        return data;
    } catch (error) {
        if (roomErrorCodes.includes(error?.code)) throw error;
        throw new Error("Failed to fetch room state");
    }
}

// join room
export const joinRoom = async (roomId) => {
    try {
        const { data } = await api.get(API_PATHS.ROOM.JOIN(roomId));
        return data;
    } catch (error) {
        if (roomErrorCodes.includes(error?.code)) throw error;
        throw new Error("Failed to join the room");
    }
}

// leave room
export const leaveRoom = async (roomId) => {
    try {
        await api.get(API_PATHS.ROOM.LEAVE(roomId));
    } catch (error) {
        if (roomErrorCodes.includes(error?.code)) throw error;
        throw new Error("Failed to leave the room");
    }
}

// delete room if not active
export const deleteRoom = async (roomId) => {
    try {
        await api.get(API_PATHS.ROOM.DELETE(roomId));
    } catch (error) {
        if (roomErrorCodes.includes(error?.code)) throw error;
        throw new Error("Failed to leave the room");
    }
}
