import clsx from "clsx";
import SpotifyButton from "./SpotifyButton.jsx";
import { Music, X } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { getUserPlaylists } from "../api/spotify.api.js";
import toast from "react-hot-toast";
import SpotifyLoader from "./SpotifyLoader.jsx";

const SongsDialog = ({
    isOpen,
    onClose,
    heading = "Select Songs",
    subHeading = "",
    actionButtonName = "Select",
    onActionButtonClick,
    processingPlaylistId = null,
    isProcessing = false
}) => {
    const [playlists, setPlaylists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isOpen) return;

        setIsLoading(true);

        const fetchPlaylists = async () => {
            try {
                setIsLoading(true);
                const { playlists: playlistsRes } = await getUserPlaylists(20);
                setPlaylists(playlistsRes);
            } catch (error) {
                toast.error("Failed to fetch user playlist");
                onClose();
            } finally {
                setIsLoading(false);
            }
        };
        fetchPlaylists();
    }, [isOpen]);

    return (
        <div className={clsx(
            "fixed inset-0 z-50 flex items-center justify-center transition-all",
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")} >
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={clsx(
                    "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0"
                )}
            />
            {/* Modal */}
            <div className={clsx(
                "relative h-full max-h-2/3 sm:max-h-5/6 w-full min-w-0 max-w-115 mx-4 bg-surface rounded-3xl border border-white/10 shadow-2xl transform transition-all duration-300 flex flex-col pb-5",
                isOpen
                    ? "scale-100 translate-y-0 opacity-100"
                    : "scale-95 translate-y-4 opacity-0")}
            >
                {/* Header */}
                <div className="p-5">
                    <div className="flex justify-between items-center mb-6">
                        <div className="space-y-1">
                            <h2 className="text-xl sm:text-2xl font-semibold text-main">{heading}</h2>
                            {subHeading && <p className="text-sm font-medium text-sub">{subHeading}</p>}
                        </div>
                        <button
                            onClick={onClose}
                            className="text-main sm:text-sub font-semibold hover:text-(--text-primary) hover:scale-[1.03]  active:scale-[0.97] transition duration-200 cursor-pointer"
                        >
                            <X />
                        </button>
                    </div>
                    <p className="text-sm tracking-wider text-sub">
                        Your Playlists
                    </p>
                </div>

                {/* Playlists */}
                <div className="px-5 flex-1 min-h-0 overflow-y-auto space-y-2">

                    {isLoading
                        ? (
                            <div className="h-full px-4 py-8 flex items-center justify-center">
                                <SpotifyLoader />
                            </div>
                        ) : (
                            <>
                                {/* Empty playlists */}
                                {playlists.length === 0 && (
                                    <div className="h-full flex items-center justify-center text-sub">
                                        No playlists found
                                    </div>
                                )}

                                {/* Playlist */}
                                {playlists.map((playlist) => (
                                    <div
                                        key={playlist.id}
                                        className="flex items-center justify-between gap-3 bg-surface-high rounded-xl p-2 pr-3 border border-white/5"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            {playlist.image ? (
                                                <img
                                                    src={playlist.image}
                                                    alt="cover"
                                                    className="w-14 h-14 object-cover rounded-lg shrink-0"
                                                />
                                            ) : (
                                                <div className="w-14 h-14 flex items-center justify-center bg-black/40 rounded-lg shrink-0">
                                                    <Music size={22} />
                                                </div>
                                            )}
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold truncate">
                                                    {playlist.name}
                                                </p>
                                            </div>
                                        </div>

                                        {/* ACtion button */}
                                        <SpotifyButton
                                            onClick={() => onActionButtonClick(playlist.id)}
                                            disabled={isProcessing}
                                            loading={processingPlaylistId === playlist.id && isProcessing}
                                            className="px-4! py-2! text-xs! font-semibold shrink-0"
                                        >
                                            {actionButtonName}
                                        </SpotifyButton>
                                    </div>
                                ))}
                            </>
                        )}
                </div>
            </div>
        </div>
    );
}

export default SongsDialog