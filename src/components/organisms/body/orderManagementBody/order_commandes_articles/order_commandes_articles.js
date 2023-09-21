import React, { useState, useEffect } from 'react';
import './order_commandes_articles.scss';
export const imagePath = '/images/articles/';

function Order_commandes_articles({ id_commande }) {
  const [commandes_articles, setCommandesArticles] = useState([]);
  //const [total, setTotal] = useState(0);
  //const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {

      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/commandes_article/${id_commande}?key=${process.env.REACT_APP_API_KEY}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        const data = await response.json();

        setCommandesArticles(data);

      } catch (error) {
        console.error('Erreur lors de la récupération des commandes', error);

      }
    };
    fetchOrders();
  }, [id_commande]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  return (
    <div className="order-cart-container">
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
          {
            commandes_articles.map((article) => (
              <tr key={article.id_article}>
                <td>
                  <img src={article.url_image} className="cart-item-image" alt={article.nom_article} />
                </td>
                <td>{article.nom_article}</td>
                <td>
                  <div className="order-cart-quantity-control">
                    <span>{article.quantite}</span>
                  </div>
                </td>
                <td>{formatPrice(article.prix_vente * article.quantite)}</td>
              </tr>
            ))
          }
        </tbody>

      </table>

    </div>
  );
}

export default Order_commandes_articles;