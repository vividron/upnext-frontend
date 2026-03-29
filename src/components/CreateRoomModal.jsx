import clsx from "clsx";
import { useState } from "react";
import SpotifyButton from "./SpotifyButton.jsx";

export function CreateRoomModal({
    isCreating,
    isOpen,
    onClose,
    onCreate,
}) {
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");

    const handleCreate = () => {
        const trimmed = title.trim();

        if (!trimmed) {
            setError("Room title is required");
            return;
        }

        if (trimmed.length < 3) {
            setError("Title must be at least 3 characters");
            return;
        }

        if (trimmed.length > 40) {
            setError("Title must be under 40 characters");
            return;
        }

        setError("");
        onCreate(trimmed);
        setTitle("");
    };

    return (
        <div
            className={clsx("fixed inset-0 z-50 flex items-center justify-center transition-all", isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}
        >
            <div
                onClick={onClose}
                className={clsx("absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300", isOpen ? "opacity-100" : "opacity-0")}
            />

            <div
                className={clsx("relative w-full max-w-115 mx-4 bg-surface rounded-3xl border border-white/10 p-8 shadow-2xl transform transition-all duration-300", isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0")}
            >

                {/* Title */}
                <h2 className="text-2xl font-semibold mb-6">Create Room</h2>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleCreate();
                }}
                >
                    {/* Input */}
                    <div className="mb-6">
                        <label className="block text-xs! tracking-wider text-muted mb-2 uppercase">
                            Room Title
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. Acoustic Evenings, Retro Bollywood, Calm & Cozy, etc"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                if (error) setError("");
                            }}
                            className={clsx("w-full text-sub text-sm truncate bg-surface-high px-4 py-3 rounded-lg outline-none transition border placeholder:text-muted", error ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-primary"
                            )}
                        />

                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>
                </form>

                <div className="flex items-center justify-end gap-5">
                    <button
                        onClick={onClose}
                        className="text-sub font-semibold hover:text-(--text-primary) hover:scale-[1.03] active:scale-[0.97] transition duration-200 ease-in-out "
                    >
                        Cancel
                    </button>

                    <SpotifyButton onClick={handleCreate} disabled={isCreating} loading={isCreating} className="px-5! py-2.5! text-sm! font-semibold">
                        Create
                    </SpotifyButton>

                </div>
            </div>
        </div>
    );
}