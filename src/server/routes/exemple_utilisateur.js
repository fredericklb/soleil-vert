const router = require('express').Router();
const pool_connexion = require('../composants_generaux/db_pool');
const { controlApiKey, cleanInjection, controlToken, createToken } = require('../control')

async function connexion_utilisateur(req, res) {
    try {
        const { adresse_mail, mot_de_passe } = req.body;

        const [utilisateur] = await pool_connexion.query(
            'SELECT id_utilisateur,role_utilisateur FROM utilisateurs WHERE adresse_mail = ? AND mot_de_passe = ?',
            [adresse_mail, mot_de_passe]
        );


        if (utilisateur.length === 1) {


            const token = createToken(utilisateur[0].id_utilisateur);


            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 14,
                domain: "localhost",
                sameSite: 'Lax',
            });

            const json_envoye_au_client = { role_utilisateur: utilisateur[0].role_utilisateur }
            res.json(json_envoye_au_client);


        }
        else {



            const json_envoye_au_client = { role_utilisateur: 'invité' }

            res.json(json_envoye_au_client);
        }


    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error });
    }
};

async function controle_mail_utilisateur(req, res) {
    try {


        const [rows] = await pool_connexion.query('SELECT * FROM `utilisateurs` WHERE adresse_mail = ?', [req.body.adresse_mail]);


        if (rows.length > 0) {
            console.log('adresse_mail  présent')
            res.json({ email_present: true });
        }
        else {
            console.log('adresse_mail  absent')
            res.json({ email_present: false });
        }


    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error });
    }
};

async function deconnexion_utilisateur(req, res) {
    res.cookie("token", null, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 14, // 14 Day Age,
        domain: "localhost",
        sameSite: 'Lax',
    }).send({
        logout: true,
        message: "Logout Successful."
    });
};

router.post('/api/connexion_utilisateur', cleanInjection, controlApiKey, connexion_utilisateur)
router.post('/api/controle_mail_utilisateur', cleanInjection, controlApiKey, controlToken, controle_mail_utilisateur)
router.post('/api/deconnexion_utilisateur', deconnexion_utilisateur)

module.exports = router;