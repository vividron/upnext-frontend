import clsx from "clsx";
import ProgressBar from "./ProgressBar.jsx"
import { Music } from "lucide-react";

const Player = ({ isHost, playerState, playerLoading, controls }) => {
    return (
        <div className="relative flex border-t border-white/10 bg-surface-high rounded-t-2xl sm:rounded-2xl gap-5 items-center">
            {/*Song cover image */}
            <div className="relative w-30 sm:max-md:w-40 aspect-square shrink-0">
                {playerState?.song?.coverImage ? (<>
                    <img
                        src={playerState?.song?.coverImage}
                        alt="cover"
                        className="h-full object-cover rounded-tl-2xl sm:rounded-l-2xl"
                    />
                    <div className="absolute inset-0 bg-linear-to-r rounded-tl-2xl sm:rounded-l-2xl from-black/30 to-transparent" />
                </>) : <div className='flex items-center justify-center sm:max-md:w-40 bg-black/40 border border-white/10 rounded-tl-2xl sm:rounded-l-2xl aspect-square shrink-0'>
                    <Music size={60} />
                </div>
                }
            </div>

            <div className="flex-1 flex flex-col gap-3 lg:gap-0 justify-between md:flex-row lg:items-center mr-5 min-w-0">
                {/* Song info */}
                <div className="min-w-0 w-full sm:space-y-1 lg:mr-5">
                    <p className="lg:leading-[0.9999] tracking-tight text-[16px] lg:text-2xl text-main font-extrabold truncate lg:overflow-visible lg:whitespace-normal ">
                        {playerState?.song?.name || "Now playing: Silence"}
                    </p>
                    <p className="text-[0.7rem] sm:text-sm lg:text-[16px] text-sub truncate">
                        {playerState?.song?.artists}
                    </p>
                </div>

                <div className='w-full flex flex-col gap-2 items-center justify-center min-w-0'>
                    {/* controls */}
                    <div className="flex items-center gap-5">
                        <button
                            className={clsx("transition shrink-0",
                                !isHost ? "opacity-60 cursor-not-allowed" : "opacity-80 hover:opacity-100 active:opacity-100 active:scale-90 cursor-pointer"
                            )}>
                            <img className='size-4 md:size-4.5' src="/images/play_prev.png" alt="previous" />
                        </button>

                        <button
                            onClick={playerState?.isPlaying ? controls.handlePause : controls.handlePlay}
                            disabled={!isHost || playerLoading.updating}
                            className={clsx("transition shrink-0",
                                (!isHost || (playerLoading?.playing || playerLoading?.pausing)) ? "opacity-60 cursor-not-allowed" : "opacity-80 active:scale-90 sm:active:scale-100 hover:scale-105 cursor-pointer")}
                        >
                            {playerState?.isPlaying ? <img className='size-10 md:size-12' src="/images/play.svg" alt="next" />
                                : <img className='size-10 md:size-12' src="/images/pause.svg" alt="next" />}
                        </button>

                        <button
                            onClick={controls.handlePlayNext}
                            disabled={!isHost || playerLoading.updating}
                            className={clsx("transition shrink-0",
                                !isHost || playerLoading.playingNext ? "opacity-60 cursor-not-allowed" : "opacity-80 hover:opacity-100 active:opacity-100 active:scale-90 cursor-pointer"
                            )}
                        >
                            <img className='size-4 md:size-4.5' src="/images/play_next.png" alt="next" />
                        </button>
                    </div>

                    {/* Progress bar */}
                    <ProgressBar
                        progress={playerState?.position ?? 0}
                        duration={playerState?.song?.duration ?? 0}
                        withDigits={true}
                        className="hidden sm:flex"
                    />

                </div>
            </div>
            {/*Progress bar mobie view */}
            <div className='sm:hidden absolute inset-x-0 -bottom-0.5'>
                <ProgressBar
                    progress={playerState?.position ?? 0}
                    duration={playerState?.song?.duration ?? 0}
                    withDigits={false}
                    barClassName={"bg-primary!"}
                />
            </div>
        </div>
    )
}

export default Player