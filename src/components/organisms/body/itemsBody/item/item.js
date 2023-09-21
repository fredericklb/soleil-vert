import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './item.scss';
import { imagePath } from 'constants/path';
// import spathiphyllumImage from '../../../../../assets/images/articles/spathiphyllum.jpg';

const Item = ({ item, addToCart, removeFromCart, cart }) => {

  const { id_article, nom_article, url_image, description, prix_vente, stock } = item;
  const [cartQuantity, setCartQuantity] = useState(0);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const cartItem = cart.find((cartItem) => cartItem.id_article === id_article);
    if (cartItem) {
      setCartQuantity(cartItem.quantite);
    } else {
      setCartQuantity(0);
    }
  }, [cart, id_article]);

  const handleAddToCart = () => {
    addToCart(id_article);
    if (cartQuantity >= stock) {

      setCartQuantity(stock);
    } else {
      // setCartQuantity(cartQuantity + 1);
    }
  };

  const handleRemoveFromCart = () => {
    if (cartQuantity > 0) {
      removeFromCart(id_article);
      setCartQuantity(cartQuantity - 1);
    }
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleClickImage = () => {
    toggleDescription();
  };

  const renderCartButtons = () => {
    if (cartQuantity === 0) {
      return <button onClick={handleAddToCart}>Ajouter au panier</button>;
    }

    return (
      <div className="cart-buttons">
        <button className="btn-remove" onClick={handleRemoveFromCart}>
          -
        </button>
        <span className="cart-quantity">{cartQuantity}</span>
        <button className="btn-add" onClick={handleAddToCart}>
          +
        </button>
      </div>
    );
  };

  return (
    <div className="item-container">
      <div className="image-container">
        <img
          src={process.env.PUBLIC_URL + imagePath + url_image}
          alt={nom_article}
          className="img-spathiphyllum"
          onClick={handleClickImage}
        />
        {showDescription && (
          <div className="description-window">
            <p>{description}</p>
          </div>
        )}
      </div>
      <div className="item-details">
        <h2>{nom_article}</h2>
        <p>Prix : {prix_vente} €</p>
        {stock === 0 ? (
          <p className={`stock-text ${stock === 0 ? "stock-exhausted" : ""}`}>
            {stock === 0 ? "Stock épuisé" : renderCartButtons()}
          </p>
        ) : (
          renderCartButtons()
        )}
      </div>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    id_article: PropTypes.number.isRequired,
    nom_article: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    prix_vente: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    url_image: PropTypes.string.isRequired,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
};

export default Item;