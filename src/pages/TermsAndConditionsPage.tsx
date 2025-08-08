// src/pages/TermsAndConditionsPage.tsx - NEW FILE, using CSS classes

import React from 'react';

const TermsAndConditionsPage: React.FC = () => {
    return (
        <div className="policy-page">
            <h1 className="policy-title">Terms and Conditions</h1>
            <p className="policy-date">**Effective Date: August 8, 2025**</p>
            <p className="policy-paragraph">By accessing or using the opustools.xyz website and its services, you agree to be bound by these Terms and Conditions.</p>

            <h2 className="policy-section-title">1. Use of Service</h2>
            <ul className="policy-list">
                <li className="policy-list-item">**Eligibility**: You must be at least 13 years old to use our services.</li>
                <li className="policy-list-item">**User Conduct**: You agree not to use our services for any illegal or unauthorized purpose. You are solely responsible for your conduct and any data, text, information, usernames, graphics, photos, profiles, and links that you submit, post, and display on our services.</li>
                <li className="policy-list-item">**Intellectual Property**: All content provided on opustools.xyz, including text, graphics, logos, and images, is the property of opustools.xyz or its content suppliers and protected by copyright laws. You may not use, reproduce, or distribute any content from our services without our express written permission.</li>
            </ul>

            <h2 className="policy-section-title">2. User-Generated Content</h2>
            <ul className="policy-list">
                <li className="policy-list-item">**Your Responsibility**: You are responsible for the content you upload to our services. You represent and warrant that you own or have the necessary licenses, rights, consents, and permissions to use and authorize us to use all patent, trademark, trade secret, copyright, or other proprietary rights in and to any and all user-generated content.</li>
                <li className="policy-list-item">**License**: By uploading content, you grant us a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, and display the content for the purpose of operating and improving the services.</li>
            </ul>

            <h2 className="policy-section-title">3. Disclaimers</h2>
            <p className="policy-paragraph">Our services are provided "as is" and "as available." We do not guarantee that the services will be uninterrupted, error-free, or secure. We are not responsible for any loss or damage that may result from your use of the services.</p>

            <h2 className="policy-section-title">4. Limitation of Liability</h2>
            <p className="policy-paragraph">In no event shall opustools.xyz, its directors, employees, or partners be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the services; (ii) any conduct or content of any third party on the services; (iii) any content obtained from the services; and (iv) unauthorized access, use, or alteration of your transmissions or content.</p>

            <h2 className="policy-section-title">5. Governing Law</h2>
            <p className="policy-paragraph">These Terms shall be governed and construed in accordance with the laws of Nigeria, without regard to its conflict of law provisions.</p>

            <h2 className="policy-section-title">6. Changes to Terms</h2>
            <p className="policy-paragraph">We reserve the right, at our sole discretion, to modify or replace these Terms at any time.</p>

            <h2 className="policy-section-title">7. Contact Us</h2>
            <p className="policy-paragraph">If you have any questions about these Terms, please contact us at: `support@opustools.xyz`</p>
        </div>
    );
};

export default TermsAndConditionsPage;