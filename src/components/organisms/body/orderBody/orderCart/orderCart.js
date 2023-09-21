import React, { useState, useEffect } from 'react';
import './orderCart.scss';
import ShoppingCartIcon from '../../../../../assets/icons/shopping_cart.svg';

const CART_KEY = 'cart';
const TOTAL_KEY = 'total';

function OrderCart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem(CART_KEY));
    const savedTotal = parseFloat(localStorage.getItem(TOTAL_KEY));

    if (savedCart) {
      setCart(savedCart);
    }

    if (savedTotal) {
      setTotal(savedTotal);
    }

    updateTotal(savedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    updateTotal(updatedCart);
  };

  const updateTotal = (updatedCart) => {
    let totalPrice = 0;
    let totalCount = 0;

    if (updatedCart) {
      updatedCart.forEach((article) => {
        totalPrice += article.prix_vente * article.quantite;
        totalCount += article.quantite;
      });
    }

    setTotal(totalPrice);
    localStorage.setItem(TOTAL_KEY, totalPrice.toString());
    setTotalCount(totalCount);
  };

  const incrementQuantity = (articleId) => {
    const updatedCart = cart.map((article) =>
      article.id_article === articleId
        ? { ...article, quantite: article.quantite >= article.stock ? article.stock : article.quantite + 1 }
        : article
    );

    updateCart(updatedCart);
  };

  const decrementQuantity = (articleId) => {
    const articleToRemove = cart.find((article) => article.id_article === articleId);

    if (articleToRemove && articleToRemove.quantite === 1) {
      const confirmMessage = `Êtes-vous sûr de vouloir supprimer l'article ${articleToRemove.nom_article} de votre panier ?`;
      if (window.confirm(confirmMessage)) {
        const updatedCart = cart.filter((article) => article.id_article !== articleId);
        updateCart(updatedCart);
      }
    } else {
      const updatedCart = cart.map((article) =>
        article.id_article === articleId && article.quantite > 1
          ? { ...article, quantite: article.quantite - 1 }
          : article
      );

      updateCart(updatedCart);
    }
  };

  const viderPanier = () => {
    setCart([]);
    localStorage.removeItem(CART_KEY);
    setTotal(0);
    localStorage.removeItem(TOTAL_KEY);
    setTotalCount(0);

  };
  const viderPanierAvecConfirmation = () => {
    const confirmMessage = 'Êtes-vous sûr de vouloir vider votre panier ?';
    if (window.confirm(confirmMessage)) {
      viderPanier()
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };
  const orderCartValues = {
    cart,
    total,
    incrementQuantity,
    decrementQuantity,
    viderPanier,
  };

  const orderCartJSX = (
    <div className="order-cart-container">
      <div className="order-cart-title">
        <img src={ShoppingCartIcon} alt="Panier" className="order-cart-icon" />
        <h2>Panier</h2>
        {cart.length > 0 && <span className="order-cart-count">{totalCount}</span>}
      </div>
      <table className="order-cart-table">
        <thead>
          <tr>
            <th className="order-cart-article-image">Article</th>
            <th className="order-cart-article-name">Nom</th>
            <th className="order-cart-article-quantity">Quantité</th>
            <th className="order-cart-article-price">Prix</th>
          </tr>
        </thead>
        <tbody>
          {cart.length === 0 ? (
            <tr>
              <td colSpan="4">Votre panier est vide.</td>
            </tr>
          ) : (
            cart.map((article) => (
              <tr key={article.id_article}>
                <td>
                  <img src={article.url_image} className="cart-item-image" alt={article.nom_article} />
                </td>
                <td>{article.nom_article}</td>
                <td>
                  <div className="order-cart-quantity-control">
                    {article.quantite === 1 ? (
                      <button
                        className="order-cart-decrement-button"
                        onClick={() =>
                          decrementQuantity(article.id_article)
                        }
                      >
                        -
                      </button>
                    ) : (
                      <button
                        className="order-cart-decrement-button"
                        onClick={() => decrementQuantity(article.id_article)}
                      >
                        -
                      </button>
                    )}
                    <span>{article.quantite}</span>
                    <button
                      className="order-cart-increment-button"
                      onClick={() => incrementQuantity(article.id_article)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>{formatPrice(article.prix_vente * article.quantite)}</td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total :</td>
            <td>{formatPrice(total)}</td>
          </tr>
        </tfoot>
      </table>
      <button className="order-cart-empty-button" type="button" onClick={viderPanierAvecConfirmation}>
        Vider le panier
      </button>
    </div>
  );

  return {
    values: orderCartValues,
    jsx: orderCartJSX,
  };

}

export default OrderCart;