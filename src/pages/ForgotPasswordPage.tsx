// src/pages/ForgotPasswordPage.tsx

import React, { useState } from 'react';
import api from '../utils/api';
import { AUTH_PASSWORD_RESET_REQUEST_ENDPOINT } from '../api';
import '../App.css'; // For general styling
import './AuthPages.css'; // For form styling common to login/register/forgot

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            const response = await api.post(AUTH_PASSWORD_RESET_REQUEST_ENDPOINT, { email });
            setMessage(response.data.detail || 'Password reset email sent. Please check your inbox.');
        } catch (err: any) {
            console.error("Password reset request failed:", err);
            if (err.response && err.response.data) {
                setError(err.response.data.email || err.response.data.detail || 'Failed to send password reset email. Please try again.');
            } else {
                setError('Network error or an unexpected issue occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page-container">
            <div className="auth-form-card">
                <h2>Forgot Your Password?</h2>
                <p className="auth-description">Enter your email address below and we'll send you a link to reset your password.</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="your.email@example.com"
                        />
                    </div>
                    {message && <p className="success-message">{message}</p>}
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="button primary" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;