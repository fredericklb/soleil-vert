import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
import logo from '../../../soleil-vert.png';

const Header = () => {
    return (
        <header>
            <Link to="/">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
            </Link>
            <nav>
                <Link to="/">Accueil</Link>
                <Link to="/articles">Articles</Link>
                <Link to="/commande">Commande</Link>
                <Link to="/gestion-stock">Gestion de stock</Link>
                <Link to="/connexion" className="connexion">Connexion</Link>
            </nav>
        </header>
    );
};

export default Header;
