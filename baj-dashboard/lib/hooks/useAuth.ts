// Authentication hook for components to access authentication state and actions
import { useState } from 'react';

interface AuthContext {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    verifyOtp: (email: string, otp: string) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (email: string, otp: string, newPassword: string) => Promise<void>;
}

export function useAuth(): AuthContext {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                setIsAuthenticated(true);
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const verifyOtp = async (email: string, otp: string) => {
        try {
            const response = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });
            if (response.ok) {
                setIsAuthenticated(true);
            } else {
                throw new Error('OTP verification failed');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const forgotPassword = async (email: string) => {
        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            if (!response.ok) {
                throw new Error('Forgot password request failed');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const resetPassword = async (email: string, otp: string, newPassword: string) => {
        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, newPassword }),
            });
            if (!response.ok) {
                throw new Error('Reset password request failed');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return { isAuthenticated, login, verifyOtp, forgotPassword, resetPassword };
}