import React, { useState } from 'react';
import './itemsBody.scss';
import Cart from '../itemsBody/cart/cart';

const items = [
  { name: 'Article 1', description: 'Description de l\'article 1.', price: 10, stock: 5 },
  { name: 'Article 2', description: 'Description de l\'article 2.', price: 20, stock: 2 },
  { name: 'Article 3', description: 'Description de l\'article 3.', price: 30, stock: 0 }
];

const ItemsBody = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const index = cart.findIndex((cartItem) => cartItem.name === item.name);

    if (index === -1) {
      setCart([...cart, { ...item, quantity: 1 }]);
    } else {
      setCart(cart.map((cartItem, i) => i === index ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem));
    }
  }

  return (
    <div>
      <h1>Liste des articles</h1>
      {items.map((item) => (
        <div key={item.name} className="item">
          <img src="https://via.placeholder.com/150" alt={item.name} />
          <div className="item-details">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Prix : {item.price} €</p>
            {item.stock === 0 ? (
              <p>Stock épuisé</p>
            ) : (
              <button onClick={() => addToCart(item)}>Ajouter au panier</button>
            )}
          </div>
        </div>
      ))}
      <Cart items={items} cart={cart} setCart={setCart} />
    </div>
  );
};

export default ItemsBody;
