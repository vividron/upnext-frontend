import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { joinRoom } from '../api/room.api.js';
import SpotifyLoader from "../components/SpotifyLoader.jsx";

const JoinRoomPage = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const joinTheRoom = async () => {
            try {
                await joinRoom(roomId);
                navigate(`/rooms/${roomId}`);
            } catch (error) {
                if (error.code === "USER_ALREADY_PRESENT") {
                    navigate(`/rooms/${roomId}`);
                    return;
                }
                if (error.code === "OTHER_ROOM_ACTIVE") {
                    toast.error(error.message || "You have an active room. You can't join another room until your active session is ended", { duration: 7000 });
                    navigate('/');
                    return;
                }
                if (error.code === "ROOM_NOT_FOUND" || error.code === "ROOM_INACTIVE") {
                    toast.error(error.message || "Room not found or inactive");
                    navigate('/');
                    return;
                }
                console.error('Error joining room:', error);
                toast.error(error.message || "Failed to join room. Please try again.");
                navigate('/');
            }
        }
        joinTheRoom();
    }, [roomId]);

    return (
        <div className="h-screen container mx-auto px-4 py-8">
            <div className="flex flex-col items-center justify-center h-full gap-5 lg:gap-8">
                <h1 className="text-center font-body font-bold text-2xl lg:text-4xl text-sub">Joining the room</h1>
                <span><SpotifyLoader /></span>
            </div>
        </div>
    );
}

export default JoinRoomPage