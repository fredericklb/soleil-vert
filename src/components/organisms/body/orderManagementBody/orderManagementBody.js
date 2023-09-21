import React, { useEffect, useState } from 'react';
import './orderManagementBody.scss';
import OrderCommandesArticles from './order_commandes_articles/order_commandes_articles';

function OrderManagementBody() {
    // Tableau contenant les commandes initiales
    const initialOrders = [
        { id_commande: 1, id_client: 1, date_commande: "2023-09-01", date_livraison: "2023-09-01", statut_commande: "Livré" },
        { id_commande: 2, id_client: 2, date_commande: "2023-09-01", date_livraison: "2023-09-01", statut_commande: "Livré" },
        { id_commande: 3, id_client: 3, date_commande: "2023-09-01", date_livraison: "2023-09-01", statut_commande: "Livré" },
        { id_commande: 4, id_client: 4, date_commande: "2023-09-01", date_livraison: "2023-09-01", statut_commande: "Livré" },
        { id_commande: 5, id_client: 5, date_commande: "2023-09-01", date_livraison: "2023-09-01", statut_commande: "Livré" },
        { id_commande: 6, id_client: 6, date_commande: "2023-09-01", date_livraison: "2023-09-01", statut_commande: "En cours" },
        { id_commande: 7, id_client: 7, date_commande: "2023-09-01", date_livraison: "2023-09-01", statut_commande: "En cours" },
        { id_commande: 8, id_client: 8, date_commande: "2023-09-01", date_livraison: "2023-09-01", statut_commande: "En cours" },
        { id_commande: 9, id_client: 9, date_commande: "2023-09-01", date_livraison: "2023-09-01", statut_commande: "En cours" }
    ];

    const [orders, setOrders] = useState(initialOrders);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/affiche_commandes?key=${process.env.REACT_APP_API_KEY}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include'
                    });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                setOrders(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des commandes', error);
            }
        };
        fetchOrders();
    }, []);

    const affiche_details = (index) => {

        const updateOrders = [...orders];

        if (updateOrders[index].hasOwnProperty('affiche_details')) {
            if (updateOrders[index].affiche_details === true) {
                updateOrders[index].affiche_details = false;
            }
            else {
                updateOrders[index].affiche_details = true;
            }
        }
        else {
            updateOrders[index] = { ...updateOrders[index], affiche_details: true }
        }

        setOrders(updateOrders);
    }

    return (
        <div className="order-management-body">
            <h1>Gestion des Commandes</h1>
            <table className="order-management-table">
                <thead>
                    <tr>
                        <th>ID Commande</th>
                        <th>ID Client</th>
                        <th>Date Commande</th>
                        <th>Date Livraison</th>
                        <th>Statut Commande</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <React.Fragment key={order.id_commande}>
                            <tr>
                                <td>{order.id_commande}</td>
                                <td>{order.id_client}</td>
                                <td>{order.date_commande}</td>
                                <td>{order.date_livraison}</td>
                                <td>{order.statut_commande}</td>
                                <button className="details" onClick={() => affiche_details(index)}>
                                    {order.affiche_details ?
                                        "Masquer les détails" :
                                        "Afficher les détails"
                                    }
                                </button>
                            </tr>
                            <tr>
                                {order.affiche_details === true &&
                                    <td><OrderCommandesArticles id_commande={order.id_commande} /></td>}
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderManagementBody;