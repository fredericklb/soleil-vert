import React from 'react';
import Header from '../../organisms/header/header';
import Footer from '../../organisms/footer/footer';
import LoginBody from '../../organisms/body/loginBody/loginBody';

const Login = () => {
    return (
        <div>
            <Header />
            <LoginBody />
            <Footer />
        </div>
    );
};

export default Login;