import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './Layout/MainLayout.jsx'
import StorePage from './pages/store/StorePage.jsx';
import LoginPage from './pages/login/LoginPage.jsx';
import ProfilePage from './pages/profile/ProfilePage.jsx';
import GamePage from './pages/game/GamePage.jsx';
import WishlistPage from './pages/wishlist/WishlistPage.jsx';
import GameDetailsPage from './pages/gameDetails/GameDetailsPage.jsx';
import SearchPage from './pages/search/SearchPage.jsx';
import CartPage from './pages/cart/CartPage.jsx';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<MainLayout />}>
                <Route index path="store" element={<StorePage />} />
                <Route index path="" element={<StorePage />} />
                <Route path="games" element={<GamePage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="wishlist" element={<WishlistPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="/game/:name" element={<GameDetailsPage />} />
                <Route path="/search/:name" element={<SearchPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;