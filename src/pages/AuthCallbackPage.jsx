import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getCurrentUser, spotifyLogin } from "../api/auth.api.js"
import { ListStart, Music, RefreshCcw, RefreshCw, Zap } from "lucide-react"
import SpotifyButton from '../components/SpotifyButton.jsx';
import toast from 'react-hot-toast';

const AuthCallbackPage = () => {

    const { login } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = searchParams.get("token");

        if (!token) {
            const error = searchParams.get("error");

            if (error) {
                if (error === "unauthorized_user") {
                    toast.error("Spotify restricts login because this app is in development mode. Only approved users can access it. Please contact the developer for access.", { duration: 10000 });
                    return;
                }
                toast.error("Authentication failed. Please try again.");
            }
            return;
        };

        const handleAuth = async () => {
            try {
                setLoading(true);

                // remove token from URL
                window.history.replaceState({}, document.title, "/auth/callback");

                localStorage.setItem("authToken", token);

                // fetch user data
                const data = await getCurrentUser();

                login(data.user);

                // redirect to landing page
                navigate("/");

            } catch (err) {
                setLoading(false);
                toast.error(err.message || "Authentication failed. Please try again.");
            }
        };

        handleAuth();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface-lowest px-4 select-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(30,214,94,0.12),transparent_60%)] pointer-events-none" />

            {/* Card */}
            <div className="relative w-full max-w-md rounded-2xl bg-surface backdrop-blur-xl p-8 shadow-2xl">

                {/* Header */}
                <div className="flex items-center gap-5 mb-2">

                    {/* UpNext */}
                    <Link to="/#hero" className="flex items-center gap-1 mr-3">
                        <img src="/logos/UpNext-Logo.svg" alt="UpNext" className="w-7 h-7 object-contain" />
                        <span className="text-[15px] text-main font-semibold tracking-tight">
                            UpNext
                        </span>
                    </Link>

                    {/* Divider */}
                    <div className="w-px h-7 bg-white/10"></div>

                    {/* Spotify */}
                    <a href='https://open.spotify.com/' target="_blank" className="flex items-center">
                        <img src="/logos/Spotify-Logo.png" alt="Spotify" className="h-18 object-contain" />
                    </a>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold mb-3">
                    Control the Vibe Together
                </h2>

                <p className="text-sub text-sm mb-6">
                    Generate fair, crowd-powered queues for your space. Let users vote, match playlists, and keep the vibe perfect.
                </p>

                {/* Features */}
                <ul className="space-y-3 text-sm text-sub mb-6">
                    <li className="flex items-start gap-3">
                        <ListStart size={18} className="mt-0.5 shrink-0" />
                        <span>Smart queue powered by votes</span>
                    </li>

                    <li className="flex items-start gap-3">
                        <Music size={18} className="mt-0.5 shrink-0" />
                        <span>Playlist matching & auto-upvotes</span>
                    </li>

                    <li className="flex items-start gap-3">
                        <RefreshCw size={18} className="mt-0.5 shrink-0" />
                        <span>Real-time synced listening rooms</span>
                    </li>
                </ul>

                <div className="flex flex-wrap gap-2 mb-6">
                    <div className="px-3 py-1 flex items-center gap-2 text-xs rounded-full bg-white/5 border border-white/10">
                        <RefreshCcw className='size-4 text-blue-400' />
                        <span>Instant Vote Sync</span>
                    </div>

                    <div className="px-3 py-1 flex items-center gap-2 text-xs rounded-full bg-white/5 border border-white/10">
                        <Music className='size-4 text-green-400' />
                        <span>Spotify Player Control</span>
                    </div>

                    <div className="px-3 py-1 flex items-center gap-2 text-xs rounded-full bg-white/5 border border-white/10">
                        <Zap className='size-4 text-orange-400' />
                        <span>Real-time Updates</span>
                    </div>
                </div>

                <SpotifyButton onClick={() => spotifyLogin()} disabled={loading} loading={loading} className="w-full text-[15px]">
                    Continue with Spotify
                </SpotifyButton>

                {/* Footer */}
                <p className="text-xs text-muted text-center mt-6">
                    By continuing, you allow UpNext to manage your Spotify playback.
                </p>
            </div>
        </div>
    );
}

export default AuthCallbackPage