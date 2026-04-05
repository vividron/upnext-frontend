import { useEffect, useState } from "react";
import { leaveRoom } from "../api/room.api.js";
import { isSocketConnected, listenEvent, listenEventOnce, removeListener } from "../sockets/socket.js";
import { EVENTS } from "../sockets/socket.events.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useRoom = (roomId, { isHost }) => {
    const [room, setRoom] = useState(null);
    const [isLeaveRoomModalOpen, setIsLeaveRoomModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleLeaveRoomClick = () => {
        setIsLeaveRoomModalOpen(true);
    };

    const handleLeaveRoom = async () => {
        try {
            setIsLeaveRoomModalOpen(false);

            await leaveRoom(room.id);

            const roomTItle = room?.title ?? "";
            if (isHost) toast.success(`Room "${roomTItle}" has been closed`);
            toast.success(`You have left the room "${roomTItle}"`);
            navigate('/');
        } catch (error) {
            if (error.code === "USER_NOT_FOUND") return navigate('/');
            toast.error(error.message || "Failed to leave the room. Please try again.");
        }
    };

    useEffect(() => {
        const updateMemberCount = (count) => {
            setRoom(prev => ({ ...prev, memberCount: count }));
        };

        const handleRoomEnd = () => {
            toast.error("The host has ended the room.");
            navigate('/');
        };

        const listenToRoomEvents = () => {
            console.log("listening room")
            listenEvent(EVENTS.ROOM_MEMBER_COUNT, updateMemberCount);
            listenEvent(EVENTS.ROOM_END, handleRoomEnd);
        };

        if (isSocketConnected()) {
            listenToRoomEvents();
        } else {
            listenEventOnce("connect", listenToRoomEvents);
        }

        return () => {
            removeListener("connect", listenToRoomEvents);
            removeListener(EVENTS.ROOM_MEMBER_COUNT, updateMemberCount);
            removeListener(EVENTS.ROOM_END, handleRoomEnd);
        };
    }, [roomId]);

    return {
        room,
        setRoom,
        isLeaveRoomModalOpen,
        handleLeaveRoomClick,
        handleLeaveRoom,
    };
};