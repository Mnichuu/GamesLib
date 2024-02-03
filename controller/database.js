const {createConnection} = require('mysql');
const bcrypt = require("bcryptjs");

const db = createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: "gameslib"
});

function queryAsync(query, values) {
    return new Promise((resolve, reject) => {
        db.query(query, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    db,
    queryAsync
};