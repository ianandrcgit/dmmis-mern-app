
import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. Check if a user is already logged in when the app starts
    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('jwt_token'); //
            if (token) {
                try {
                    // Call a 'me' endpoint or use the token to set user state
                    // For now, we'll assume the token exists and set a basic state
                    const savedUser = JSON.parse(localStorage.getItem('user_data'));
                    if (savedUser) setUser(savedUser);
                } catch (err) {
                    localStorage.removeItem('jwt_token');
                    localStorage.removeItem('user_data');
                }
            }
            setLoading(false);
        };
        checkLoggedIn();
    }, []);

    // 2. Step One: Request OTP
    const requestOtp = async (phoneOrEmail, role) => {
        return await API.post('/auth/login-otp', { phoneOrEmail, role }); //
    };

    // 3. Step Two: Verify OTP and Save Token
    const verifyOtp = async (phoneOrEmail, otp) => {
        const res = await API.post('/auth/verify-otp', { phoneOrEmail, otp }); //
        if (res.data.success) {
            localStorage.setItem('jwt_token', res.data.token); //
            localStorage.setItem('user_data', JSON.stringify(res.data.data));
            setUser(res.data.data);
        }
        return res.data;
    };

    // 4. Logout
    const logout = () => {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user_data');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, requestOtp, verifyOtp, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);