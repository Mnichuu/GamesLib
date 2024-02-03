const {createConnection} = require('mysql');
const fs = require('fs');

const pool = createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: "stream"
})

const PrefabDatabase = (function() {
    return {
        DB2Array
    };
    function DB2Array (sqlQuery, arrayFileName) {
        pool.query(sqlQuery, (err, result) => {
            if (err) {
                return console.log(err);
            }
            const gamesData = []; // Utwórz tablicę na dane

            if (result && result.length > 0) {
                for (let i = 0; i < result.length; i++) {
                    let row = result[i];
                    gamesData.push(row); // Dodaj dane do tablicy
                }
            }
            // Konwertuj dane na format JSON
            let jsonData = JSON.stringify(gamesData, null, 2);

            // Zapisz dane do pliku
            fs.writeFileSync('public/code/' + arrayFileName, `const gamesData = ${jsonData};`);
        })
    }
})();

PrefabDatabase.DB2Array("SELECT * FROM gameslib.games WHERE gameslib.games.verified = '1'", "page_yourGames.js");
