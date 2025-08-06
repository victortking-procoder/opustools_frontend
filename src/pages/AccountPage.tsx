// src/pages/AccountPage.tsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { AUTH_USER_ENDPOINT } from '../api';
import '../App.css';
import './AccountPage.css';

interface UserFormState {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

const AccountPage: React.FC = () => {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState<UserFormState>({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // This useEffect hook is CRUCIAL for populating the form
    // It runs once when the component mounts and whenever the 'user' object in context changes.
    useEffect(() => {
        if (user) {
            // Case 1: User data is already available in the context (e.g., after login).
            // We use this data to initialize the form.
            setFormData({
                username: user.username,
                email: user.email,
                first_name: user.first_name || '',
                last_name: user.last_name || '',
            });
            setLoading(false);
        } else {
            // Case 2: User data is NOT yet in the context (e.g., on a hard page refresh).
            // We make an API call to fetch the data.
            const fetchUserData = async () => {
                try {
                    setLoading(true);
                    const response = await api.get(AUTH_USER_ENDPOINT);
                    const userData = response.data;
                    setFormData({
                        username: userData.username,
                        email: userData.email,
                        first_name: userData.first_name || '',
                        last_name: userData.last_name || '',
                    });
                    // IMPORTANT: Update the user object in the context with the fetched data
                    updateUser(userData);
                } catch (error: any) {
                    console.error("Failed to fetch user data:", error);
                    setErrorMessage("Failed to load user data. Please try again.");
                } finally {
                    setLoading(false);
                }
            };
            fetchUserData();
        }
    }, [user, updateUser]); // Re-run if `user` object or `updateUser` function changes

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setSuccessMessage(null);
        setErrorMessage(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage(null);
        setErrorMessage(null);

        try {
            const dataToUpdate = {
                email: formData.email,
                first_name: formData.first_name,
                last_name: formData.last_name,
            };

            const response = await api.patch(AUTH_USER_ENDPOINT, dataToUpdate);
            updateUser(response.data); // Update the user object in context with the new data
            setSuccessMessage("Profile updated successfully!");
        } catch (error: any) {
            console.error("Failed to update profile:", error);
            if (error.response && error.response.data) {
                setErrorMessage(Object.values(error.response.data).flat().join(' '));
            } else {
                setErrorMessage("Failed to update profile. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading-message">Loading account details...</div>;
    }

    // After loading, if `user` is still null, something is wrong.
    if (!user) {
        return <div className="error-message">Could not load user data. Please try logging in again.</div>
    }

    return (
        <div className="account-page-container section-container">
            <h2>My Account</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="account-form">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        disabled
                        className="disabled-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="first_name">First Name:</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name:</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="button primary" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Profile'}
                </button>
            </form>
            <div className="account-actions">
                <h4>Change Password</h4>
                <p>To change your password, please use the dedicated password reset functionality. You will receive an email with a link to set a new password.</p>
            </div>
        </div>
    );
};

export default AccountPage;