import { Airplay, CircleEqual, ListStart, Music } from "lucide-react"
import { Link } from "react-router-dom"

const Footer = ({ navLinks }) => {
    return (
        <footer className="bg-surface border-t border-white/10 mt-16">
            <div className="flex flex-col gap-5 max-w-7xl mx-auto px-6 pt-14 pb-5">
                <div className="flex flex-col flex-wrap md:flex-row justify-between gap-12">

                    {/* Logo */}
                    <div className="flex flex-col gap-3">
                        <a href="/#hero" className="flex items-center gap-2 text-xl font-bold tracking-tight">
                            <img src="/logos/UpNext-Logo.svg" alt="UpNext" className="w-7 h-7 object-contain" />
                            <span>UpNext</span>
                        </a>
                        {/* Description */}
                        <p className="text-sm text-sub leading-relaxed max-w-xs">
                            Create shared music rooms where everyone has a voice.
                            Vote, vibe, and shape the playlist together.
                        </p>
                    </div>


                    {/* Navigation */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-semibold text-main tracking-wide">
                            Navigation
                        </h3>
                        <ul className="space-y-2 font-medium text-sm text-sub">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.to}
                                        className="hover:text-primary active:text-primary transition hover:underline decoration-primary "
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Pages */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-semibold text-main tracking-wide">
                            Legal
                        </h3>
                        <ul className="space-y-2 text-sm font-medium text-sub">
                            <li>
                                <Link to="#" className="hover:text-primary active:text-primary transition hover:underline decoration-primary">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="hover:text-primary active:text-primary transition hover:underline decoration-primary">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Features */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-semibold text-main tracking-wide">
                            Why UpNext?
                        </h3>
                        <ul className="space-y-2 text-sm text-sub">
                            <li className="flex items-center gap-2">
                                <ListStart size={16} />
                                <span>Vote-based song queue</span></li>
                            <li className="flex items-center gap-2">
                                <CircleEqual size={16} />
                                <span>Playlist matching</span></li>
                            <li className="flex items-center gap-2">
                                <Airplay size={16} />
                                <span>Perfect for gyms & cafés</span></li>
                            <li className="flex items-center gap-2">
                                <Music size={16} />
                                <span>Spotify Player Control</span></li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px mt-5 bg-white/10" />

                <p className="text-[15px] text-sub text-center font-medium">
                    Built with ❤️ by <span className="text-main">Ronak Sakhala</span>
                </p>
            </div>
        </footer>
    )
}

export default Footer