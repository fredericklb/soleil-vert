const router = require('express').Router();
const pool_connexion = require('../composants_generaux/db_pool');
const { controlApiKey, cleanInjection, controlToken } = require('../control')

async function commandes_article(req, res) {
    try {

        const id = req.params.id;
        const [rows] = await pool_connexion.query('SELECT * FROM Commandes_Articles NATURAL JOIN Articles WHERE id_commande = ?;', id)

        res.json(rows)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
}

router.get('/api/commandes_article/:id', cleanInjection, controlApiKey, controlToken, commandes_article)

module.exports = router;