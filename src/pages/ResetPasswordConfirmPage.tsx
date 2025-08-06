// src/pages/ResetPasswordConfirmPage.tsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { AUTH_PASSWORD_RESET_CONFIRM_ENDPOINT } from '../api';
import '../App.css'; // For general styling
import './AuthPages.css'; // For form styling common to login/register/forgot

const ResetPasswordConfirmPage: React.FC = () => {
    const { uid, token } = useParams<{ uid: string; token: string }>(); // Get UID and Token from URL
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState<string>('');
    const [reNewPassword, setReNewPassword] = useState<string>(''); // For password confirmation
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        if (!uid || !token) {
            setError('Missing password reset link parameters. Please use the link from your email.');
            setLoading(false);
            return;
        }

        if (newPassword !== reNewPassword) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }

        try {
            const response = await api.post(AUTH_PASSWORD_RESET_CONFIRM_ENDPOINT, {
                uid,
                token,
                new_password: newPassword,
                re_new_password: reNewPassword, // Djoser typically expects this
            });
            setMessage(response.data.detail || 'Your password has been reset successfully. You can now log in with your new password.');
            setNewPassword('');
            setReNewPassword('');
            // Optionally, redirect to login page after a short delay
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err: any) {
            console.error("Password reset confirmation failed:", err);
            if (err.response && err.response.data) {
                // Djoser sends errors like { new_password: ["password is too weak"] }
                setError(Object.values(err.response.data).flat().join(' ') || 'Failed to reset password. The link might be expired or invalid.');
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
                <h2>Set New Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="new-password">New Password:</label>
                        <input
                            type="password"
                            id="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="re-new-password">Confirm New Password:</label>
                        <input
                            type="password"
                            id="re-new-password"
                            value={reNewPassword}
                            onChange={(e) => setReNewPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                    </div>
                    {message && <p className="success-message">{message}</p>}
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="button primary" disabled={loading}>
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordConfirmPage;