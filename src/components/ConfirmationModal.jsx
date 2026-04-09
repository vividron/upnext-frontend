import clsx from "clsx";
import SpotifyButton from "./SpotifyButton.jsx";
import { AlertTriangle } from "lucide-react";

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    isLoading,
    title = "Are you sure?",
    description = "",
}) => {
    return (
        <div className={clsx(  "fixed inset-0 z-50 flex items-center justify-center transition-all",
                isOpen
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
            )}
        >
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
                    "relative w-full max-w-110 mx-4 bg-surface rounded-3xl border border-white/10 p-7 shadow-2xl transform transition-all duration-300",
                    isOpen
                        ? "scale-100 translate-y-0 opacity-100"
                        : "scale-95 translate-y-4 opacity-0"
                )}
            >
                {/* Title*/}
                <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                    {title}
                </h2>

                {/* Description */}
                {description && (
                    <p className="text-sm text-sub mb-6">
                        {description}
                    </p>
                )}

                {/* Buttons */}
                <div className="flex items-center justify-end gap-5">
                    <button
                        onClick={onClose}
                        className="text-sub font-semibold hover:text-(--text-primary) hover:scale-[1.03] active:scale-[0.97] transition duration-200 cursor-pointer"
                    >
                        Cancel
                    </button>

                    <SpotifyButton
                        onClick={onConfirm}
                        loading={isLoading}
                        disabled={isLoading}
                        className="px-5! py-2.5! text-sm! font-semibold"
                    >
                        Yes
                    </SpotifyButton>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;