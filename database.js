const {createPool} = require('mysql2');

const pool = createPool({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: "stream"
}).promise()

async function getUsers () {
    const [rows] = await pool.query("SELECT * FROM user_credentials")
}

module.exports = pool;