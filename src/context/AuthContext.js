import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for an active session on initial load
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);
        };
        
        getSession();

        // Listen for authentication state changes (login, logout)
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );

        // Clean up the listener on component unmount
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const value = {
        user,
        signOut: () => supabase.auth.signOut(),
    };

    // Render children only once the session status is determined
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom hook to easily access auth data
export const useAuth = () => {
    return useContext(AuthContext);
};

