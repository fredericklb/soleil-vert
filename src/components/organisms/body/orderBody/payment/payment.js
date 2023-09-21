import React from 'react';
import { createRoot } from 'react-dom/client';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './payment.scss';

const stripePromise = loadStripe('VOTRE_CLE_PUBLIQUE_STRIPE');

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            // Stripe n'est pas encore chargé, attendez un instant.
            return;
        }

        try {
            // Créez un token de carte en utilisant les informations du formulaire de carte.
            const cardElement = elements.getElement(CardElement);
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                throw new Error(error.message);
            }

            // Effectuez une requête à votre backend pour finaliser le paiement.
            console.log(paymentMethod);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className="payment-form" onSubmit={handleSubmit}>
            <div className="payment-form__card-element-container">
                <CardElement className="payment-form__card-element" />
            </div>
            <button type="submit" className="payment-form__pay-button" disabled={!stripe}>
                Payer
            </button>
        </form>
    );
};

const Payment = () => {
    return (
        <div className="payment">
            <div className="payment-title">
                <h2>Formulaire de Paiement</h2>
            </div>
            <Elements stripe={stripePromise}>
                <PaymentForm />
            </Elements>
        </div>
    );
};

const root = document.getElementById('root');
const rootInstance = createRoot(root);
rootInstance.render(<Payment />);

export default Payment;