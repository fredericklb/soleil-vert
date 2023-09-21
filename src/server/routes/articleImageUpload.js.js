const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool_connexion = require('../composants_generaux/db_pool');
const { controlApiKey, cleanInjection, controlToken } = require('../control')

const router = express.Router();

// Configuration du dossier de destination pour les fichiers téléchargés
const storage = multer.diskStorage({
  destination: function (cb) {
    cb(null, '../../public/images/articles');
  },
  filename: function (file, cb) {
    cb(null, file.originalname);
  }
});

// Initialisation de la gestion des téléchargements de fichiers
const upload = multer({ storage: storage });

// Fonction pour mettre à jour un article avec une nouvelle image
async function mise_a_jour_avec_image(req, res) {
  try {
    console.log(req.params.id);
    console.log(req.body.message);
    const mon_fichier_image = req.file;

    // Récupérer l'extension du fichier téléchargé
    const extension = path.extname(mon_fichier_image.originalname);
    const nouveau_nom_image = `plante_${req.params.id}${extension}`;

    // Effectuer la mise à jour dans la base de données
    const query = 'UPDATE articles SET url_image = ? WHERE Id_Article = ?';
    const [retour_update] = await pool_connexion.query(query, [nouveau_nom_image, req.params.id]);

    // Renommer le fichier téléchargé avec le nouveau nom
    fs.rename(mon_fichier_image.path, path.join(mon_fichier_image.destination, nouveau_nom_image), async function (err) {
      if (err) {
        console.error(err);
        return res.status(500).send('Erreur lors du renommage du fichier.');
      } else {
        console.log('Fichier renommé avec succès.');

        try {
          console.log('Mise à jour demandée.');
          res.json(retour_update); // Renvoyer la réponse réussie ici
        } catch (error) {
          console.error(error);
          res.status(500).send({ error: 'Impossible de se connecter à la base de données.' });
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Une erreur s\'est produite.' });
  }
}

// Définition de la route pour la mise à jour d'article avec image
router.put('/api/mise_a_jour_article_avec_image/:id', cleanInjection, controlApiKey, controlToken, upload.single('url_image'), mise_a_jour_avec_image);

module.exports = router;