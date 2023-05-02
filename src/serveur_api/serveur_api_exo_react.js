// REQUIRE ET APPELS DE MODULES D'IMPORTATION
const express = require('express');
const app = express();
const cors = require('cors');

//CONSTRUCTION DE MON PORT, MON ENVIRONNEMENT
const port = 7005;
require('dotenv').config();

// Ajouter le middleware cookie-parser à mon application Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Activer les requêtes CORS
app.use(cors({
  origin: `http://localhost:3000`,
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  credentials: true
}));

const c_r_g = require('./composants_generaux/routes_generales');

// Ajouter les routes de base
app.use(c_r_g("Articles", "id_article"));
app.use(c_r_g("Commandes", "id_commande"));
app.use(c_r_g("Commandes_Articles", "id_commande_article"));
app.use(c_r_g("Utilisateurs", "id_utilisateurs"));

// ajouter les routes personalisées
app.use('/', require('./routes_commandes_article'));

// Lecture du port et du serveur
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
