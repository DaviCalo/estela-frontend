import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage.jsx';
import LoginPage from './pages/login/LoginPage.jsx';
import ProfilePage from './pages/profile/ProfilePage.jsx';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
             <Route path="/profile" element={<ProfilePage />} />
        </Routes>
    );
};

export default AppRoutes;