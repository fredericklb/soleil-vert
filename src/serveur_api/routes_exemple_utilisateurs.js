
const router = require('express').Router();
const pool_connexion = require('./composants_generaux/connexion_base');


async function connexion_utilisateur(req, res) {
    try {
        const { email, mot_de_passe } = req.body;

        // Contrôle avec un select
        // Ici on suppose que les informations de connexion sont stockées en base de données
        const [utilisateur] = await pool_connexion.query(
            'SELECT role FROM utilisateurs WHERE email = ? AND mot_de_passe = ?',
            [email, mot_de_passe]
        );

        // Renvoi le rôle ou “invité”
        const json_envoye_au_client = utilisateur.length === 1 ?
            {
                role: utilisateur[0].role,
                Id_Utilisateur: utilisateur[0].Id_Utilisateur,
                Id_Etudiant: utilisateur[0].Id_Etudiant

            }
            :
            {
                role: 'invité',
                Id_Utilisateur: -1,
                Id_Etudiant: -1
            }
            ;
        res.json(json_envoye_au_client);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error });
    }
};

async function controle_mail_utilisateur(req, res) {
    try {

        // envoi de la requete au serveur
        const [rows] = await pool_connexion.query('SELECT * FROM `utilisateurs` WHERE email = ?', [req.body.email]);


        if (rows.length > 0) {
            console.log('email  présent')
            res.json({ email_present: true });
        }
        else {
            console.log('email  absent')
            res.json({ email_present: false });
        }


    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error });
    }
};

router.post('/api/connexion_utilisateur/:id', connexion_utilisateur)
router.post('/api/controle_mail_utilisateur', controle_mail_utilisateur)

module.exports = router;

