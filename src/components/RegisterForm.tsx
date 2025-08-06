// src/components/RegisterForm.tsx

import React, { useState } from 'react';
import api from '../utils/api'; // Your custom Axios instance
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { AUTH_REGISTER_ENDPOINT } from '../api'; // Use the constant for the endpoint
import './AuthForm.css'; // Shared CSS for auth forms

const RegisterForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [firstName, setFirstName] = useState(''); // NEW: First Name
    const [lastName, setLastName] = useState('');   // NEW: Last Name
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

        if (password !== password2) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const response = await api.post(AUTH_REGISTER_ENDPOINT, {
                username,
                email,
                password,
                password2,
                first_name: firstName, // NEW: Include in payload
                last_name: lastName,   // NEW: Include in payload
            });

            // CORRECTED: Your backend response should contain a full 'user' object.
            // We now pass this entire object to the login function.
            const { token, user, message } = response.data;

            login(token, user); // Pass the full user object
            setSuccess(message || 'Registration successful! You are now logged in.');
            navigate('/');
        } catch (err: any) {
            console.error('Registration error:', err);
            if (err.response && err.response.data) {
                const data = err.response.data;
                if (data.username) setError(`Username: ${data.username[0]}`);
                else if (data.email) setError(`Email: ${data.email[0]}`);
                else if (data.password) setError(`Password: ${data.password[0]}`);
                else if (data.password2) setError(`Confirm Password: ${data.password2[0]}`);
                else if (data.first_name) setError(`First Name: ${data.first_name[0]}`); // NEW: Handle first_name error
                else if (data.last_name) setError(`Last Name: ${data.last_name[0]}`);   // NEW: Handle last_name error
                else if (data.non_field_errors) setError(data.non_field_errors[0]);
                else if (data.detail) setError(data.detail);
                else setError('An unexpected error occurred during registration.');
            } else {
                setError('Network error or server is unreachable.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-form-card">
            <h2>Create Your OpusTools Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="reg-username">Username:</label>
                    <input
                        type="text"
                        id="reg-username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reg-email">Email:</label>
                    <input
                        type="email"
                        id="reg-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                {/* NEW: Optional fields for First and Last Name */}
                <div className="form-group">
                    <label htmlFor="reg-first-name">First Name (Optional):</label>
                    <input
                        type="text"
                        id="reg-first-name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reg-last-name">Last Name (Optional):</label>
                    <input
                        type="text"
                        id="reg-last-name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reg-password">Password:</label>
                    <input
                        type="password"
                        id="reg-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reg-password2">Confirm Password:</label>
                    <input
                        type="password"
                        id="reg-password2"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <button type="submit" className="auth-button" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
            <p className="auth-footer-text">
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default RegisterForm;