// Importations
const express = require('express');
const cors = require('cors');
const c_r_c = require('./composants_generaux/crud_routes');
const cookieParser = require('cookie-parser');

// Configuration
const app = express();
const port = process.env.PORT || 8080;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  credentials: true
}));

// Routes
app.use(c_r_c('', 'Articles', 'id_article'));
app.use(c_r_c('', 'Commandes', 'id_commande'));
app.use(c_r_c('', 'Commandes_Articles', 'id_commande_article'));
app.use(c_r_c('', 'Utilisateurs', 'id_utilisateurs'));
app.use(c_r_c('', 'Clients', 'id_client'));

app.use(c_r_c('', 'Statuts', 'statut_commande'));

app.use('/', require('./routes/commande_article'));
app.use('/', require('./routes/exemple_utilisateur'));
app.use('/', require('./routes/articleImageUpload.js'));
app.use('/', require('./routes/routePanier.js'));

// Lancement du serveur
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});