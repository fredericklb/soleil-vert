import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './loginBody.scss';

const Login = ({ onLogin, onRegister }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        onLogin(email, password);
        navigate("/");
    };

    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        onRegister(email, password);
        setIsRegistering(false);
    };

    const handleToggleRegister = () => {
        setIsRegistering(!isRegistering);
    };

    return (
        <div className="login-container">
            <h2>{isRegistering ? "Créer un compte" : "Se connecter"}</h2>
            <form onSubmit={isRegistering ? handleRegisterSubmit : handleLoginSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Adresse email</label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} required />
                </div>
                <button type="submit">{isRegistering ? "Créer un compte" : "Se connecter"}</button>
            </form>
            <button onClick={handleToggleRegister}>
                {isRegistering ? "Déjà un compte ? Se connecter" : "Pas encore de compte ? Créer un compte"}
            </button>
        </div>
    );
};

export default Login;
