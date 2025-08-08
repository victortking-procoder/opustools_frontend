// src/pages/PrivacyPolicyPage.tsx - NEW FILE, using CSS classes

import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className="policy-page">
            <h1 className="policy-title">Privacy Policy</h1>
            <p className="policy-date">**Effective Date: August 8, 2025**</p>
            <p className="policy-paragraph">Welcome to opustools.xyz! This Privacy Policy explains what information we collect, how we use it, and what choices you have regarding your data.</p>
            
            <h2 className="policy-section-title">1. Information We Collect</h2>
            <p className="policy-paragraph">When you use our services, we may collect the following types of information:</p>
            <ul className="policy-list">
                <li className="policy-list-item">**User-Provided Information**: This includes any information you provide directly to us, such as your email address when you create an account, or any content you upload for our tools (e.g., images for conversion).</li>
                <li className="policy-list-item">**Log Data**: Our servers automatically record information that your browser sends. This may include your IP address, browser type, browser version, the pages you visit, the time and date of your visit, and other statistics.</li>
                <li className="policy-list-item">**Cookies**: We use cookies to collect information and improve our services. A cookie is a small data file that we transfer to your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our services.</li>
                <li className="policy-list-item">**Third-Party Services**: We use third-party services like Google Analytics and Ezoic to help us understand how our services are used. These services may collect information sent by your browser as part of a web page request.</li>
            </ul>

            <h2 className="policy-section-title">2. How We Use Your Information</h2>
            <p className="policy-paragraph">We use the information we collect for various purposes, including to:</p>
            <ul className="policy-list">
                <li className="policy-list-item">Provide, maintain, and improve our services.</li>
                <li className="policy-list-item">Personalize your experience on our website.</li>
                <li className="policy-list-item">Analyze how our services are used to improve their performance and functionality.</li>
                <li className="policy-list-item">Protect our services from fraud and abuse.</li>
            </ul>

            <h2 className="policy-section-title">3. Data Storage and Security</h2>
            <p className="policy-paragraph">We take reasonable steps to protect your personal information from unauthorized access or disclosure. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>
            <p className="policy-note">**Please note**: All files uploaded by a user to our tools are automatically deleted at 11:00 PM UTC.</p>

            <h2 className="policy-section-title">4. Your Choices</h2>
            <p className="policy-paragraph">**Accessing and Updating Your Information**: If you have an account with us, you can review and update your information through your account settings.</p>

            <h2 className="policy-section-title">5. Changes to This Privacy Policy</h2>
            <p className="policy-paragraph">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Effective Date" at the top.</p>

            <h2 className="policy-section-title">6. Contact Us</h2>
            <p className="policy-paragraph">If you have any questions about this Privacy Policy, please contact us at: `support@opustools.xyz`</p>
        </div>
    );
};

export default PrivacyPolicyPage;