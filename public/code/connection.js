const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'gameslib'
});

const executeQuery = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.execute(sql, values, (err, result) => {
            if (err) {
                console.error('Error executing MySQL query:', err);
                return reject(err);
            }
            resolve(result);
        });
    });
};

module.exports = {
    executeQuery
};
