import { useEffect, useState, useRef } from "react";
import { leaveRoom } from "../api/room.api.js";
import { isSocketConnected, listenEvent, listenEventOnce, removeListener } from "../sockets/socket.js";
import { EVENTS } from "../sockets/socket.events.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useRoom = (roomId, { isHost }) => {
    const [room, setRoom] = useState(null);
    const [isLeaving, setIsLeaving] = useState(false);
    const [isLeaveRoomModalOpen, setIsLeaveRoomModalOpen] = useState(false);
    const isHostRef = useRef(isHost);
    const navigate = useNavigate();

    const handleLeaveRoomClick = () => {
        setIsLeaveRoomModalOpen(true);
    };

    const handleLeaveRoom = async () => {
        try {
            setIsLeaving(true);
            setIsLeaveRoomModalOpen(false);

            await leaveRoom(roomId);

            const roomTItle = room?.title ?? "";
            if (isHostRef.current) toast.success(`Room "${roomTItle}" has been closed`);
            else toast.success(`You have left the room "${roomTItle}"`);
            navigate('/');
        } catch (error) {
            if (error.code === "USER_NOT_FOUND") return navigate('/');
            toast.error(error.message || "Failed to leave the room. Please try again.");
        } finally {
            setIsLeaving(false);
        }
    };

    // Update isHost
    useEffect(() => {
        isHostRef.current = isHost;
    }, [isHost, roomId])

    // Update title 
    useEffect(() => {
        if (room?.title) {
            document.title = `${room.title} | UpNext`;
        }

        return () => {
            document.title = "UpNext – Collaborative Spotify Rooms & Music Voting";
        };
    }, [room?.title]);

    useEffect(() => {
        const updateMemberCount = (count) => {
            setRoom(prev => ({ ...prev, memberCount: count }));
        };

        const handleRoomEnd = () => {
            if (!isHostRef.current) {
                toast.error("The host has ended the room.");
                navigate('/');
            }
        };

        const listenToRoomEvents = () => {
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
        isLeaving,
        setIsLeaving,
        isLeaveRoomModalOpen,
        handleLeaveRoomClick,
        handleLeaveRoom,
    };
};