// src/context/AuthContext.tsx

import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import api from '../utils/api'; // Your custom Axios instance
import { useNavigate } from 'react-router-dom';

// Define a more specific type for your user object
interface User {
    id: number; // Assuming your user has an ID
    username: string;
    email: string;
    first_name?: string; // Optional
    last_name?: string;  // Optional
    // Add any other user fields you expect from your backend's user endpoint
}

interface AuthContextType {
    isAuthenticated: boolean;
    authToken: string | null;
    user: User | null; // Changed from 'username' to 'user' object
    login: (token: string, user: User) => void; // Updated login signature
    logout: () => void;
    checkAuth: () => Promise<void>;
    updateUser: (updatedUserData: Partial<User>) => void; // New function to update user in context
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null); // Changed from 'username'
    const navigate = useNavigate();

    // Function to verify current token with the backend
    const checkAuth = useCallback(async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            setIsAuthenticated(false);
            setAuthToken(null);
            setUser(null); // Clear user
            delete api.defaults.headers.common['Authorization']; // Ensure header is cleared
            return;
        }

        try {
            api.defaults.headers.common['Authorization'] = `Token ${token}`;
            const response = await api.get('/api/auth/user/'); // Endpoint to get user details
            if (response.status === 200) {
                setIsAuthenticated(true);
                setAuthToken(token);
                setUser(response.data); // Set the full user object
                localStorage.setItem('user', JSON.stringify(response.data)); // Store full user data
            }
        } catch (error) {
            console.error("Token verification failed:", error);
            setIsAuthenticated(false);
            setAuthToken(null);
            setUser(null); // Clear user
            localStorage.removeItem('authToken');
            localStorage.removeItem('user'); // Also remove stored user data
            delete api.defaults.headers.common['Authorization']; // Clear header on failure
        }
    }, []);

    // Load auth state from localStorage on initial load
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storedUserJson = localStorage.getItem('user'); // Get user data as JSON

        if (storedToken && storedUserJson) {
            try {
                const storedUser: User = JSON.parse(storedUserJson);
                setIsAuthenticated(true);
                setAuthToken(storedToken);
                setUser(storedUser);
                api.defaults.headers.common['Authorization'] = `Token ${storedToken}`;
            } catch (error) {
                console.error("Error parsing stored user data:", error);
                // Clear any corrupted data
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                setIsAuthenticated(false);
                setAuthToken(null);
                setUser(null);
                delete api.defaults.headers.common['Authorization'];
            }
        } else {
            delete api.defaults.headers.common['Authorization']; // Ensure header is NOT set
        }

        checkAuth(); // Validate token with backend on load
    }, [checkAuth]);

    const login = (token: string, userData: User) => {
        setIsAuthenticated(true);
        setAuthToken(token);
        setUser(userData); // Set the full user object
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userData)); // Store full user data
        api.defaults.headers.common['Authorization'] = `Token ${token}`;
        console.log("Logged in successfully. Auth token and user data set.");
    };

    const logout = async () => {
        try {
            await api.post('/api/auth/logout/');
            console.log("Logged out from backend successfully.");
        } catch (error) {
            console.error("Logout failed on backend:", error);
        } finally {
            setIsAuthenticated(false);
            setAuthToken(null);
            setUser(null); // Clear user
            localStorage.removeItem('authToken');
            localStorage.removeItem('user'); // Clear user data
            delete api.defaults.headers.common['Authorization']; // CRUCIAL FIX
            console.log("Frontend auth state and Axios header cleared.");
            navigate('/login');
        }
    };

    // New function to update user data in context (after profile edit)
    const updateUser = (updatedUserData: Partial<User>) => {
        if (user) {
            const newUser = { ...user, ...updatedUserData };
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser)); // Update localStorage as well
            console.log("User data updated in context and localStorage.");
        }
    };

    const contextValue = {
        isAuthenticated,
        authToken,
        user, // Changed from 'username'
        login,
        logout,
        checkAuth,
        updateUser, // Add new function
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};