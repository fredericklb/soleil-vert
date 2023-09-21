// Importation du module de connexion à la base de données
const poolConnexion = require('./db_pool');

// Fonction pour lire toutes les lignes d'une table
async function lire_toutes_les_lignes(req, res, nomTable) {
    try {
        const query = 'SELECT * FROM ??';
        const [lignes] = await poolConnexion.query(query, [nomTable]);

        console.log(`${lignes.length} ligne(s) de ${nomTable} envoyée(s)`);
        res.json(lignes);
        return lignes;
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
        return { error: error.message };
    }
}

// Fonction pour lire une ligne d'une table par identifiant
async function lire_une_ligne(req, res, nomTable, identifiant) {
    try {
        // Récupération de l'identifiant de la requête
        const id = req.params.id;
        // Construction de la requête SQL avec des placeholders pour éviter les injections SQL
        const query = `SELECT * FROM ?? WHERE ?? = ?`;
        const [ligne] = await poolConnexion.query(query, [nomTable, identifiant, id]);

        // Enregistrement du nombre de lignes renvoyées
        console.log(`${ligne.length} ligne(s) de ${nomTable} envoyée(s)`);
        // Réponse avec les données au format JSON
        res.json(ligne);
        return ligne;
    } catch (error) {
        // Gestion des erreurs en enregistrant l'erreur et en renvoyant une réponse HTTP appropriée
        console.error(error);
        res.status(500).send({ error: error.message });
        return { error: error.message };
    }
}

// Fonction pour créer une ligne dans une table
async function creer_une_ligne(req, res, nomTable) {
    try {
        const query = `INSERT INTO ?? SET ?`;
        const [resultat] = await poolConnexion.query(query, [nomTable, req.body]);

        console.log(`${resultat.affectedRows} lignes ajoutées dans ${nomTable}`);
        res.json(resultat);
        return resultat;
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
        return { error: error.message };
    }
}

// Fonction pour mettre à jour une ligne dans une table par identifiant
async function mettre_a_jour_une_ligne(req, res, nomTable, identifiant) {
    try {
        const id = req.params.id;
        const query = `UPDATE ?? SET ? WHERE ?? = ?`;
        const [resultat] = await poolConnexion.query(query, [nomTable, req.body, identifiant, id]);

        console.log(`${resultat.affectedRows} ligne(s) modifiée(s) dans ${nomTable}`);
        res.json(resultat);
        return resultat;
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
        return { error: error.message };
    }
}

// Fonction pour supprimer une ligne dans une table par identifiant
async function supprimer_une_ligne(req, res, nomTable, identifiant) {
    try {
        const id = req.params.id;
        const query = `DELETE FROM ?? WHERE ?? = ?`;
        const [resultat] = await poolConnexion.query(query, [nomTable, identifiant, id]);

        console.log(`${resultat.affectedRows} ligne(s) supprimée(s) de ${nomTable}`);
        res.json(resultat);
        return resultat;
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
        return { error: error.message };
    }
}

// Exportation des fonctions pour les rendre accessibles depuis d'autres modules
module.exports = {
    lire_toutes_les_lignes,
    lire_une_ligne,
    creer_une_ligne,
    mettre_a_jour_une_ligne,
    supprimer_une_ligne
};