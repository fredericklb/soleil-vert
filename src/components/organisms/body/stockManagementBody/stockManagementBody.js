import React, { useState, useEffect } from "react";
import "./stockManagementBody.scss";
import { imagePath } from 'constants/path';
import addIcon from '../../../../assets/icons/add.svg';
import deleteIcon from '../../../../assets/icons/delete.svg';
import uploadIcon from '../../../../assets/icons/upload.svg';

function StockManagementBody() {
  // Tableau contenant les articles initiaux
  const initialArticles = [
    { id_article: 1, nom_article: "Article 1", url_image: "image1.jpg", description: "", prix_vente: 10, stock: 10, },
    { id_article: 2, nom_article: "Article 2", url_image: "image2.jpg", description: "", prix_vente: 20, stock: 5, },
    { id_article: 3, nom_article: "Article 3", url_image: "image3.jpg", description: "", prix_vente: 30, stock: 0, },
    { id_article: 4, nom_article: "Article 1", url_image: "image1.jpg", description: "", prix_vente: 10, stock: 10, },
    { id_article: 5, nom_article: "Article 2", url_image: "image2.jpg", description: "", prix_vente: 20, stock: 5, },
    { id_article: 6, nom_article: "Article 3", url_image: "image3.jpg", description: "", prix_vente: 30, stock: 0, },
    { id_article: 7, nom_article: "Article 1", url_image: "image1.jpg", description: "", prix_vente: 10, stock: 10, },
    { id_article: 8, nom_article: "Article 2", url_image: "image2.jpg", description: "", prix_vente: 20, stock: 5, },
    { id_article: 9, nom_article: "Article 3", url_image: "image3.jpg", description: "", prix_vente: 30, stock: 0, }
  ];

  const [articles, setArticles] = useState(initialArticles); // État contenant les articles
  const [selectedArticles, setSelectedArticles] = useState([]); // État contenant les articles sélectionnés
  const [nameSortOrder, setNameSortOrder] = useState("asc"); // État contenant l'ordre de tri pour le nom des articles
  const [priceSortOrder, setPriceSortOrder] = useState("asc"); // État contenant l'ordre de tri pour le prix des articles
  const [quantitySortOrder, setQuantitySortOrder] = useState("asc"); // État contenant l'ordre de tri pour la quantité des articles
  const [lastAddedIndex, setLastAddedIndex] = useState(null); // État contenant l'indice du dernier article ajouté

  // Récupérer les données de l'API et mettre à jour l'état des articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/affiche_articles?key=${process.env.REACT_APP_API_KEY}`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, []);

  // Ajoute un nouvel article localement
  const addArticleLocally = () => {
    const newArticle = {
      id_article: articles.length + 1,
      nom_article: "",
      url_image: "",
      description: "",
      prix_achat: 0,
      prix_vente: 0,
      stock: 0,
    };

    setArticles([...articles, newArticle]);
    setLastAddedIndex(articles.length);
  };

  // Ajoute un nouvel article
  const addArticle = async () => {
    const newArticle = {
      nom_article: "",
      url_image: "",
      description: "",
      prix_achat: 0,
      prix_vente: 0,
      stock: 0,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/ajout_articles?key=${process.env.REACT_APP_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArticle),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      newArticle.id_article = data.insertId;

      setArticles([...articles, newArticle]);
      setLastAddedIndex(articles.length);
    } catch (error) {
      console.error("Error adding article:", error);
      addArticleLocally();
    }
  };

  // cible la nouvelle ligne ajoutée
  useEffect(() => {
    if (lastAddedIndex !== null) {
      const newlyAddedRow = document.querySelector(`#row-${lastAddedIndex}`);
      if (newlyAddedRow) {
        const articleCell = newlyAddedRow.querySelector(".article-cell input");
        if (articleCell) {
          articleCell.focus();
          articleCell.select();
        }
        newlyAddedRow.scrollIntoView({ behavior: "auto", block: "start", inline: "nearest" });
      }
      setLastAddedIndex(null);
    }
  }, [lastAddedIndex]);

  // Modifie un article donné
  const editArticle = (index, field, value) => {
    const updatedArticles = [...articles];
    if (field === "url_image") {
      const file = value.target.files[0];
      updatedArticles[index][field] = file;
      updatedArticles[index].sourceImage = "client";
    } else if (field === "stock") {
      value = Math.max(value, 0);
      updatedArticles[index] = {
        ...updatedArticles[index],
        [field]: value
      };
    } else {
      updatedArticles[index] = {
        ...updatedArticles[index],
        [field]: value
      };
    }
    if (field === "prix_vente") {
      if (value === "" || isNaN(value) || value <= 0) {
        return;
      }
      value = parseFloat(value.toFixed(2));
    }
    setArticles(updatedArticles);
    updateArticle(updatedArticles[index], field);
  };

  // Fonction pour mettre à jour l'article dans l'API
  const updateArticle = async (updatedArticle, field) => {
    const idArticle = updatedArticle.id_article;

    try {
      if (field === "url_image") {
        const formData = new FormData();
        formData.append('url_image', updatedArticle.url_image);

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/mise_a_jour_article_avec_image/${idArticle}?key=${process.env.REACT_APP_API_KEY}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: formData,
          credentials: 'include'
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
        } else {
          console.error('Error uploading the file.');
        }
      } else {
        const copieArticles = { ...updatedArticle };
        delete copieArticles.sourceImage;

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/mise_a_jour_articles/${idArticle}?key=${process.env.REACT_APP_API_KEY}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(copieArticles),
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      }
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  // Supprime les articles sélectionnés
  const deleteSelectedArticles = async () => {
    const selectedArticleIds = selectedArticles.map(id => id);

    const selectedCount = selectedArticleIds.length;
    const articleWord = selectedCount === 1 ? 'l\'article' : 'les articles';

    const confirmed = window.confirm(`Êtes-vous sûr de vouloir supprimer ${articleWord} sélectionnés ?`);
    if (confirmed) {
      await confirmDeleteArticles(selectedArticleIds);
    }
  };

  // Confirme la suppression des articles sélectionnés
  const confirmDeleteArticles = async (selectedArticleIds) => {
    if (selectedArticleIds.length === 0) {
      return;
    }

    try {
      // Filtre les articles non sélectionnés et met à jour l'état
      const updatedArticles = articles.filter(article => !selectedArticleIds.includes(article.id_article));
      setArticles(updatedArticles);

      // Met à jour les articles sélectionnés
      setSelectedArticles([]);

      // Appelle l'API pour supprimer les articles sélectionnés
      for (const idArticleASupprimer of selectedArticleIds) {
        const adresseServeurAvecAPI = `${process.env.REACT_APP_BASE_URL}/api/suppression_articles/${idArticleASupprimer}?key=${process.env.REACT_APP_API_KEY}`;
        const response = await fetch(adresseServeurAvecAPI, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('La réponse du réseau n\'était pas valide');
        }
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la suppression :', error);
    }
  };

  // Gère le changement de case à cocher pour un article donné
  const handleCheckboxChange = (id) => {
    if (selectedArticles.includes(id)) {
      setSelectedArticles(selectedArticles.filter((item) => item !== id));
    } else {
      setSelectedArticles([...selectedArticles, id]);
    }
  };

  // Trie les articles
  const sortArticles = (sortBy) => {
    let sortedArticles = [...articles];

    if (sortBy === "nom_article") {
      sortedArticles.sort((a, b) => {
        const comparison = a.nom_article.localeCompare(b.nom_article);
        return nameSortOrder === "asc" ? comparison : -comparison;
      });
      setNameSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
    } else if (sortBy === "prix_vente") {
      sortedArticles.sort((a, b) => {
        const comparison = a.prix_vente - b.prix_vente;
        return priceSortOrder === "asc" ? comparison : -comparison;
      });
      setPriceSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
    } else if (sortBy === "stock") {
      sortedArticles.sort((a, b) => {
        const comparison = a.stock - b.stock;
        return quantitySortOrder === "asc" ? comparison : -comparison;
      });
      setQuantitySortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
    }

    setArticles(sortedArticles);
  };

  // Calcule l'état de stock en fonction de la quantité
  const calculateStockStatus = (quantity) => {
    if (quantity > 0 && quantity < 10) {
      return "Stock faible";
    } else if (quantity >= 10) {
      return "En stock";
    } else {
      return "Stock épuisé";
    }
  };

  return (
    <div className="stock-management-body">
      <h1>Gestion de Stock</h1>
      <table className="stock-management-table">
        <thead>
          <tr>
            <th>
              <button className="add-button" onClick={addArticle}>
                <img src={addIcon} alt="Add Icon" className="add-icon" />
              </button>
              {selectedArticles.length > 0 && (
                <button className="delete-button" onClick={deleteSelectedArticles}>
                  <img src={deleteIcon} alt="Delete Icon" className="delete-icon" />
                </button>
              )}
            </th>
            <th>
              Article{" "}
              <button className="sort-button" onClick={() => sortArticles("nom_article")}>
                {nameSortOrder === "asc" ? <>&#x25B2;</> : <>&#x25BC;</>}
              </button>
            </th>
            <th>Image</th>
            <th>Description</th>
            <th>
              Prix{" "}
              <button className="sort-button" onClick={() => sortArticles("prix_vente")}>
                {priceSortOrder === "asc" ? <>&#x25B2;</> : <>&#x25BC;</>}
              </button>
            </th>
            <th>
              Quantité{" "}
              <button className="sort-button" onClick={() => sortArticles("stock")}>
                {quantitySortOrder === "asc" ? <>&#x25B2;</> : <>&#x25BC;</>}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, index) => (
            <tr key={index} id={`row-${index}`}>
              <td>
                <input
                  type="checkbox"
                  className="input-checkbox"
                  checked={selectedArticles.includes(article.id_article)}
                  onChange={() => handleCheckboxChange(article.id_article)}
                />
              </td>
              <td className="article-cell">
                <input
                  type="text"
                  className="input-field"
                  value={article.nom_article}
                  onChange={(e) => editArticle(index, "nom_article", e.target.value)}
                />
              </td>
              <td>
                <label className="custom-upload-button">
                  <div className="image-container">
                    <img
                      className="img-upload"
                      src={article.sourceImage ?
                        URL.createObjectURL(article.url_image) :
                        process.env.PUBLIC_URL + imagePath + article.url_image}
                      alt={`fichier de ${article.nom}`}
                    />
                  </div>
                  <input type="file" className="input-upload" onChange={(e) => editArticle(index, "url_image", e)} />
                  <div className="upload-icon-container">
                    <img src={uploadIcon} alt="Upload Icon" className="upload-icon" />
                  </div>
                </label>
              </td>
              <td>
                <textarea
                  className="description-field"
                  value={article.description}
                  onChange={(e) => editArticle(index, "description", e.target.value)}
                  maxLength={255}
                  placeholder="Description de l'article"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="price-input"
                  step="0.01"
                  value={article.prix_vente}
                  onChange={(e) => editArticle(index, "prix_vente", parseFloat(e.target.value))}
                />
              </td>
              <td>
                <div className="quantity-container">
                  <input
                    type="number"
                    className={`quantity-input ${article.stock > 0 && article.stock < 10 ? "quantity-low" : article.stock === 0 ? "quantity-out" : "quantity-normal"}`}
                    value={article.stock}
                    onChange={(e) => editArticle(index, "stock", parseInt(e.target.value, 10))}
                  />
                  <div className={`${calculateStockStatus(article.stock) === "En stock" ? "in-stock" :
                    calculateStockStatus(article.stock) === "Stock faible" ? "low-stock" : "out-of-stock"}`}>
                    {calculateStockStatus(article.stock)}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockManagementBody;