import { Music } from "lucide-react";
import SpotifyButton from "./SpotifyButton";

const RoomCard = ({
    room,
    deleteRoom,
    isDeleting,
    JoinRoom
}) => {
    const createdAt = room?.createdAt ? new Date(room.createdAt).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
    }) : null;

    return (
        <div className="flex items-center justify-between group bg-surface-high rounded-2xl px-4 py-4 hover:bg-surface-highest transition">

            {/* Left */}
            <div className="flex items-center gap-3 md:gap-4">
                <div className="size-8 md:size-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Music className="text-primary size-3 md:size-5" />
                </div>

                <div>
                    <p className="text-sm md:text-lg font-semibold">{room.title}</p>
                    <p className="text-[0.6rem] md:text-xs text-sub">Created on {createdAt}</p>
                </div>
            </div>

            {/* Button */}
            <div className="flex items-center gap-3 md:gap-5">
                {
                    room?.isActive ? (
                        <div className="flex items-center gap-2">
                            <span className="size-1 md:size-1.5 rounded-full bg-green-400" />
                            <span className="text-main text-[0.6rem] md:text-sm font-semibold">Active</span>
                        </div>
                    ) : (
                        /*Delete button*/
                        <button
                            disabled={isDeleting}
                            onClick={() => deleteRoom(room._id)}
                            className="text-[0.6rem] md:text-sm font-semibold text-sub hover:text-(--text-primary) hover:scale-[1.03] opacity-100 lg:opacity-0 lg:group-hover:opacity-100 active:scale-[0.97] transition duration-200 ease-in-out cursor-pointer"
                        >
                            Delete
                        </button>
                    )
                }
                {/*Join button */}
                <SpotifyButton onClick={() => JoinRoom(room._id)} className="px-3! py-2! md:px-4.5! md:py-3! text-[0.6rem]! md:text-sm! font-semibold">
                   {room?.isActive? "Join" : "Start"}
                </SpotifyButton>
            </div>
        </div>
    );
}

export default RoomCard;