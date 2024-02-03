const { queryAsync } = require('./database');
const fs = require ('fs');

const PrefabDatabase = (function() {
    return {
        DB2Array
    };
    async function DB2Array (query, values, fileName) {
        try {
            const result = await queryAsync(query, values);

            console.log(result);
            if (result.length == 0) {
                return { status: 403, message: 'No values in that table.' };
            }

            const gamesData = []; 
            if (result) {
                for (let i = 0; i < result.length; i++) {
                    let row = result[i];
                    gamesData.push(row);
                }
            }
            
            console.log(gamesData);
            let jsonData = JSON.stringify(gamesData, null, 2);
            fs.writeFileSync('' + fileName, `const gamesData = ${jsonData};`);

            return { status: 200, message: 'Data aquired' };
        } catch (error) {
            console.log(error);
            return { status: 500, message: 'Internal Server Error' };
        }
    }
})();

PrefabDatabase.DB2Array("SELECT * FROM games WHERE games.verified = '1'", "page_yourGames.js");