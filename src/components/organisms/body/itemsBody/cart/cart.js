import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ items, cart, setCart }) {
  const navigate = useNavigate();

  // Sauvegarder le panier dans le local storage à chaque changement
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function removeFromCart(item, quantityToRemove) {
    const index = cart.findIndex((cartItem) => cartItem.name === item.name);

    if (index !== -1) {
      const newCart = [...cart];
      newCart[index].quantity -= quantityToRemove;

      if (newCart[index].quantity === 0) {
        newCart.splice(index, 1);
      }

      setCart(newCart);
    }
  }

  function emptyCart() {
    setCart([]);
  }

  function calculateTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  function checkout() {
    localStorage.setItem('total', calculateTotal());
    navigate('/commande');
  }
  

  return (
    <div>
      <h2>Panier</h2>

      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.name}>
              <p>
                {item.name} ({item.quantity}) - {item.price} €
              </p>
              <button onClick={() => removeFromCart(item, -1)}>Ajouter 1</button>
              <button onClick={() => removeFromCart(item, 1)}>Enlever 1</button>
              <button onClick={() => removeFromCart(item, item.quantity)}>Tout enlever</button>
            </div>
          ))}

          <p>Total: {calculateTotal()} €</p>

          <button onClick={() => emptyCart()}>Vider le panier</button>
          <button onClick={() => checkout()}>Passer à la caisse</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
