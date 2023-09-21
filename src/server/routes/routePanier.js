const router = require('express').Router();
const nodemailer = require('nodemailer');
const pool_connexion = require('../composants_generaux/db_pool');
const { controlApiKey, cleanInjection } = require('../control')

// Configuration du serveur d'envoi
const transporteur = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'node.js.dv@gmail.com',
        pass: 'mnplxccyfuyljyft',
    },
});

async function validerPanier(req, res) {
    try {

        console.log(req.body)
        const connection = await pool_connexion.getConnection();
        await connection.beginTransaction();

        try {
            const infoClient = {
                adresse_mail: req.body.adresse_mail,
                adresse: `${req.body.adresse} ${req.body.codePostal} ${req.body.ville}`,
                identite: `${req.body.nom} ${req.body.prenom}`,
            };

            // Insertion du client
            const [resultatClient] = await connection.query('INSERT INTO Clients SET ?', [infoClient]);
            const id_client = resultatClient.insertId;
            console.log(`${resultatClient.affectedRows} lignes ajoutées dans Clients`);

            // Insertion de la commande
            const [resultatCommande] = await connection.query('INSERT INTO Commandes (id_client, date_commande, statut_commande) VALUES (?, ?, ?)', [id_client, new Date(), 'En cours']);
            const id_commande = resultatCommande.insertId;
            console.log(`${resultatCommande.affectedRows} lignes ajoutées dans Commandes`);

            // Insertion des articles de la commande
            const panier = req.body.cart;
            for (const article of panier) {
                const [resultatArticle] = await connection.query('INSERT INTO Commandes_Articles (quantite, id_commande, id_article) VALUES (?, ?, ?)', [article.quantite, id_commande, article.id_article]);
                console.log(`${resultatArticle.affectedRows} lignes ajoutées dans Commandes_Articles`);

                const [resultatStock] = await connection.query('UPDATE Articles SET stock = stock - ? WHERE id_article = ? ', [article.quantite, article.id_article]);
                console.log(`${resultatStock.affectedRows} lignes modifiées dans Articles`);
            }

            // Construction du corps de l'e-mail
            let htmlMail = `<p><strong>Commande numéro : ${id_commande}</strong></p>
                      <p>Nom : ${req.body.nom}</p>
                      <p>Prénom : ${req.body.prenom}</p>
                      <p>Adresse : ${req.body.adresse}</p>
                      <p>Code Postal : ${req.body.codePostal}</p>
                      <p>Ville : ${req.body.ville}</p>
                      <p>Satut : En cours</p>
                      <table>
                        <tr>
                          <td>Article</td>
                          <td>Image</td>
                          <td>Quantité</td>
                          <td>Prix U</td>
                          <td>Prix total</td>
                        </tr>`;

            const attachments = [];
            for (const article of panier) {
                htmlMail += `<tr>
                      <td>${article.nom_article}</td>
                      <td><img src="cid:url_image${article.id_article}" style=width="150" height="150" /></td>
                      <td>${article.quantite}</td>
                      <td>${article.prix_vente}</td>
                      <td>${article.prix_vente * article.quantite}</td>
                    </tr>`;

                const jsonImage = {
                    path: `../../public${article.url_image}`,
                    cid: `url_image${article.id_article}`,
                };
                attachments.push(jsonImage);
            }
            htmlMail += '</table>';
            console.log(htmlMail);

            // Configuration de l'e-mail
            const mailOptions = {
                from: '"Votre commande chez Soleil Vert" node.js.dv@gmail.com',
                to: req.body.adresse_mail,
                subject: 'Récapitulatif de votre commande',
                text: 'Ceci est le message en mode texte',
                html: htmlMail,
                attachments: attachments,
            };

            // Envoi de l'e-mail
            transporteur.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log('Email: ' + info.response);
                }
            });

            // Validation de la transaction
            await connection.commit();

            res.json({ valider: true });
        } catch (error) {
            // En cas d'erreur, annulation de la transaction
            await connection.rollback();
            throw error;
        } finally {
            // Libération de la connexion après la transaction
            connection.release();
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Une erreur est survenue lors de la validation du panier.' });
    }
}

// Route POST pour la validation du panier
router.post('/api/valider_panier', cleanInjection, controlApiKey, validerPanier);

module.exports = router;