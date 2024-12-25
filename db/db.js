const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "iuhd2004",
    database: "libraryDb",
    host: "localhost",
    port: 5432
});

module.exports = {pool};