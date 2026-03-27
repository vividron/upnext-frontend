import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const userStr = localStorage.getItem('user');

            if (token && userStr) {
                const userData = JSON.parse(userStr);
                setUser(userData);
                setIsAuthenticated(true);
            }
            else {
                logout();
            }
        } catch (error) {
            console.error("Authentication check failed:" + error);
            logout();
        } finally {
            setIsLoading(false);
        }
    }

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');

        setUser(null);
        setIsAuthenticated(false);
    }

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));

        setUser(userData);
        setIsAuthenticated(true)
    }

    const value = {
        user,
        isLoading,
        isAuthenticated,
        checkAuthStatus,
        login,
        logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}