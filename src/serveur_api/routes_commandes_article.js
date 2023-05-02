const router = require('express').Router();
const pool_connexion = require('./composants_generaux/connexion_base');



async function commandes_article(req, res) {
    try {


        const id = req.params.id;

        const [rows] = await pool_connexion.query('SELECT * FROM Commandes_Articles WHERE id_article = ?;', id)

        res.json(rows)



    } catch (error) {

    }

}

router.get('/api/commandes_article/:id', commandes_article)

module.exports = router;