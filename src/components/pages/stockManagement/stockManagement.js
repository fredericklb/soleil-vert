import React from 'react';
import Header from '../../organisms/header/header';
import StockManagementBody from '../../organisms/body/stockManagementBody/stockManagementBody';
import Footer from '../../organisms/footer/footer';

const StockManagement = () => {
    return (
        <div>
            <Header />
            <StockManagementBody />
            <Footer />
        </div>
    );
};

export default StockManagement;