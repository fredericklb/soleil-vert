import React from 'react';
import Header from '../../organisms/header/header';
import OrderManagementBody from '../../organisms/body/orderManagementBody/orderManagementBody';
import Footer from '../../organisms/footer/footer';
import './orderManagement.scss'

const OrderManagement = () => {
    return (
        <div>
            <Header />
            <OrderManagementBody />
            <Footer />
        </div>
    );
};

export default OrderManagement;