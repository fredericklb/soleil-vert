import React from 'react';
import Header from '../../organisms/header/header';
import Footer from '../../organisms/footer/footer';
import ItemsBody from '../../organisms/body/itemsBody/itemsBody';

const Items = () => {
    return (
        <div>
            <Header />
            <ItemsBody />
            <Footer />
        </div>
    );
};

export default Items;