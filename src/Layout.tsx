import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
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

                <footer className="App-footer">
                    <p>&copy; {new Date().getFullYear()} OpusTools</p>
                </footer>
            </div>
        </AuthProvider>
    );
};

export default Layout;