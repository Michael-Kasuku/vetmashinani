import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';
import TermsOfServicePage from './components/Landing/TermsOfServicePage';
import PrivacyPolicyPage from './components/Landing/PrivacyPolicyPage';

// Ensure 'root' is not null with type assertion
const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/terms" element={<TermsOfServicePage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
