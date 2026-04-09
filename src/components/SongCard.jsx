import clsx from "clsx";
import { Music } from "lucide-react";

const SongCard = ({
    children,
    coverImage,
    name = "Song not found",
    artistNames = "",
    className = ""
}) => {
    return (
        <div className={clsx('flex items-center justify-between gap-3 bg-surface-high rounded-xl p-2 pr-3 border border-white/5', className)}>
            <div className='flex items-center lg:gap-1 min-w-0'>
                {coverImage ?
                    <img
                        src={coverImage}
                        alt="cover"
                        className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg shrink-0 "
                    /> : <div className='w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-black/40 rounded-lg shrink-0'>
                        <Music size={30} />
                    </div>
                }

                <div className='w-full min-w-0 m-2'>
                    {name && <p className="text-sm sm:text-[1rem] font-semibold truncate">{name}</p>}
                    {artistNames && <p className="text-xs sm:text-sm text-sub truncate">{artistNames}</p>}
                </div>
            </div>
            {/*Action button */}
            {children}
        </div>
    )
}

export default SongCard