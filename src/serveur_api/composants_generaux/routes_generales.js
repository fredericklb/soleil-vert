const express = require('express');
const fonction_generale_api = require('./fonctions_generales_api');

function creer_routes_generales(nom_table, nom_identifiant)
{
    const router = express.Router();

    async function affiche_table_tout(req, res) {
        return fonction_generale_api.lecture_table_tout(req,res,nom_table);
    }

    async function affiche_une_ligne(req, res) {
        return fonction_generale_api.lecture_ligne_table(req,res,nom_table,nom_identifiant);
    };

    async function ajout_une_ligne(req, res) {
        return fonction_generale_api.ajout_ligne(req,res,nom_table);
    };

    async function mise_a_jour_une_ligne(res,req) {    
        return fonction_generale_api.mise_a_jour_ligne(req,res,nom_table,nom_identifiant);
    };


    async function suppresion_une_ligne(res,req) {    
        return fonction_generale_api.suppresion_ligne(req,res,nom_table,nom_identifiant);
    };
  
    router.get('/api/affiche_'+nom_table,affiche_table_tout)
    router.get('/api/affiche_'+nom_table+'/:id',affiche_une_ligne)
    router.post('/api/ajout_'+nom_table+'',ajout_une_ligne)
    router.put('/api/mise_a_jour_'+nom_table+'/:id',mise_a_jour_une_ligne)
    router.delete('/api/suppresion_'+nom_table+'/:id',suppresion_une_ligne)

    return router;
}

module.exports = creer_routes_generales;