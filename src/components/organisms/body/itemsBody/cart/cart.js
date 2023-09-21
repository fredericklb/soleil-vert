import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '../../../../../assets/icons/shopping_cart.svg';
import AddIcon from '../../../../../assets/icons/add.svg';
import RemoveIcon from '../../../../../assets/icons/remove.svg';
import DeleteIcon from '../../../../../assets/icons/delete.svg';
import './cart.scss';

function Cart({ cart, setCart }) {
  const navigate = useNavigate();
  const [totalItems, setTotalItems] = useState(0);

  // Calcul du nombre total d'articles dans le panier
  useEffect(() => {
    const calculateTotalItems = () => {
      const total = cart.reduce((acc, item) => acc + item.quantite, 0);
      setTotalItems(total);
    };
    calculateTotalItems();
  }, [cart]);

  // Sauvegarde du panier dans le stockage local lorsqu'il est modifié
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Fonction pour retirer des articles du panier
  const removeFromCart = (itemId, quantityToRemove) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id_article === itemId) {
        let updatedQuantity = cartItem.quantite + quantityToRemove;
        if (updatedQuantity > cartItem.stock) {
          updatedQuantity = cartItem.stock
        }
        return { ...cartItem, quantite: updatedQuantity };
      }
      return cartItem;
    });

    const newCart = updatedCart.filter((cartItem) => cartItem.quantite > 0);
    setCart(newCart);
  };

  // Fonction pour vider complètement le panier
  const emptyCart = () => {
    setCart([]);
  };

  // Calcul du total de la commande
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.prix_vente * item.quantite, 0);
  };

  // Gestion du passage à la page de commande
  const handleCheckout = () => {
    localStorage.setItem('total', calculateTotal());
    navigate('/commande');
  };

  return (
    <div>
      <h3>
        <img src={ShoppingCartIcon} className="cart-icon" alt="Panier" /> Panier ({totalItems})
      </h3>
      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id_article} className="cart-item">
              <div className="item-left">
                <img src={item.url_image} className="cart-item-image" alt={item.nom_article} />
                <div>
                  <p className="item-name">{item.nom_article}</p>
                  <div className="item-actions">
                    <img
                      src={RemoveIcon}
                      className="cart-icon clickable"
                      alt="Retirer"
                      onClick={() => removeFromCart(item.id_article, -1)}
                    />
                    <p className="item-quantity">{item.quantite}</p>
                    <img
                      src={AddIcon}
                      className="cart-icon clickable"
                      alt="Ajouter"
                      onClick={() => removeFromCart(item.id_article, 1)}
                    />
                  </div>
                </div>
              </div>
              <div className="item-right">
                <img
                  src={DeleteIcon}
                  className="cart-icon clickable"
                  alt="Supprimer"
                  onClick={() => removeFromCart(item.id_article, -item.quantite)}
                />
                <p className="item-price">{item.prix_vente * item.quantite} €</p>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <p>Total: {calculateTotal()} €</p>
          </div>
          <div className="cart-buttons">
            <button className="btn-empty" onClick={emptyCart}>
              Vider le panier
            </button>
            <button className="btn-validate" onClick={handleCheckout}>
              Valider le panier
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;