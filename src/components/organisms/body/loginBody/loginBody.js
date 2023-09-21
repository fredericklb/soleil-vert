import React, { useState } from "react";
import "./loginBody.scss";

const LoginBody = () => {
    const [adresse_mail, setEmail] = useState("");
    const [mot_de_passe, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isRegistering) {
            // Handle registration logic if needed
            setIsRegistering(false);
        } else {
            // Handle login logic and role-based navigation
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/connexion_utilisateur?key=${process.env.REACT_APP_API_KEY}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    adresse_mail: adresse_mail,
                    mot_de_passe: mot_de_passe
                }
                ),
                credentials: 'include',

            });



            if (response.ok) {




                const userData = await response.json();


                const { role_utilisateur } = userData;

                // Stockage des informations dans le localStorage

                localStorage.setItem("role", role_utilisateur);


                if (role_utilisateur === "administrateur") {
                    window.location.href = "/gestion-stock";
                } else if (role_utilisateur === "client") {
                    window.location.href = "/";
                }
            } else {
                console.log("Échec de l'authentification");
            }
        }
    };

    const handleToggleRegister = () => {
        setIsRegistering(!isRegistering);
    };

    const renderButtonText = () => {
        return isRegistering ? "Créer un compte" : "Se connecter";
    };

    const renderToggleButtonText = () => {
        return isRegistering
            ? "Déjà un compte ? Se connecter"
            : "Pas encore de compte ? Créer un compte";
    };

    return (
        <div className="login-container">
            <h1>Connexion</h1>
            <h2>{renderButtonText()}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Adresse email</label>
                    <input
                        type="email"
                        id="email"
                        value={adresse_mail}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        value={mot_de_passe}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <button type="submit">{renderButtonText()}</button>
            </form>
            <button onClick={handleToggleRegister}>
                {renderToggleButtonText()}
            </button>
        </div>
    );
};

export default LoginBody;