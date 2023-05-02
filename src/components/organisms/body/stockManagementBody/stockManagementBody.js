import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StockManagementBody() {
    const [articles, setArticles] = useState([]);
    const [editedArticles, setEditedArticles] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch articles data from API
        fetch("/api/articles")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch articles");
                }
                return response.json();
            })
            .then((data) => {
                setArticles(data.articles);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, []);

    const handleEdit = (id, event) => {
        const newEditedArticles = { ...editedArticles };
        newEditedArticles[id] = parseInt(event.target.value, 10);
        setEditedArticles(newEditedArticles);
    };

    const handleSave = () => {
        // Update stock data to API
        fetch("/api/articles", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedArticles),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to save stock changes");
                }
                // Redirect to homepage after successful save
                navigate.push("/");
            })
            .catch((error) => {
                setError(error);
            });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Gestion de Stock</h1>
            <table>
                <thead>
                    <tr>
                        <th>Article</th>
                        <th>Quantité en stock</th>
                        <th>Modifier la quantité</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article) => (
                        <tr key={article.id}>
                            <td>{article.name}</td>
                            <td>{article.stock}</td>
                            <td>
                                <input
                                    type="number"
                                    value={editedArticles[article.id] || ""}
                                    onChange={(event) => handleEdit(article.id, event)}
                                    min="0"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleSave}>Enregistrer les modifications</button>
        </div>
    );
}

export default StockManagementBody;
