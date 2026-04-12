import { useEffect, useState } from "react";
import RoomCard from "../../../components/RoomCard.jsx";
import { createRoom, deleteRoom, getRooms } from "../../../api/room.api.js";
import toast from "react-hot-toast";
import SpotifyLoader from "../../../components/SpotifyLoader.jsx";
import SpotifyButton from "../../../components/SpotifyButton.jsx";
import { Plus } from "lucide-react";
import { CreateRoomModal } from "../../../components/CreateRoomModal.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const RoomsSection = () => {

    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    {/*Create room modal state */ }
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            setIsLoading(false); // stop loading if not logged in
            setRooms([]);
            return;
        }
        const fetchRooms = async () => {
            try {
                const res = await getRooms();
                setRooms(res?.rooms ?? []);
            } catch (error) {
                toast.error(error.message || "Failed to load rooms. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRooms();
    }, [isAuthenticated]);

    const handleCreateRoomClick = () => {
        // Navigate to auth page if not authenticated
        if (!isAuthenticated) return navigate('/auth/callback');

        // Check if user has spotify premium
        if (!user?.isPremium) return toast.error("Spotify Premium is required to create a room. Upgrade to Premium so we can control playback", { duration: 5000 });

        setIsCreateModalOpen(true);
    }

    const handleCreateRoom = async (title) => {
        try {
            setIsCreateModalOpen(false);
            setIsCreating(true);

            const { room } = await createRoom(title);
            setRooms(prevRooms => [...prevRooms, room].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));

            // Join user to the room immediately after creating it
            handleJoinRoom(room._id);
        } catch (error) {
            if (error?.code === "USER_NOT_PREMIUM") return toast.error("Spotify Premium is required to create a room. Upgrade to Premium so we can control playback", { duration: 5000 })
            toast.error(error.message || "Failed to create room. Please try again.");
        } finally {
            setIsCreating(false);
        }
    };

    const handleJoinRoom = (roomId) => {
        navigate(`/rooms/${roomId}/join`);
    }

    const handleDeleteRoom = async (roomId) => {
        try {
            setIsDeleting(true)
            await deleteRoom(roomId);
            setRooms(prevRooms => prevRooms.filter(room => room._id !== roomId));
            toast.success("Room deleted successfully!");
        } catch (error) {
            toast.error(error.message || "Failed to delete room. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <section id="rooms" className="w-full h-full p-4 lg:p-8">
            {/* Card */}
            <div className="relative z-5 h-full backdrop-blur-xl bg-[rgba(31,31,31,0.7)] rounded-3xl p-6 shadow-xl border border-white/5">

                {isLoading ? (
                    <div className="h-full flex items-center justify-center">
                        <SpotifyLoader />
                    </div>
                ) : rooms.length === 0 ? (
                    // empty rooms
                    <div className="h-full flex flex-col items-center justify-between">
                        <img
                            src="/images/sleeping-speaker.webp"
                            loading="lazy"
                            className="w-30 sm:w-40 md:w-50 object-contain opacity-80 rounded-3xl drop-shadow-[0_0_15px_rgba(29,185,84)] mb-8 md:mb-10"
                        />

                        <h3 className="text-main font-semibold text-lg md:text-xl text-main mb-2">
                            Your queue is quiet
                        </h3>

                        <p className="text-sm text-sub mb-6">
                            Create your first room and start listening together
                        </p>

                        <SpotifyButton
                            onClick={handleCreateRoomClick}
                            className="bg-[rgba(31,31,31,0.7)]! backdrop-blur-xl text-main border border-white/10 rounded-full font-semibold text-sm! hover:bg-surface-container-hover"
                        >
                            <div className="flex gap-2 items-center">
                                <Plus size={18} />
                                <span>Create Room</span>
                            </div>
                        </SpotifyButton>
                    </div>
                ) : (
                    <div className="h-full space-y-6">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <h3 className="text-[15px] md:text-xl font-semibold text-main">My Rooms</h3>

                            <SpotifyButton onClick={() => setIsCreateModalOpen(true)} className="bg-[rgba(31,31,31,0.7)]! backdrop-blur-xl text-main border border-white/10 rounded-full font-semibold ml-4 text-xs! md:text-sm! hover:bg-surface-container-hover">
                                <div className="flex gap-2 items-center">
                                    <Plus className="size-4 md:size-4.5" />
                                    <span>Create Room</span>
                                </div>
                            </SpotifyButton>
                        </div>

                        {isLoading ? (
                            <div className="h-full pb-20 flex items-center justify-center">
                                <SpotifyLoader />
                            </div>
                        ) : (
                            <div className="max-h-95 overflow-y-auto pr-2">
                                <ul className="space-y-4">
                                    {rooms.map((room) => (
                                        <li key={room._id}>
                                            <RoomCard
                                                room={room}
                                                deleteRoom={handleDeleteRoom}
                                                isDeleting={isDeleting}
                                                JoinRoom={handleJoinRoom}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <CreateRoomModal
                isCreating={isCreating}
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreateRoom}
            />
        </section>
    );
}

export default RoomsSection;