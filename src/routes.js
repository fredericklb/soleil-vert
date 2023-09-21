import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/pages/home/home';
import Items from './components/pages/items/items';
import Order from './components/pages/order/order';
import Login from './components/pages/login/login';
import StockManagement from './components/pages/stockManagement/stockManagement';
import OrderManagement from './components/pages/orderManagement/orderManagement';

const AppRoutes = () => {
    const [isLoggedIn] = useState(!!localStorage.getItem('role'));

    useEffect(() => {

    }, [isLoggedIn]);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Items />} />
            <Route path="/commande" element={<Order />} />
            {!isLoggedIn && <Route path="/connexion" element={<Login />} />}
            {isLoggedIn && (
                <>
                    <Route path="/gestion-stock" element={<StockManagement />} />
                    <Route path="/gestion-commande" element={<OrderManagement />} />
                </>
            )}
            {/* Ajoutez une route de capture tout pour rediriger les chemins inconnus */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;