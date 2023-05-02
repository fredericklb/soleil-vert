import React from 'react';
import Header from '../../organisms/header/header';
import HomeBody from '../../organisms/body/homeBody/homeBody';
import Footer from '../../organisms/footer/footer';
import './home.scss'

const Home = () => {
    return (
        <div>
            <Header />
            <HomeBody />
            <Footer />
        </div>
    );
};

export default Home;