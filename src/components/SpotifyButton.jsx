import clsx from "clsx";

const SpotifyButton = ({
    children,
    onClick,
    type = "button",
    disabled = false,
    loading = false,
    className = "",
}) => {
    const isDisabled = disabled || loading;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            className={clsx(
                "relative flex items-center justify-center gap-2 rounded-full px-4.5 py-3 text-[15px] font-extrabold text-black bg-primary",
                disabled ? "cursor-not-allowed opacity-60" : "transition-all duration-200 ease-in-out hover:bg-primary-soft hover:scale-[1.03] active:scale-[0.97]",
                className
            )}
        >
            <span className={loading ? "invisible" : ""}>
                {children}
            </span>

            {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                        className="size-6 rounded-full border-[3px] border-black border-b-black/20 animate-spin"
                    />
                </div>
            )}
        </button >
    );
};

export default SpotifyButton;