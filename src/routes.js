import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/home/home';
import Items from './components/pages/items/items';
import Order from './components/pages/order/order';
import Login from './components/pages/login/login';
import StockManagement from './components/pages/stockManagement/stockManagement';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Items />} />
            <Route path="/commande" element={<Order />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/gestion-stock" element={<StockManagement />} />
        </Routes>
    );
};

export default AppRoutes;