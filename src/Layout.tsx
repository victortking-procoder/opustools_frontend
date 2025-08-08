// src/Layout.tsx - Updated to use the new Footer component

import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer'; // NEW: Import the Footer component
import { AuthProvider } from './context/AuthContext';
import './App.css';

const Layout: React.FC = () => {
    return (
        <AuthProvider>
            <div className="App">
                <NavBar />
                <main className="App-content-wrapper">
                    <Outlet />
                </main>
                <Footer /> {/* NEW: Use the new Footer component */}
            </div>
        </AuthProvider>
    );
};

export default Layout;