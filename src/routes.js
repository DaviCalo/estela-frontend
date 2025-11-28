import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage.jsx';
import LoginPage from './pages/login/LoginPage.jsx';
import ProfilePage from './pages/profile/ProfilePage.jsx';
import DashboardPage from './pages/admPages/dashboard/dashboardPage.jsx';
import GamePage from './pages/admPages/game/gamePage.jsx';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            <Route path="/adm/dashboard" element={<DashboardPage />} />
            <Route path="/adm/games" element={<GamePage />} />
        </Routes>
    );
};

export default AppRoutes;