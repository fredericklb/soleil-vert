import React from 'react';
import Header from '../../organisms/header/header';
import Footer from '../../organisms/footer/footer';
import OrderBody from '../../organisms/body/orderBody/orderBody';

const Order = () => {
    return (
        <div>
            <Header />
            <OrderBody/>
            <Footer />
        </div>
    );
};

export default Order;