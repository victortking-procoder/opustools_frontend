// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Keep this uncommented now
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout'; 

// Import HelmetProvider from react-helmet-async
import { HelmetProvider } from 'react-helmet-async';

// Import your page components (uncomment these now)
import Home from './pages/Home';
import ImageToolPage from './pages/ImageToolPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordConfirmPage from './pages/ResetPasswordConfirmPage';
import PrivateRoute from './components/PrivateRoute';
import GlobalSeo from './components/GlobalSeo'; // This component will also use Helmet from react-helmet-async

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* Wrap your entire application with HelmetProvider */}
    <HelmetProvider> 
      <BrowserRouter>
        {/* Global SEO should be here */}
        <GlobalSeo /> 
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} /> 
            <Route path="image-tool" element={<ImageToolPage />} /> 
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="account" element={
              <PrivateRoute>
                <AccountPage />
              </PrivateRoute>
            } />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password/:uid/:token" element={<ResetPasswordConfirmPage />} />
            <Route path="*" element={<div><h1>404 - Page Not Found</h1></div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider> {/* Close HelmetProvider */}
  </React.StrictMode>
);