const sql = require('mysql2/promise');

const config = require('../configuration/configuration_base.json');
console.log(config);
const pool_connexion = sql.createPool(config);

module.exports = pool_connexion;