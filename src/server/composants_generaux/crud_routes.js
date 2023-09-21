const express = require('express');
const fonctions_crud_api = require('./crud_operations.js');
const { controlApiKey, cleanInjection, controlToken } = require('../control')

function creer_routes_crud(numeroRoute, nomTable, nomIdentifiant) {
    const router = express.Router();
    const prefixeUrl = '/api/';

    async function ajouter_une_ligne(req, res) {
        return fonctions_crud_api.creer_une_ligne(req, res, nomTable);
    };

    async function lire_toutes_les_lignes_d_une_table(req, res) {
        return fonctions_crud_api.lire_toutes_les_lignes(req, res, nomTable);
    }

    async function lire_une_ligne_d_une_table(req, res) {
        return fonctions_crud_api.lire_une_ligne(req, res, nomTable, nomIdentifiant);
    };

    async function mettre_a_jour_une_ligne(req, res) {
        return fonctions_crud_api.mettre_a_jour_une_ligne(req, res, nomTable, nomIdentifiant);
    };

    async function supprimer_une_ligne(req, res) {
        return fonctions_crud_api.supprimer_une_ligne(req, res, nomTable, nomIdentifiant);
    };

    router.post(`${prefixeUrl}ajout_${numeroRoute}${nomTable}`, cleanInjection, controlApiKey, controlToken, ajouter_une_ligne)
    router.get(`${prefixeUrl}affiche_${numeroRoute}${nomTable}`, cleanInjection, controlApiKey, lire_toutes_les_lignes_d_une_table)
    router.get(`${prefixeUrl}affiche_${numeroRoute}${nomTable}/:id`, cleanInjection, controlApiKey, lire_une_ligne_d_une_table)
    router.put(`${prefixeUrl}mise_a_jour_${numeroRoute}${nomTable}/:id`, cleanInjection, controlApiKey, controlToken, mettre_a_jour_une_ligne)
    router.delete(`${prefixeUrl}suppression_${numeroRoute}${nomTable}/:id`, cleanInjection, controlApiKey, controlToken, supprimer_une_ligne)

    return router;
}

module.exports = creer_routes_crud;