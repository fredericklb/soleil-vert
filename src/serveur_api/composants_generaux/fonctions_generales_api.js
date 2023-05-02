
const pool_connexion = require('./connexion_base');


async function lecture_table_tout(req, res,Table) 
{
    try 
    { 
        // envoi de la requete au serveur
        const [rows] = await pool_connexion.query("SELECT * FROM "+Table);

        // envoi tableau de json avec les lignes de la requetes
        res.json(rows);

        console.log(rows.length+ ' ligne(s) de '+Table+' envoyée(s)')
        return rows;
    }
    catch(error)
    {
        console.error(error);
        res.status(500).send({ error: error });
        return {error:error} 
    }   
};

async function lecture_ligne_table(req, res,Table,Identifiant) 
{
    try 
    {
        // recupération de l'id
        let id= req.params.id;

        // envoi de la requete au serveur
        const [retour] = await pool_connexion.query(`SELECT * FROM `+Table+` WHERE `+Identifiant+`= ?`, [id]);
        
        // envoi tableau de json avec la ligne de la requete
        res.json(retour); 

        console.log(retour.length+ ' ligne(s) '+Table+' envoyée(s)')
        return retour;
    }
    catch(error)
    {
        console.error(error);
        res.status(500).send({ error: error }); 
        return {error:error} 
    }

};

async function ajout_ligne(req,res,Table) 
{
    try 
    { 
        // envoi de la requete au serveur
        const [retour]=await pool_connexion.query(`INSERT INTO `+Table+`  SET ?`, [req.body]);

      

        console.log(retour.affectedRows + ' lignes ajoutées dans '+Table)

        // envoi  json avec l'id créé
        res.json(retour)

        return retour;
    }
    catch(error)
    {
        console.error(error);
        res.status(500).send({ error: error}); 
        return {error:error} 
    }
};

async function mise_a_jour_ligne(res,req,Table,Identifiant)
{    
    try 
    { 
        // recupération de l'id
        let id= req.params.id;

        // envoi de la requete au serveur
        const [retour]=await pool_connexion.query(`UPDATE `+Table+` SET ? WHERE `+Identifiant+`=?`, [req.body,req.params.id]);
     
        console.log(retour.affectedRows + ' ligne(s) modifiée(s) dans '+Table)

        // on renvoi le nombre de ligne afféctées par la requete
        res.send({nb_ligne:retour.affectedRows});  
         
        return retour;
        
    }
     catch (error) 
     {       
         console.error(error);   
        res.status(500).send({ error: error }); 
        return {error:error} 
            
    }
};


async function suppresion_ligne(res,req,Table,Identifiant)
{    
    try 
    { 
        // recupération de l'id
        let id= req.params.id;

        // envoi de la requete au serveur
        const [retour]=await pool_connexion.query(`DELETE from `+Table+` WHERE `+Identifiant+`=?`, [req.params.id]);
        

        console.log(retour.affectedRows + ' lignes modifiées dans '+Table)

        // on renvoi le nombre de ligne afféctées par la requete
        res.send({nb_ligne:retour.affectedRows});  
         
        return retour;
    }
     catch (error) 
     {       
         console.error(error);   
        res.status(500).send({ error: error }); 

        return {error:error} 
            
    }
};



module.exports = {
    lecture_table_tout,
    lecture_ligne_table,
    ajout_ligne,
    mise_a_jour_ligne,
    suppresion_ligne
  };
