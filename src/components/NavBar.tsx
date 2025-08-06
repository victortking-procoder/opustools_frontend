import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './NavBar.css';

const NavBar: React.FC = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // New state for the menu

    const handleLogout = () => {
        logout();
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">OpusTools</Link>
                <button className="hamburger-menu" onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
                <ul className={`navbar-nav ${isMenuOpen ? 'open' : ''}`}>
                    <li><Link to="/image-tool" className="nav-link" onClick={() => setIsMenuOpen(false)}>Image Tool</Link></li>
                    {/* Add other tool links here when available */}
                    {isAuthenticated ? (
                        <>
                            <li><span className="nav-username">Welcome, {user?.username}!</span></li>
                            <li><Link to="/account" className="nav-link" onClick={() => setIsMenuOpen(false)}>My Account</Link></li>
                            <li><button onClick={handleLogout} className="nav-link nav-button">Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>Login</Link></li>
                            <li><Link to="/register" className="nav-link nav-button primary" onClick={() => setIsMenuOpen(false)}>Sign Up</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;