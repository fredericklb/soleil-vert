import React, { useState, useEffect } from 'react';
import './itemsBody.scss';
import Cart from './cart/cart';
import Item from './item/item';
import SearchBar from './searchBar/searchBar';
import settingsIcon from '../../../../assets/icons/settings.svg';
import { imagePath } from 'constants/path';

// Données initiales des articles
const initialItems = [
  { id_article: 1, nom_article: 'Article 1', url_image: 'spathiphyllum.jpg', description: 'Description de l\'article 1.', prix_vente: 10, stock: 10 },
  { id_article: 2, nom_article: 'Article 2', url_image: 'spathiphyllum.jpg', description: 'Description de l\'article 2.', prix_vente: 20, stock: 5 },
  { id_article: 3, nom_article: 'Article 3', url_image: 'spathiphyllum.jpg', description: 'Description de l\'article 3.', prix_vente: 30, stock: 0 },
  { id_article: 4, nom_article: 'Article 1', url_image: 'spathiphyllum.jpg', description: 'Description de l\'article 1.', prix_vente: 10, stock: 10 },
  { id_article: 5, nom_article: 'Article 2', url_image: 'spathiphyllum.jpg', description: 'Description de l\'article 2.', prix_vente: 20, stock: 5 },
  { id_article: 6, nom_article: 'Article 3', url_image: 'spathiphyllum.jpg', description: 'Description de l\'article 3.', prix_vente: 30, stock: 0 },
  { id_article: 7, nom_article: 'Article 1', url_image: 'spathiphyllum.jpg', description: 'Description de l\'article 1.', prix_vente: 10, stock: 10 },
  { id_article: 8, nom_article: 'Article 2', url_image: 'spathiphyllum.jpg', description: 'Description de l\'article 2.', prix_vente: 20, stock: 5 },
  { id_article: 9, nom_article: 'Article 3', url_image: 'spathiphyllum.jpg', description: 'Description de l\'article 3.', prix_vente: 30, stock: 0 }
];

// Fonction asynchrone pour récupérer les articles depuis l'API
async function fetchItemsFromAPI(apiName) {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}${apiName}?key=${process.env.REACT_APP_API_KEY}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('La réponse du réseau n\'était pas valide');
  }

  const result = await response.json();

  return result;
}

// Composant ItemsBody
const ItemsBody = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);

  // Effet pour récupérer les articles depuis l'API au montage initial
  useEffect(() => {

    fetchItemsFromAPI(`/api/affiche_articles`)
      .then(data => {
        setItems(data);
      })
      .catch(error => {
        console.error(error);
        setItems(initialItems);
      });
  }, []);

  // Effet pour mettre à jour le stockage local lorsque le panier change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Fonction pour ajouter un article au panier
  const addToCart = (itemId) => {
    const item = items.find(item => item.id_article === itemId);
    const updatedCart = [...cart];
    const index = updatedCart.findIndex(cartItem => cartItem.id_article === itemId);

    if (index === -1) {
      updatedCart.push({ ...item, quantite: 1, url_image: process.env.PUBLIC_URL + imagePath + item.url_image });
    } else {
      if (updatedCart[index].quantite >= updatedCart[index].stock) {
        updatedCart[index].quantite = updatedCart[index].stock;
      } else {
        updatedCart[index].quantite += 1;
      }
    }

    setCart(updatedCart);
  };

  // Fonction pour supprimer un article du panier
  const removeFromCart = (itemId) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex(cartItem => cartItem.id_article === itemId);

    if (index !== -1) {
      if (updatedCart[index].quantite > 1) {
        updatedCart[index].quantite -= 1;
      } else {
        updatedCart.splice(index, 1);
      }

      setCart(updatedCart);
    }
  };

  // Fonction pour filtrer les articles en fonction de la recherche
  const filterItems = (searchQuery) => {
    setSearchQuery(searchQuery);
  };

  // Filtrer les articles en fonction de la recherche
  const filteredItems = items.filter(item =>
    item.nom_article.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fonction pour trier les articles par prix
  const sortItemsByPrice = (ascending) => {
    const sortedItems = [...filteredItems];
    sortedItems.sort((a, b) => (ascending ? a.prix_vente - b.prix_vente : b.prix_vente - a.prix_vente));
    return sortedItems;
  };

  // Fonction pour trier les articles par ordre alphabétique
  const sortItemsAlphabetically = () => {
    const sortedItems = [...filteredItems];
    sortedItems.sort((a, b) => a.nom_article.localeCompare(b.nom_article));
    return sortedItems;
  };

  // Fonction pour trier les articles en fonction de l'ordre spécifié
  const sortItems = (order) => {
    if (order === 'asc') {
      return sortItemsByPrice(true);
    } else if (order === 'desc') {
      return sortItemsByPrice(false);
    } else if (order === 'alphabetical') {
      return sortItemsAlphabetically();
    } else {
      return filteredItems;
    }
  };

  // Fonction pour filtrer les articles en stock si nécessaire
  const filterItemsInStock = (items) => {
    if (showOnlyInStock) {
      return items.filter(item => item.stock > 0);
    }
    return items;
  };

  // Trier les articles et les filtrer en fonction de la recherche et des paramètres
  const sortedItems = sortItems(sortOrder);
  const displayedItems = filterItemsInStock(sortedItems);

  // Rendu du composant
  return (
    <div className="items-body">
      <div className="sidebar-container">
        <div className="sidebar">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} filterItems={filterItems} />
          <div className="settings">
            <h3>
              <img src={settingsIcon} alt="Settings Icon" className="settings-icon" /> Réglages
            </h3>
            <select
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
              className="sort-select"
            >
              <option value="">Trier par</option>
              <option value="asc">Prix croissant</option>
              <option value="desc">Prix décroissant</option>
              <option value="alphabetical">Ordre alphabétique</option>
            </select>
            <div>
              <input
                type="checkbox"
                checked={showOnlyInStock}
                onChange={e => setShowOnlyInStock(e.target.checked)}
                id="inStockCheckbox"
              />
              <label htmlFor="inStockCheckbox">En stock</label>
            </div>
          </div>
          <Cart items={items} cart={cart} setCart={setCart} />
        </div>
      </div>
      <div className="content">
        {displayedItems.map(item => (
          <Item
            key={item.id_article}
            item={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            cart={cart}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemsBody;