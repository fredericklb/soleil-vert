import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.scss';
import logo from '../../../assets/soleil-vert.png';

const Header = () => {
    // Vérifie si l'utilisateur est connecté
    const isLoggedIn = !!localStorage.getItem('role');

    // Fonction pour gérer la déconnexion
    const handleLogout = async () => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/deconnexion_utilisateur?key=${process.env.REACT_APP_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',

        });
        localStorage.removeItem('role');
        window.location.href = '/connexion';
    };

    return (
        <header className="header">
            <div className="left-links">
                <NavLink exact to="/" className="nav-link accueil" activeClassName="active">
                    Accueil
                </NavLink>
                <NavLink to="/articles" className="nav-link articles" activeClassName="active">
                    Articles
                </NavLink>
                <NavLink to="/commande" className="nav-link commande" activeClassName="active">
                    Commande
                </NavLink>
            </div>
            <div className="logo-container">
                <NavLink to="/" className="logo-link">
                    <div className="logo">
                        <img src={logo} alt="Logo" />
                    </div>
                </NavLink>
            </div>
            <div className="right-links">
                {isLoggedIn && localStorage.getItem('role') === 'administrateur' && (
                    <>
                        <NavLink to="/gestion-stock" className="nav-link gestion-stock" activeClassName="active">
                            Gestion de stock
                        </NavLink>
                        <NavLink to="/gestion-commande" className="nav-link gestion-commande" activeClassName="active">
                            Gestion des commandes
                        </NavLink>
                    </>
                )}
                {/* Afficher le lien de connexion si l'utilisateur n'est pas connecté, sinon afficher le bouton de déconnexion */}
                {!localStorage.getItem('role') ? (
                    <NavLink to="/connexion" className="nav-link connexion" activeClassName="active">
                        Connexion
                    </NavLink>
                ) : (
                    <button className="logout-button" onClick={handleLogout}>Déconnexion</button>
                )}
            </div>
        </header>
    );
};

export default Header;