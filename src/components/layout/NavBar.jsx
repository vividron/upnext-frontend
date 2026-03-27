import { useNavigate } from 'react-router-dom'
import { Menu, X } from "lucide-react";
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import SpotifyButton from '../SpotifyButton.jsx';
import clsx from 'clsx';
import UserBadge from './UserBadge.jsx';

const NavBar = ({ navLinks }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <header className="sticky top-0 inset-x-0 z-10 backdrop-blur-xl bg-surface/70 border-b border-white/10">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

                    {/* Logo */}
                    <a href="/#hero" className="flex items-center gap-2 text-xl font-bold tracking-tight cursor-pointer">
                        <img src="/logos/UpNext-Logo.svg" alt="UpNext" className="w-7 h-7 object-contain" />
                        <span>UpNext</span>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8 text-[17px]">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.to}
                                className={"flex flex-col items-center group text-sub hover:text-primary transition"}
                            >
                                <span>{link.name}</span>
                                <span
                                    className={clsx(
                                        "h-0.5 w-full opacity-0 transition duration-300 origin-left",
                                        "group-hover:opacity-100 group-hover:bg-primary",
                                    )}
                                />
                            </a>
                        ))}
                        {isAuthenticated ? <UserBadge /> : (
                            <SpotifyButton onClick={() => navigate('/auth/callback')} className="bg-primary-container rounded-full font-bold px-6 py-2.5! ml-4 text-sm! cursor-pointer">
                                Sign In
                            </SpotifyButton>
                        )}
                    </nav>

                    {/* Drawer button */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsOpen(true)}
                    >
                        <Menu className='size-6 cursor-pointer text-main' />
                    </button>
                </div>
            </header>

            {/* Drawer */}
            <div
                className={`fixed inset-0 z-20 ${isOpen ? "visible" : "invisible"}`}
            >
                <div
                    onClick={() => setIsOpen(false)}
                    className={clsx(
                        "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
                        isOpen ? "opacity-100" : "opacity-0"
                    )}
                />

                {/* Drawer (RIGHT SIDE) */}
                <div
                    className={clsx("absolute right-0 top-0 h-full w-[80%] max-w-sm bg-surface/95 backdrop-blur-xl border-l border-white/10 flex flex-col",
                        "transition-transform duration-300 ease-out",
                        isOpen ? "translate-x-0" : "translate-x-full"
                    )}
                >

                    {/* Header */}
                    <div className="flex items-center justify-between p-5 border-b border-white/10">
                        <div>
                            {isAuthenticated ? (
                                /* User */
                                < div
                                    className={"flex items-center gap-3 bg-surface-high px-3 py-1.5 rounded-full hover:bg-surface-highest transition border border-black/20 cursor-pointer"}
                                >
                                    {/* Profile image */}
                                    {user?.profileImage ? (
                                        <img
                                            src={user.profileImage}
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-xs">
                                            {user?.username?.charAt(0)?.toUpperCase() || "U"}
                                        </div>
                                    )}

                                    {/* Name */}
                                    <span className="text-lg mr-2 font-medium text-main">
                                        {user?.username || "User"}
                                    </span>
                                </div>
                            ) : (
                                <SpotifyButton
                                    onClick={() => {
                                        setIsOpen(false);
                                        navigate('/auth/callback');
                                    }}
                                    className="w-full bg-primary-container rounded-full font-semibold py-2.5!"
                                >
                                    Sign In
                                </SpotifyButton>
                            )}
                        </div>
                        <button onClick={() => setIsOpen(false)}>
                            <X className="size-6 text-main" />
                        </button>
                    </div>

                    <div className="flex flex-col flex-1 justify-between mt-5">

                        {/* Nav Items */}
                        <nav className="flex flex-col p-5 gap-8 text-base">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.to}
                                    onClick={() => setIsOpen(false)}
                                    className={"text-lg active:text-primary transition font-medium"}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </nav>

                        {/* Logout Button */}
                        {isAuthenticated && (
                            <div className='p-5 border-t border-white/10'>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        logout();
                                    }}
                                    className="w-full border border-red-500/30  text-red-400 active:bg-red-500/10 transition rounded-full py-3 font-medium"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </>
    )
}

export default NavBar