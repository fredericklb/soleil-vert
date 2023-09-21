import React, { useState } from 'react';
import OrderForm from './orderForm/orderForm';
import OrderCart from './orderCart/orderCart';
import './orderBody.scss';

async function ajoutParAPI(apiName, jsonAAjouter) {


  const response = await fetch(`${process.env.REACT_APP_BASE_URL}${apiName}?key=${process.env.REACT_APP_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonAAjouter),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const result = await response.json();
  return result;
}

function OrderBody() {
  const {
    values: {
      cart,
      viderPanier,
    },
    jsx: OrderCartJSX,
  } = OrderCart();

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [adresse, setAdresse] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [ville, setVille] = useState('');

  const validerCommande = async () => {
   
    if (
      cart.length === 0 ||
      nom === '' ||
      prenom === '' ||
      email === '' ||
      adresse === '' ||
      codePostal === '' ||
      ville === ''
    ) {
      return;
    }

    const confirmation = window.confirm('Confirmer la commande ?');

    if (confirmation) {
      console.log('Commande validée !');

      const clientData = {
        adresse_mail: email,
        adresse: adresse,
        nom: nom,
        prenom: prenom,
        codePostal: codePostal,
        ville: ville,
        cart: cart
      };

      const resultatPanier = await ajoutParAPI(`/api/valider_panier`, clientData);
      if (resultatPanier.valider) {
        viderPanier();
      }
    }
  };

  return (
    <div className="order-body">
      <h1>Commande</h1>
      <div className='cart-form-container'>
        <div className="cart-container">
          {OrderCartJSX}

        </div>
        <div className="form-container">
          <OrderForm
            formValues={{
              nom,
              prenom,
              email,
              adresse,
              codePostal,
              ville,
            }}
            formHandlers={{
              setNom,
              setPrenom,
              setEmail,
              setAdresse,
              setCodePostal,
              setVille,
            }}
            validerCommande={validerCommande}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderBody;