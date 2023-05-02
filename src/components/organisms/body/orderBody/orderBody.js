import React, { useState, useEffect } from 'react';
import './orderBody.scss';

function OrderBody() {
    const [panier, setPanier] = useState([]);
    const [nom, setNom] = useState('');
    const [adresse, setAdresse] = useState('');
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setPanier(JSON.parse(savedCart));
        }
        const savedTotal = localStorage.getItem('total');
        if (savedTotal) {
            setTotal(parseFloat(savedTotal));
        }
    }, []);

    const validerCommande = () => {
        console.log('Commande validée !');
    };

    const viderPanier = () => {
        setPanier([]);
        localStorage.removeItem('cart');
        setTotal(0);
        localStorage.removeItem('total');
    };

    return (
        <div>
            <h1>Page de commande</h1>
            <h2>Panier</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nom de l'article</th>
                        <th>Quantité</th>
                        <th>Prix</th>
                    </tr>
                </thead>
                <tbody>
                    {panier.length === 0 ? (
                        <tr>
                            <td colSpan="3">Votre panier est vide.</td>
                        </tr>
                    ) : (
                        panier.map((article) => (
                            <tr key={article.id}>
                                <td>{article.nom}</td>
                                <td>{article.quantity}</td>
                                <td>{article.prix} €</td>
                            </tr>
                        ))
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2">Total :</td>
                        <td colSpan="1">{total} €</td>
                    </tr>
                </tfoot>
            </table>
            <button type="button" onClick={viderPanier}>
                Vider le panier
            </button>
            <h2>Formulaire de commande</h2>
            <form>
                <label>
                    Nom :
                    <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
                </label>
                <br />
                <label>
                    Adresse :
                    <input type="text" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
                </label>
                <br />
                <button
                    type="button"
                    onClick={validerCommande}
                    disabled={panier.length === 0 || nom === '' || adresse === ''}
                >
                    Valider la commande
                </button>
            </form>
        </div>
    );
}

export default OrderBody;
