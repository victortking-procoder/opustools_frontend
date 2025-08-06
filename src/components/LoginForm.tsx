// src/components/LoginForm.tsx

import React, { useState } from 'react';
import api from '../utils/api'; // Your custom Axios instance
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { AUTH_LOGIN_ENDPOINT } from '../api'; // Use the constant for the endpoint
import './AuthForm.css'; // Shared CSS for auth forms

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            const response = await api.post(AUTH_LOGIN_ENDPOINT, {
                username,
                password,
            });
            
            // CORRECTED: Your backend response should contain a full 'user' object.
            // We now pass this entire object to the login function.
            const { token, user, message } = response.data;
            
            login(token, user); // Pass the full user object
            setSuccess(message || 'Login successful!');
            navigate('/');
        } catch (err: any) {
            console.error('Login error:', err);
            if (err.response && err.response.data) {
                if (err.response.data.detail) {
                    setError(err.response.data.detail);
                } else if (err.response.data.non_field_errors) {
                    setError(err.response.data.non_field_errors[0]);
                } else if (err.response.data.username) {
                    setError(err.response.data.username);
                } else if (err.response.data.password) {
                    setError(err.response.data.password);
                }
                else {
                    setError('An unexpected error occurred during login.');
                }
            } else {
                setError('Network error or server is unreachable.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-form-card">
            <h2>Login to OpusTools</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <button type="submit" className="auth-button" disabled={loading}>
                    {loading ? 'Logging In...' : 'Login'}
                </button>
            </form>
            <p className="auth-footer-text">
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
            {/* CORRECTED: The "Forgot Password" link is now on the LoginForm component */}
            <p className="auth-footer-text">
                <Link to="/forgot-password">Forgot your password?</Link>
            </p>
        </div>
    );
};

export default LoginForm;