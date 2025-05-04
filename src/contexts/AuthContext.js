import React, { createContext, useState, useEffect, useContext } from "react";
import { authService } from "../services/api/authService";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("token")
    );
    const [isLoading, setIsLoading] = useState(true);

    const updateAuthState = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const currentUser = await authService.getCurrentUser();
                setUser(currentUser);
                setIsAuthenticated(true);
            }
        } catch (error) {
            logout();
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        updateAuthState();
    }, []);

    const login = async (userData) => {
        localStorage.setItem("token", userData.token);
        await updateAuthState();
    };

    const logout = async () => {
        try {
            await authService.logoutUser();
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider 
            value={{ 
                user, 
                isAuthenticated, 
                login,
                logout,
                updateAuthState
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
