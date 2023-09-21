import React from 'react';
import './orderForm.scss';
import Payment from '../payment/payment';

function OrderForm({ formValues, formHandlers, validerCommande, panierVide }) {
    const {
        nom,
        prenom,
        email,
        adresse,
        codePostal,
        ville,
    } = formValues;

    const {
        setNom,
        setPrenom,
        setEmail,
        setAdresse,
        setCodePostal,
        setVille,
    } = formHandlers;

    const handleCodePostalChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^[0-9\b]+$/.test(value)) {
            setCodePostal(value);
        }
    };

    return (
        <div className="order-form-container">
            <div className="order-form-title">
                <h2 className="order-form-title__text">Formulaire de commande</h2>
            </div>
            <form className="order-form">
                <div className="identity-row order-form__identity-row">
                    <div className="name-row order-form__name-row">
                        <label className="order-form__label">
                            Nom :
                            <input
                                type="text"
                                className="order-form__input order-form__input-name"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="firstname-row order-form__firstname-row">
                        <label className="order-form__label">
                            Prénom :
                            <input
                                type="text"
                                className="order-form__input order-form__input-first-name"
                                value={prenom}
                                onChange={(e) => setPrenom(e.target.value)}
                            />
                        </label>
                    </div>
                </div>
                <div className="email-row order-form__email-row">
                    <label className="order-form__label">
                        E-mail :
                        <input
                            type="email"
                            className="order-form__input order-form__input-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                </div>
                <div className="location-row order-form__location-row">
                    <div className="address-row order-form__address-row">
                        <label className="order-form__label">
                            Adresse :
                            <input
                                type="text"
                                className="order-form__input order-form__input-address"
                                value={adresse}
                                onChange={(e) => setAdresse(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="postal-code-row order-form__postal-code-row">
                        <label className="order-form__label">
                            Code postal :
                            <input
                                type="text"
                                className="order-form__input order-form__input-postal-code"
                                value={codePostal}
                                onChange={handleCodePostalChange}
                                maxLength={10}
                            />
                        </label>
                    </div>
                    <div className="city-row order-form__city-row">
                        <label className="order-form__label">
                            Ville :
                            <input
                                type="text"
                                className="order-form__input order-form__input-city"
                                value={ville}
                                onChange={(e) => setVille(e.target.value)}
                            />
                        </label>
                    </div>
                </div>
                <button
                    className="order-form__validate-order-button"
                    type="button"
                    onClick={validerCommande}
                    disabled={panierVide}
                >
                    Valider la commande
                </button>
            </form>
            <div>
            <Payment />
            </div>
        </div>
    );
}

export default OrderForm;