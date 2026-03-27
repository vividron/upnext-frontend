import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { ChevronDown, ChevronUp } from "lucide-react";

const UserBadge = () => {
    const { user, checkAuthStatus, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    // close dropdown on outside click and scroll
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        const handleScroll = () => setOpen(false);

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("scroll", handleScroll);
        }
    }, []);

    if (!user) {
        checkAuthStatus();
        return null;
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Badge */}
            <button
                onClick={() => { setOpen(!open) }}
                className={"flex items-center gap-3 bg-surface-high px-2.5 py-2 rounded-full hover:bg-surface-highest transition border border-black/20 cursor-pointer"}
            >
                {/* Profile image */}
                {user?.profileImage ? (
                    <img
                        src={user.profileImage}
                        alt="Profile"
                        className="w-6 h-6 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-xs">
                        {user?.username?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                )}

                {/* Name */}
                <span className="text-sm font-medium text-main">
                    {user?.username || "User"}
                </span>

                {/* Dropdown icon */}
                {open ? <ChevronUp className="w-4 h-4 text-main" /> : <ChevronDown className="w-4 h-4 text-main" />}

            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute -left-2.5 mt-2 w-40 p-2 bg-surface-high border border-white/10 rounded-md shadow-lg overflow-hidden z-50">
                    <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm text-main rounded-md hover:bg-(--surface-container-highest) transition focus"
                    >
                        <span>Logout</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserBadge;