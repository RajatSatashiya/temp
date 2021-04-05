const Pool = require('pg').Pool;

const pool = new Pool ({
    user: "postgres",
    password: "ujjwal",
    host : "localhost",
    port : 5432,
    database : "project"
});

module.exports = pool;