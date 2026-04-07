import { useEffect, useRef, useState } from "react";
import {
    connectsocket,
    disconnectSocket,
    emitWithRetry,
    isSocketConnected,
    listenEvent,
    removeListener,
} from "../sockets/socket.js";
import { EVENTS } from "../sockets/socket.events.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useRoomSubscription = ({ roomId, onSuccess, onError }) => {
    const [isSubscribing, setIsSubscribing] = useState(true);
    const isActiveRef = useRef(true);
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        isActiveRef.current = true;

        const handleSubscribe = async () => {
            try {
                setIsSubscribing(true);

                const res = await emitWithRetry(EVENTS.ROOM_SUBSCRIBE, { roomId });

                if (!isActiveRef.current) return;

                if (!res?.ok) {
                    if (res.error?.code === "USER_NOT_FOUND") {
                        return navigate(`/rooms/${roomId}/join`);
                    }
                    throw new Error(res?.error?.message || "Failed to subscribe room");
                }

                await onSuccess();

            } catch (err) {
                if (!isActiveRef.current) return;
                onError(err);
            } finally {
                if (isActiveRef.current) {
                    setIsSubscribing(false);
                }
            }
        };

        const handleConnectionError = (err) => {
            if (err.code === "INVALID_TOKEN" || err.code === "TOKEN_EXPIRED") {
                toast.error("Authentication error. Please login again.");
                logout();
                return navigate('/auth/callback');
            }
            toast.error("Failed to connect to room updates. Please try again.");
            navigate('/');
        };

        listenEvent("connect_error", handleConnectionError);

        if (isSocketConnected()) {
            handleSubscribe();
        } else {
            listenEvent("connect", handleSubscribe);
            connectsocket();
        }

        return () => {
            isActiveRef.current = false;
            removeListener("connect", handleSubscribe);
            removeListener("connect_error", handleConnectionError);
            disconnectSocket();
        };
    }, [roomId]);

    return { isSubscribing };
};