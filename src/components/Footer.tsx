// src/components/Footer.tsx - NEW FILE, using CSS classes

import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="App-footer">
            <div className="footer-container">
                <p className="copyright-text">
                    &copy; {currentYear} Opus Tools. All rights reserved.
                </p>
                <nav className="footer-nav">
                    <Link to="/privacy-policy" className="footer-link">
                        Privacy Policy
                    </Link>
                    <Link to="/terms-and-conditions" className="footer-link">
                        Terms and Conditions
                    </Link>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;