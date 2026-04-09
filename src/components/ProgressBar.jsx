import clsx from "clsx"

const formatTime = (ms = 0) => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

const ProgressBar = ({
    progress,
    duration,
    withDigits,
    barClassName,
    className = ""
}) => {
    return (
        <div className={clsx("flex w-full items-center gap-2 text-xs text-sub", className)}>
            {withDigits && <span>{formatTime(progress)}</span>}

            <div className="flex-1 h-0.75 bg-white/10 rounded-full overflow-hidden">
                <div
                    className={clsx("h-full bg-white/70 transition-all duration-300", barClassName)}
                    style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }}
                />
            </div>

            {withDigits && <span>{formatTime(duration)}</span>}
        </div>
    )
}

export default ProgressBar